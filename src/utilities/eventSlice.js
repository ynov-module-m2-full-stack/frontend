
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
          console.log("Events payload : " + action.payload)
          
          
          setPageSize(state.events.length);
          state.events = (typeof(action.payload) !== 'undefined') ? action.payload: [];;
        })
        .addCase(fetchEvents.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
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
        title: event.name,
        date: formatDateToSql(new Date(event.startDate)),
      }));
      return events;
    }
  }
);

export default eventSlice;