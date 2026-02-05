from flask import Flask, render_template, request, redirect, flash, url_for, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from slugify import slugify
import os
import json
import re
from datetime import datetime
from werkzeug.utils import secure_filename
import shutil

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev_key_super_secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'static/uploads'

db = SQLAlchemy(app)

# ----------------------------------------------------------------------
# 1. Veritabanı Modeli (Çoklu Dil Destekli)
# ----------------------------------------------------------------------
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # Ortak Alanlar (Shared)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    category = db.Column(db.String(50), nullable=False)  # Projects, Opinions, Lifestyle
    cover_image = db.Column(db.String(255), nullable=True)
    publish_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Türkçe İçerik
    title_tr = db.Column(db.String(255), nullable=False)
    summary_tr = db.Column(db.Text, nullable=True)
    content_tr = db.Column(db.Text, nullable=False)

    # İngilizce İçerik
    title_en = db.Column(db.String(255), nullable=True)
    summary_en = db.Column(db.Text, nullable=True)
    content_en = db.Column(db.Text, nullable=True)

    def to_dict(self):
        """JSON serileştirme: Frontend yapısına uygun format"""
        data = {
            'id': self.id,
            'title': self.title_tr,
            'date': self.publish_date.strftime('%Y-%m-%d'),
            'category': self.category,
            'desc': self.summary_tr, 
            'image': self.cover_image,
            'link': f"article.html?id={self.id}",
            'content': self.content_tr, # Default content
            
            # Dil nesneleri
            'tr': {
                'title': self.title_tr,
                'desc': self.summary_tr,
                'content': self.content_tr
            },
            'en': {
                'title': self.title_en or self.title_tr, # Fallback
                'desc': self.summary_en or self.summary_tr,
                'content': self.content_en or self.content_tr
            }
        }
        return data

# ----------------------------------------------------------------------
# 2. JSON Generator
# ----------------------------------------------------------------------
def regenerate_json_files():
    categories = {
        'Projects': 'assets/data/projects.json',
        'Opinions': 'assets/data/blog.json',
        'Lifestyle': 'assets/data/lifestyle.json'
    }

    base_path = os.path.dirname(os.path.abspath(__file__))

    for category_name, json_file_path in categories.items():
        posts = Post.query.filter_by(category=category_name).order_by(Post.publish_date.desc()).all()
        data = [post.to_dict() for post in posts]
        
        full_path = os.path.join(base_path, json_file_path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        
        with open(full_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
    
    print("JSON content regenerated for frontend.")

# ----------------------------------------------------------------------
# 3. Yardımcı Fonksiyonlar
# ----------------------------------------------------------------------
def save_file(file, path):
    filename = secure_filename(file.filename)
    full_path = os.path.join(path, filename)
    file.save(full_path)
    return filename

def process_markdown_images(md_content, image_mapping):
    if not md_content: return ""
    for original_name, new_path in image_mapping.items():
        pattern = r'\([^\)]*?/?' + re.escape(original_name) + r'\)'
        md_content = re.sub(pattern, f'({new_path})', md_content)
        pattern_quotes = r'"[^"]*?/?' + re.escape(original_name) + r'"'
        md_content = re.sub(pattern_quotes, f'"{new_path}"', md_content)
    return md_content

# ----------------------------------------------------------------------
# 4. Rotalar (Admin Paneli)
# ----------------------------------------------------------------------

@app.route('/admin')
def admin_dashboard():
    # Kategori filtresini al
    cat_filter = request.args.get('category')
    
    # Base query
    query = Post.query
    
    # Filtre varsa uygula
    if cat_filter:
        query = query.filter_by(category=cat_filter)
    
    # Sıralama: ID'ye göre azalan (En yeni en üstte)
    posts = query.order_by(Post.id.desc()).all()
    
    # Filtreleme menüsü için database'deki mevcut kategorileri çek
    # (Gelecekte yeni kategori/alt kategori eklenirse otomatik buraya gelir)
    existing_categories = [c[0] for c in db.session.query(Post.category).distinct().all()]
    
    return render_template('admin_dashboard.html', posts=posts, categories=existing_categories, current_filter=cat_filter)

@app.route('/admin/new', methods=['GET', 'POST'])
def new_post():
    if request.method == 'POST':
        try:
            category = request.form['category']
            date_str = request.form['publish_date']
            publish_date = datetime.strptime(date_str, '%Y-%m-%d').date()
            
            # TR Data
            title_tr = request.form['title_tr']
            summary_tr = request.form['summary_tr']
            
            # EN Data
            title_en = request.form.get('title_en', '')
            summary_en = request.form.get('summary_en', '')

            # Slug generation (from TR title usually)
            year = str(publish_date.year)
            slug = slugify(title_tr)
            
            # Create Folders
            upload_dir = os.path.join(app.config['UPLOAD_FOLDER'], category, year, slug)
            os.makedirs(upload_dir, exist_ok=True)
            web_path_prefix = f"/{upload_dir}".replace("\\", "/")

            # Shared Images (Cover + Content)
            cover_path = None
            if 'cover_image' in request.files:
                f = request.files['cover_image']
                if f.filename != '':
                    fname = save_file(f, upload_dir)
                    cover_path = f"{web_path_prefix}/{fname}"

            image_mapping = {}
            if 'content_images' in request.files:
                for f in request.files.getlist('content_images'):
                    if f.filename != '':
                        fname = save_file(f, upload_dir)
                        image_mapping[f.filename] = f"{web_path_prefix}/{fname}"

            # Process TR Markdown
            content_tr = ""
            if 'markdown_file_tr' in request.files:
                f = request.files['markdown_file_tr']
                if f.filename != '':
                    raw = f.read().decode('utf-8')
                    content_tr = process_markdown_images(raw, image_mapping)
            
            # Process EN Markdown
            content_en = ""
            if 'markdown_file_en' in request.files:
                f = request.files['markdown_file_en']
                if f.filename != '':
                    raw = f.read().decode('utf-8')
                    content_en = process_markdown_images(raw, image_mapping)

            # Check if EN content missing, fallback to TR? Or keep empty? 
            # User wants separate upload, so we trust their input.

            # DB Save
            post = Post(
                slug=slug, category=category, publish_date=publish_date,
                cover_image=cover_path,
                title_tr=title_tr, summary_tr=summary_tr, content_tr=content_tr,
                title_en=title_en, summary_en=summary_en, content_en=content_en
            )
            db.session.add(post)
            db.session.commit()
            
            regenerate_json_files()
            
            flash('İçerik (TR/EN) başarıyla oluşturuldu!', 'success')
            return redirect(url_for('admin_dashboard'))

        except Exception as e:
            flash(f'Hata: {str(e)}', 'danger')
            print(e)
    
    return render_template('admin_form.html', action='new')

@app.route('/admin/edit/<int:id>', methods=['GET', 'POST'])
def edit_post(id):
    post = Post.query.get_or_404(id)
    
    # Calculate upload directory (based on *current* post data for listing existing)
    year = str(post.publish_date.year)
    upload_dir = os.path.join(app.config['UPLOAD_FOLDER'], post.category, year, post.slug)
    web_path_prefix = f"/{upload_dir}".replace("\\", "/")
    
    if request.method == 'POST':
        try:
            # Metadata Update
            post.title_tr = request.form['title_tr']
            post.summary_tr = request.form['summary_tr']
            post.title_en = request.form.get('title_en', '')
            post.summary_en = request.form.get('summary_en', '')
            
            post.category = request.form['category']
            date_str = request.form['publish_date']
            post.publish_date = datetime.strptime(date_str, '%Y-%m-%d').date()
            
            # Recalculate path in case category/date changed (keeping simple, ensuring dir exists)
            year = str(post.publish_date.year)
            upload_dir = os.path.join(app.config['UPLOAD_FOLDER'], post.category, year, post.slug)
            os.makedirs(upload_dir, exist_ok=True)
            web_path_prefix = f"/{upload_dir}".replace("\\", "/")

            # Images Update
            if 'cover_image' in request.files:
                f = request.files['cover_image']
                if f.filename != '':
                    fname = save_file(f, upload_dir)
                    post.cover_image = f"{web_path_prefix}/{fname}"

            image_mapping = {}
            if 'content_images' in request.files:
                for f in request.files.getlist('content_images'):
                    if f.filename != '':
                        fname = save_file(f, upload_dir)
                        image_mapping[f.filename] = f"{web_path_prefix}/{fname}"

            # Markdown Updates
            
            # TR Content: File priority > Textarea
            if 'markdown_file_tr' in request.files and request.files['markdown_file_tr'].filename != '':
                f = request.files['markdown_file_tr']
                raw = f.read().decode('utf-8')
                post.content_tr = process_markdown_images(raw, image_mapping)
            else:
                raw_content = request.form.get('content_tr')
                if raw_content:
                    post.content_tr = process_markdown_images(raw_content, image_mapping)

            # EN Content: File priority > Textarea
            if 'markdown_file_en' in request.files and request.files['markdown_file_en'].filename != '':
                f = request.files['markdown_file_en']
                raw = f.read().decode('utf-8')
                post.content_en = process_markdown_images(raw, image_mapping)
            else:
                raw_content = request.form.get('content_en')
                if raw_content:
                    post.content_en = process_markdown_images(raw_content, image_mapping)

            db.session.commit()
            regenerate_json_files()
            
            flash('İçerik güncellendi!', 'success')
            return redirect(url_for('admin_dashboard'))
            
        except Exception as e:
            flash(f'Hata: {str(e)}', 'danger')

    # Prepare existing images list for GET request
    existing_images = []
    if os.path.exists(upload_dir):
        for fname in os.listdir(upload_dir):
            if fname.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
                existing_images.append({
                    'name': fname,
                    'url': f"{web_path_prefix}/{fname}"
                })

    return render_template('admin_form.html', action='edit', post=post, existing_images=existing_images)

@app.route('/admin/delete/<int:id>')
def delete_post(id):
    post = Post.query.get_or_404(id)
    db.session.delete(post)
    db.session.commit()
    regenerate_json_files()
    flash('Yazı silindi.', 'info')
    return redirect(url_for('admin_dashboard'))

# ----------------------------------------------------------------------
# 5. Frontend Rotaları (Siteyi Ziyaret Edenler İçin)
# ----------------------------------------------------------------------

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory('assets', path)

@app.route('/<path:filename>')
def serve_static_html(filename):
    # Bu kod, index.html dışındaki diğer html dosyalarını (projects.html vb.)
    # templates klasöründen çağırmana yarar.
    return render_template(filename)

# ----------------------------------------------------------------------
# Başlangıç
# ----------------------------------------------------------------------
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
