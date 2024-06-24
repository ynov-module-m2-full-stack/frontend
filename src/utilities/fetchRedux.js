
import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';

import { formatDateToSql } from "./fonctions";
const initialState = {
  events: [],
  showMyEvents : false,
  currentPage: 1,
  pageSize: 10,
  maxPageSize: 10,
  loading: false, // Add loading state for data fetching
  error: null, // Add error state for handling fetching issues
};

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (currentPage, thunkAPI) => {
    const {  dispatch } = thunkAPI;

      const url = `http://localhost:8000/api/event?page=${currentPage}`; 
      const response = await fetch(url);
      const data = await response.json();
      const events = data.map((e) => ({
        title: e.name,
        date: formatDateToSql(new Date(e.startDate)),
      }));
      
      dispatch(setPageSize(events.length));
      return events; 
    }
  );

  const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
      setPageSize: (state, action) => {
        state.pageSize = action.payload;
      },
      setCurrentPage: (state, action) => {
        state.currentPage = action.payload;
      },
      setEventsPropertyOnMine: (state, action) => {
        state.showMyEvents = action.payload;
      },
      addEvent: (state, action) => {
        const newEvent = {
          id: Date.now(),
          title: action.payload.name,
          date: action.payload.startDate,
        };
        state.unshift(newEvent);
      },
      deleteEvent: (state, action) => {
        state = state.filter((a) => a.id !== action.payload);
        return state;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchEvents.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchEvents.fulfilled, (state, action) => {
          state.loading = false;
          state.events = action.payload;
        })
        .addCase(fetchEvents.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

export const { addEvent, deleteEvent, likeEvent, setPageSize, setCurrentPage, setEventsPropertyOnMine} = eventsSlice.actions;


const store = configureStore({
  reducer: {
    events: eventsSlice.reducer,
  },
});

export default store;