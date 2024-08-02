import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Post.css';

function Post() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/blog/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setPosts(data))
      .catch(error => {
        console.error('Error fetching posts:', error);
        setError(error.toString());
      });
  }, []);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="post-container">
      {posts.map(post => (
        <Link to={`/blog/${post.id}`} key={post.id} className="post-link">
          <div className="post-card">
            <div className="post-image">
              <img src="https://via.placeholder.com/300x200" alt="Post" />
            </div>
            <div className="post-content">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-author">{post.author.username}</p>
              <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Post;
