import axios from 'axios';
import useAuthStore from '../store/authStore';

// Clean up and normalize base URL
let rawBaseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api/v1").trim();
rawBaseUrl = rawBaseUrl.replace(/\/+$/, ''); // remove trailing slashes
if (!rawBaseUrl.endsWith('/api/v1')) {
    rawBaseUrl = `${rawBaseUrl}/api/v1`;
}

const api = axios.create({
    baseURL: rawBaseUrl,
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
