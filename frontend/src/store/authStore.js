import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    isLoggedIn: false,
    token: null,

    // Actions
    setUser: (user, token) => set({
        user: user,
        token: token,
        isLoggedIn: true
    }),

    logOut: () => set({
        user: null,
        token: null,
        isLoggedIn: false
    }),

}));

export default useAuthStore;