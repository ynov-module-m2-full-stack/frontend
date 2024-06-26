import React from 'react';
import Modal from 'react-modal';

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

const InscriptionModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <h2>Inscription</h2>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="pseudo" style={{ marginRight: '10px' }}>Pseudo:</label>
          <input type="text" id="pseudo" name="pseudo" required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email" style={{ marginRight: '10px' }}>Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password" style={{ marginRight: '10px' }}>Mot de passe:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button className="log-button" type="submit" style={{ marginBottom: '10px' }}>S'inscrire</button>
      </form>
      <button className="close-button" onClick={onRequestClose}>Fermer</button>
    </Modal>
  );
};

export default InscriptionModal;
