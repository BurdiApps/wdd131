// localStorage key for review count
const REVIEW_COUNT_KEY = 'productReviewCount';

// Get current review count from localStorage
function getReviewCount() {
    const count = localStorage.getItem(REVIEW_COUNT_KEY);
    return count ? parseInt(count, 10) : 0;
}

// Increment and save review count
function incrementReviewCount() {
    const currentCount = getReviewCount();
    const newCount = currentCount + 1;
    localStorage.setItem(REVIEW_COUNT_KEY, newCount.toString());
    return newCount;
}

// Display the review count
function displayReviewCount() {
    const counterElement = document.getElementById('review-counter');
    if (counterElement) {
        const count = incrementReviewCount();
        counterElement.textContent = count;
    }
}

// Update the year in the footer
function updateYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Update last modified date
function updateLastModified() {
    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    displayReviewCount();
    updateYear();
    updateLastModified();
});
