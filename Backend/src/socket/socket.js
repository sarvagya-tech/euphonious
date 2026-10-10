import Message from "../model/message.model.js";
import Room from "../model/chatRoom.model.js";
import User from "../model/user.model.js";
import { client } from "../db/mongoClient.js";
import { ObjectId } from "mongodb";

const users = new Map(); // socket.id -> { userId, roomId, userName }

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

                const normalized = code != null ? String(code) : "";
                const isHost =
                    room.hostedBy && String(room.hostedBy) === String(userId);

                if (isHost) {
                    if (normalized && normalized !== room.code) {
                        return socket.emit("joinError", { message: "Invalid access code" });
                    }
                } else {
                    if (!normalized || normalized !== room.code) {
                        console.log(normalized, room.code);
                        return socket.emit("joinError", { message: "Invalid access code" });
                    }
                }

                const clientUserName = data.userName || data.senderName;
                socket.join(roomId);
                users.set(socket.id, { userId, roomId, userName: clientUserName });

                io.to(roomId).emit("userJoined", {
                    userId,
                    userName: clientUserName || "User",
                    message: `${clientUserName || "User"} joined the room`,
                });
            } catch (err) {
                console.error("joinRoom socket error:", err);
                socket.emit("joinError", { message: "Could not verify room" });
            }
        });


        // SEND MESSAGE

        socket.on("sendMessage", async (data) => {
            const { roomId, userId, message, senderName, userName } = data;

            if (!roomId || !userId || !message) return;

            try {
                let resolvedName = senderName || userName || users.get(socket.id)?.userName;

                if (!resolvedName) {
                    // 1. Try finding in Mongoose User model
                    const mongooseUser = await User.findById(userId).select('fullname').catch(() => null);
                    if (mongooseUser?.fullname) {
                        resolvedName = mongooseUser.fullname;
                    }
                }

                if (!resolvedName) {
                    // 2. Try finding in Better Auth MongoDB 'user' collection
                    try {
                        const isObjectId = ObjectId.isValid(userId);
                        const query = isObjectId ? { _id: new ObjectId(userId) } : { _id: userId };
                        const betterAuthUser = await client.db().collection('user').findOne(query);
                        if (betterAuthUser?.name || betterAuthUser?.fullname) {
                            resolvedName = betterAuthUser.name || betterAuthUser.fullname;
                        }
                    } catch (dbErr) {
                        console.error("Better Auth lookup error in socket:", dbErr);
                    }
                }

                resolvedName = resolvedName || 'SyncTune User';

                await Message.create({
                    room: roomId,
                    sender: userId,
                    message,
                }).catch(() => null);

                io.to(roomId).emit("newMessage", {
                    userId,
                    senderName: resolvedName,
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