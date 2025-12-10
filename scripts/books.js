// Books Page JavaScript
// Handles book filtering with array methods and template literals

// Books data array
const books = [
    {
        id: 1,
        title: 'Precalculus',
        author: 'Robert Blitzer',
        category: 'pre-calc',
        rating: 5,
        price: '$180',
        review: 'Excellent explanations with tons of practice problems. Best for visual learners.',
        image: 'images/blitzer-precalc.jpg',
        recommended: true
    },
    {
        id: 2,
        title: 'Calculus: Early Transcendentals',
        author: 'James Stewart',
        category: 'calc',
        rating: 5,
        price: '$220',
        review: 'The gold standard for calculus. Clear examples and comprehensive coverage.',
        image: 'images/calc-earl-transcendentals.jpeg',
        recommended: true
    },
    {
        id: 3,
        title: 'Schaum\'s Outline of Calculus',
        author: 'Frank Ayres',
        category: 'calc',
        rating: 4,
        price: '$25',
        review: 'Great for practice problems but explanations are brief. Perfect supplement.',
        image: 'images/schaum-calc.jpg',
        recommended: false
    },
    {
        id: 4,
        title: 'College Algebra',
        author: 'Michael Sullivan',
        category: 'algebra',
        rating: 4,
        price: '$160',
        review: 'Solid algebra review. Good for rebuilding foundations.',
        image: 'images/sullivan-col-algebra.jpg',
        recommended: false
    },
    {
        id: 5,
        title: 'Pre-Calculus Workbook For Dummies',
        author: 'Michelle Rose Gilman',
        category: 'workbook',
        rating: 3,
        price: '$20',
        review: 'Simple practice problems. Too easy if you need serious challenge.',
        image: 'images/precalc-dummies.webp',
        recommended: false
    },
    {
        id: 6,
        title: 'Calculus Made Easy',
        author: 'Silvanus P. Thompson',
        category: 'calc',
        rating: 4,
        price: '$15',
        review: 'Classic intro to calculus concepts. Great for building intuition.',
        image: 'images/calc-made-easy.webp',
        recommended: true
    },
    {
        id: 7,
        title: 'Precalculus Essentials',
        author: 'Robert Blitzer',
        category: 'pre-calc',
        rating: 5,
        price: '$140',
        review: 'Streamlined version of the full Blitzer text. Less overwhelming.',
        image: 'images/precalc-essentials.webp',
        recommended: true
    },
    {
        id: 8,
        title: '1,001 Calculus Practice Problems',
        author: 'Patrick Jones',
        category: 'workbook',
        rating: 5,
        price: '$30',
        review: 'Exactly what it says. Tons of practice with detailed solutions.',
        image: 'images/calc-dummies-1001.jpeg',
        recommended: true
    }
];

// ===== DISPLAY FUNCTIONS =====
function createBookCard(book) {
    const stars = '⭐'.repeat(book.rating);
    const recommendBadge = book.recommended ? '<span class="recommend-badge">Recommended</span>' : '';

    // Template literal for card HTML
    return `
        <article class="book-card" data-category="${book.category}">
            <img src="${book.image}" alt="${book.title} cover" class="book-cover" loading="lazy">
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <div class="book-rating">${stars}</div>
                <p class="book-price">${book.price}</p>
                ${recommendBadge}
                <p class="book-review">${book.review}</p>
            </div>
        </article>
    `;
}

function displayBooks(filter = 'all') {
    const grid = document.getElementById('books-grid');
    const countEl = document.getElementById('book-count');
    if (!grid) return;

    let filtered = books;

    // Conditional branching - filter books using array method
    if (filter !== 'all') {
        filtered = books.filter(book => book.category === filter);
    }

    // Update count using template literal
    if (countEl) {
        countEl.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? 'book' : 'books'}`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<p class="no-results">No books found in this category.</p>`;
        return;
    }

    // Use array map method with template literals
    grid.innerHTML = filtered.map(book => createBookCard(book)).join('');
}

// ===== FILTER HANDLING =====
function initFilter() {
    const filterSelect = document.getElementById('book-filter');
    if (filterSelect) {
        // Event listener for filter changes
        filterSelect.addEventListener('change', (e) => {
            const selectedCategory = e.target.value;
            displayBooks(selectedCategory);

            // Save filter preference to localStorage
            localStorage.setItem('mathMountainBookFilter', selectedCategory);
        });

        // Load saved filter preference
        const savedFilter = localStorage.getItem('mathMountainBookFilter');
        if (savedFilter) {
            filterSelect.value = savedFilter;
            displayBooks(savedFilter);
        }
    }
}

// ===== NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

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

    if (yearElement) yearElement.textContent = new Date().getFullYear();
    if (modifiedElement) modifiedElement.textContent = document.lastModified;
}

// ===== INITIALIZATION =====
function init() {
    updateFooterDates();
    displayBooks();
    initFilter();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
