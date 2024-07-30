import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useDispatch, useSelector } from 'react-redux';//
import interactionPlugin from "@fullcalendar/interaction";

import { setCurrentPage, setEventsPropertyOnMine, fetchEvents } from '../../utilities/store';
import Sidebar from '../molecules/Sidebar/Sidebar';
import EventModal from '../molecules/EventModal/EventModal';
import { deleteEvent } from '../../utilities/eventSlice';import Modal from 'react-modal';

import { FaHeart } from 'react-icons/fa';

Modal.setAppElement('#root');

const MyCalendar = () => {
  const events = useSelector((state) => state.rootReducer.events.events);
  const currentPage = useSelector((state) => state.rootReducer.events.currentPage);
  const pageSize = useSelector((state) => state.rootReducer.events.pageSize);
  const loading = useSelector((state) => state.rootReducer.events.loading);
  const error = useSelector((state) => state.rootReducer.events.error);
  const maxPageSize = useSelector((state) => state.rootReducer.events.maxPageSize);
  const showMyEvents = useSelector((state) => state.rootReducer.events.showMyEvents);
  
  
  const accessToken = useSelector((state) => state.rootReducer.user.accessToken);
  
  const [EventModalIsOpen, setEventModalIsOpen] = useState(false);
  const [typeEventModal, setTypeEventModal] = useState("post");
  const [eventModalData, setEventModalData] = useState({});
  const [deleteFlag, setDeleteFlag] = useState(false);
  
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedIdEvent, setSelectedIdEvent] = useState(null);
  const [registrations, setRegistrations] = useState({});

  const eventDragStopped = (e) => {
    console.log(e.jsEvent.target.id)
    
    switch (e.jsEvent.target.id ){
      case "removeEventImg":
        console.log(e)
        // e.event.remove();
        dispatch(deleteEvent(e.event._def.publicId))
        break;
      case "updateEventImg" :
        setTypeEventModal("update");
        console.log(e)
        // e.view.calendar.unselect() 
        const e1 = {...e.event, id : e.event._def.publicId}
        setEventModalData(e.event);
        setEventModalIsOpen(true);
        break;
    } 
  };
  
  const handleCheckboxChange = (event) => {
    dispatch(setEventsPropertyOnMine(event.target.checked));
  };

  useEffect(() => {
    
    handlePageChange(1);
    dispatch(fetchEvents());
    
  }, []);
  // useEffect(() => {    
  // }, [EventModalIsOpen]);

  useEffect(() => {
    dispatch(fetchEvents()); // Fetch events on component mount
  }, [accessToken]); // Re-fetch on page change
   

  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo.startStr);
    setSelectedIdEvent(selectInfo._def.publicId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handlePageChange = (newPage) => {
      if (currentPage > 1 && pageSize > maxPageSize) {
        dispatch(setCurrentPage(newPage));
        
      } 
    };

  function handleEventRemove(events) {
    console.log(events)
  }
  function handleEventAdd(event) {
    console.log(event)
  }
  const handleRegistration = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/api/invitations', { // Change to your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          status: 'pending',
          idEvent: selectedIdEvent, // Assuming selectedDate represents the event ID
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
    setSelectedIdEvent(0);
  };

  function preventDrag (e) {
    e.revert();
  }
  const openEventModal = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar

    setTypeEventModal("post");
    calendarApi.unselect() 
    setEventModalIsOpen(true);
  };
  const handleEventChange = (e) => {
    console.log(e);
    // setTypeEventModal("update");
    // console.log(e)
    // e.view.calendar.unselect() 
    // // setEventModalData(e);
    // setEventModalIsOpen(true);
  };
  const closeEventModal = (event) => {
    setEventModalIsOpen(false);
  };
  const renderEventContent = (eventInfo) => {
    const isRegistered = registrations[eventInfo.event.startStr];
    return (
      <div>
        <FaHeart
          style={{ color: isRegistered ? 'red' : 'grey', cursor: 'pointer' }}
          onClick={() => handleDateSelect(eventInfo.event)}
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
            <EventModal isOpen={EventModalIsOpen} onRequestClose={closeEventModal} type={typeEventModal} event={eventModalData} />
            
            <FullCalendar
              plugins={[dayGridPlugin, 
                //timeGridPlugin, 
                interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              droppable={true}
              editable={true}
              selectable={true}
              eventDrop={preventDrag}
              eventDragStop={eventDragStopped}
              select={openEventModal}
              eventAdd={handleEventAdd}
              eventChange={handleEventChange}
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
                    // Logic to handle next page based on total events and pageSize
                    handlePageChange(currentPage + 1);
                  },
                }
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