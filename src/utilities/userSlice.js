import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cypher from './cypher';
import { PURGE } from "redux-persist";

const initialState = {
  isLoggedIn: false,
  userData: null,
  error: null,
  loading: false,
  accessToken: null,
  refreshToken: null,
  accessTokenExpiration: null,
};
const userAdapter = createEntityAdapter({
  removeAll: (a) => a = initialState,
});
const userSlice_init = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null; // Clear any previous errors
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isLoggedIn = true;
      state.userData = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.accessTokenExpiration = calculateAccessTokenExpiration(action.payload.accessTokenExpirationInMs);
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

export const { loginRequest, loginSuccess, loginFailure, logout } = userSlice_init.actions;

const persistConfig = {
  key: 'root',
  storage
}

const userSlice = persistReducer(persistConfig, userSlice_init.reducer)

export const logOutUser = createAsyncThunk(
  'user/logout',
  async (credentials, { getState, dispatch }) => {
    dispatch(logout());
  }
);

export default userSlice;
export {userSlice_init};
// Function to calculate access token expiration (replace with your logic)
function calculateAccessTokenExpiration(expirationInMs) {
  return Date.now() + expirationInMs;
}
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { getState, dispatch }) => {
    dispatch(loginRequest());

    try {
      const response = await fetch('http://localhost:8000/api/login_check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      dispatch(loginSuccess(data));
      return data.user; // Return user data
    } catch (error) {
      dispatch(loginFailure(error.message));
      return Promise.reject(error);
    }
  }
);

export const addUser = createAsyncThunk(
  'user/addUser',
  async (credentials, { getState, dispatch }) => {
    dispatch(loginRequest());

    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      dispatch(loginSuccess(data));
      return data.user; // Return user data
    } catch (error) {
      dispatch(loginFailure(error.message));
      return Promise.reject(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => {
    const response = await fetch('http://localhost:8000/api/logout');

    if (!response.ok) {
      console.error('Logout failed'); // Handle non-critical errors gracefully
    }

    return null; // Indicate successful logout
  }
);

export const refreshAccessToken = createAsyncThunk(
  'user/refreshAccessToken',
  async (refreshToken, { getState, dispatch }) => {
    const response = await fetch('http://localhost:8000/api/token/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Refresh token failed');
    }

    const data = await response.json();
    dispatch(loginSuccess(data)); // Update state with new tokens
    return data.accessToken; // Return new access token
  }
);
const percistedUserReducer = persistReducer(persistConfig, userSlice.reducer); // Combine reducers

export { percistedUserReducer};