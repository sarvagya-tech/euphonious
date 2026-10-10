import { create } from 'zustand';

const useRoomStore = create((set) => ({

    currentRoom: null,
    members: [],
    messages: [],
    isConnected: false,


    setRoom: (room) => set({ currentRoom: room }),
    setMembers: (members) => set({ members }),
    setMessages: (messages) => set({ messages }),
    addMessage: (message) => set((state) => {
        if (message.id && state.messages.some((m) => m.id === message.id)) {
            return state;
        }
        return { ...state, messages: [...state.messages, message] };
    }),
    addMember: (member) => set((state) => ({ ...state, members: [...state.members, member] })),
    removeMember: (memberId) => set((state) => ({ ...state, members: state.members.filter((m) => m._id !== memberId) })),

    setConnected: (status) => set({ isConnected: status }),
    clearRoom: () => set({
        currentRoom: null,
        members: [],
        messages: [],
        isConnected: false
    })
}))

export default useRoomStore;