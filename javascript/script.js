document.addEventListener('DOMContentLoaded', () => {
    
    const body = document.body;
    const initPreloader = () => {
        window.addEventListener('load', () => {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                preloader.classList.add('preloader-hidden');
                body.classList.remove('no-scroll');
                preloader.addEventListener('transitionend', () => preloader.remove());
            }
        });
    };
    const initMobileMenu = () => {
        const menuToggle = document.getElementById('menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        if (!menuToggle || !mobileNav) return;

        const toggleMenu = () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            body.classList.toggle('no-scroll');
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        };
        
        menuToggle.addEventListener('click', toggleMenu);

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    };

    //EFEITOS DE SCROLL
    const initScrollEffects = () => {
        const header = document.getElementById('main-header');
        const backToTopButton = document.getElementById('back-to-top');

        if (header) {
            const handleHeaderScroll = () => {
                header.classList.toggle('scrolled', window.scrollY > 50);
                if (backToTopButton) {
                    backToTopButton.classList.toggle('visible', window.scrollY > 300);
                }
            };
            window.addEventListener('scroll', handleHeaderScroll);
            handleHeaderScroll();
        }

        const sections = document.querySelectorAll('.section-observer');
        const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
        if (!sections.length || !navLinks.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (`#${entry.target.id}` === link.getAttribute('href')) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-30% 0px -70% 0px' });

        sections.forEach(section => observer.observe(section));
    };
    
    // SLIDER DE DEPOIMENTOS
    const initTestimonialSlider = () => {
        if (typeof Swiper !== 'undefined') {
            new Swiper('.testimonial-slider', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                autoplay: {
                    delay: 5000,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        }
    };
    // SELETOR DE TEMA
    const initThemeSwitcher = () => {
        const themeToggle = document.getElementById('theme-toggle-checkbox');
        if (!themeToggle) return;

        const applyTheme = (theme) => {
            body.classList.toggle('dark-theme', theme === 'dark');
            localStorage.setItem('theme', theme);
            themeToggle.checked = theme === 'dark';
        };

        themeToggle.addEventListener('change', () => {
            applyTheme(themeToggle.checked ? 'dark' : 'light');
        });
        
        const savedTheme = localStorage.getItem('theme') || 'dark';
        applyTheme(savedTheme);
    };

    // FORMULÁRIO DE CONTATO    
    const initContactForm = () => {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitButton = this.querySelector('button[type="submit"]');
            const feedbackEl = document.getElementById('form-feedback');
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            setTimeout(() => {
                feedbackEl.textContent = 'Mensagem enviada com sucesso!';
                feedbackEl.className = 'form-feedback show success';
                
                submitButton.textContent = 'Enviar Mensagem';
                submitButton.disabled = false;
                form.reset();

                setTimeout(() => {
                    feedbackEl.className = 'form-feedback';
                }, 5000);
            }, 1500);
        });
    };

    // FILTRO GALERIA
    const initGalleryFilter = () => {
        const filterContainer = document.querySelector('.gallery-filters');
        if (!filterContainer) return;

        const galleryItems = document.querySelectorAll('.full-portfolio-grid .portfolio-item');
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');

        filterContainer.addEventListener('click', (e) => {
            if (!e.target.matches('.filter-btn')) return;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    };

    AOS.init({ duration: 800, once: true, offset: 50 });
    initPreloader();
    initMobileMenu();
    initScrollEffects();
    initTestimonialSlider();
    initThemeSwitcher();
    initContactForm();
    initGalleryFilter();

});