import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:7000"

export const socket = io(SOCKET_URL, {
    autoConnect: false,
    withCredentials: true
})

export const















export default socket;