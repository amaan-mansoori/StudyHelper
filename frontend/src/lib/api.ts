import axios from 'axios';
import { useAuthStore } from './store';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use((config) => {
    // 1. Read token from localStorage (Source of Truth)
    if (typeof window !== 'undefined') {
        try {
            const storage = localStorage.getItem('auth-storage');
            if (storage) {
                const parsed = JSON.parse(storage);
                const token = parsed.state?.token;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
        } catch (e) {
            // checking for parsing errors
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // 2. Strict Logout on 401
            useAuthStore.getState().logout();

            // 3. Clear Default Header
            delete api.defaults.headers.common['Authorization'];

            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
