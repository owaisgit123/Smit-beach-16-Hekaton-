   // Loading Screen Management
        window.addEventListener('load', function() {
            setTimeout(function() {
                const loadingScreen = document.getElementById('loadingScreen');
                const mainContent = document.getElementById('mainContent');
                
                loadingScreen.classList.add('hidden');
                mainContent.style.display = 'block';
                
                // Initialize scroll animations after loading
                initScrollAnimations();
            }, 10000); // 10 seconds
        });

        // Scroll Animation System
        function initScrollAnimations() {
            const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 100); // Stagger animations
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(element => {
                observer.observe(element);
            });
        }

        // Header Scroll Effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu functionality
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const nav = document.getElementById('nav');

        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });

        // Enhanced Button Interactions
        const orderBtn = document.querySelector('.order-btn');
        orderBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                alert('Order functionality would be implemented here!');
            }, 150);
        });

        const consultationBtn = document.querySelector('.consultation-btn');
        consultationBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                alert('Consultation request would be processed here!');
            }, 150);
        });

        // Enhanced Slider functionality
        const sliderWrapper = document.getElementById('sliderWrapper');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dots = document.querySelectorAll('.dot');
        
        let currentSlide = 0;
        const totalSlides = 10;

        function updateSlider() {
            const translateX = -currentSlide * 100;
            sliderWrapper.style.transform = `translateX(${translateX}%)`;
            
            // Update dots with animation
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
            
            // Add click animation
            nextBtn.style.transform = 'translateY(-50%) scale(0.9)';
            setTimeout(() => {
                nextBtn.style.transform = 'translateY(-50%) scale(1.2)';
                setTimeout(() => {
                    nextBtn.style.transform = 'translateY(-50%) scale(1)';
                }, 100);
            }, 100);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
            
            // Add click animation
            prevBtn.style.transform = 'translateY(-50%) scale(0.9)';
            setTimeout(() => {
                prevBtn.style.transform = 'translateY(-50%) scale(1.2)';
                setTimeout(() => {
                    prevBtn.style.transform = 'translateY(-50%) scale(1)';
                }, 100);
            }, 100);
        }

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateSlider();
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                // Add click animation to dot
                dot.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    dot.style.transform = 'scale(1.5)';
                    setTimeout(() => {
                        dot.style.transform = 'scale(1)';
                    }, 100);
                }, 100);
            });
        });

        // Auto-play slider with pause on interaction
        let autoPlayInterval = setInterval(nextSlide, 5000);
        let isUserInteracting = false;

        const sliderContainer = document.querySelector('.slider-container');
        
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
            isUserInteracting = true;
        });

        sliderContainer.addEventListener('mouseleave', () => {
            if (!isUserInteracting) return;
            autoPlayInterval = setInterval(nextSlide, 5000);
            isUserInteracting = false;
        });

        // Enhanced Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;

        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            clearInterval(autoPlayInterval);
        });

        sliderContainer.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent scrolling while swiping
        });

        sliderContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            handleSwipe();
            
            // Restart autoplay after swipe
            setTimeout(() => {
                autoPlayInterval = setInterval(nextSlide, 5000);
            }, 1000);
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diffX = startX - endX;
            const diffY = Math.abs(startY - endY);

            // Only trigger swipe if horizontal movement is greater than vertical
            if (Math.abs(diffX) > swipeThreshold && diffY < 100) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }

        // Enhanced Contact form functionality
        const sendBtn = document.getElementById('sendBtn');
        const contactName = document.getElementById('contactName');
        const contactPhone = document.getElementById('contactPhone');
        const contactQuestion = document.getElementById('contactQuestion');

        // Add input animations
        const formInputs = document.querySelectorAll('.form-input, .form-textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 0 20px rgba(74, 144, 226, 0.3)';
            });
            
            input.addEventListener('blur', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });

        sendBtn.addEventListener('click', function() {
            const name = contactName.value.trim();
            const phone = contactPhone.value.trim();
            const question = contactQuestion.value.trim();

            // Add button animation
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = '';
                
                if (!name || !phone || !question) {
                    // Shake animation for error
                    this.style.animation = 'wiggle 0.5s ease-in-out';
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 500);
                    alert('Please fill in all fields');
                    return;
                }

                // Success animation
                this.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                this.textContent = 'Sent!';
                
                setTimeout(() => {
                    this.style.background = '';
                    this.textContent = 'Send';
                    alert(`Thank you ${name}! Your message has been sent. We will contact you at ${phone}.`);
                    
                    // Clear form with animation
                    formInputs.forEach(input => {
                        input.style.opacity = '0.5';
                        setTimeout(() => {
                            input.value = '';
                            input.style.opacity = '1';
                        }, 200);
                    });
                }, 2000);
            }, 150);
        });

        // Enhanced Form validation with animations
        contactPhone.addEventListener('input', function() {
            // Remove non-numeric characters except + and spaces
            this.value = this.value.replace(/[^\d\+\s\-()]/g, '');
            
            // Add validation animation
            if (this.value.length > 0) {
                this.style.borderColor = '#4CAF50';
            } else {
                this.style.borderColor = '';
            }
        });

        // Smooth scrolling for navigation links
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

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.getElementById('hero');
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Add scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #4a90e2, #357abd);
            z-index: 10001;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });

        // Initialize everything after DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Add entrance animations to elements
            const elementsToAnimate = document.querySelectorAll('.wood-card, .advantage-item, .about-card');
            elementsToAnimate.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.6s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 11000 + (index * 100)); // Start after loading animation
            });
        });