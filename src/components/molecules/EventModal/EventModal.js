import React from 'react';
import Modal from 'react-modal';
// import './EventModal.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../utilities/store';
import InputTable from '../../atoms/InputTable';
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

const EventModal = ({event, isOpen, onRequestClose, type }) => {


  switch ( type?.toLowerCase() ) {
          case "post":
            return (
              <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                style={customStyles}
                ariaHideApp={false}
              >
                
                <h2>Création d'un évènement :</h2>
                  <InputTable onRequestClose={onRequestClose} type={type}></InputTable>
                <button className="close-button" onClick={onRequestClose}>Fermer</button>
              </Modal>);
            break;
            
          case 'update':
            return (
              <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                style={customStyles}
                ariaHideApp={false}
              >
                <h2>Modification d'un évènement :</h2>
                <InputTable onRequestClose={onRequestClose} type={type} event={event} ></InputTable>
                <button className="close-button" onClick={onRequestClose}>Fermer</button>
              </Modal>);
            break;
            default: alert("Type d'action utilisateur non définit !"); return (<></>);
        }
      
};

export default EventModal;
