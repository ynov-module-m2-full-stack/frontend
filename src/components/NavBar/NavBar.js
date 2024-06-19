// src/components/NavBar.js
import React from 'react';
import './NavBar.css'; 

const NavBar = () => {
  return (
    <header>
    <nav>
      <div className="logo">
        <a href="/">
          <img src="/assets/LOGO.png" alt="Logo" className="logo-img" /> 
        </a>
      </div>
      {/* <div className="video-container">
      <video className="video" loop autoPlay muted>
        <source src="./assets/video.mp4" type="video/mp4" />
      </video></div> */}
      <div className="log">
      <div className="log1">
      <a href="/connexion" className="nav-link">Connexion</a>
      </div>
      <div className="log2"> <a href="/inscription" className="nav-link">Inscription</a></div></div>
      </nav>
    </header>
  );
};

export default NavBar;
