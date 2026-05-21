import { Router } from "express";
import { createchatRoom, deleteRoom, getcurrentRoom, joiningRoom, leaveRoom } from "../controller/chatRoom.controller.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";

const chatRoomrouter = Router();

chatRoomrouter.post('/create', verifyJwt, createchatRoom);
chatRoomrouter.post('/:roomId/join', verifyJwt, joiningRoom);
chatRoomrouter.post('/:roomId/leave', verifyJwt, leaveRoom);
chatRoomrouter.delete('/:roomId', verifyJwt, deleteRoom);
chatRoomrouter.get('/:roomId', verifyJwt, getcurrentRoom);

export default chatRoomrouter;