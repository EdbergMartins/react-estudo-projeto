import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // headers: token ? {
  //   'Content-Type': 'application/json',
  //   'Authorization': `${token}`,
  // } : {
  //   'Content-Type': 'application/json',
  // },
});

export default instance;
