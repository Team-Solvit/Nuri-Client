import {create} from 'zustand';

interface MessageDmManageState {
	isOpen: boolean;
	chatRoomId: string;
	chatProfile: string;
	chatRoomName: string;
	setValues: (params: {
		chatRoomId: string;
		chatProfile: string;
		chatRoomName: string;
		isOpen: boolean;
	}) => void;
}

export const useMessageDmManageStore = create<MessageDmManageState>((set) => ({
	isOpen: false,
	chatRoomId: '',
	chatProfile: '',
	chatRoomName: '',
	setValues: ({chatRoomId, chatProfile, chatRoomName, isOpen}) => set({
		isOpen: isOpen,
		chatRoomId,
		chatProfile,
		chatRoomName
	}),
}));