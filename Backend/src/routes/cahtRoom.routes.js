import { Router } from "express";
import { createchatRoom, deleteRoom, getcurrentRoom, joiningRoom, leaveRoom, getRoomMessages } from "../controller/chatRoom.controller.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";

const chatRoomrouter = Router();

chatRoomrouter.post('/create', verifyJwt, createchatRoom);
chatRoomrouter.post('/:roomId/join', verifyJwt, joiningRoom);
chatRoomrouter.post('/:roomId/leave', verifyJwt, leaveRoom);
chatRoomrouter.delete('/:roomId', verifyJwt, deleteRoom);
chatRoomrouter.get('/:roomId', verifyJwt, getcurrentRoom);
chatRoomrouter.get('/:roomId/messages', verifyJwt, getRoomMessages);

export default chatRoomrouter;