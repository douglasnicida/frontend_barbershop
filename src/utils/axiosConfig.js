import axios from 'axios';

// Obtenha o token do localStorage
const token = localStorage.getItem('token');

console.log(token)

const axiosContent = (token) ?  {
  baseURL: 'http://localhost:8080',
  headers: {
    'Authorization': token ? `Bearer ${token}` : '',
  },
} : {
  baseURL: 'http://localhost:8080',
}

const axiosInstance = axios.create(axiosContent);

export default axiosInstance;
