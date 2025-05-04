import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL ||'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the JWT token to headers for protected routes
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getBooks = () => API.get('/books');
export const getFreeBooks = () => API.get('/books/free');
export const purchaseBook = (bookId) => API.post('/purchase', { bookId });
export const getUserPurchases = () => API.get('/purchase');
