// Main JavaScript for the Church Website
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleIcon(newTheme);
        });
    }

    function updateToggleIcon(theme) {
        if (!icon) return;
        if (theme === 'dark') {
            icon.classList.replace('bi-moon-stars', 'bi-sun');
        } else {
            icon.classList.replace('bi-sun', 'bi-moon-stars');
        }
    }

    // Loading Screen Handler
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Ensure it stays for 2.5 seconds
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            document.body.style.overflow = 'auto'; 
        }, 2500);
    }

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Gallery Auto-Slide and Lightbox
    const wrapper = document.getElementById('galleryWrapper');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImage');
    const closeModal = document.querySelector('.close-modal');

    if (wrapper) {
        // Auto-Slide Logic
        let slideInterval = setInterval(() => {
            if (wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 10) {
                wrapper.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                wrapper.scrollBy({ left: 320, behavior: 'smooth' });
            }
        }, 1500);

        // Pause auto-slide on hover
        wrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
        wrapper.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                if (wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 10) {
                    wrapper.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    wrapper.scrollBy({ left: 320, behavior: 'smooth' });
                }
            }, 1500);
        });

        // Navigation Buttons
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                wrapper.scrollBy({ left: 320, behavior: 'smooth' });
            });
            prevBtn.addEventListener('click', () => {
                wrapper.scrollBy({ left: -320, behavior: 'smooth' });
            });
        }

        // Lightbox Logic
        const slides = document.querySelectorAll('.gallery-slide img');
        slides.forEach(img => {
            img.addEventListener('click', () => {
                modal.style.display = "flex";
                modalImg.src = img.src;
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = "none";
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        }

        // Close modal when clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = 'auto';
            }
        });
    }
});
