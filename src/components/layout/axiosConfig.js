import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
  baseURL: 'http://localhost:3333',
  headers: token ? {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  } : {
    'Content-Type': 'application/json',
  },
});

export default instance;
