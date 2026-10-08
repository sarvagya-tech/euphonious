import dotenv from "dotenv";
dotenv.config();
import { betterAuth } from "better-auth/minimal";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../db/mongoClient.js";

const defaultOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "https://synctune.vercel.app"
];

const envOrigins = (process.env.CLIENT_URLS || process.env.FRONTEND_URL || process.env.BETTER_AUTH_TRUSTED_ORIGINS || "")
    .split(",")
    .map(o => o.trim())
    .filter(Boolean);

const trustedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

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
    trustedOrigins,
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:7000",
    secret: process.env.BETTER_AUTH_SECRET,
});

export default auth;

