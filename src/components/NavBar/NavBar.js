import React, { useEffect, useState } from 'react';
import LoginModal from '../LoginModal/LoginModal.js';
import InscriptionModal from '../InscriptionModal/InscriptionModal.js';
import './NavBar.css';
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from '../../utilities/userSlice.js';
const NavBar = () => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [inscriptionModalIsOpen, setInscriptionModalIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { isLoggedIn, error, loading } = useSelector(state => state.user);
  const deconnexion = function (e){
    // dispatch(store.persist.purge());logOutUser
    dispatch(logOutUser());
  }  ;
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
useEffect(()=>{}, [isLoggedIn]);
  return (
    <header>
      <nav>
        <div className="logo">
          <a href="/">
            <img src="/assets/LOGO.png" alt="Logo" className="logo-img" /> 
          </a>
        </div>
          { isLoggedIn ? 
              <div className="log">
                <button className="log1" onClick={deconnexion}>Déconnexion</button>
              </div>
            :      
              <div className="log">
                <button className="log1" onClick={openLoginModal}>Connexion</button>
                <LoginModal isOpen={loginModalIsOpen} onRequestClose={closeLoginModal} />
                
                <button className="log2" onClick={openInscriptionModal}>Inscription</button>
                <InscriptionModal isOpen={inscriptionModalIsOpen} onRequestClose={closeInscriptionModal} />
              </div>
          }
   
      </nav>
    </header>
  );
};

export default NavBar;
