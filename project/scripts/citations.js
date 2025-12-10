// citations.js - Handles video embed feature for citations page

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('video-form');
    const list = document.getElementById('video-list');

    if (form && list) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const url = form.elements['video-url'].value.trim();
            if (!url) return;
            const embed = createVideoEmbed(url);
            if (embed) {
                const li = document.createElement('li');
                li.innerHTML = embed;
                list.appendChild(li);
                form.reset();
            } else {
                alert('Please enter a valid YouTube or Vimeo link.');
            }
        });
    }
});

function createVideoEmbed(url) {
    // YouTube
    const yt = url.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
    if (yt) {
        return `<iframe width="360" height="203" src="https://www.youtube.com/embed/${yt[1]}" frameborder="0" allowfullscreen></iframe>`;
    }
    // Vimeo
    const vimeo = url.match(/vimeo.com\/(\d+)/);
    if (vimeo) {
        return `<iframe width="360" height="203" src="https://player.vimeo.com/video/${vimeo[1]}" frameborder="0" allowfullscreen></iframe>`;
    }
    return null;
}
