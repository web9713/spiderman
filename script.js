document.addEventListener('DOMContentLoaded', () => {

    /* --- CUSTOM DESKTOP CURSOR --- */
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (window.innerWidth >= 1024) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
            
            cursorOutline.animate({
                transform: `translate(${posX}px, ${posY}px)`
            }, { duration: 400, fill: 'forwards' });
        });

        const interactiveElements = document.querySelectorAll('a, button, .power-card, .suit-btn, .villain-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'var(--text-main)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'rgba(230, 36, 41, 0.5)';
            });
        });
    } else {
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    }

    /* --- HEADER SCROLL EFFECT --- */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --- MOBILE MENU TOGGLE --- */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    /* --- SUIT SELECTOR LOGIC --- */
    const suitBtns = document.querySelectorAll('.suit-btn');
    const activeSuitImg = document.getElementById('activeSuitImg');
    const activeSuitName = document.getElementById('activeSuitName');
    const activeSuitDesc = document.getElementById('activeSuitDesc');
    const specMaterial = document.getElementById('specMaterial');
    const specTech = document.getElementById('specTech');

    suitBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            suitBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const name = btn.getAttribute('data-name');
            const desc = btn.getAttribute('data-desc');
            const material = btn.getAttribute('data-material');
            const tech = btn.getAttribute('data-tech');
            const imgSrc = btn.getAttribute('data-img');

            activeSuitImg.style.opacity = '0';
            setTimeout(() => {
                activeSuitImg.src = imgSrc;
                activeSuitImg.style.opacity = '1';
            }, 200);

            activeSuitName.textContent = name;
            activeSuitDesc.textContent = desc;
            specMaterial.textContent = material;
            specTech.textContent = tech;
        });
    });

    /* --- GSAP ANIMATIONS --- */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Parallax Fade
        gsap.to('.hero-content', {
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 120,
            opacity: 0.2
        });

        // Power Cards Stagger Reveal
        gsap.from('.power-card', {
            scrollTrigger: {
                trigger: '.powers-section',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });

        // City Parallax Depth
        gsap.to('.bg-buildings', {
            scrollTrigger: {
                trigger: '.city-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: -60
        });
    }

});
                                            
