// filtered-temples.js - Dynamic temple filtering

// Temple data array
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // My three additional temples
    {
        templeName: "Los Angeles California",
        location: "Los Angeles, California, United States",
        dedicated: "1956, March, 11",
        area: 190614,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/los-angeles-california/400x250/los-angeles-temple-lds-709439-wallpaper.jpg"
    },
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
    },
    {
        templeName: "Paris France",
        location: "Le Chesnay, France",
        dedicated: "2017, May, 21",
        area: 44175,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/paris-france/400x250/paris-france-temple-1060738-wallpaper.jpg"
    }
];

// Function to create temple card HTML
function createTempleCard(temple) {
    return `
    <div class="temple-card">
      <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
      <div class="temple-info">
        <h3>${temple.templeName}</h3>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
      </div>
    </div>
  `;
}

// Function to render temple cards
function renderTemples(templeArray) {
    const container = document.getElementById('temple-cards');
    container.innerHTML = templeArray.map(temple => createTempleCard(temple)).join('');
}

// Filter functions
function filterOld() {
    return temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year < 1900;
    });
}

function filterNew() {
    return temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year > 2000;
    });
}

function filterLarge() {
    return temples.filter(temple => temple.area > 90000);
}

function filterSmall() {
    return temples.filter(temple => temple.area < 10000);
}

// Navigation event listeners
const navLinks = document.querySelectorAll('nav a');
const pageTitle = document.querySelector('main h1');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        link.classList.add('active');

        // Get filter type
        const filter = link.getAttribute('data-filter');

        // Apply filter and render
        let filteredTemples;
        let titleText;

        switch (filter) {
            case 'old':
                filteredTemples = filterOld();
                titleText = 'Old';
                break;
            case 'new':
                filteredTemples = filterNew();
                titleText = 'New';
                break;
            case 'large':
                filteredTemples = filterLarge();
                titleText = 'Large';
                break;
            case 'small':
                filteredTemples = filterSmall();
                titleText = 'Small';
                break;
            case 'home':
            default:
                filteredTemples = temples;
                titleText = 'Home';
        }

        // Update page title
        pageTitle.textContent = titleText;

        // Render temples
        renderTemples(filteredTemples);

        // Close mobile menu after selection
        const nav = document.querySelector('nav');
        const menuToggle = document.getElementById('menu-toggle');
        if (nav.classList.contains('show')) {
            nav.classList.remove('show');
            menuToggle.textContent = '☰';
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        }
    });
});

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

// Initial render - show all temples
renderTemples(temples);
