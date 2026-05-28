import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isLoggedIn: false,
            token: null,

            setUser: (user, token) => set({
                user,
                token,
                isLoggedIn: true
            }),

            logOut: () => set({
                user: null,
                token: null,
                isLoggedIn: false
            }),
        }),
        {
            name: 'auth-storage',
        }
    )
);

export default useAuthStore;
