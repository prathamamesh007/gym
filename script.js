// ============================================
// PREMIUM GYM & FITNESS WEBSITE - JAVASCRIPT
// Interactive Features & Animations
// ============================================

// ============================================
// NAVIGATION
// ============================================

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" (for modal triggers)
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// STATS COUNTER ANIMATION
// ============================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

let statsAnimated = false;

function checkStatsAnimation() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection || statsAnimated) return;
    
    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible) {
        statsAnimated = true;
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            animateCounter(stat, target);
        });
    }
}

window.addEventListener('scroll', checkStatsAnimation);
window.addEventListener('load', checkStatsAnimation);

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => observer.observe(element));

// ============================================
// MODAL FUNCTIONALITY
// ============================================

// Join Now Modal
const joinModal = document.getElementById('joinModal');
const trialModal = document.getElementById('trialModal');
const joinButtons = document.querySelectorAll('.btn-join');
const trialButtons = document.querySelectorAll('.btn-trial');
const closeJoin = document.getElementById('closeJoin');
const closeTrial = document.getElementById('closeTrial');

// Open Join Modal
joinButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        joinModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Open Trial Modal
trialButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        trialModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close Join Modal
closeJoin.addEventListener('click', () => {
    joinModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close Trial Modal
closeTrial.addEventListener('click', () => {
    trialModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
[joinModal, trialModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        joinModal.classList.remove('active');
        trialModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// FORM HANDLING
// ============================================

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    console.log('Contact Form Submitted:', data);
    
    // Show success message
    showNotification('Thank you for contacting us! We\'ll get back to you within 24 hours.', 'success');
    
    // Reset form
    contactForm.reset();
});

// Join Form
const joinForm = document.getElementById('joinForm');

joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('joinName').value;
    const email = document.getElementById('joinEmail').value;
    const phone = document.getElementById('joinPhone').value;
    const plan = document.getElementById('joinPlan').value;
    
    // Simulate form submission
    console.log('Join Form Submitted:', { name, email, phone, plan });
    
    // Show success message
    showNotification('Welcome to APEX Fitness! Our team will contact you shortly to complete your membership.', 'success');
    
    // Close modal and reset form
    joinModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    joinForm.reset();
});

// Trial Form
const trialForm = document.getElementById('trialForm');

trialForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('trialName').value;
    const email = document.getElementById('trialEmail').value;
    const phone = document.getElementById('trialPhone').value;
    const date = document.getElementById('trialDate').value;
    
    // Simulate form submission
    console.log('Trial Form Submitted:', { name, email, phone, date });
    
    // Show success message
    showNotification('Your free trial is booked! We\'ll send you a confirmation email shortly.', 'success');
    
    // Close modal and reset form
    trialModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    trialForm.reset();
});

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00ff41, #00cc34)' : 'linear-gradient(135deg, #ff0040, #cc0033)'};
        color: #0a0a0a;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        font-family: 'Inter', sans-serif;
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation keyframes if not already added
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ============================================
// GALLERY LIGHTBOX
// ============================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = createLightbox(img.src, img.alt);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
    });
});

function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(10px);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 12px;
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
        animation: zoomIn 0.3s ease;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 2rem;
        right: 2rem;
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.2);
        color: white;
        font-size: 3rem;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = '#ff0040';
        closeBtn.style.borderColor = '#ff0040';
        closeBtn.style.transform = 'rotate(90deg)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        closeBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        closeBtn.style.transform = 'rotate(0deg)';
    });
    
    // Add animation styles
    if (!document.getElementById('lightboxStyles')) {
        const style = document.createElement('style');
        style.id = 'lightboxStyles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes zoomIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    
    // Close lightbox
    const closeLightbox = () => {
        lightbox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            lightbox.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    };
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    closeBtn.addEventListener('click', closeLightbox);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
    
    return lightbox;
}

// ============================================
// FORM VALIDATION
// ============================================

// Add real-time validation to all forms
const forms = [contactForm, joinForm, trialForm];

forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateInput(input);
            }
        });
    });
});

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    } else if (input.type === 'tel') {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        isValid = phoneRegex.test(value) && value.length >= 10;
    } else {
        isValid = value.length > 0;
    }
    
    if (isValid) {
        input.style.borderColor = 'rgba(0, 255, 65, 0.5)';
        input.classList.remove('invalid');
    } else {
        input.style.borderColor = 'rgba(255, 0, 64, 0.5)';
        input.classList.add('invalid');
    }
    
    return isValid;
}

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// PRELOADER (Optional)
// ============================================

window.addEventListener('load', () => {
    // Trigger initial animations
    checkStatsAnimation();
    
    // Set minimum date for trial booking to today
    const trialDateInput = document.getElementById('trialDate');
    if (trialDateInput) {
        const today = new Date().toISOString().split('T')[0];
        trialDateInput.setAttribute('min', today);
    }
    
    console.log('APEX Fitness website loaded successfully! 💪');
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(updateActiveLink, 10));
window.addEventListener('scroll', debounce(checkStatsAnimation, 10));

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add keyboard navigation for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            const focusableElements = activeModal.querySelectorAll(
                'button, input, textarea, select, a[href]'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});

// ============================================
// CONSOLE BRANDING
// ============================================

console.log('%c🏋️ APEX FITNESS 🏋️', 'font-size: 24px; font-weight: bold; color: #00ff41; text-shadow: 2px 2px 4px rgba(0, 255, 65, 0.3);');
console.log('%cTransform Your Body, Transform Your Life', 'font-size: 14px; color: #b0b0b0;');
console.log('%cWebsite developed with premium design and performance in mind.', 'font-size: 12px; color: #707070;');
