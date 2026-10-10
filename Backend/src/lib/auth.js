import dotenv from "dotenv";
dotenv.config();
import { betterAuth } from "better-auth/minimal";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../db/mongoClient.js";

const defaultOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "https://synctune.vercel.app",
    "https://euphonious-sage.vercel.app",
    "https://*.vercel.app"
];

const envOrigins = (process.env.CLIENT_URLS || process.env.FRONTEND_URL || process.env.BETTER_AUTH_TRUSTED_ORIGINS || "")
    .split(",")
    .map(o => o.trim())
    .filter(Boolean);

const trustedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

const isProduction = process.env.NODE_ENV === "production" || 
    (process.env.BETTER_AUTH_URL && process.env.BETTER_AUTH_URL.startsWith("https://")) ||
    (process.env.CLIENT_URLS && process.env.CLIENT_URLS.includes("https://"));

const frontendUrl = (process.env.FRONTEND_URL || "https://euphonious-sage.vercel.app").replace(/\/+$/, "");

export const auth = betterAuth({
    database: mongodbAdapter(client.db(), {
        client,
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },
    account: {
        storeStateStrategy: "database",
        skipStateCookieCheck: true,
    },
    advanced: {
        useSecureCookies: Boolean(isProduction),
        defaultCookieAttributes: isProduction ? {
            sameSite: "none",
            secure: true,
            partitioned: true,
        } : {
            sameSite: "lax",
            secure: false,
        },
    },
    onAPIError: {
        errorURL: `${frontendUrl}/login`,
    },
    trustedOrigins,
    baseURL: process.env.BETTER_AUTH_URL || process.env.RENDER_EXTERNAL_URL || "http://localhost:7000",
    secret: process.env.BETTER_AUTH_SECRET,
});

export default auth;

