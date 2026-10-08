import dotenv from "dotenv";
dotenv.config();
import { betterAuth } from "better-auth/minimal";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../db/mongoClient.js";

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
    trustedOrigins: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://synctune.vercel.app"
    ],
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:7000",
    secret: process.env.BETTER_AUTH_SECRET,
});

export default auth;

