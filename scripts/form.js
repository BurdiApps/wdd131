// Product array with IDs and names
const products = [
    { id: "feature-1", name: "Dictionary" },
    { id: "feature-2", name: "Lessons" },
    { id: "feature-3", name: "Quizzes" },
    { id: "feature-4", name: "Games" },
    { id: "feature-5", name: "Adventure Mode" }
];

// Populate the product select dropdown
function populateProducts() {
    const productSelect = document.getElementById('product-name');

    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// Update the year in the footer
function updateYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    populateProducts();
    updateYear();
});

// Set current year
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Set last modified date
const lastModifiedP = document.getElementById('lastModified');
if (lastModifiedP) {
    lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
}