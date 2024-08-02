import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import '../styles/createPost.css';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const editorRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title || !content) {
            alert('Please fill in both title and content');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/post/create', 
                { title, content },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            
            alert('Post created successfully!');
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    };

    return (
        <div className="create-post">
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <Editor
                        apiKey='pjnv9vzcw1eujszoac2ql5j5l74m1dpcagdza4zaixtktxet'

                        onInit={(evt, editor) => editorRef.current = editor}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={(newContent, editor) => setContent(newContent)}
                    />
                </div>
                <button type="submit" className="submit-button">Create Post</button>
            </form>
        </div>
    );
}

export default CreatePost;