import Message from "../model/message.model.js";
import Room from "../model/chatRoom.model.js";

const users = new Map(); // socket.id -> { userId, roomId }

const initializeSocket = (io) => {

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);


        // JOIN ROOM (requires valid access code unless user is the host)

        socket.on("joinRoom", async (data) => {
            const { roomId, userId, code } = data;

            if (!roomId || !userId) {
                return socket.emit("joinError", { message: "Room id and user id are required" });
            }

            try {
                const room = await Room.findById(roomId).select("code isroomActive hostedBy");
                if (!room || !room.isroomActive) {
                    return socket.emit("joinError", { message: "Room not found or inactive" });
                }

                const normalized = code != null ? String(code).trim().toUpperCase() : "";
                const isHost =
                    room.hostedBy && String(room.hostedBy) === String(userId);

                if (isHost) {
                    if (normalized && normalized !== room.code) {
                        return socket.emit("joinError", { message: "Invalid access code" });
                    }
                } else {
                    if (!normalized || normalized !== room.code) {
                        return socket.emit("joinError", { message: "Invalid access code" });
                    }
                }

                socket.join(roomId);
                users.set(socket.id, { userId, roomId });

                io.to(roomId).emit("userJoined", {
                    userId,
                    message: "User joined the room",
                });
            } catch (err) {
                console.error("joinRoom socket error:", err);
                socket.emit("joinError", { message: "Could not verify room" });
            }
        });


        // SEND MESSAGE

        socket.on("sendMessage", async (data) => {
            const { roomId, userId, message } = data;

            if (!roomId || !userId || !message) return;

            try {
                await Message.create({
                    room: roomId,
                    sender: userId,
                    message,
                });

                io.to(roomId).emit("newMessage", {
                    userId,
                    message,
                    time: Date.now(),
                });

            } catch (err) {
                console.error("Message error:", err);
            }
        });


        // PLAY SONG (SYNCED)

        socket.on("playSong", (data) => {
            const { roomId, songUrl, position } = data;

            if (!roomId || !songUrl) return;

            socket.to(roomId).emit("playSong", {
                songUrl,
                startedAt: Date.now() - position, // 🔥 sync fix
            });
        });


        // PAUSE SONG

        socket.on("pauseSong", (data) => {
            const { roomId, position } = data;

            if (!roomId) return;

            socket.to(roomId).emit("pauseSong", {
                position,
            });
        });


        // SEEK SONG

        socket.on("seekSong", (data) => {
            const { roomId, position } = data;

            if (!roomId) return;

            socket.to(roomId).emit("seekSong", {
                position,
            });
        });


        // SKIP SONG

        socket.on("skipSong", (data) => {
            const { roomId, songUrl } = data;

            if (!roomId || !songUrl) return;

            io.to(roomId).emit("skipSong", {
                songUrl,
            });
        });

        // LEAVE ROOM

        socket.on("leaveRoom", () => {
            const user = users.get(socket.id);

            if (!user) return;

            socket.leave(user.roomId);

            io.to(user.roomId).emit("userLeft", {
                userId: user.userId,
            });

            users.delete(socket.id);
        });


        // DISCONNECT

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);

            const user = users.get(socket.id);

            if (user) {
                io.to(user.roomId).emit("userLeft", {
                    userId: user.userId,
                });

                users.delete(socket.id);
            }
        });

    });
};

export { initializeSocket };