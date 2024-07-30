
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { refreshAccessToken } from './store';
import axios from 'axios';
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



  const eventSlice = createSlice({
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
          console.log("Events payload : " + action.payload)
          
          
          setPageSize(state.events.length);
          state.events = (typeof(action.payload) !== 'undefined') ? action.payload: [];;
        })
        .addCase(fetchEvents.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addEvent.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateEvent.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(deleteEvent.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }).addCase(addEvent.fulfilled, (state, action) => {
          fetchEvents();
        }).addCase(updateEvent.fulfilled, (state, action) => {
          fetchEvents();
        }).addCase(deleteEvent.fulfilled, (state, action) => {
          fetchEvents();
        });
    },
  });
const {setPageSize} = eventSlice.actions;
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (test, { getState, dispatch }) => {
    
    dispatch(refreshAccessToken());
    const state = getState();

    // Extract user data from state
    const { accessToken } = state.rootReducer.user;
    const currentPage = state.rootReducer.events.currentPage;


    // Configure the request
    let config = {
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/api/events?page=${currentPage}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    };

    // Axios request interceptor for token refresh
    

    // Make the request with Axios
    const response = await axios.request(config);

    // Handle response data
    const data = response.data;
    console.log(data);

    if (typeof data.code !== 'undefined') {
      alert(data.message);
    } else {
      const events = data.map((event) => ({
        id : event.id,
        title: event.name,
        date: formatDateToSql(new Date(event.startDate)),
      }));
      return events;
    }
  }
);
export const addEvent = createAsyncThunk(
  'events/addEvent',
  async (eventData, { getState, dispatch }) => {
    dispatch(refreshAccessToken()); // Assuming you have this function for token refresh
    const state = getState();
    const { accessToken } = state.rootReducer.user;

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(eventData),
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events`, config);
      const data = await response.json();
      // Handle success, potentially dispatch an action to update events
      return data;
    } catch (error) {
      // Handle error, potentially dispatch an error action
      throw error;
    }
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async (eventData, { getState, dispatch }) => {
    dispatch(refreshAccessToken());
    const state = getState();
    const { accessToken } = state.rootReducer.user;

    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(eventData),
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/${eventData.id}`, config);
      const data = await response.json();
      // Handle success, potentially dispatch an action to update events
      // return data;
    } catch (error) {
      // Handle error, potentially dispatch an error action
      throw error;
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId, { getState, dispatch }) => {
    dispatch(refreshAccessToken());
    const state = getState();
    const { accessToken } = state.rootReducer.user;

    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    };

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`, config);
      // Handle success, potentially dispatch an action to update events
      return eventId;
    } catch (error) {
      // Handle error, potentially dispatch an error action
      throw error;
    }
  }
);
export default eventSlice;