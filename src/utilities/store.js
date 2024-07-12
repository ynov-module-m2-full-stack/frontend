import eventSlice from './eventSlice';
import {configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import  userSlice, { logout, loginUser, addUser, refreshAccessToken } from './userSlice';
import { fetchEvents } from './eventSlice';
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

export { logout, loginUser, addUser, refreshAccessToken};
// console.log(userSlice)
// const store_init = createStore(userSlice);
export const rootReducer = combineReducers({
  events: eventSlice.reducer, 
    user: userSlice
});

const store = configureStore({
  reducer: {
    rootReducer
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