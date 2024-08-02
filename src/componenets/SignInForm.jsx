// src/components/SignInForm.jsx
import React, { useState } from 'react';
import '../styles/signin.css';

function SignInForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.status === 200) {
                localStorage.setItem('token', result.token);
                setMessage('Login successful!');
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setMessage('Server error');
        }
    };

    return (
        <div className="signin-form">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <button type="submit">Sign In</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default SignInForm;
