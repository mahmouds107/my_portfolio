document.addEventListener('DOMContentLoaded', () => {
    
    // --- Terminal Typing Animation ---
    const terminalText = document.getElementById('terminal-text');
    
    // Connect to HubL module data
    const phrases = window.securityPhrases || [
        "Securing Digital Assets...",
        "Hunting Threats...",
        "Defending Infrastructure...",
        "Analyzing Vulnerabilities...",
        "Incident Response Active...",
        "SIEM Monitoring..."
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        if (!terminalText) return;
        
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            terminalText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            terminalText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }
    
    if (terminalText) {
        typeText();
    }

    // --- Smooth Scroll for Navigation ---
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Active Navigation on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '-100px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all links
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
                
                // Add visible class for animation
                entry.target.classList.add('section-visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });

    // --- Download CV Button Handler ---
    const downloadButtons = document.querySelectorAll('[data-cv-download]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const cvUrl = button.getAttribute('data-cv-url');
            if (cvUrl) {
                const link = document.createElement('a');
                link.href = cvUrl;
                link.download = 'Mahmoud_Saad_CV.pdf';
                link.click();
            }
        });
    });

    // --- Stats Counter Animation ---
    const statsElements = document.querySelectorAll('[data-count]');
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                countUp(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    statsElements.forEach(stat => statsObserver.observe(stat));

    // --- Form Handling (Contact Form) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            const successMessage = document.getElementById('form-success');
            if (successMessage) {
                successMessage.classList.remove('hidden');
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);
            }
            
            // Reset form
            contactForm.reset();
        });
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuIconOpen.classList.toggle('hidden');
            menuIconClose.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
            });
        });
    }

    console.log('🔒 Mahmoud Saad Portfolio - Security Scripts Loaded');
});

