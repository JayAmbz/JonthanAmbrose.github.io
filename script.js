// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    
    nav.classList.toggle('nav-active');
    
    
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});


navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Form validation for contact page
if (document.getElementById('message-form')) {
    const form = document.getElementById('message-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        
        const name = document.getElementById('contact-name');
        if (name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            hideError(name);
        }
        
        
        const email = document.getElementById('contact-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            hideError(email);
        }
        
        
        const message = document.getElementById('contact-message');
        if (message.value.trim() === '') {
            showError(message, 'Message is required');
            isValid = false;
        } else {
            hideError(message);
        }
        
        if (isValid) {
            // Form is valid, submit it
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        }
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    input.style.borderColor = 'var(--danger-color)';
}

function hideError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
    input.style.borderColor = '#ddd';
}