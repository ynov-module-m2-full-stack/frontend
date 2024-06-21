import { configureStore, createSlice } from "@reduxjs/toolkit";


const eventSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {
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
    },
    showEvents: (state, action) => {
      const event = state.find((a) => a.id === action.payload);
      event.title = action.payload.name,
      event.date = action.payload.startDate;
    },
  },
});

export const store = configureStore({
  reducer: {
    events: eventSlice.reducer,
  },
});
export const { addEvent, deleteEvent, likeEvent } = eventSlice.actions;