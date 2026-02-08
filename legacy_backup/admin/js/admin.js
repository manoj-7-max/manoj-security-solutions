// Role Based Access Control & Auth Check
document.addEventListener('DOMContentLoaded', function () {
    const userStr = localStorage.getItem('user');
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');

    if (!userStr && !adminLoggedIn) {
        window.location.href = '../login.html';
        return;
    }

    const user = userStr ? JSON.parse(userStr) : { role: 'admin' }; // Fallback for old admin login

    // Update User Name in Dashboard
    const userNameEl = document.querySelector('.user-name');
    const userRoleEl = document.querySelector('.user-role');
    if (userNameEl) userNameEl.innerText = user.name || 'Administrator';
    if (userRoleEl) userRoleEl.innerText = (user.role || 'Super Admin').toUpperCase();

    // Show Admin Only Links
    if (user.role === 'admin') {
        document.querySelectorAll('.admin-only').forEach(el => {
            if (el.tagName === 'LI') el.style.display = 'block'; // Sidebar items
            else el.style.display = 'inline-block'; // Buttons etc
        });
    } else {
        // Hide Admin Sections for Staff
        document.querySelectorAll('.admin-only').forEach(el => el.remove());
    }
});

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

function logout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function (event) {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');

    if (window.innerWidth <= 768) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target) && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
});
