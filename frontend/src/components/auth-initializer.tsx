"use client";

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store';
import api from '@/lib/api';

export default function AuthInitializer() {
    const { token, user, login, logout } = useAuthStore();

    useEffect(() => {
        const initAuth = async () => {
            if (token && !user) {
                try {
                    const res = await api.get("/users/me");
                    login(res.data, token);
                } catch (error) {
                    // If this fails (e.g. 401), interceptor handles logout
                }
            }
        };

        if (token) {
            // CRITICAL: Set default header immediately on load
            // This ensures strict compliance with user request
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            initAuth();
        }
    }, [token, user, login, logout]);

    return null;
}
