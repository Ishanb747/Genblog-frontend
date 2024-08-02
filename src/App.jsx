// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/home';
import SignUpPage from './pages/signup';
import CreatePost from './componenets/postCreate';
import SignInPage from './pages/signin';
import AddPost from './pages/addpost';
import Blog from './pages/blog';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/create-post" element={<AddPost />} />
                <Route path="/blog/:id" element={<Blog/>} />
            </Routes>

            
        </Router>
    );
}

export default App;
