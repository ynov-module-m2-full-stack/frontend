import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { formatDateToSql } from "../utilities/fonctions";
import "./checkbox.css";
const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showMyEvents, setShowMyEvents] = useState(true); // State for checkbox

  useEffect(() => {
    const fetchEvents = async () => {
      const url = showMyEvents
        ? 'http://localhost:8000/api/event' // My events endpoint
        : 'http://localhost:8000/api/event?only_mine=1'; // Replace with external API endpoint

      const response = await fetch(url);
      const data = await response.json();
      const events = data.map((e) => ({
        title: e.name,
        date: formatDateToSql(new Date(e.startDate)),
      }));
      setEvents(events);
    };

    fetchEvents();
  }, [showMyEvents]); // Re-fetch on checkbox change

  const handleCheckboxChange = (event) => {
    setShowMyEvents(event.target.checked);
  };

  return (
    <div>
      <div class="checkbox-wrapper-46">
        <input type="checkbox"
                checked={showMyEvents}
                onChange={handleCheckboxChange} id="cbx-46" class="inp-cbx" />
        <label for="cbx-46" class="cbx"
          ><span>
            <svg viewBox="0 0 12 10" height="10px" width="12px">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
          ><span>Afficher que mes évènements</span>
        </label>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

export default MyCalendar;