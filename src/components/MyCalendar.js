import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa';
import Modal from 'react-modal';
import {
  setCurrentPage,
  setEventsPropertyOnMine,
  fetchEvents,
} from '../utilities/store';
import Sidebar from './molecules/Sidebar';
import './checkbox.css';

Modal.setAppElement('#root');

const MyCalendar = () => {
  const events = useSelector((state) => state.rootReducer.events.events);
  const currentPage = useSelector((state) => state.rootReducer.events.currentPage);
  const pageSize = useSelector((state) => state.rootReducer.events.pageSize);
  const loading = useSelector((state) => state.rootReducer.events.loading);
  const error = useSelector((state) => state.rootReducer.events.error);
  const maxPageSize = useSelector((state) => state.rootReducer.events.maxPageSize);
  const showMyEvents = useSelector((state) => state.rootReducer.events.showMyEvents);
  const accessToken = useSelector((state) => state.rootReducer.user.accessToken);  // Assuming you have user id in the state

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [registrations, setRegistrations] = useState({});

  const handlePageChange = (newPage) => {
    if (currentPage > 1 && pageSize > maxPageSize) {
      dispatch(setCurrentPage(newPage));
    }
  };

  const handleCheckboxChange = (event) => {
    dispatch(setEventsPropertyOnMine(event.target.checked));
  };

  useEffect(() => {
    handlePageChange(1);
    dispatch(fetchEvents());
  }, [dispatch]); 

  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo.startStr);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRegistration = async (eventInfo) => {
    try {
      const response = await fetch('http://localhost:8000/api/invitations', { // Change to your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          status: 'pending',
          idEvent: eventInfo.id, // Assuming selectedDate represents the event ID
        }),
      });

      if (response.ok) {
        setRegistrations((prevRegistrations) => ({
          ...prevRegistrations,
          [selectedDate]: true,
        }));
        closeModal(); // Ferme la popup après le clic sur "Yes"
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderEventContent = (eventInfo) => {
    const isRegistered = registrations[eventInfo.event.startStr];
    return (
      <div>
        <FaHeart
          style={{ color: isRegistered ? 'red' : 'grey', cursor: 'pointer' }}
          onClick={() => handleDateSelect(eventInfo)}
        />
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    );
  };

  return (
    <> 
      {loading && <p>Loading events...</p>}
      {error && <p>Error fetching events: {error}</p>}
      {!loading && !error && 
        <div className="app">
          <Sidebar currentEvents={events} />
          <div className="app-main">
            <h1>Trouvez tous les évènements qui vont annimer votre été !</h1>
            <div className="checkbox-wrapper-46">
              <input
                type="checkbox"
                checked={showMyEvents}
                onChange={handleCheckboxChange}
                id="cbx-46"
                className="inp-cbx"
              />
              <label htmlFor="cbx-46" className="cbx">
                <span>
                  <svg viewBox="0 0 12 10" height="10px" width="12px">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </svg>
                </span>
                <span>Afficher que mes évènements</span>
              </label>
            </div>
            <br/>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              editable={true}
              selectable={true}
              select={handleDateSelect}
              eventContent={renderEventContent}
              customButtons={{
                prevPage: {
                  text: 'Précedante page',
                  click() {
                    if (currentPage > 1) {
                      handlePageChange(currentPage - 1);
                    }
                  },
                },
                nextPage: {
                  text: 'Page suivante',
                  click() {
                    handlePageChange(currentPage + 1);
                  },
                },
              }}
              headerToolbar={{
                left: 'prevPage,nextPage today',
                center: 'title',
                right: 'prev,next',
              }}
            />
          </div>
        </div>
      }
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Registration"
      >
        <h2>Confirm Registration</h2>
        <p>Do you want to register for the event on {selectedDate}?</p>
        <button onClick={handleRegistration}>Yes</button>
        <button onClick={closeModal}>No</button>
      </Modal>
    </>
  );
};

export default MyCalendar;
