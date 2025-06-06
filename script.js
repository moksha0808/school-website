// script.js - Café Aroma Landing Page

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');

    if (!name || !email || !message) {
        formMessage.style.color = '#d32f2f';
        formMessage.textContent = 'Please fill in all fields.';
        return;
    }

    // Simulate form submission
    formMessage.style.color = '#388e3c';
    formMessage.textContent = 'Thank you for contacting us, ' + name + '! We will get back to you soon.';
    document.getElementById('contactForm').reset();

    setTimeout(() => {
        formMessage.textContent = '';
    }, 4000);
});
