import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import Brightness from './brightness'; 
import '../styles/header.css';

function Header({ toggleTheme, isDarkMode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  function isTokenExpired(token) {
    const decodedToken = parseJwt(token);
    if (!decodedToken) return true;
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token:", token);
    if (token && !isTokenExpired(token)) {
      const decodedToken = parseJwt(token);
      console.log("Decoded token:", decodedToken);
      if (decodedToken) {
        setIsLoggedIn(true);
        setUsername(decodedToken.username);
        setIsAdmin(decodedToken.isAdmin);
        console.log("Username set:", decodedToken.username);
      }
    } else if (token) {
      console.log("Token expired or invalid");
      localStorage.removeItem('token');
    }
  }, []);

  return (
    <div className={isDarkMode ? 'head dark-mode' : 'head light-mode'}>
      <div className='left'>
        <Link to="/" className='loogo'>
          <Icon />
          <h1>GenBlogs</h1>
        </Link>
        {isAdmin && (
          <Link to="/create-post">
            <button id='create-post'>Create Post</button>
          </Link>
        )}
      </div>
      <div className='right'>
        <button id='bright' onClick={toggleTheme}>
          <Brightness />
        </button>
        {isLoggedIn ? (
          <span>Welcome, {username}</span>
        ) : (
          <>
            <Link to="/signin">
              <button id='sign-in'>Sign in</button>
            </Link>
            <Link to="/signup">
              <button id='sign-up'>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
