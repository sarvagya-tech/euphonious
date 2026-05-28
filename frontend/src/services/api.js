import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api/v1";

const api = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true
});

export default api;
