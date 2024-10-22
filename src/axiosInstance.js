// axiosInstance.js
import axios from 'axios';

// Create an axios instance with common configurations
const axiosInstance = axios.create({
  baseURL: 'https://sky-scrapper.p.rapidapi.com/api', // Base URL for the API
  headers: {
    'x-rapidapi-key': '09d62b5320msh9ced286140a6268p197679jsn7f60957c3d35',
    'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
    'Content-Type': 'application/json', // Optional, if needed
  },
});

export default axiosInstance;
