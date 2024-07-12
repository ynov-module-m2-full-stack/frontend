import React from 'react';
import Modal from 'react-modal';
import './LoginModal.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../utilities/store';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1
  },
};

const LoginModal = ({ isOpen, onRequestClose }) => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await dispatch(loginUser({ email, password }));
      onRequestClose();
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <h2>Connexion</h2>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email" style={{ marginRight: '10px' }}>Email:</label>
          <input type="email" id="email" name="email" value={email} required 
          onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password" style={{ marginRight: '10px' }}>Mot de passe:</label>
          <input type="password" id="password" name="password" value={password} required 
          onChange={(e)=>setPassword  (e.target.value)}/>
        </div>
        <button className="log-button" type="button" onClick={handleSubmit} style={{ marginBottom: '10px' }}>Se connecter</button>
      </form>
      <button className="close-button" onClick={onRequestClose}>Fermer</button>
    </Modal>
  );
};

export default LoginModal;
