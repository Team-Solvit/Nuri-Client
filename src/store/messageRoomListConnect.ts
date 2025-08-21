import {create} from 'zustand';

interface MessageRoomListConnectState {
	isOpen: boolean;
	setOpen: () => void;
}

export const useMessageRoomListConnectStore = create<MessageRoomListConnectState>((set) => ({
	isOpen: false,
	setOpen: () => set((state) => ({isOpen: !state.isOpen})),
}));