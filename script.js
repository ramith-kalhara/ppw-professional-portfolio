// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const icon = mobileMenu.classList.contains('open') ? 'ph-x' : 'ph-list';
    menuBtn.innerHTML = `<i class="ph ${icon}"></i>`;
});

// Close mobile menu when clicking a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuBtn.innerHTML = '<i class="ph ph-list"></i>';
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 17, 21, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(15, 17, 21, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Active Link Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for Scroll Animations
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // If it contains a progress bar, we want it to animate
            const progress = entry.target.querySelector('.progress');
            if (progress) {
                // Remove and re-add the animation to ensure it plays
                progress.style.animation = 'none';
                progress.offsetHeight; /* trigger reflow */
                progress.style.animation = null; 
            }
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});
