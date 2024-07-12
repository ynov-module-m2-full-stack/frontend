import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PURGE } from "redux-persist";

import axios from 'axios';

// Function to calculate access token expiration (replace with your logic)
function calculateAccessTokenExpiration(expirationInMs) {
  return parseInt( Date.now()) + parseInt( process.env.REACT_APP_expirationInMs);
  
}
const initialState = {
  isLoggedIn: false,
  userData: null,
  error: null,
  loading: false,
  accessToken: null,
  refreshToken: null,
  accessTokenExpiration: null,
};
const userSlice_init = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null; // Clear any previous errors
      
    },
    loginSuccess(state, action) {
      // console.log("state : ");
      // console.log(state);
      // console.log("action : ");
      // console.log(action);
      state.loading = false;
      state.isLoggedIn = true;
      state.accessToken = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.accessTokenExpiration = calculateAccessTokenExpiration();
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // Store error message
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userData = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.accessTokenExpiration = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
        state = initialState;
    });
  }
});


const { loginRequest, loginSuccess, loginFailure, logout, refreshAccessTokenTest } = userSlice_init.actions;
const persistConfig = {
  key: 'root',
  storage
}


export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { getState, dispatch }, thunkAPI) => {
    
    dispatch(loginRequest());
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_API_URL + '/api/login_check',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(credentials)
    };
    await axios.request(config)
    .then((response) => {
      const data = response.data;
      if (typeof(data.code) != 'undefined') {
        alert(data.message);
        dispatch(loginFailure());
      }else{
        // console.log("data : "+data)
        dispatch(loginSuccess(data));
        // Return user data
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(loginFailure());
    });

  }
);

export const addUser = createAsyncThunk(
  'user/addUser',
  async (credentials, { getState, dispatch },thunkAPI) => {
    dispatch(loginRequest());

      await fetch(process.env.REACT_APP_API_URL + '/api/users', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
      });

  
   
  }
);

export {logout, refreshAccessTokenTest};

export const refreshAccessToken = createAsyncThunk(
  'user/refreshAccessToken',
  async (test, { getState, dispatch }) => {
    const state = getState();
const { accessTokenExpiration, refreshToken } = state.rootReducer.user;
const now = Date.now();

// Check if refresh is needed and not already in progress
if (refreshToken !== null && now > accessTokenExpiration) {
  console.log("api/token/refresh :", refreshToken);

  let config = {
    method: 'POST',
    url: process.env.REACT_APP_API_URL + '/api/token/refresh',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refreshToken })
  };

    const response = await fetch(config.url, config);
    const data = await response.json();
      if (typeof data.code !== 'undefined') {
        alert(data.message);
        dispatch(loginFailure()); // Dispatch login failure on refresh error (optional)
      } else {
        dispatch(loginSuccess(data)); // Dispatch login success (optional)
        
      }
    }
  }
);

const userSlice = persistReducer(persistConfig, userSlice_init.reducer)

export default userSlice;
export {userSlice_init};