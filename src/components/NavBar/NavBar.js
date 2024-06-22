import React, { useState } from 'react';
import LoginModal from '../LoginModal/LoginModal.js';
import InscriptionModal from '../InscriptionModal/InscriptionModal.js';
import './NavBar.css';

const NavBar = () => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [inscriptionModalIsOpen, setInscriptionModalIsOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalIsOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalIsOpen(false);
  };

  const openInscriptionModal = () => {
    setInscriptionModalIsOpen(true);
  };

  const closeInscriptionModal = () => {
    setInscriptionModalIsOpen(false);
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <a href="/">
            <img src="/assets/LOGO.png" alt="Logo" className="logo-img" /> 
          </a>
        </div>
        <div className="log">
          <button className="log1" onClick={openLoginModal}>Connexion</button>
          <LoginModal isOpen={loginModalIsOpen} onRequestClose={closeLoginModal} />
          <button className="log2" onClick={openInscriptionModal}>Inscription</button>
          <InscriptionModal isOpen={inscriptionModalIsOpen} onRequestClose={closeInscriptionModal} />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
