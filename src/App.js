// App.js
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import MyCalendar from './components/MyCalendar';
import './App.css';
// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';

const App = () => {
  return (
    <div>
      <NavBar />
      <h1>TROUVEZ TOUS LES EVENEMENTS QUI VONT ANIMER VOTRE ETE !</h1>
      <MyCalendar />
    </div>
  );
};

export default App;
