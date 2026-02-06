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

    checkAuth();
});

// Auth Functions
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');

    if (!authButtons || !userMenu) return;

    if (user) {
        authButtons.style.display = 'none';
        userMenu.style.display = 'block';
        if (userName) userName.innerText = user.name ? user.name.split(' ')[0] : 'User';
    } else {
        authButtons.style.display = 'block';
        userMenu.style.display = 'none';
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

