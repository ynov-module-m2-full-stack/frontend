import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useDispatch, useSelector } from 'react-redux'
import "../atoms/checkbox.css";
import interactionPlugin from "@fullcalendar/interaction";
import { setCurrentPage, setEventsPropertyOnMine, fetchEvents } from '../../utilities/store';
import Sidebar from '../molecules/Sidebar/Sidebar';
import EventModal from '../molecules/EventModal/EventModal';
import { deleteEvent } from '../../utilities/eventSlice';
const MyCalendar = () => {
  const events = useSelector((state) => state.rootReducer.events.events);
  const currentPage = useSelector((state) => state.rootReducer.events.currentPage);
  const pageSize = useSelector((state) => state.rootReducer.events.pageSize);
  const loading = useSelector((state) => state.rootReducer.events.loading);
  const error = useSelector((state) => state.rootReducer.events.error);
  const maxPageSize = useSelector((state) => state.rootReducer.events.maxPageSize);
  const showMyEvents = useSelector((state) => state.rootReducer.events.showMyEvents);
  
  const [EventModalIsOpen, setEventModalIsOpen] = useState(false);
  const [typeEventModal, setTypeEventModal] = useState("post");
  const [eventModalData, setEventModalData] = useState({});
  const [deleteFlag, setDeleteFlag] = useState(false);
  
  const accessToken = useSelector((state) => state.rootReducer.user.accessToken);
  
  const dispatch = useDispatch();
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
    
  }, []);
  // useEffect(() => {    
  // }, [EventModalIsOpen]);

  useEffect(() => {
    dispatch(fetchEvents()); // Fetch events on component mount
  }, [accessToken]); // Re-fetch on page change
  
  function preventDrag (e) {
    e.revert();
  }
  function handleEventAdd(event) {
    console.log(event)
  }
  function removeEvent(events) {
    console.log(events)
  }
  function handleDateSelect(selectInfo) {
    let title = prompt('Veuillez entrer le titre de l\'évènement')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: new Date(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }
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
  // window.addEventListener('DOMContentLoaded', function (){
  //   setTimeout(() => {
  //      setEventModalIsOpen(false);
  //   }, 5000);
  // })
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
  return (
    <> 
      
      {loading && <p>Loading events...</p>}
      {error && <p>Error fetching events: {error}</p>}
      {!loading && !error && 
      
        <div className="app">
          <Sidebar
            currentEvents={events}
          />
          <div className="app-main">
            <h1>Trouvez tous les évènements qui vont annimer votre été !</h1>
            <div className="checkbox-wrapper-46">
              <input type="checkbox"
                      checked={showMyEvents}
                      onChange={handleCheckboxChange} id="cbx-46" className="inp-cbx" />
              <label htmlFor="cbx-46" className="cbx"><span>
                  <svg viewBox="0 0 12 10" height="10px" width="12px">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span>
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
              eventRemove={removeEvent}
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
    </>
  );
};

export default MyCalendar;