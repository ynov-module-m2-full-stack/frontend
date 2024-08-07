
import React from 'react';
import NavBar from './components/molecules/NavBar/NavBar';
import MyCalendar from './components/Templates/MyCalendar';
import './App.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Provider } from 'react-redux';
import store from './utilities/store';
import { PersistGate } from 'redux-persist/integration/react';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className='theme-btn' onClick={toggleTheme}>
      Passez en mode {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};



const App = () => {
  

  return (
    <div>
      <ThemeProvider>
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persist}>
          <NavBar />
          <ThemeToggleButton />
          <MyCalendar />
        </PersistGate>
      </Provider>
    </ThemeProvider>
    </div>
  );
};

export default App;
