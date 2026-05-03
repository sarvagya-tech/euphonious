import api from "./api";

const createRoom = async (name, description,) => {
    try {
        const newRoom = await api.post('/chatRoom/create', {
            name,
            description,


        });
        return newRoom;

    } catch (error) {
        console.log("error in the creating the room", error)

    }
}
const joinRoom = async (roomId, code) => {
    try {
        const joinedRoom = await api.post(`/chatRoom/${roomId}/join`, { code });
        return joinedRoom;
    } catch (error) {
        console.log("error in the joining the room", error)
    }
}
const leaveRoomService = async (roomId) => {
    try {
        const leftRoom = await api.post(`/chatRoom/${roomId}/leave`);
        return leftRoom;
    } catch (error) {
        console.log("error in the leaving the room", error)
    }
}
const deleteRoomService = async (roomId) => {
    try {
        const deleteRoom = await api.delete(`/chatRoom/${roomId}`);
        return deleteRoom;
    } catch (error) {
        console.log("error in the deleting the room", error)
    }
}
const getCurrentRoom = async (roomId) => {
    try {
        const currentRoom = await api.get(`/chatRoom/${roomId}`);
        return currentRoom;
    } catch (error) {
        console.log("error in the getting the current room", error)
    }
}
export { createRoom, joinRoom, leaveRoomService, deleteRoomService, getCurrentRoom }