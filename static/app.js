/**
 * @fileoverview Handles Wikipedia article fetching and analysis functionality.
 * Contains event listeners for fetching and analyzing Wikipedia articles.
 */

/**
 * Event listener for the fetch article button.
 * Retrieves article content from Wikipedia based on user input.
 * @listens click
 */
document.getElementById('fetch-article').addEventListener('click', async () => {
    const articleTitleInput = document.querySelector('input[name="article_title"]');
    const articleTitle = articleTitleInput.value.trim();
    if (!articleTitle) {
        alert('Please enter a Wikipedia article title.');
        return;
    }

    document.getElementById('loading').style.display = 'block';

    const response = await fetch('/fetch', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({article_title: articleTitle})
    });

    document.getElementById('loading').style.display = 'none';

    if (response.ok) {
        const data = await response.json();
        document.getElementById('article-title').textContent = data.title;
        document.getElementById('raw-text').textContent = data.content;
        document.getElementById('article-content').style.display = 'block';
    } else {
        const errorData = await response.json();
        alert('Error: ' + errorData.error);
    }
});

/**
 * Event listener for the analyze article button.
 * Sends article content to server for analysis and displays results.
 * @listens click
 */
document.getElementById('analyze-article').addEventListener('click', async () => {
    const content = document.getElementById('raw-text').textContent;
    if (!content) {
        alert('No article content to analyze.');
        return;
    }

    document.getElementById('loading').style.display = 'block';

    const response = await fetch('/analyze', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: content})
    });

    document.getElementById('loading').style.display = 'none';

    if (response.ok) {
        const data = await response.json();
        document.getElementById('analysis-results').innerHTML = `<h3>Summary</h3><p>${data.summary}</p>`;
    } else {
        const errorData = await response.json();
        alert('Error: ' + errorData.error);
    }
});
