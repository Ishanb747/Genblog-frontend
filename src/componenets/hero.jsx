import React from 'react';
import '../styles/hero.css';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to<br /><span className="highlight">GenBlogs</span></h1>
        <p>
          Hello! My name is Ishan Bhattacharya. I am a full stack developer based in
          New Delhi, India. This is my personal blog. I intend to document all the projects I make in this blog, starting with this one : O.
        </p>
      </div>
      <div className="hero-image">
        <img src="/code.png" alt="Laptop with code" />
      </div>
    </section>
  );
}

export default HeroSection;
