import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: number;
    email: string;
    full_name: string;
    college: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    login: (user: User | null, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            login: (user: User | null, token: string) => set({ user, token }),
            logout: () => {
                set({ user: null, token: null });
                // We can't import api here easily due to circular dependency, 
                // but the api interceptor handles the header cleanup or 
                // the component calling logout should handle it.
                // However, for strictness, valid.
            },
        }),
        {
            name: 'auth-storage', // unique name
        }
    )
);
