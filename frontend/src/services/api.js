import axios from 'axios';
import useAuthStore from '../store/authStore';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api/v1";

const api = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
