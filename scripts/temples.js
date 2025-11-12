// temples.js - Hamburger menu toggle and footer dynamic content

// Hamburger menu toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', function () {
    nav.classList.toggle('show');

    // Change button symbol when open/closed
    if (nav.classList.contains('show')) {
        menuToggle.textContent = '✕';
        menuToggle.setAttribute('aria-label', 'Close navigation menu');
    } else {
        menuToggle.textContent = '☰';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    }
});

// Footer: Current year
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Footer: Last modified date
const lastModifiedP = document.getElementById('lastModified');
if (lastModifiedP) {
    lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
}
