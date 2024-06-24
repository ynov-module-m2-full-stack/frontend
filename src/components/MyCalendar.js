import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useDispatch, useSelector } from 'react-redux'
import "./checkbox.css";
import interactionPlugin from "@fullcalendar/interaction";
import  { addEvent, deleteEvent, likeEvent, setPageSize, setCurrentPage, setEventsPropertyOnMine, fetchEvents}  from '../utilities/fetchRedux';
import Sidebar from './molecules/Sidebar';
const MyCalendar = () => {
  const events = useSelector((state) => state.events.events);
  const currentPage = useSelector((state) => state.events.currentPage);
  const pageSize = useSelector((state) => state.events.pageSize);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);
  const maxPageSize = useSelector((state) => state.events.maxPageSize);
  const showMyEvents = useSelector((state) => state.events.showMyEvents);
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
    }, [showMyEvents]);
  useEffect(() => {
    handlePageChange(1);
  }, [showMyEvents]);

  useEffect(() => {
    dispatch(fetchEvents(currentPage)); // Fetch events on component mount
  }, [dispatch, currentPage]); // Re-fetch on page change
  function handleEventRemove(events) {
    console.log(events)
  }
  function handleEventAdd(event) {
    console.log(event)
  }
  function handleEventChange(events) {
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
            <FullCalendar
              plugins={[dayGridPlugin, 
                //timeGridPlugin, 
                interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              editable={true}
              selectable={true}
              select={handleDateSelect}
              eventAdd={handleEventAdd}
              eventChange={handleEventChange}
              eventRemove={handleEventRemove}
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