document.addEventListener('DOMContentLoaded', () => {
    const init = () => {
        setupAOS();
        setupThemeToggle();
        setupMobileMenu();
        setupSmoothScrolling();
        setupActiveLinkOnScroll();
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

    init();
});