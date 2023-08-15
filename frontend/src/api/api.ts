import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export default api;
