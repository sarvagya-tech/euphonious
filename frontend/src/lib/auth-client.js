import { createAuthClient } from "better-auth/react";

const getAuthBaseUrl = () => {
  let url = (import.meta.env.VITE_AUTH_BASE_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:7000").trim();
  url = url.replace(/\/api\/v1\/?$/, '');
  url = url.replace(/\/+$/, '');
  return url;
};

export const authClient = createAuthClient({
  baseURL: getAuthBaseUrl(),
});

export const { signIn, signUp, signOut, useSession } = authClient;
