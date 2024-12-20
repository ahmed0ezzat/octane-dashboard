import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://example.com/api', // Dummy API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
