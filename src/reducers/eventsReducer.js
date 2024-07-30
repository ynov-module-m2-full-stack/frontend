// src/reducers/eventsReducer.js
const initialState = {
  events: [],
  currentPage: 1,
  pageSize: 10,
  loading: false,
  error: null,
  maxPageSize: 100,
  showMyEvents: false,
};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_EVENTS_PROPERTY_ON_MINE':
      return { ...state, showMyEvents: action.payload };
    default:
      return state;
  }
}
