// precalc-lesson-1.js

// Array to hold facts (load from localStorage if available)
let facts = JSON.parse(localStorage.getItem('functionFacts')) || [
    { text: "A function gives one output for each input." }
];

// Function to render facts using template literals
function renderFacts() {
    const list = document.getElementById('facts-list');
    list.innerHTML = facts.map(fact => `<li>${fact.text}</li>`).join('');
}

// Add new fact from form
const form = document.getElementById('add-fact-form');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = document.getElementById('fact-input');
        const value = input.value.trim();
        if (value) {
            facts.push({ text: value }); // Object usage
            localStorage.setItem('functionFacts', JSON.stringify(facts)); // localStorage
            renderFacts();
            input.value = '';
        } else {
            alert("Please enter a fact!"); // Conditional branching
        }
    });
}

// Initial render
renderFacts();

// --- Custom Notes with Class and Delete Feature ---
class CustomNote {
    constructor(text, photo, video) {
        this.text = text;
        this.photo = photo;
        this.video = video;
        this.id = Date.now() + Math.random(); // Unique ID
    }
}

let customNotes = JSON.parse(localStorage.getItem('customNotes')) || [];

function renderCustomNotes() {
    const list = document.getElementById('custom-notes-list');
    if (!list) return;
    list.innerHTML = customNotes.map(note => {
        let photo = note.photo ? `<img src="${note.photo}" alt="Note Photo" style="max-width:120px;display:block;margin:0.5em 0;">` : '';
        let video = '';
        if (note.video) {
            const yt = note.video.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
            if (yt) {
                video = `<iframe width="320" height="180" src="https://www.youtube.com/embed/${yt[1]}" frameborder="0" allowfullscreen style="display:block;margin:0.5em 0;"></iframe>`;
            }
        }
        return `<div style="border:1px solid #e5e7eb;padding:1em;margin-bottom:1em;background:#fff;border-radius:8px;position:relative;">
      <button onclick="deleteCustomNote(${note.id})" style="position:absolute;top:8px;right:8px;background:#E83F6F;color:#fff;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;">Delete</button>
      <p>${note.text ? note.text : ''}</p>
      ${photo}
      ${video}
    </div>`;
    }).join('');
}

window.deleteCustomNote = function (id) {
    customNotes = customNotes.filter(note => note.id !== id);
    localStorage.setItem('customNotes', JSON.stringify(customNotes));
    renderCustomNotes();
};

const customForm = document.getElementById('custom-note-form');
if (customForm) {
    customForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const text = document.getElementById('note-text').value.trim();
        const photo = document.getElementById('note-photo').value.trim();
        const video = document.getElementById('note-video').value.trim();
        if (!text && !photo && !video) {
            alert('Please add at least a note, photo, or video link.');
            return;
        }
        customNotes.push(new CustomNote(text, photo, video));
        localStorage.setItem('customNotes', JSON.stringify(customNotes));
        renderCustomNotes();
        customForm.reset();
    });
}
renderCustomNotes();

// ===== RESPONSIVE NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });
}
