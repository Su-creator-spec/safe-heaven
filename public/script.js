const apiEndpoint = 'http://localhost:3000';

// Hate Speech Detection
document.getElementById('hate-speech-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = document.getElementById('hate-speech-text').value;

    try {
        const response = await fetch(`${apiEndpoint}/detect-hate-speech`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        const result = await response.json();
        document.getElementById('hate-speech-result').innerText = JSON.stringify(result);
    } catch (error) {
        console.error('Error detecting hate speech:', error);
        document.getElementById('hate-speech-result').innerText = 'An error occurred.';
    }
});

// Moderation Model
document.getElementById('moderation-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = document.getElementById('moderation-input').value;

    try {
        const response = await fetch(`${apiEndpoint}/moderate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input }),
        });

        const result = await response.json();
        document.getElementById('moderation-result').innerText = `Result: ${result.output}`;
    } catch (error) {
        console.error('Error during moderation:', error);
        document.getElementById('moderation-result').innerText = 'An error occurred.';
    }
});

// Fetch Posts
const fetchPosts = async () => {
    try {
        const response = await fetch(`${apiEndpoint}/`);
        const posts = await response.json();
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <small>Author: ${post.author}</small>
            `;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

// Post Submission
document.getElementById('post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const author = document.getElementById('post-author').value;

    try {
        await fetch(`${apiEndpoint}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, author }),
        });

        fetchPosts();
    } catch (error) {
        console.error('Error adding post:', error);
    }
});

// Fetch posts on page load
fetchPosts();

// Resource Library Modal
document.getElementById('resource-library-button').addEventListener('click', () => {
    document.getElementById('resource-library').style.display = 'block';
});

// Close Resource Library
document.getElementById('close-library').addEventListener('click', () => {
    document.getElementById('resource-library').style.display = 'none';
});
