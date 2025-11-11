// bom.js - initial DOM setup (no event handling yet per instructions)

// References to DOM elements
const chapterInput = document.getElementById('chapter-input');
const addButton = document.getElementById('add-button');
const chapterList = document.getElementById('chapter-list');

// Validation function to check if input is a valid scripture reference
function isValidScripture(text) {
    // Matches patterns like: "Alma 5", "1 Nephi 3", "Moroni 10:4-5"
    const scripturePattern = /^[1-3]?\s*[A-Za-z]+\s+\d+/;
    return scripturePattern.test(text);
}

// Utility to create a list item with delete button (not wired yet)
function buildChapterItem(chapterTitle) {
    // li element
    const li = document.createElement('li');

    // text span for chapter title
    const titleSpan = document.createElement('span');
    titleSpan.textContent = chapterTitle;
    titleSpan.className = 'chapter-title';

    // delete button with accessible label
    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.className = 'delete-button';
    delBtn.setAttribute('aria-label', `Remove ${chapterTitle}`);

    // assemble
    li.appendChild(titleSpan);
    li.appendChild(delBtn);
    return li;
}

// Event listener for Add Chapter button
addButton.addEventListener('click', function () {
    // Check if input is not blank
    if (chapterInput.value.trim() !== '') {
        // Get the chapter title from input
        const chapterTitle = chapterInput.value.trim();

        // Validate that it's a scripture reference
        if (!isValidScripture(chapterTitle)) {
            alert('Please enter a valid scripture reference (e.g., "Alma 5" or "1 Nephi 3:7")');
            chapterInput.focus();
            return;
        }

        // Create the list item using our builder function
        const listItem = buildChapterItem(chapterTitle);

        // Append to the list
        chapterList.appendChild(listItem);

        // Clear the input field
        chapterInput.value = '';
    }

    // Return focus to input field (whether or not item was added)
    chapterInput.focus();
});

// Event delegation for delete buttons
// Listen for clicks on the list, then check if a delete button was clicked
chapterList.addEventListener('click', function (e) {
    // Check if the clicked element is a delete button
    if (e.target.classList.contains('delete-button')) {
        // Remove the parent li element
        e.target.parentElement.remove();

        // Return focus to input
        chapterInput.focus();
    }
});

// Populate footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}