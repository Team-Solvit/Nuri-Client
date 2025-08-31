import {create} from 'zustand';

interface MessageHeaderState {
	chatProfile: string;
	chatRoomName: string;
	setValues: ({chatProfile, chatRoomName}: { chatProfile: string; chatRoomName: string }) => void;
}

export const useMessageHeaderStore = create<MessageHeaderState>((set) => ({
	chatProfile: '',
	chatRoomName: '',
	setValues: ({chatProfile, chatRoomName}) => set({
		chatProfile,
		chatRoomName
	}),
}));