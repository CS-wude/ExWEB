document.addEventListener('DOMContentLoaded', function() {
    // Load posts on index page
    if (document.getElementById('postsContainer')) {
        loadPosts();
        document.getElementById('searchBox').addEventListener('input', searchPosts);
    }
    
    // Load post content on post page
    if (document.getElementById('postContent')) {
        const params = new URLSearchParams(window.location.search);
        const postId = params.get('id');
        loadPostContent(postId);
    }
    
    // Add comment functionality
    if (document.getElementById('submitComment')) {
        document.getElementById('submitComment').addEventListener('click', addComment);
    }
});

function loadPosts() {
    fetch('data/posts.json')
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.getElementById('postsContainer');
            postsContainer.innerHTML = '';
            data.posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
                    <p>${post.date} by ${post.author}</p>
                    <p>${post.excerpt}</p>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error loading posts:', error));
}

function searchPosts(event) {
    const query = event.target.value.toLowerCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const title = post.querySelector('h2').textContent.toLowerCase();
        const excerpt = post.querySelector('p:nth-of-type(3)').textContent.toLowerCase();
        if (title.includes(query) || excerpt.includes(query)) {
            post.style.display = '';
        } else {
            post.style.display = 'none';
        }
    });
}

function loadPostContent(postId) {
    fetch('data/posts.json')
        .then(response => response.json())
        .then(data => {
            const post = data.posts.find(p => p.id == postId);
            if (post) {
                const postContent = document.getElementById('postContent');
                postContent.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.date} by ${post.author}</p>
                    <p>${post.content}</p>
                `;
                loadComments(postId);
            } else {
                document.getElementById('postContent').innerHTML = '<p>Post not found.</p>';
            }
        })
        .catch(error => console.error('Error loading post:', error));
}

function loadComments(postId) {
    // This is a placeholder, replace with actual comment loading logic
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
}

function addComment() {
    const commentInput = document.getElementById('commentInput').value;
    if (commentInput) {
        const commentsContainer = document.getElementById('commentsContainer');
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.textContent = commentInput;
        commentsContainer.appendChild(newComment);
        document.getElementById('commentInput').value = '';
    }
}
