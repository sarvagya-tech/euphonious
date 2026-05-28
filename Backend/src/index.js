
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import connectdb from "./db/index.js";

import { app } from "./app.js";
import { initializeSocket } from './socket/socket.js'
import { Server } from 'socket.io'
import { createServer } from 'http'
const httpServer = createServer(app)
const clientOrigins = (process.env.CLIENT_URLS || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
const io = new Server(httpServer, {
    cors: {
        origin: clientOrigins,
        methods: ["GET", "POST"],
        credentials: true
    }
})
initializeSocket(io)


connectdb()

.then(()=>{
    httpServer.listen(process.env.PORT,()=>{
        console.log(`server running on ${process.env.PORT}`)
    })
    })
.catch((error)=>{
    console.log("connection failed",error)
    process.exit(1)
    
})

