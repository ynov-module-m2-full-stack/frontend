import eventSlice from './eventSlice';
import {configureStore } from '@reduxjs/toolkit';
import  userSlice, {userSlice_init} from './userSlice';
import { fetchEvents } from './eventSlice';
import { createStore } from "redux";
import { persistStore, 
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

export const{ addEvent, deleteEvent, likeEvent, setPageSize, setCurrentPage, setEventsPropertyOnMine} = eventSlice.actions;
export {fetchEvents}

// const store_init = createStore(userSlice);
const store = configureStore({
  reducer: {
    events: eventSlice.reducer, 
    user: userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persist = persistStore(store);
export default {persist, store};