import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import connectdb from "./db/index.js";
import { app } from "./app.js";
import { initializeSocket } from './socket/socket.js'
import { Server } from 'socket.io'
import { createServer } from 'http'

const httpServer = createServer(app)

const configuredOrigins = (process.env.CLIENT_URLS || "http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)

const io = new Server(httpServer, {
    cors: {
        origin: (origin, callback) => {
            // Allow server-to-server or requests without origin
            if (!origin) return callback(null, true);
            
            const isAllowed = 
                configuredOrigins.includes(origin) ||
                configuredOrigins.includes('*') ||
                origin.endsWith('.vercel.app') ||
                origin.includes('localhost') ||
                origin.includes('127.0.0.1');

            if (isAllowed) {
                return callback(null, true);
            }
            return callback(null, true);
        },
        methods: ["GET", "POST"],
        credentials: true
    }
})

initializeSocket(io)

const PORT = process.env.PORT || 7000;

connectdb()
    .then(() => {
        httpServer.listen(PORT, () => {
            console.log(`SyncTune Server running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Database connection failed", error);
        process.exit(1);
    })
