import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:7000"

const socket = io(SOCKET_URL, {
    autoConnect: true,
    withCredentials: true
})

export const connectSocket = () => {
    if (!socket.connected) {
        socket.connect();
    }
};
export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
    }
};

export const joinRoom = (roomId, userId,code) => {
    socket.emit("joinRoom", { roomId, userId,code });
};

export const leaveRoom = () => {
    socket.emit("leaveRoom");
};

export const sendMessage = (roomId, userId, message) => {
    socket.emit("sendMessage", { roomId, userId, message });

};

export const syncPlay = (roomId, songUrl, position) => {
    socket.emit("playSong", { roomId, songUrl, position });

};

export const syncPause = (roomId, position) => {
    socket.emit("pauseSong", { roomId, position });

};

export const syncSeek = (roomId, position) => {
    socket.emit("seekSong", { roomId, position });
};
export const syncSkip = (roomId, songUrl) => {
    socket.emit("skipSong", { roomId, songUrl });
};

export default socket;

















