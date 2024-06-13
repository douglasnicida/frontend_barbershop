import axios from 'axios';

// Obtenha o token do localStorage
const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Authorization': token ? `Bearer ${token}` : '',
  },
});

export default axiosInstance;
