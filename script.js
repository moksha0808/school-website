// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Announcement ticker
function scrollTicker() {
    const ticker = document.getElementById('ticker');
    const firstItem = ticker.firstElementChild.cloneNode(true);
    ticker.appendChild(firstItem);
    ticker.style.transition = 'transform 0.5s ease-out';
    ticker.style.transform = 'translateX(-400px)';
    setTimeout(() => {
        ticker.style.transition = 'none';
        ticker.style.transform = 'translateX(0)';
        ticker.removeChild(ticker.firstElementChild);
    }, 500);
}
setInterval(scrollTicker, 3000);

// Gallery images for events
const eventImages = {
    'sports': [
        {url: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', caption: 'Sports Day 2023'},
        {url: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', caption: 'Basketball Competition'},
        {url: 'https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', caption: 'Athletics Championship'}
    ],
    'annual': [
        {url: 'https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', caption: 'Annual Day 2022'},
        {url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', caption: 'Prize Distribution'},
        {url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', caption: 'Cultural Performances'}
    ],
    'cultural': [
        {url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', caption: 'Dance Performance'},
        {url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', caption: 'Music Competition'},
        {url: 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', caption: 'Drama Performance'}
    ]
};

// Filter gallery by event type
function filterGallery(category) {
    const gallery = document.getElementById('event-gallery');
    gallery.innerHTML = '';
    // Update active tab
    document.querySelectorAll('[id$="-tab"]').forEach(tab => {
        if (tab.id === `${category}-tab`) {
            tab.classList.remove('bg-gray-200', 'text-gray-800');
            tab.classList.add('bg-blue-700', 'text-white');
        } else {
            tab.classList.add('bg-gray-200', 'text-gray-800');
            tab.classList.remove('bg-blue-700', 'text-white');
        }
    });
    // Show all if 'all' is selected
    if (category === 'all') {
        for (const event in eventImages) {
            eventImages[event].forEach(img => {
                addGalleryImage(img.url, img.caption);
            });
        }
        return;
    }
    // Show selected category
    eventImages[category].forEach(img => {
        addGalleryImage(img.url, img.caption);
    });
}
function addGalleryImage(url, caption) {
    const gallery = document.getElementById('event-gallery');
    const item = document.createElement('div');
    item.className = 'gallery-item cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all';
    item.innerHTML = `
        <img src="${url}" 
             alt="${caption}" 
             class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
             onclick="openModal('${url}', '${caption}')">
        <div class="p-2 bg-white">
            <p class="text-sm font-medium text-gray-800">${caption}</p>
        </div>
    `;
    gallery.appendChild(item);
}
// Initialize with all images
filterGallery('all');
// Modal for gallery images
function openModal(url, caption) {
    document.getElementById('modalImage').src = url;
    document.getElementById('modalCaption').textContent = caption;
    document.getElementById('imageModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    document.getElementById('imageModal').classList.add('hidden');
    document.body.style.overflow = '';
}
// Contact form validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    // Validate name
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (name.value.trim() === '') {
        nameError.classList.remove('hidden');
        valid = false;
    } else {
        nameError.classList.add('hidden');
    }
    // Validate email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        emailError.classList.remove('hidden');
        valid = false;
    } else {
        emailError.classList.add('hidden');
    }
    // Validate message
    const message = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    if (message.value.trim() === '') {
        messageError.classList.remove('hidden');
        valid = false;
    } else {
        messageError.classList.add('hidden');
    }
    if (valid) {
        // In a real app, you would send the form data to a server here
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    }
});
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});