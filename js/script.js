document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.querySelector('.navbar');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('active');

            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (navbar.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            // Convert to JSON object (Manually for cleaner structure if needed, or straight from entries)
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                message: formData.get('message')
            };

            try {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                submitBtn.disabled = true;
                submitBtn.innerText = 'Sending...';

                const res = await fetch('/api/inquiries', { // Ensure API endpoint matches server.js
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await res.json();
                if (res.ok) {
                    alert('Request Sent Successfully! We will contact you shortly.');
                    contactForm.reset();
                } else {
                    alert('Error: ' + (result.error || 'Failed to send request'));
                }
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
            } catch (err) {
                console.error(err);
                alert('Connection Error. Please check your internet.');
            }
        });
    }

    checkAuth();
});

// Auth Functions
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));

    // Desktop Elements
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');

    // Mobile Elements
    const mobileLogin = document.getElementById('mobileLogin');
    const mobileSignup = document.getElementById('mobileSignup');
    const mobileProfile = document.getElementById('mobileProfile');
    const mobileLogout = document.getElementById('mobileLogout');
    const mobileUserName = document.getElementById('mobileUserName');

    if (user) {
        // Desktop
        if (authButtons) authButtons.style.display = 'none';
        if (userMenu) userMenu.style.display = 'block';
        if (userName) userName.innerText = user.name ? user.name.split(' ')[0] : 'User';

        // Mobile
        if (mobileLogin) mobileLogin.style.display = 'none';
        if (mobileSignup) mobileSignup.style.display = 'none';
        if (mobileProfile) {
            mobileProfile.style.display = 'block';
            if (mobileUserName) mobileUserName.innerText = user.name ? user.name.split(' ')[0] : 'User';
        }
        if (mobileLogout) mobileLogout.style.display = 'block';
    } else {
        // Desktop
        if (authButtons) authButtons.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';

        // Mobile
        if (mobileLogin) mobileLogin.style.display = 'block';
        if (mobileSignup) mobileSignup.style.display = 'block';
        if (mobileProfile) mobileProfile.style.display = 'none';
        if (mobileLogout) mobileLogout.style.display = 'none';
    }
}

function toggleUserDropdown() {
    const d = document.getElementById('userDropdown');
    if (d) {
        d.style.display = d.style.display === 'block' ? 'none' : 'block';
    }
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('adminLoggedIn');
    window.location.reload();
}

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        header.style.padding = '10px 0';
    } else {
        header.style.boxShadow = 'none';
        header.style.padding = '15px 0';
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const userMenu = document.getElementById('userMenu');
    const dropdown = document.getElementById('userDropdown');
    if (userMenu && dropdown && !userMenu.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

