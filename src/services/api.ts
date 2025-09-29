// src/services/api.ts

import axios from 'axios';
import { useAuthStore } from '@/stores/auth'; // We'll use this to get the token

// 1. CREATE A CONFIGURED AXIOS INSTANCE
const api = axios.create({
  // Get the base URL from environment variables, just like the old project
  baseURL: import.meta.env.VITE_APP_SERVICE_URL, 
});


// 2. SETUP AN INTERCEPTOR TO AUTOMATICALLY ADD THE AUTH TOKEN
// An interceptor is a function that runs BEFORE every single API request.
api.interceptors.request.use(
  (config) => {
    // Get a reference to our Pinia auth store
    const authStore = useAuthStore();
    const token = authStore.idToken;

    // If a token exists, add it to the 'Authorization' header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return the modified config so the request can proceed
    return config;
  },
  (error) => {
    // Handle any errors that occur during request setup
    return Promise.reject(error);
  }
);

// 3. EXPORT THE CONFIGURED INSTANCE
// We will import this 'api' object in our Pinia stores to make calls.
export default api;