document.addEventListener('DOMContentLoaded', function () {
    const hardcodedLessons = [
        {
            id: 'julia',
            title: 'Julia Programming Language',
            description: 'Section on Math with Julia programming. See code examples and add your own notes!',
            image: 'images/julia-language.webp',
            link: 'math-julia.html',
            categories: ['scientific', 'data', 'engineering']
        }
    ];
    let lessons = [];

    const gallery = document.getElementById('programming-gallery');
    if (!gallery) return;

    // Language/category filter
    const filterSection = document.createElement('section');
    filterSection.className = 'filter-section';
    filterSection.innerHTML = `
        <div class="container" style="margin-bottom:1em;">
            <label for="language-filter" class="filter-label">Filter by Category:</label>
            <select id="language-filter" class="subject-filter">
                <option value="all">All</option>
                <option value="scientific">Scientific Computing</option>
                <option value="data">Data Science</option>
                <option value="engineering">Engineering</option>
                <option value="web">Web Development</option>
                <option value="ai">AI/ML</option>
                <option value="other">Other</option>
            </select>
        </div>
    `;
    gallery.parentElement.parentElement.insertBefore(filterSection, gallery.parentElement);

    // Add lesson form
    const addSection = document.createElement('section');
    addSection.className = 'add-note-section';
    addSection.innerHTML = `
        <div class="container">
            <h2>Add a Programming Lesson</h2>
            <form id="add-lesson-form" class="add-note-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="lesson-title">Lesson Title <abbr class="required" title="required">*</abbr></label>
                        <input type="text" id="lesson-title" name="title" required placeholder="e.g., Python for Data Science">
                    </div>
                    <div class="form-group">
                        <label for="lesson-category">Category <abbr class="required" title="required">*</abbr></label>
                        <select id="lesson-category" name="category" required>
                            <option value="scientific">Scientific Computing</option>
                            <option value="data">Data Science</option>
                            <option value="engineering">Engineering</option>
                            <option value="web">Web Development</option>
                            <option value="ai">AI/ML</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="lesson-description">Description</label>
                    <textarea id="lesson-description" name="description" rows="2" placeholder="Brief summary..."></textarea>
                </div>
                <div class="form-group">
                    <label for="lesson-image">Logo/Image URL</label>
                    <input type="url" id="lesson-image" name="image" placeholder="https://example.com/logo.png">
                </div>
                <div class="form-group">
                    <label for="lesson-link">Lesson Link <abbr class="required" title="required">*</abbr></label>
                    <input type="url" id="lesson-link" name="link" required placeholder="math-python.html">
                </div>
                <button type="submit" class="submit-button">Add Lesson</button>
            </form>
        </div>
    `;
    gallery.parentElement.parentElement.appendChild(addSection);

    // Render lessons
    function renderLessons(filter) {
        let filtered = lessons;
        if (filter && filter !== 'all') {
            filtered = lessons.filter(l => l.categories.includes(filter) || (filter === 'other' && l.categories.includes('other')));
        }
        // Always show hardcoded lesson at the top
        const allLessons = [...hardcodedLessons, ...filtered];
        gallery.innerHTML = allLessons.map((lesson, idx) => `
            <div class="lesson-card" style="max-width:400px;margin:2em auto;padding:2em;background:#fff;border-radius:16px;box-shadow:0 2px 8px #e5e7eb;text-align:center;display:flex;flex-direction:column;align-items:center;">
                <img src="${lesson.image ? lesson.image : 'images/math-mountain-logo.svg'}" alt="${lesson.title} Logo" loading="lazy" style="width:80px;height:80px;margin-bottom:1em;object-fit:contain;${lesson.image ? '' : 'opacity:0.5;'}">
                <h2 style="margin-bottom:0.5em;">${lesson.title}</h2>
                <p style="margin-bottom:1.5em;">${lesson.description || ''}</p>
                <a href="${lesson.link}" class="submit-button" style="margin-top:auto;display:inline-block;">Go to Lesson</a>
                ${idx > 0 ? `<button class="delete-lesson" data-idx="${idx - 1}" style="margin-top:1em;background:#f87171;color:#fff;border:none;padding:0.5em 1em;border-radius:6px;cursor:pointer;">Delete</button>` : ''}
            </div>
        `).join('');
        // Add delete handlers for user lessons only
        document.querySelectorAll('.delete-lesson').forEach(btn => {
            btn.addEventListener('click', function () {
                const idx = parseInt(this.getAttribute('data-idx'));
                if (!isNaN(idx)) {
                    lessons.splice(idx, 1);
                    renderLessons(document.getElementById('language-filter').value);
                }
            });
        });
    }

    // Initial render
    renderLessons('all');

    // Filter handler
    document.getElementById('language-filter').addEventListener('change', function (e) {
        renderLessons(e.target.value);
    });

    // Add lesson handler
    document.getElementById('add-lesson-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('lesson-title').value.trim();
        const category = document.getElementById('lesson-category').value;
        const description = document.getElementById('lesson-description').value.trim();
        const image = document.getElementById('lesson-image').value.trim();
        const link = document.getElementById('lesson-link').value.trim();
        if (!title || !category || !link) {
            alert('Please fill in all required fields.');
            return;
        }
        lessons.push({
            id: title.toLowerCase().replace(/\s+/g, '-'),
            title,
            description,
            image: image || '',
            link,
            categories: [category]
        });
        renderLessons(document.getElementById('language-filter').value);
        e.target.reset();
    });
});