/**
 * FURSAN - Defense and Security
 * Animations JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initScrollAnimations();
  initHeroAnimations();
  initHoverAnimations();
  initLottieAnimations();
  initParallaxEffects();
});

/**
 * Scroll animations using Intersection Observer
 */
function initScrollAnimations() {
  // Select all elements with animation classes
  const animatedElements = document.querySelectorAll('.animate-element, .aos-animate');
  
  // Configure the Intersection Observer
  const observerOptions = {
    root: null, // Use viewport as root
    rootMargin: '0px 0px -100px 0px', // Trigger slightly before element is in view
    threshold: 0.1 // Trigger when 10% of element is visible
  };
  
  // Create observer
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to trigger CSS animation
        entry.target.classList.add('visible');
        
        // If element has AOS animation classes, handle them
        if (entry.target.classList.contains('aos-animate')) {
          entry.target.classList.add('aos-animate-visible');
          
          // Add specific animation class based on data attribute
          const animationType = entry.target.getAttribute('data-aos');
          if (animationType) {
            entry.target.classList.add(`aos-${animationType}-visible`);
          }
        }
        
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Start observing all animated elements
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Hero section animations
 */
function initHeroAnimations() {
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroDescription = document.querySelector('.hero-description');
  const ctaButtons = document.querySelector('.cta-buttons');
  
  // Add animation classes if elements exist
  if (heroTitle) {
    heroTitle.classList.add('slide-in-left');
  }
  
  if (heroSubtitle) {
    heroSubtitle.classList.add('slide-in-right');
    heroSubtitle.style.animationDelay = '0.3s';
  }
  
  if (heroDescription) {
    heroDescription.classList.add('fade-in');
    heroDescription.style.animationDelay = '0.6s';
  }
  
  if (ctaButtons) {
    ctaButtons.classList.add('slide-up');
    ctaButtons.style.animationDelay = '0.9s';
  }
}

/**
 * Hover animations for interactive elements
 */
function initHoverAnimations() {
  // Value cards hover effect
  const valueItems = document.querySelectorAll('.value-item');
  valueItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.classList.add('hover-active');
    });
    
    item.addEventListener('mouseleave', function() {
      this.classList.remove('hover-active');
    });
  });
  
  // Objective items hover effect
  const objectiveItems = document.querySelectorAll('.objective-item');
  objectiveItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.classList.add('hover-active');
      
      // Animate the objective number
      const number = this.querySelector('.objective-number');
      if (number) {
        number.classList.add('pulse');
      }
    });
    
    item.addEventListener('mouseleave', function() {
      this.classList.remove('hover-active');
      
      // Remove animation from number
      const number = this.querySelector('.objective-number');
      if (number) {
        number.classList.remove('pulse');
      }
    });
  });
  
  // Mission cards hover effect
  const missionCards = document.querySelectorAll('.mission-card');
  missionCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('hover-lift');
      
      // Animate the icon
      const icon = this.querySelector('.icon');
      if (icon) {
        icon.classList.add('rotate-in');
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('hover-lift');
      
      // Remove animation from icon
      const icon = this.querySelector('.icon');
      if (icon) {
        icon.classList.remove('rotate-in');
      }
    });
  });
}

/**
 * Lottie animations for more dynamic elements
 * Note: Requires Lottie library to be included in the project
 */
function initLottieAnimations() {
  // Check if Lottie library is available
  if (typeof lottie !== 'undefined') {
    // Load animations if there are containers for them
    const animationContainers = document.querySelectorAll('.lottie-animation');
    
    animationContainers.forEach(container => {
      const animationPath = container.getAttribute('data-animation-path');
      
      if (animationPath) {
        lottie.loadAnimation({
          container: container,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: animationPath
        });
      }
    });
  }
}

/**
 * Parallax scrolling effects
 */
function initParallaxEffects() {
  // Hero section parallax
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      
      // Move the background at a different rate than the scroll
      heroSection.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
    });
  }
  
  // Section backgrounds parallax
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  
  parallaxElements.forEach(element => {
    const speed = element.getAttribute('data-parallax-speed') || 0.2;
    
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const elementOffset = element.offsetTop;
      const distance = scrollPosition - elementOffset;
      
      // Only apply parallax if element is in view
      if (distance > -window.innerHeight && distance < window.innerHeight) {
        element.style.backgroundPositionY = `${distance * speed}px`;
      }
    });
  });
  
  // Floating elements parallax
  const floatingElements = document.querySelectorAll('.float-element');
  
  floatingElements.forEach(element => {
    const speed = element.getAttribute('data-float-speed') || 0.05;
    const direction = element.getAttribute('data-float-direction') || '1';
    
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const elementOffset = element.offsetTop;
      const distance = scrollPosition - elementOffset;
      
      // Only apply float if element is in view
      if (distance > -window.innerHeight && distance < window.innerHeight) {
        const translateY = distance * speed * parseInt(direction);
        element.style.transform = `translateY(${translateY}px)`;
      }
    });
  });
}

/**
 * Typed.js animation for dynamic text
 * Note: Requires Typed.js library to be included in the project
 */
function initTypedAnimations() {
  // Check if Typed library is available
  if (typeof Typed !== 'undefined') {
    const typedElements = document.querySelectorAll('.typed-text');
    
    typedElements.forEach(element => {
      const strings = JSON.parse(element.getAttribute('data-typed-strings'));
      
      if (strings && strings.length) {
        new Typed(element, {
          strings: strings,
          typeSpeed: 50,
          backSpeed: 30,
          loop: true,
          backDelay: 2000
        });
      }
    });
  }
}

/**
 * CountUp animations for statistics
 * Note: Auto-initializes on scroll
 */
function initCounterAnimations() {
  const counterElements = document.querySelectorAll('.counter');
  
  // Configure the Intersection Observer
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count'));
        const duration = parseInt(target.getAttribute('data-duration') || 2000);
        
        let current = 0;
        const increment = countTo / (duration / 16); // 60fps
        const timer = setInterval(() => {
          current += increment;
          target.textContent = Math.floor(current);
          
          if (current >= countTo) {
            target.textContent = countTo;
            clearInterval(timer);
          }
        }, 16);
        
        observer.unobserve(target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Start observing counter elements
  counterElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Initialize animations on page load
 */
window.addEventListener('load', function() {
  // Initialize Typed animations if needed
  if (document.querySelector('.typed-text')) {
    initTypedAnimations();
  }
  
  // Initialize counter animations if needed
  if (document.querySelector('.counter')) {
    initCounterAnimations();
  }
  
  // Add loaded class to body to trigger initial animations
  document.body.classList.add('loaded');
  
  // Hide loading overlay
  setTimeout(() => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.opacity = '0';
      setTimeout(() => {
        loadingOverlay.style.display = 'none';
      }, 500);
    }
  }, 500);
});
