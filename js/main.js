/*
* FURSAN Defense and Security - JavaScript
* Author: Claude
* Version: 1.0
*/

// DOM Elements
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopButton = document.getElementById('backToTop');
const languageButtons = document.querySelectorAll('.language-selector button');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Language Selector
languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        languageButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // This would typically trigger a language change function
        // For demo purposes, we're just toggling the active class
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Highlight active nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Here you would typically send the form data to a server
        // For demo purposes, we'll just log the data and show a success message
        console.log('Form submitted:', { name, email, subject, message });

        // Display success message
        alert('Thank you for your message. We will get back to you soon!');

        // Reset form
        contactForm.reset();
    });
}

// Add fade-in animation to elements when they come into view
document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate
    const animElements = [
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.value-card'),
        ...document.querySelectorAll('.objective-item'),
        ...document.querySelectorAll('.commitment-item'),
        ...document.querySelectorAll('.activity-card')
    ];

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observe each element
    animElements.forEach(element => {
        // Add initial state (hidden)
        element.style.opacity = '0';
        observer.observe(element);
    });
});

// Image placeholder function for demonstration
// This would be replaced with actual image loading logic in production
function loadPlaceholderImages() {
    const imagePlaceholders = document.querySelectorAll('img[data-src]');

    imagePlaceholders.forEach(img => {
        // Set a timeout to simulate image loading
        setTimeout(() => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        }, 500);
    });
}

// Call the placeholder image function after DOM is loaded
document.addEventListener('DOMContentLoaded', loadPlaceholderImages);