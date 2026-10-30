import axios from 'axios';

const axiosbase = axios.create({
  baseURL: 'http://localhost:5500/api',
});

axiosbase.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});

export default axiosbase;