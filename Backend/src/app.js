import express from 'express'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import songRouter from './routes/songs.routes.js'
import chatRoomrouter from './routes/cahtRoom.routes.js'
import playlistRouter from './routes/playlist.routes.js'

const app = express()

const clientOrigins = (process.env.CLIENT_URLS || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

app.use(cookieparser())
app.use(cors({
    origin: clientOrigins,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
