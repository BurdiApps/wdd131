// bom.js - Enhanced with localStorage

// References to DOM elements
const chapterInput = document.getElementById('chapter-input');
const addButton = document.getElementById('add-button');
const chapterList = document.getElementById('chapter-list');

// Step 1: Initialize the chapters array from localStorage or empty array
const chaptersArray = getChapterList() || [];

// Step 2: Display all chapters from localStorage on page load
chaptersArray.forEach((chapter) => {
    displayList(chapter);
});

// Step 3: Modified button click event listener
addButton.addEventListener('click', function () {
    // Check if input is not empty
    if (chapterInput.value.trim() !== '') {
        // Call displayList with the input value
        displayList(chapterInput.value.trim());

        // Push the input value into the chaptersArray
        chaptersArray.push(chapterInput.value.trim());

        // Update localStorage with the new array
        setChapterList();

        // Clear the input field
        chapterInput.value = '';

        // Set focus back to the input
        chapterInput.focus();
    }
});

// Step 4: displayList function - builds and appends list item
function displayList(item) {
    // Create li element
    const li = document.createElement('li');

    // Create text span for chapter title
    const titleSpan = document.createElement('span');
    titleSpan.textContent = item;
    titleSpan.className = 'chapter-title';

    // Create delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.className = 'delete-button';
    delBtn.setAttribute('aria-label', `Remove ${item}`);

    // Add click event to delete button
    delBtn.addEventListener('click', function () {
        deleteChapter(item + '❌');
        li.remove();
        chapterInput.focus();
    });

    // Assemble and append
    li.appendChild(titleSpan);
    li.appendChild(delBtn);
    chapterList.appendChild(li);
}

// Step 5: setChapterList function - saves array to localStorage
function setChapterList() {
    localStorage.setItem('bomChapters', JSON.stringify(chaptersArray));
}

// Step 6: getChapterList function - retrieves array from localStorage
function getChapterList() {
    const stored = localStorage.getItem('bomChapters');
    return stored ? JSON.parse(stored) : null;
}

// Step 7: deleteChapter function - removes chapter from array and localStorage
function deleteChapter(chapter) {
    // Remove the ❌ from the end of the chapter string
    chapter = chapter.slice(0, chapter.length - 1);

    // Filter out the chapter to be removed
    chaptersArray.length = 0; // Clear the array
    const filtered = getChapterList().filter((item) => item !== chapter);
    chaptersArray.push(...filtered); // Repopulate with filtered items

    // Update localStorage
    setChapterList();
}

// Populate footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
