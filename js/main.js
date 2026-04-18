/**
 * JHA Arabia Website - Main JavaScript
 * Responsive navigation and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Update aria-expanded attribute for accessibility
            const isExpanded = navMenu.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu after clicking a link (for single page navigation)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 767) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Initialize aria attributes
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    }
    
    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') {
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate header height for offset
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const offset = 20; // Additional offset
                
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
    
    // ============================================
    // LAZY LOADING FOR IMAGES
    // ============================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ============================================
    // FORM VALIDATION
    // ============================================
    
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            // Clear previous error messages
            this.querySelectorAll('.error-message').forEach(error => error.remove());
            this.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
            
            // Validate required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'This field is required';
                    errorMessage.style.color = 'var(--color-error)';
                    errorMessage.style.fontSize = '0.875rem';
                    errorMessage.style.marginTop = '4px';
                    
                    field.parentNode.appendChild(errorMessage);
                }
            });
            
            // Validate email format
            const emailField = this.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                    
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Please enter a valid email address';
                    errorMessage.style.color = 'var(--color-error)';
                    errorMessage.style.fontSize = '0.875rem';
                    errorMessage.style.marginTop = '4px';
                    
                    emailField.parentNode.appendChild(errorMessage);
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                
                // Focus on first error field
                const firstError = this.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                }
            }
        });
        
        // Real-time validation
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', function() {
                const errorMessage = this.parentNode.querySelector('.error-message');
                
                if (errorMessage) {
                    errorMessage.remove();
                    this.classList.remove('error');
                }
                
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                    
                    const newErrorMessage = document.createElement('div');
                    newErrorMessage.className = 'error-message';
                    newErrorMessage.textContent = 'This field is required';
                    newErrorMessage.style.color = 'var(--color-error)';
                    newErrorMessage.style.fontSize = '0.875rem';
                    newErrorMessage.style.marginTop = '4px';
                    
                    this.parentNode.appendChild(newErrorMessage);
                }
                
                if (this.type === 'email' && this.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value)) {
                        this.classList.add('error');
                        
                        const newErrorMessage = document.createElement('div');
                        newErrorMessage.className = 'error-message';
                        newErrorMessage.textContent = 'Please enter a valid email address';
                        newErrorMessage.style.color = 'var(--color-error)';
                        newErrorMessage.style.fontSize = '0.875rem';
                        newErrorMessage.style.marginTop = '4px';
                        
                        this.parentNode.appendChild(newErrorMessage);
                    }
                }
            });
        });
    }
    
    // ============================================
    // CURRENT YEAR IN FOOTER
    // ============================================
    
    const currentYearElement = document.querySelector('#current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // ============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    
    function highlightActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Remove active class from all links
            link.classList.remove('active');
            
            // Add active class to current page link
            if (currentPath.endsWith(linkPath) || 
                (currentPath.endsWith('/') && linkPath === 'index.html') ||
                (currentPath.endsWith('index.html') && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    highlightActiveNavLink();
    
    // ============================================
    // CARD HOVER EFFECTS (Desktop only)
    // ============================================
    
    if (window.innerWidth > 767) {
        const cards = document.querySelectorAll('.service-card-enhanced, .project-card-enhanced');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
        });
    }
    
    // ============================================
    // ACCESSIBILITY: SKIP TO CONTENT LINK
    // ============================================
    
    // Create skip to content link if it doesn't exist
    if (!document.querySelector('.skip-to-content')) {
        const skipLink = document.createElement('a');
        skipLink.className = 'skip-to-content';
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.position = 'absolute';
        skipLink.style.top = '-40px';
        skipLink.style.left = '0';
        skipLink.style.background = 'var(--color-accent-700)';
        skipLink.style.color = 'white';
        skipLink.style.padding = '8px 16px';
        skipLink.style.zIndex = '9999';
        skipLink.style.textDecoration = 'none';
        skipLink.style.borderRadius = '0 0 4px 0';
        skipLink.style.transition = 'top 0.3s ease';
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '0';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    // ============================================
    // PERFORMANCE: DEBOUNCE RESIZE EVENTS
    // ============================================
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Re-check active nav link on resize
            highlightActiveNavLink();
        }, 250);
    });
    
    console.log('JHA Arabia website JavaScript loaded successfully');
});