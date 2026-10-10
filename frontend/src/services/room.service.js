import api from "./api";

const createRoom = async (name, description) => {
    const response = await api.post('/chatRoom/create', {
        name,
        description,
    });
    return response.data;
};

const joinRoom = async (roomId, code) => {
    const normalized = String(code).trim().toUpperCase();
    const response = await api.post(`/chatRoom/${roomId}/join`, { code: normalized });
    return response.data;
};

const leaveRoomService = async (roomId) => {
    const leftRoom = await api.post(`/chatRoom/${roomId}/leave`);
    return leftRoom;
};

const deleteRoomService = async (roomId) => {
    const deleteRoom = await api.delete(`/chatRoom/${roomId}`);
    return deleteRoom;
};

const getCurrentRoom = async (roomId) => {
    const currentRoom = await api.get(`/chatRoom/${roomId}`);
    return currentRoom.data;
};

const getRoomMessages = async (roomId) => {
    const response = await api.get(`/chatRoom/${roomId}/messages`);
    return response.data;
};

export { createRoom, joinRoom, leaveRoomService, deleteRoomService, getCurrentRoom, getRoomMessages };
