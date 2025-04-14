
// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const overlay = document.querySelector('.overlay');
const mobileNavClose = document.querySelector('.mobile-nav-close');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.add('active');
    overlay.classList.add('active');
});

function closeMenu() {
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
}

mobileNavClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Smooth scrolling for About Me navigation link
document.addEventListener('DOMContentLoaded', function () {
    const aboutNavLink = document.querySelector('a[href="#about"]');

    if (aboutNavLink) {
        aboutNavLink.addEventListener('click', function (e) {
            e.preventDefault();

            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});


// Create random data dots
function createDataDots() {
    const dataBg = document.querySelector('.data-bg');
    const dotsCount = 25;

    for (let i = 0; i < dotsCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('data-dot');

        // Random position
        const top = Math.random() * 100;
        const left = Math.random() * 100;

        // Random size
        const size = Math.random() * 10 + 5;

        dot.style.top = `${top}%`;
        dot.style.left = `${left}%`;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;

        dataBg.appendChild(dot);
    }
}

window.addEventListener('DOMContentLoaded', createDataDots);


// projects page code

// Animate timeline items on scroll
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});

// ========= form submition====== //
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault(); 

    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch("https://formspree.io/f/mzzeooqz", {
      method: "POST",
      body: formData, // Send form data directly
      headers: { "Accept": "application/json" } 
    });

    if (response.ok) {
      alert("Message sent successfully!");
      form.reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
});
// ======*====== //
