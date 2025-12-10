// Main JavaScript for Math Mountain
// Handles navigation, footer dates, newsletter form, and animated counters

// ===== NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== FOOTER DATES =====
function updateFooterDates() {
    const yearElement = document.getElementById('currentyear');
    const modifiedElement = document.getElementById('lastModified');

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (modifiedElement) {
        modifiedElement.textContent = document.lastModified;
    }
}

// ===== ANIMATED COUNTERS =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // ~60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counters when in viewport
function initCounters() {
    const lessonsEl = document.getElementById('lessons-completed');
    const notesEl = document.getElementById('notes-taken');
    const booksEl = document.getElementById('books-reviewed');

    if (lessonsEl && notesEl && booksEl) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(lessonsEl, 2, 1000); // 2 lessons: notes + programming
                    animateCounter(notesEl, 1, 1000); // 1 note: Precalculus Lesson 1
                    animateCounter(booksEl, 8, 1500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(document.querySelector('.stats-section'));
    }
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const messageEl = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('newsletter-email').value;
            const interest = document.getElementById('interest').value;

            // Store in localStorage
            const subscription = {
                email,
                interest,
                timestamp: new Date().toISOString()
            };

            localStorage.setItem('mathMountainSubscription', JSON.stringify(subscription));

            // Show success message using template literal
            messageEl.textContent = `✅ Thanks for subscribing! We'll send ${interest === 'all' ? 'all updates' : interest + ' updates'} to ${email}.`;
            messageEl.className = 'form-message success';

            form.reset();

            // Clear message after 5 seconds
            setTimeout(() => {
                messageEl.textContent = '';
                messageEl.className = 'form-message';
            }, 5000);
        });
    }
}

// ===== CHECK EXISTING SUBSCRIPTION =====
function checkExistingSubscription() {
    const subscription = localStorage.getItem('mathMountainSubscription');
    if (subscription) {
        const data = JSON.parse(subscription);
        const messageEl = document.getElementById('form-message');
        if (messageEl) {
            messageEl.textContent = `You're already subscribed with ${data.email}`;
            messageEl.className = 'form-message info';
        }
    }
}

// ===== INITIALIZATION =====
function init() {
    updateFooterDates();
    initCounters();
    initNewsletterForm();
    checkExistingSubscription();
}

// Run on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
