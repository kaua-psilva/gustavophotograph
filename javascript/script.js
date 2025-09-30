document.addEventListener('DOMContentLoaded', () => {
    const init = () => {
        setupAOS();
        setupThemeToggle();
        setupMobileMenu();
        setupSmoothScrolling();
        setupActiveLinkOnScroll();
        setupContactForm();
        setupLightbox();
    };

    const setupAOS = () => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });
    };

    const setupThemeToggle = () => {
        const themeCheckbox = document.getElementById('theme-toggle-checkbox');
        const body = document.body;
        if (!themeCheckbox) return;

        const applyTheme = () => {
            const savedTheme = localStorage.getItem('theme') || 'light';
            body.classList.toggle('dark-theme', savedTheme === 'dark');
            themeCheckbox.checked = (savedTheme === 'dark');
        };

        themeCheckbox.addEventListener('change', () => {
            const isDark = themeCheckbox.checked;
            body.classList.toggle('dark-theme', isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        applyTheme();
    };

    const setupMobileMenu = () => {
        const menuToggle = document.getElementById('menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        if (!menuToggle || !mobileNav) return;

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    };
    const setupSmoothScrolling = () => {
        const allNavLinks = document.querySelectorAll('.nav-link, .logo, .cta-button, .read-more-button');
        const headerHeight = document.querySelector('.main-header').offsetHeight;

        allNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        document.getElementById('menu-toggle')?.classList.remove('active');
                        document.getElementById('mobile-nav')?.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    }
                }
            });
        });
    };

    const setupActiveLinkOnScroll = () => {
        const sections = document.querySelectorAll('section[id]');
        const desktopNavLinks = document.querySelectorAll('.main-nav .nav-link');
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        if (sections.length === 0 || desktopNavLinks.length === 0) return;

        const observerOptions = {
            rootMargin: `-${headerHeight}px 0px -50% 0px`
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const navLink = document.querySelector(`.main-nav a[href="#${id}"]`);
                if (entry.isIntersecting && navLink) {
                    desktopNavLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    };
    const setupContactForm = () => {
        const form = document.getElementById('contact-form');
        const feedbackEl = document.getElementById('form-feedback');
        if (!form || !feedbackEl) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');

            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            feedbackEl.classList.remove('show', 'success');

            setTimeout(() => {
                feedbackEl.textContent = 'Obrigado! Sua mensagem foi enviada com sucesso.';
                feedbackEl.classList.add('show', 'success');
                
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Mensagem';

                setTimeout(() => {
                    feedbackEl.classList.remove('show');
                }, 5000);

            }, 1500);
        });
    };
    const setupLightbox = () => {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');

        if (!lightbox) return;

        let currentIndex = 0;
        const images = Array.from(portfolioItems).map(item => item.href);

        const showImage = (index) => {
            lightboxImg.src = images[index];
            currentIndex = index;
        };

        portfolioItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                lightbox.classList.add('active');
                showImage(index);
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
        };

        const showNext = () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        };

        const showPrev = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        lightboxNext.addEventListener('click', showNext);
        lightboxPrev.addEventListener('click', showPrev);

        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'ArrowRight') showNext();
                if (e.key === 'ArrowLeft') showPrev();
                if (e.key === 'Escape') closeLightbox();
            }
        });
    };

    init();
});