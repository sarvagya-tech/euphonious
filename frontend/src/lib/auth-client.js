import { createAuthClient } from "better-auth/react";

const getAuthBaseUrl = () => {
  let url = (import.meta.env.VITE_AUTH_BASE_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:7000").trim();
  url = url.replace(/\/api\/v1\/?$/, '');
  url = url.replace(/\/+$/, '');
  return url;
};

export const authClient = createAuthClient({
  baseURL: getAuthBaseUrl(),
  fetchOptions: {
    credentials: "include",
    onRequest: (context) => {
      try {
        const stored = localStorage.getItem('auth-storage');
        if (stored) {
          const parsed = JSON.parse(stored);
          const token = parsed?.state?.token;
          if (token && context.headers && !context.headers.get?.('authorization')) {
            context.headers.set?.('authorization', `Bearer ${token}`);
          }
        }
      } catch (e) {
        // ignore
      }
    },
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
