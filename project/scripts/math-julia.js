// math-julia.js
// Julia custom notes interactivity

document.addEventListener('DOMContentLoaded', function () {
    // Julia custom notes
    const juliaNotes = JSON.parse(localStorage.getItem('juliaNotes')) || [];
    function renderJuliaNotes() {
        const list = document.getElementById('julia-notes-list');
        if (!list) return;
        list.innerHTML = juliaNotes.map((note, idx) => {
            let photo = note.photo ? `<img src="${note.photo}" alt="Note Photo" style="max-width:120px;display:block;margin:0.5em 0;">` : '';
            let video = '';
            if (note.video) {
                const yt = note.video.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
                if (yt) {
                    video = `<iframe width="320" height="180" src="https://www.youtube.com/embed/${yt[1]}" frameborder="0" allowfullscreen style="display:block;margin:0.5em 0;"></iframe>`;
                }
            }
            return `<div style="border:1px solid #e5e7eb;padding:1em;margin-bottom:1em;background:#fff;border-radius:8px;">
                <p>${note.text ? note.text : ''}</p>
                ${photo}
                ${video}
                <button class="delete-julia-note" data-idx="${idx}" style="margin-top:0.5em;background:#f87171;color:#fff;border:none;padding:0.5em 1em;border-radius:6px;cursor:pointer;">Delete</button>
            </div>`;
        }).join('');
        // Add delete handlers
        list.querySelectorAll('.delete-julia-note').forEach(btn => {
            btn.addEventListener('click', function () {
                const idx = parseInt(this.getAttribute('data-idx'));
                if (!isNaN(idx)) {
                    juliaNotes.splice(idx, 1);
                    localStorage.setItem('juliaNotes', JSON.stringify(juliaNotes));
                    renderJuliaNotes();
                }
            });
        });
    }
    const juliaForm = document.getElementById('julia-note-form');
    if (juliaForm) {
        juliaForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const text = document.getElementById('julia-note-text').value.trim();
            const photo = document.getElementById('julia-note-photo').value.trim();
            const video = document.getElementById('julia-note-video').value.trim();
            if (!text && !photo && !video) {
                alert('Please add at least a note, photo, or video link.');
                return;
            }
            juliaNotes.push({ text, photo, video });
            localStorage.setItem('juliaNotes', JSON.stringify(juliaNotes));
            renderJuliaNotes();
            juliaForm.reset();
        });
    }
    renderJuliaNotes();

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
});
