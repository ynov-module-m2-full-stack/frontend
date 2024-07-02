
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import MyCalendar from './components/MyCalendar';
import './App.css';

import { Provider } from 'react-redux';
import store from './utilities/store';
import { PersistGate } from 'redux-persist/integration/react';
const App = () => {
  return (
    <div>
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persist}>
          <NavBar />
          <MyCalendar />
        </PersistGate>
      
      </Provider>
    </div>
  );
};

export default App;
