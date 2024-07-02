

import axios from 'axios';

const refreshThresholdInMs = 60000; // Time before refresh (1 minute)

axios.interceptors.request.use(
  config => {
    const state = useSelector(state => state.user);
    const now = Date.now();

    if (state.accessToken && now > state.accessTokenExpiration - refreshThresholdInMs) {
      dispatch(refreshAccessToken(state.refreshToken));
      // Optionally, wait for refresh to complete before sending the request
    }

    config.headers.Authorization = `Bearer ${state.accessToken}`;
    return config;
  },
  error => Promise.reject(error)
);