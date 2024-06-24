
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import MyCalendar from './components/MyCalendar';
import './App.css';

import { Provider } from 'react-redux';
import store from './utilities/fetchRedux';

const App = () => {
  return (
    <div>
      <Provider store={store}>
      <NavBar />
      <MyCalendar />
      </Provider>
    </div>
  );
};

export default App;
