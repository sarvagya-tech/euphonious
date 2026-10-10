import Message from "../model/message.model.js";
import Room from "../model/chatRoom.model.js";
import User from "../model/user.model.js";
import { client } from "../db/mongoClient.js";
import { ObjectId } from "mongodb";

const users = new Map(); // socket.id -> { userId, roomId, userName }

const initializeSocket = (io) => {

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);


        // JOIN ROOM (authenticates and connects to room, sends message history)

        socket.on("joinRoom", async (data) => {
            const { roomId, userId, code } = data || {};

            if (!roomId || !userId) {
                return socket.emit("joinError", { message: "Room id and user id are required" });
            }

            try {
                const room = await Room.findById(roomId).select("code isroomActive hostedBy members");
                if (!room || !room.isroomActive) {
                    return socket.emit("joinError", { message: "Room not found or inactive" });
                }

                const normalized = code != null ? String(code).trim().toUpperCase() : "";
                const roomCode = room.code ? String(room.code).trim().toUpperCase() : "";
                const isHost = room.hostedBy && String(room.hostedBy?._id || room.hostedBy) === String(userId);
                const isMember = Array.isArray(room.members) && room.members.some(m => String(m?._id || m) === String(userId));

                // If code was explicitly provided and differs from room code, AND user is neither host nor existing member
                if (normalized && roomCode && normalized !== roomCode && !isHost && !isMember) {
                    return socket.emit("joinError", { message: "Invalid access code" });
                }

                const clientUserName = data.userName || data.senderName || "SyncTune User";
                socket.join(roomId);
                users.set(socket.id, { userId, roomId, userName: clientUserName });

                // Ensure user is in members array in DB if not host
                if (!isHost && !isMember) {
                    const memberIdToPush = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;
                    await Room.findByIdAndUpdate(roomId, {
                        $addToSet: { members: memberIdToPush }
                    }).catch(() => null);
                }

                // 1. Send recent message history to this joining socket
                try {
                    const queryRoomId = ObjectId.isValid(roomId) ? new ObjectId(roomId) : roomId;
                    const rawHistory = await Message.find({
                        $or: [{ room: queryRoomId }, { room: roomId }]
                    })
                    .sort({ createdAt: 1 })
                    .limit(50)
                    .lean();

                    const senderIds = [...new Set(rawHistory.map(m => m.sender?.toString()).filter(Boolean))];
                    const usersMap = {};

                    for (const sId of senderIds) {
                        try {
                            const isObjId = ObjectId.isValid(sId);
                            const q = isObjId ? { _id: new ObjectId(sId) } : { _id: sId };
                            const mUser = await User.findById(sId).select('fullname').lean().catch(() => null);
                            if (mUser?.fullname) {
                                usersMap[sId] = mUser.fullname;
                                continue;
                            }
                            const bUser = await client.db().collection('user').findOne(q).catch(() => null);
                            if (bUser?.name || bUser?.fullname) {
                                usersMap[sId] = bUser.name || bUser.fullname;
                                continue;
                            }
                        } catch (e) {}
                        usersMap[sId] = 'SyncTune User';
                    }

                    const messageHistory = rawHistory.map(m => {
                        const sId = m.sender?.toString();
                        return {
                            _id: m._id.toString(),
                            userId: sId,
                            senderName: m.senderName || usersMap[sId] || 'SyncTune User',
                            message: m.message,
                            createdAt: m.createdAt,
                            time: m.createdAt ? new Date(m.createdAt).getTime() : Date.now(),
                        };
                    });

                    socket.emit("messageHistory", messageHistory);
                } catch (histErr) {
                    console.error("Error fetching message history in socket:", histErr);
                }

                // 2. Broadcast userJoined to the room
                io.to(roomId).emit("userJoined", {
                    userId,
                    userName: clientUserName,
                    message: `${clientUserName} joined the room`,
                });
            } catch (err) {
                console.error("joinRoom socket error:", err);
                socket.emit("joinError", { message: "Could not verify room" });
            }
        });


        // SEND MESSAGE

        socket.on("sendMessage", async (data) => {
            const { roomId, userId, message, senderName, userName } = data || {};

            if (!roomId || !userId || !message) return;

            // Make sure the sending socket is inside the room
            if (!socket.rooms.has(roomId)) {
                socket.join(roomId);
            }

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

                const senderObjectId = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;
                const roomObjectId = ObjectId.isValid(roomId) ? new ObjectId(roomId) : roomId;

                const newMsg = await Message.create({
                    room: roomObjectId,
                    sender: senderObjectId,
                    senderName: resolvedName,
                    message: String(message).trim(),
                }).catch((err) => {
                    console.error("Error saving message in socket:", err);
                    return null;
                });

                io.to(roomId).emit("newMessage", {
                    _id: newMsg?._id?.toString() || String(Date.now()),
                    userId: String(userId),
                    senderName: resolvedName,
                    message: String(message).trim(),
                    time: Date.now(),
                    createdAt: new Date(),
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