import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/SinglePost.css';

function SinglePost() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/blog/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setPost(data))
      .catch(error => {
        console.error('Error fetching post:', error);
        setError(error.toString());
      });
  }, [id]);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-post">
      <h1>{post.title}</h1>
      <p>By {post.author.username} on {new Date(post.createdAt).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export default SinglePost;
