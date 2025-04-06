document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const contactForm = document.getElementById('message-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.querySelector('#message-form button[type="submit"]');

    // Form Validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate form submission 
            setTimeout(() => {
                showSuccessMessage();
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }, 1500);
        }
    });

    // Real-time Validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);

    // Validation Functions
    function validateForm() {
        let isValid = true;
        
        isValid = validateName() && isValid;
        isValid = validateEmail() && isValid;
        isValid = validateMessage() && isValid;
        
        return isValid;
    }

    function validateName() {
        const name = nameInput.value.trim();
        const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
        
        if (!name) {
            setError(nameInput, 'Name is required');
            return false;
        } else if (!nameRegex.test(name)) {
            setError(nameInput, 'Please enter a valid name');
            return false;
        } else {
            setSuccess(nameInput);
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            setError(emailInput, 'Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            setError(emailInput, 'Please enter a valid email');
            return false;
        } else {
            setSuccess(emailInput);
            return true;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (!message) {
            setError(messageInput, 'Message is required');
            return false;
        } else if (message.length < 10) {
            setError(messageInput, 'Message must be at least 10 characters');
            return false;
        } else {
            setSuccess(messageInput);
            return true;
        }
    }

    // Helper Functions
    function setError(element, message) {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error-message');
        
        errorDisplay.textContent = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }

    function setSuccess(element) {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error-message');
        
        errorDisplay.textContent = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }

    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
            </svg>
            <p>Your message has been sent successfully!</p>
        `;
        
        contactForm.prepend(successMessage);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    //Google Maps //Decide if I want to remove later
    initMap();
});

function initMap() {
    
    const mapContainer = document.querySelector('.map-container');
    
    
    if (mapContainer) {
        mapContainer.addEventListener('click', function() {
            window.open('https://www.google.com/maps/place/61+Duke+St,+Port+of+Spain,+Trinidad+and+Tobago/@10.6548762,-61.5153889,17z/data=!3m1!4b1!4m6!3m5!1s0x8c360834e89f5a3b:0x1c93f9f6e0e1e8f5!8m2!3d10.6548762!4d-61.512814!16s%2Fg%2F11c2f4y_58', '_blank');
        });
    }
}