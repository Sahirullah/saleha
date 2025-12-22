/* ===================================
   MODERN PORTFOLIO JAVASCRIPT
   Author: Sahirullah
   Email: sahirullah313@gmail.com
=================================== */

// ===================================
// PAGE LOADER
// ===================================
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    
    // Hide loader after 2 seconds with smooth animation
    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Remove loader from DOM after animation completes
        setTimeout(() => {
            loader.remove();
        }, 800);
    }, 2000);
});

// ===================================
// CUSTOM CURSOR
// ===================================
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

// Update cursor position on mouse move
window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    // Update cursor dot position
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    // Update cursor outline with smooth animation
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
    
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// ===================================
// NAVIGATION
// ===================================
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// SKILLS ANIMATION
// ===================================
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.about');

// Animate skill bars when section comes into view
const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

// Intersection Observer for skills animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ===================================
// PARALLAX EFFECTS
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('[class^="shape-"]');
    
    // Apply parallax effect to floating shapes
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===================================
// INTERACTIVE HOVER EFFECTS
// ===================================
document.querySelectorAll('.btn, .work-item, .contact-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'scale(1.5)';
        cursorOutline.style.borderColor = '#6366f1';
    });
    
    element.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'scale(1)';
        cursorOutline.style.borderColor = '#6366f1';
    });
});

// ===================================
// TEXT REVEAL ANIMATION
// ===================================
const revealText = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const textObserver = new IntersectionObserver(revealText, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements for text reveal
document.querySelectorAll('.section-title, .hero-title, .about-description').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    textObserver.observe(el);
});

// ===================================
// INITIALIZE ON DOM CONTENT LOADED
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
    
    // Add smooth page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
let ticking = false;

function updateScrollEffects() {
    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effects
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('[class^="shape-"]');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

// Optimized scroll listener
window.addEventListener('scroll', requestTick);

// ===================================
// PAGE TRANSITIONS
// ===================================
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});

// ===================================
// EASTER EGG - KONAMI CODE
// ===================================
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated - fun color change
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        konamiCode = [];
    }
});