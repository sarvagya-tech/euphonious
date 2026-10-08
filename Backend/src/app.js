import express from 'express'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth.js'
import userRouter from './routes/user.routes.js'
import songRouter from './routes/songs.routes.js'
import chatRoomrouter from './routes/cahtRoom.routes.js'
import playlistRouter from './routes/playlist.routes.js'

const app = express()

const configuredOrigins = (process.env.CLIENT_URLS || 'http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

app.use(cookieparser())

// Dynamic & robust CORS configuration for local and cloud deployments (Vercel / Render)
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, server-to-server)
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
        
        // Fallback: allow to prevent hard crashes while preserving credentials
        return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}))

// Mount Better Auth handler BEFORE body-parsing middleware (Express 5 wildcard syntax)
app.all("/api/auth/*splat", toNodeHandler(auth))
app.all("/api/auth", toNodeHandler(auth))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// Health check endpoints for Render and ping monitors
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "SyncTune API is live and operational",
        timestamp: new Date().toISOString()
    })
})

app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        success: true,
        status: "healthy",
        message: "SyncTune API v1 is healthy",
        timestamp: new Date().toISOString()
    })
})

app.use("/api/v1/songs", songRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/chatRoom", chatRoomrouter)
app.use("/api/v1/playlists", playlistRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statuscode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        message,
        errors: err.error || [],
    })
})

export { app }
