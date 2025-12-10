// Notes Page JavaScript
// Handles note gallery display, filtering, adding new notes with localStorage

// Only one sample note for demo: First lesson of Precalculus
const sampleNotes = [
    {
        id: 1,
        title: 'Precalculus - Lesson 1: ',
        subject: 'pre-calc',
        description: 'Introduction to functions, domain, and range.',
        photo: 'images/function_2000590.png',
        date: '2024-12-09'
    }
];

// ===== LOCALSTORAGE FUNCTIONS =====
function getNotes() {
    // Always include the sample note at the top
    const stored = localStorage.getItem('mathMountainNotes');
    let userNotes = [];
    if (stored) {
        try {
            userNotes = JSON.parse(stored).filter(n => n.id !== 1);
        } catch {
            userNotes = [];
        }
    }
    return [sampleNotes[0], ...userNotes];
}

function saveNotes(notes) {
    localStorage.setItem('mathMountainNotes', JSON.stringify(notes));
}

function addNote({ title, subject, description, photo }) {
    const notes = getNotes();
    const newNote = {
        id: Date.now(),
        title,
        subject,
        description,
        photo: photo || '',
        date: new Date().toISOString().slice(0, 10)
    };
    notes.push(newNote);
    saveNotes(notes);
    return newNote;
}

function deleteNote(id) {
    // Prevent deleting the sample note
    if (id === 1) return;
    let notes = getNotes().filter(note => note.id !== 1); // only user notes in storage
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('mathMountainNotes', JSON.stringify(notes));
}

// ===== DISPLAY FUNCTIONS =====
function createNoteCard(note) {
    // Make the card a link to the lesson page if it's the sample, otherwise just a card
    const isSample = note.id === 1;
    const cardContent = `
        <article class="note-card" data-subject="${note.subject}">
            <img src="${note.photo ? note.photo : 'images/math-mountain-logo.svg'}" alt="${note.title}" class="note-image" loading="lazy" style="${note.photo ? '' : 'opacity:0.5;'}">
            <div class="note-content">
                <h3 class="note-title">${note.title}</h3>
                <span class="note-subject-badge">${getSubjectName(note.subject)}</span>
                <p class="note-description">${note.description || 'No description provided.'}</p>
                <time class="note-date">${formatDate(note.date)}</time>
                ${!isSample ? `<button class="delete-note" data-id="${note.id}" style="margin-top:1em;background:#f87171;color:#fff;border:none;padding:0.5em 1em;border-radius:6px;cursor:pointer;">Delete</button>` : ''}
            </div>
        </article>
    `;
    return isSample ? `<a href="precalc-lesson-1.html" class="note-card-link" style="text-decoration:none;color:inherit;">${cardContent}</a>` : cardContent;
}

function getSubjectName(subjectCode) {
    const subjects = {
        'pre-calc': 'Pre-Calculus',
        'calc1': 'Calculus 1',
        'calc2': 'Calculus 2',
        'algebra': 'Algebra Review'
    };
    return subjects[subjectCode] || subjectCode;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function displayNotes(filter = 'all') {
    const gallery = document.getElementById('notes-gallery');
    if (!gallery) return;

    const notes = getNotes();
    let filtered = notes;

    // Conditional branching for filtering
    if (filter !== 'all') {
        filtered = notes.filter(note => note.subject === filter);
    }

    if (filtered.length === 0) {
        gallery.innerHTML = `<p class="no-results">No notes found for this subject. Try a different filter or add your own!</p>`;
        return;
    }

    // Use map and template literals to build HTML
    gallery.innerHTML = filtered.map(note => createNoteCard(note)).join('');

    // Add delete handlers
    document.querySelectorAll('.delete-note').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = parseInt(this.getAttribute('data-id'));
            if (!isNaN(id)) {
                deleteNote(id);
                displayNotes(document.getElementById('subject-filter').value);
            }
        });
    });
}

// ===== FILTER HANDLING =====
function initFilter() {
    const filterSelect = document.getElementById('subject-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            displayNotes(e.target.value);
        });
    }
}

// ===== ADD NOTE FORM =====
function initAddNoteForm() {
    const form = document.getElementById('add-note-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('note-title').value.trim();
        const subject = document.getElementById('note-subject').value;
        const description = document.getElementById('note-description').value.trim();
        const photo = document.getElementById('note-photo').value.trim();

        // Conditional validation (photo is now optional)
        if (!title || !subject) {
            alert('Please fill in all required fields.');
            return;
        }

        // Create new note object
        const newNote = addNote({ title, subject, description, photo });

        // Display success and refresh
        alert(`✅ Note "${title}" added successfully!`);
        form.reset();

        // Refresh gallery
        const currentFilter = document.getElementById('subject-filter').value;
        displayNotes(currentFilter);
    });
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
    displayNotes();
    initFilter();
    initAddNoteForm();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
