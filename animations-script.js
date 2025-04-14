// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Handle navigation and scroll events
    handleNavigation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize mobile menu
    initMobileMenu();
});

// Initialize animations for elements that should animate on page load
function initAnimations() {
    // Animate header elements with sequential delays
    animateWithDelay('.profile-container', 'fade-in', 0);
    animateWithDelay('.greeting', 'slide-bottom', 100);
    animateWithDelay('.name', 'slide-bottom', 200);
    animateWithDelay('.title', 'slide-bottom', 300);
    animateWithDelay('.description', 'slide-bottom', 400);
    animateWithDelay('.cta-buttons', 'slide-bottom', 500);
    animateWithDelay('.social-links', 'fade-in', 600);
    
    // Animate floating tech icons
    const techIcons = document.querySelectorAll('.floating-icons .tech-icon');
    techIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Start progress bar animations for visible skill cards
    const visibleSkillCards = document.querySelectorAll('.skill-card:not(.hidden)');
    visibleSkillCards.forEach(card => {
        card.classList.add('animate');
    });
}

// Apply animations with delay
function animateWithDelay(selector, animationClass, delay) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.classList.add('animate', animationClass);
        element.style.animationDelay = `${delay}ms`;
    });
}

// Handle navigation and scroll events
function handleNavigation() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            document.querySelector('.mobile-nav').classList.remove('open');
            document.querySelector('.overlay').classList.remove('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Add page transition effect
            const pageTransition = document.createElement('div');
            pageTransition.classList.add('page-transition');
            document.body.appendChild(pageTransition);
            
            // Trigger transition
            setTimeout(() => {
                pageTransition.classList.add('active');
            }, 10);
            
            // After transition, scroll to section and remove transition element
            setTimeout(() => {
                // Scroll to target section
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Remove active class from all links and add to clicked link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                // Remove transition element
                setTimeout(() => {
                    pageTransition.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(pageTransition);
                    }, 500);
                }, 500);
            }, 500);
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('main[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Get current scroll position
    const scrollPosition = window.scrollY + 100; // Adding offset for navbar
    
    // Find the current section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to corresponding nav link
            document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
        }
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    // Get all elements to animate on scroll
    const elementsToAnimate = document.querySelectorAll('.about-container > div, .service-card, .process-step, .project-card, .timeline-item, .certificate-card, .contact-card');
    
    // Add hidden class to all elements
    elementsToAnimate.forEach(element => {
        element.classList.add('hidden');
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If the element is a skill card, animate the progress bar
                if (entry.target.classList.contains('skill-card')) {
                    entry.target.classList.add('animate');
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all elements
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Add scroll to top button
    addScrollToTopButton();
}

// Add scroll to top button
function addScrollToTopButton() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.classList.add('scroll-top');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    });
    
    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize mobile menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const overlay = document.querySelector('.overlay');
    
    // Open mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('open');
        overlay.classList.add('active');
    });
    
    // Close mobile menu
    mobileNavClose.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        overlay.classList.remove('active');
    });
    
    // Close mobile menu when clicking on overlay
    overlay.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        overlay.classList.remove('active');
    });
    
    // Add animations to mobile nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach((link, index) => {
        link.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Animate typing effect for project descriptions
function initTypingAnimations() {
    const projectDescriptions = document.querySelectorAll('.project-description');
    
    projectDescriptions.forEach(description => {
        const text = description.textContent;
        description.textContent = '';
        description.dataset.fullText = text;
        
        // Add typing class
        description.classList.add('typing');
    });
}

// Type animation when project card is in view
function typeText(element) {
    const fullText = element.dataset.fullText;
    const typingSpeed = 30; // ms per character
    let i = 0;
    
    const typingInterval = setInterval(() => {
        if (i < fullText.length) {
            element.textContent += fullText.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            element.classList.remove('typing');
        }
    }, typingSpeed);
}

// Add particle/confetti effect to the CTA section
function addParticleEffect() {
    const ctaSection = document.querySelector('.cta-section');
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-canvas');
    ctaSection.appendChild(canvas);
    
    // Initialize particles (simplified version)
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Resize canvas to fit section
    function resizeCanvas() {
        canvas.width = ctaSection.offsetWidth;
        canvas.height = ctaSection.offsetHeight;
    }
    
    // Create particles
    function createParticles() {
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
                speed: Math.random() * 2 + 0.5,
                direction: Math.random() * Math.PI * 2
            });
        }
    }
    
    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Update position
            particle.x += Math.cos(particle.direction) * particle.speed;
            particle.y += Math.sin(particle.direction) * particle.speed;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.direction = Math.PI - particle.direction;
            }
            
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.direction = -particle.direction;
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.closePath();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Initialize particles
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createParticles();
    animateParticles();
}

// Call additional animation functions when needed
window.addEventListener('load', function() {
    // Add particle effect to CTA section (optional, comment out if not needed)
    // addParticleEffect();
    
    // Initialize typing animations for project descriptions (optional)
    // initTypingAnimations();
});

// Add some CSS style for the scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease, transform 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .scroll-top:hover {
        transform: translateY(-5px);
    }
    
    /* Mobile Navigation Animations */
    .mobile-nav {
        transform: translateX(100%);
        transition: transform 0.4s ease;
    }
    
    .mobile-nav.open {
        transform: translateX(0);
    }
    
    .mobile-nav-link {
        opacity: 0;
        transform: translateX(20px);
        transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
    }
    
    .mobile-nav.open .mobile-nav-link {
        opacity: 1;
        transform: translateX(0);
    }
    
    .overlay {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s ease;
    }
    
    .overlay.active {
        opacity: 1;
        pointer-events: auto;
    }
    
    /* Typing animation for project descriptions */
    .typing {
        border-right: 2px solid var(--primary);
        white-space: nowrap;
        overflow: hidden;
        animation: blink-caret 0.75s step-end infinite;
    }
    
    @keyframes blink-caret {
        from, to { border-color: transparent; }
        50% { border-color: var(--primary); }
    }
    
    /* Particles canvas */
    .particles-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    }
`;
document.head.appendChild(style);