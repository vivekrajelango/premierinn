import axios, { AxiosInstance, AxiosResponse } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://6786bcadf80b78923aa80262.mockapi.io',
  timeout: 50000, 
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error('API error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
