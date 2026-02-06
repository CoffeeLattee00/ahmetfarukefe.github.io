/* ============================
   GLOBAL STATE & UTILS
   ============================ */
const App = {
    // Current Language
    lang: localStorage.getItem("ahmet_fe_lang") || "en",

    // Translation Data (Moved from global scope)
    translations: {
        en: {
            nav_work: "My Works",
            nav_insights: "Technical Blogs",
            nav_home: "Ahmet Faruk Efe",
            nav_lifestyle: "Lifestyle",
            nav_contact: "Contact",
            contact_hero_title: "Let's Connect",
            contact_hero_desc: "Engineering requires precision, but collaboration requires connection. Whether you have a project in mind or just want to discuss the latest in mechanical design, I'm here.",
            contact_email: "Email",
            contact_linkedin: "LinkedIn",
            contact_grabcad: "GrabCAD",
            contact_grabcad_hint: "Don't forget to check out my CAD works!",
            toc_title: "Table of Contents",
            hero_greeting: "Hello, I'm",
            hero_title: "Plastic Extrusion Engineer",
            // hero_desc removed
            goal_title: "Goal: Plastic Extrusion Expert",
            goal_desc: "My journey is shaped by a relentless pursuit of mastering polymer processing technologies. I am dedicating my career to advancing the field of plastic extrusion through precision engineering and innovative R&D.",
            btn_work: "View My Works",
            btn_contact: "Contact Me",
            model_title: "Interactive Engineering",
            model_desc: "Explore the detailed mechanical design of a plastic extrusion mold directly in your browser.",
            model_hint: "Drag to rotate • Scroll to zoom",
            work_title: "My Works",
            work_desc: "My personal knowledge bank, extending from academic research to industrial application methods, and from engineering theories to technical design standards.",
            proj1_desc: "High-precision mechanical design and flow analysis for industrial plastic production.",
            proj2_desc: "Sustainable waste management system design focused on efficiency and automation.",
            proj3_desc: "Comprehensive analysis of thermodynamic cycles in renewable energy systems.",
            insights_title: "Technical Blogs",
            insights_desc: "My personal deductions, AI strategies, and technical analyses on not just 'how' technology works, but how we should approach it.",
            blog1_excerpt: "Exploring how 3D printing is revolutionizing rapid prototyping in mechanical engineering.",
            blog2_excerpt: "Why soft skills and emotional intelligence are crucial for modern technical leaders.",
            blog3_excerpt: "A deep dive into selecting eco-friendly materials without compromising structural integrity.",
            lifestyle_title: "Lifestyle & Interests",
            ls_travel: "Travel",
            ls_travel_desc: "Exploring new cultures and expanding horizons. From Erasmus memories to global adventures.",
            ls_soc: "Psychology & Sociology",
            ls_soc_desc: "Understanding human behavior and social dynamics to become a better leader.",
            ls_photo: "Photography",
            ls_photo_desc: "Capturing moments of symmetry and industrial beauty.",
            ls_photo: "Photography",
            ls_photo_desc: "Capturing moments of symmetry and industrial beauty.",
            footer_text: "Engineering the future with passion and precision.",
            
            // Experience Timeline
            // Experience Timeline
            exp_title: "Experiences",
            
            // 2025-2026: Erasmus 2
            exp_erasmus2_date: "Feb 2025 – Feb 2026",
            exp_erasmus2_title: "Erasmus Exchange Program • Bialystok University of Technology",
            exp_erasmus2_desc: "Returning to Bialystok University of Technology with a focused technical mindset to specialize in plastic extrusion and conduct R&D for my thesis under Prof. Marek Jałbrzykowski.",

            // 2024: Mir Ar-Ge
            exp_mir_date: "Aug 2024 - Sep 2024",
            exp_mir_title: "Intern Student • Mir Ar-Ge",
            exp_mir_desc: "Completed an internship at Mir Ar-Ge, gaining hands-on experience in plastic extrusion technologies and witnessing multidisciplinary R&D synergy.",

            // 2023-2024: Finance Head
            exp_finance_date: "2023 - 2024",
            exp_finance_title: "Head of Finance Department • PAU Innovation & Development",
            exp_finance_desc: "Managed financial planning and strategic partnerships at Pamukkale University Innovation and Development Community, simulating a real entrepreneurship ecosystem.",

            // 2023-Present: Erdem Model
            exp_erdem_date: "Sep 2023 - Present",
            exp_erdem_title: "CAD Modeling & CNC Programmer • Erdem Model",
            exp_erdem_desc: "Creating 3D casting mold designs and optimizing G-codes for CNC production at Erdem Model. Enhanced skills in CAD/CAM software and precision manufacturing.",

            // 2023: Kerem Mold
            exp_kerem_date: "Jul 2023 - Sep 2023",
            exp_kerem_title: "Intern Student • Kerem Mold & Automation",
            exp_kerem_desc: "Internship at KEREM MOLD & AUTOMATION focused on injection mold manufacturing, assembly, maintenance, and quality control procedures.",

            // 2023: AIESEC
            exp_aiesec_date: "Jun 2023 - Dec 2023",
            exp_aiesec_title: "Member • AIESEC Turkey",
            exp_aiesec_desc: "Active member contributing to meetings and global networking. A great opportunity to improve soft skills and foreign language proficiency.",

            // 2022-2024: PAU Debate
            exp_debate_date: "Nov 2022 - Feb 2024",
            exp_debate_title: "Project Team Lead • PAU Debate Community",
            exp_debate_desc: "Led the project team at PAU Debate Community. Organized events, managed team coordination, and conducted workshops on research strategies.",

            // 2024: Gen Venture (keep existing example if relevant, or remove if not in user list. User list implies these strictly. I will add Gen Venture as an extra or replace if needed. User provided specific list. I will stick to user list + maybe keep specific talks if fits timeline. User said 'all my experiences are these', so I will prioritize the new big list, but maybe keep the talks as small items if they don't conflict.)
            // The user list was exhaustive. I will stick to the user's detailed list for the timeline.

            // JS UI Strings
            view_details: "View Details →",
            read_article: "Read Article &rarr;",
            loading_err: "Failed to load content."
        },
        tr: {
            nav_work: "Çalışmalarım",
            nav_insights: "Teknik Bloglar",
            nav_home: "Ahmet Faruk Efe",
            nav_lifestyle: "Yaşam",
            nav_contact: "İletişim",
            contact_hero_title: "Bağlantı Kuralım",
            contact_hero_desc: "Mühendislik hassasiyet gerektirir, ancak işbirliği bağlantı gerektirir. İster aklınızda bir proje olsun, ister mekanik tasarım trendlerini konuşmak isteyin, buradayım.",
            contact_email: "E-posta",
            contact_linkedin: "LinkedIn",
            contact_grabcad: "GrabCAD",
            contact_grabcad_hint: "CAD çalışmalarımı incelemeyi unutmayın!",
            toc_title: "İçindekiler",
            hero_greeting: "Merhaba, Ben",
            hero_title: "Plastik Ekstrüzyon Mühendisi",
            // hero_desc removed
            goal_title: "Hedefim: Plastik Ekstrüzyon Uzmanı Olmak",
            goal_desc: "Kariyer yolculuğum, polimer işleme teknolojilerinde uzmanlaşma tutkusuyla şekilleniyor. Geleceğimi, hassas mühendislik ve yenilikçi Ar-Ge çalışmalarıyla plastik ekstrüzyon alanını ileriye taşımaya adıyorum.",
            btn_work: "Çalışmalarımı Gör",
            btn_contact: "İletişime Geç",
            model_title: "İnteraktif Mühendislik",
            model_desc: "Plastik ekstrüzyon kalıbının detaylı mekanik tasarımını tarayıcınızda inceleyin.",
            model_hint: "Çevirmek için sürükleyin • Yakınlaştırmak için kaydırın",
            work_title: "Çalışmalarım",
            work_desc: "Akademik araştırmalardan endüstriyel uygulama yöntemlerine, mühendislik teorilerinden teknik tasarım standartlarına kadar uzanan kişisel bilgi bankam.",
            proj1_desc: "Endüstriyel plastik üretimi için yüksek hassasiyetli mekanik tasarım ve akış analizi.",
            proj2_desc: "Verimlilik ve otomasyona odaklanmış sürdürülebilir atık yönetim sistemi tasarımı.",
            proj3_desc: "Yenilenebilir enerji sistemlerinde termodinamik çevrimlerin kapsamlı analizi.",
            insights_title: "Teknik Bloglar",
            insights_desc: "Teknolojinin sadece 'nasıl' çalıştığına değil, ona nasıl yaklaşmamız gerektiğine dair kişisel çıkarımlarım, yapay zeka stratejileri ve teknik analizlerim.",
            blog1_excerpt: "3D baskının makine mühendisliğinde hızlı prototiplemeyi nasıl devrimleştirdiğini keşfedin.",
            blog2_excerpt: "Modern teknik liderler için sosyal beceriler ve duygusal zeka neden kritiktir.",
            blog3_excerpt: "Yapısal bütünlükten ödün vermeden çevre dostu malzeme seçimi üzerine derinlemesine bir bakış.",
            lifestyle_title: "Yaşam & İlgi Alanları",
            ls_travel: "Seyahat",
            ls_travel_desc: "Yeni kültürler keşfetmek ve ufukları genişletmek. Erasmus anılarından küresel maceralara.",
            ls_soc: "Psikoloji & Sosyoloji",
            ls_soc_desc: "Daha iyi bir lider olmak için insan davranışlarını ve sosyal dinamikleri anlamak.",
            ls_photo: "Fotoğrafçılık",
            ls_photo_desc: "Simetri ve endüstriyel güzelliğin anlarını yakalamak.",
            ls_photo: "Fotoğrafçılık",
            ls_photo_desc: "Simetri ve endüstriyel güzelliğin anlarını yakalamak.",
            footer_text: "Tutku ve hassasiyetle geleceği mühendislik ile tasarlıyorum.",

            // Experience Timeline
            // Experience Timeline
            exp_title: "Deneyimler",

            // 2025-2026: Erasmus 2
            exp_erasmus2_date: "Şubat 2025 – Şubat 2026",
            exp_erasmus2_title: "Erasmus Değişim Programı • Bialystok Teknoloji Üniversitesi",
            exp_erasmus2_desc: "Bialystok Teknoloji Üniversitesi'ne, plastik ekstrüzyon alanında uzmanlaşmak ve Prof. Marek Jałbrzykowski danışmanlığında tez çalışmalarımı yürütmek üzere, bilinçli ve teknik odaklı bir kararla geri döndüm.",

            // 2024: Mir Ar-Ge
            exp_mir_date: "Ağu 2024 - Eyl 2024",
            exp_mir_title: "Stajyer Öğrenci • Mir Ar-Ge",
            exp_mir_desc: "Mir Ar-Ge'de tamamladığım stajımda Ar-Ge metodolojilerine dair derinlemesine bilgi edindim, disiplinler arası sinerjiyi gözlemledim ve plastik ekstrüzyon teknolojilerinde pratik deneyim kazandım.",

            // 2023-2024: Finance Head
            exp_finance_date: "2023 - 2024",
            exp_finance_title: "Finans Departmanı Başkanı • PAÜ İnovasyon ve Gelişim Topluluğu",
            exp_finance_desc: "PAÜ İnovasyon ve Gelişim Topluluğu'nda finansal planlama ve kurumsal ilişkileri yöneterek gerçek bir girişimcilik ekosistemi simülasyonu deneyimledim.",

            // 2023-Devam: Erdem Model
            exp_erdem_date: "Eyl 2023 - Devam Ediyor",
            exp_erdem_title: "CAD Modelleme & CNC Programcısı • Erdem Model",
            exp_erdem_desc: "Erdem Model'de döküm kalıp üretimi için CAD tasarımları oluşturuyor ve CNC üretimi için G-kodlarını optimize ediyorum. İmalat sürecinde kalite kontrol ve hassasiyet takibi yapıyorum.",

            // 2023: Kerem Mold
            exp_kerem_date: "Tem 2023 - Eyl 2023",
            exp_kerem_title: "Stajyer Öğrenci • Kerem Kalıp & Otomasyon",
            exp_kerem_desc: "KEREM KALIP & OTOMASYON'da enjeksiyon kalıp imalatı, montaj, bakım ve kalite kontrol süreçlerinde aktif rol alarak üretim süreçlerini optimize ettim.",

            // 2023: AIESEC
            exp_aiesec_date: "Haz 2023 - Ara 2023",
            exp_aiesec_title: "Üye • AIESEC Türkiye",
            exp_aiesec_desc: "AIESEC bünyesinde aktif rol alarak global bir ağın parçası oldum. Yabancı dil ve insan ilişkilerini geliştirmek için harika bir fırsattı.",

            // 2022-2024: PAU Debate
            exp_debate_date: "Kas 2022 - Şub 2024",
            exp_debate_title: "Proje Ekibi Sorumlusu • PAÜ Münazara Topluluğu",
            exp_debate_desc: "PAÜ Münazara Topluluğu'nda proje lideri olarak etkinlikler planladım, ekip koordinasyonunu sağladım ve araştırma stratejileri üzerine atölyeler düzenledim.",

            // JS UI Strings
            view_details: "Detayları Gör →",
            read_article: "Yazıyı Oku &rarr;",
            loading_err: "İçerik yüklenemedi."
        }
    },

    // Global Cache for fetched JSONs
    dataCache: {
        projects: null,
        blog: null,
        lifestyle: null
    },

    // Event System for Language Change
    handlers: [],
    onLanguageChange: function(fn) {
        this.handlers.push(fn);
    },
    
    // Set Language Logic
    setLanguage: function(lang) {
        this.lang = lang;
        localStorage.setItem("ahmet_fe_lang", lang);

        // 1. Update UI Static Text
        this.updateStaticText();

        // 2. Update Toggle Buttons
        this.updateButtons();

        // 3. Trigger Subscribers (e.g., render functions)
        this.handlers.forEach(fn => fn(lang));
    },

    updateStaticText: function() {
        const translatableElements = document.querySelectorAll("[data-key]");
        translatableElements.forEach(el => {
            const key = el.getAttribute("data-key");
            if (this.translations[this.lang] && this.translations[this.lang][key]) {
                el.innerText = this.translations[this.lang][key];
            }
        });
    },

    updateButtons: function() {
        const langBtnEn = document.getElementById("btn-en");
        const langBtnTr = document.getElementById("btn-tr");
        
        if (this.lang === "en") {
            if (langBtnEn) langBtnEn.classList.add("active");
            if (langBtnTr) langBtnTr.classList.remove("active");
        } else {
            if (langBtnTr) langBtnTr.classList.add("active");
            if (langBtnEn) langBtnEn.classList.remove("active");
        }
    },

    // Helper: Get Translated Text
    t: function(key) {
        return this.translations[this.lang][key] || key;
    },

    // Helper: Fetch with Cache
    fetchData: function(key, url) {
        if (this.dataCache[key]) {
            return Promise.resolve(this.dataCache[key]);
        }
        return fetch(url + '?v=' + new Date().getTime())
            .then(res => {
                if(!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                this.dataCache[key] = data;
                return data;
            });
    }
};

/* ============================
   INITIALIZATION
   ============================ */
document.addEventListener("DOMContentLoaded", () => {
    // Initial Setup
    App.updateStaticText();
    App.updateButtons();
    
    // Highlight Active Link
    const pathName = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if(link.getAttribute('href') === pathName) {
            link.classList.add('active');
        }
    });

    // Language Buttons
    const langBtnEn = document.getElementById("btn-en");
    const langBtnTr = document.getElementById("btn-tr");
    if (langBtnEn) langBtnEn.addEventListener("click", () => App.setLanguage("en"));
    if (langBtnTr) langBtnTr.addEventListener("click", () => App.setLanguage("tr"));

    // Initialize Search
    searchSystem.init();

    // Initialize Timeline
    timelineSystem.init();
});

/* ============================
   NAVBAR SCROLL EFFECT
   ============================ */
const header = document.getElementById("main-header");
if(header){
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

console.log("System Status: Online. Ahmet Faruk Efe Portfolio Ready.");

/* ============================
   SEARCH SYSTEM LOGIC
   ============================ */
const searchSystem = {
    init: function () {
        this.injectSearchUI();
        // Use global App cache system
        this.loadData();
        this.addEventListeners();
    },

    loadData: function() {
        // Run quietly in background
        App.fetchData('projects', 'assets/data/projects.json').catch(e => console.log(e));
        App.fetchData('blog', 'assets/data/blog.json').catch(e => console.log(e));
    },

    injectSearchUI: function () {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && !document.querySelector('.search-trigger')) {
            const searchLi = document.createElement('li');
            searchLi.innerHTML = `
                <button class="search-trigger" aria-label="Search">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            `;
            navLinks.appendChild(searchLi);
        }

        if (!document.querySelector('.search-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'search-overlay';
            overlay.innerHTML = `
                <button class="search-close">&times;</button>
                <div class="search-container">
                    <input type="text" class="search-input" placeholder="Search..." autocomplete="off">
                    <div class="search-results"></div>
                </div>
            `;
            document.body.appendChild(overlay);
        }
    },

    search: function (query) {
        if (!query) return [];
        query = query.toLowerCase();

        let results = [];
        const currentLang = App.lang;

        // Use cached data directly
        const projects = App.dataCache.projects || [];
        const blogPosts = App.dataCache.blog || [];

        // Search Projects
        if (projects.length > 0) {
            const projResults = projects.filter(p => {
                let title = p.title;
                let category = p.category || "";
                
                if (p[currentLang]) {
                    title = p[currentLang].title;
                    if(p[currentLang].category) category = p[currentLang].category;
                }
                return title.toLowerCase().includes(query) || category.toLowerCase().includes(query);
            }).map(p => {
                let title = p.title;
                let category = p.category || "";
                if (p[currentLang]) {
                    title = p[currentLang].title;
                    if(p[currentLang].category) category = p[currentLang].category;
                }
                return {
                    id: p.id,
                    title: title,
                    desc: category,
                    image: p.image,
                    type: 'Project',
                    link: `article.html?type=project&id=${p.id}`
                };
            });
            results = [...results, ...projResults];
        }

        // Search Blog
        if (blogPosts.length > 0) {
            const blogResults = blogPosts.filter(b => {
                let title = b.title;
                if (b[currentLang]) title = b[currentLang].title;
                return title.toLowerCase().includes(query) || (b.tags && b.tags.some(t => t.toLowerCase().includes(query)));
            }).map(b => {
                let title = b.title;
                if (b[currentLang]) title = b[currentLang].title;
                return {
                    id: b.id,
                    title: title,
                    desc: b.date,
                    image: b.image,
                    type: 'Insight',
                    link: `article.html?type=blog&id=${b.id}`
                };
            });
            results = [...results, ...blogResults];
        }

        return results;
    },

    renderResults: function (results) {
        const container = document.querySelector('.search-results');
        container.innerHTML = '';
        if (results.length === 0) return;

        results.forEach(res => {
            const item = document.createElement('a');
            item.className = 'search-result-item';
            item.href = res.link;
            item.innerHTML = `
                <img src="${res.image}" alt="${res.title}" class="result-thumb" onerror="this.src='assets/images/proj_placeholder.jpg'">
                <div class="result-info">
                    <h4>${res.title} <span class="result-type">${res.type}</span></h4>
                    <p>${res.desc}</p>
                </div>
            `;
            container.appendChild(item);
        });
    },

    addEventListeners: function () {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.search-trigger')) {
                const overlay = document.querySelector('.search-overlay');
                overlay.classList.add('active');
                setTimeout(() => overlay.querySelector('.search-input').focus(), 100);
            }
            if (e.target.closest('.search-close') || e.target.classList.contains('search-overlay')) {
                document.querySelector('.search-overlay').classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelector('.search-overlay').classList.remove('active');
            }
        });

        // Event delegation for input
        document.body.addEventListener('keyup', (e) => {
            if (e.target.classList.contains('search-input')) {
                const query = e.target.value.trim();
                const results = this.search(query);
                this.renderResults(results);
            }
        });
    }
};

/* ============================
   TIMELINE ANIMATION SYSTEM
   ============================ */
const timelineSystem = {
    init: function() {
        const track = document.querySelector('.timeline-container');
        const progressLine = document.getElementById('timeline-progress-bar');
        const items = document.querySelectorAll('.timeline-item');
        
        if(!track || !progressLine) return; // Not on homepage

        // Function to update line height based on scroll
        const updateLine = () => {
            const rect = track.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Start filling when the top of container hits the middle of screen
            // or is visible. Let's make it fill as we scroll thru it.
            
            // Offset logic: Relative to the top of the viewport
            const startOffset = rect.top; 
            const totalHeight = rect.height;
            
            // Determine how much of the section has been scrolled past (with some offset for visibility)
            // Let's say line starts filling when container top is at 60% viewport height
            // We want it to be fully filled when the bottom of the container is visible?
            // Let's make it simpler: The line fills from top down as the user scrolls past the top of the container.
            
            // Calculate distance from the top of the viewport to the start of the timeline
            // If rect.top is 500px, it's below viewport top.
            // If rect.top is -100px, we have scrolled 100px past start.
            
            // We want the line to start growing when rect.top < windowHeight * 0.7
            
            const startTrigger = windowHeight * 0.75;
            let scrollProgress = startTrigger - startOffset;
            
            // Constrain
            if (scrollProgress < 0) scrollProgress = 0;
            if (scrollProgress > totalHeight) scrollProgress = totalHeight; // Cap at max height
            
            // Apply height
            progressLine.style.height = scrollProgress + 'px';
            
            // Reveal Items
            items.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                if(itemTop < windowHeight * 0.85) {
                    item.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', updateLine);
        window.addEventListener('resize', updateLine);
        // Initial call
        updateLine();
    }
};

/* ============================
   GOAL SECTION ANIMATION & PARALLAX
   ============================ */
const goalAnimation = {
    init: function() {
        // Observer for fade-in elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const title = entry.target.querySelector('.goal-title');
                    const desc = entry.target.querySelector('.goal-desc');
                    const visuals = entry.target.querySelector('.goal-visuals');
                    const contentBox = entry.target.querySelector('.goal-content-box');
                    
                    if(contentBox) contentBox.classList.add('visible-box');
                    if(visuals) visuals.classList.add('active');
                    
                    // We don't unobserve here to allow parallax calculation to run only when intersecting?
                    // Actually for scroll loop, we want it running.
                }
            });
        }, { threshold: 0.2 });

        const goalSection = document.querySelector('.goal-section');
        if (goalSection) {
            observer.observe(goalSection);
            
            // Scroll Parallax Logic
            window.addEventListener('scroll', () => {
                const rect = goalSection.getBoundingClientRect();
                const viewHeight = window.innerHeight;
                
                // If section is in view
                if (rect.top < viewHeight && rect.bottom > 0) {
                    // Calculate relative scroll progress (0 to 1)
                    // 0 when top of section enters bottom of viewport
                    // 1 when bottom of section leaves top of viewport
                    const progress = 1 - (rect.bottom / (viewHeight + rect.height));
                    
                    // Set CSS variables for styled transformations
                    goalSection.style.setProperty('--scroll-prog', progress);
                    
                    // Create a horizontal shift effect
                    const shiftX = (progress - 0.5) * 200; // -100px to +100px
                    goalSection.style.setProperty('--flow-shift', `${shiftX}px`);
                }
            });
        }
    }
};
goalAnimation.init();