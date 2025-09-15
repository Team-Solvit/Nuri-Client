import { create } from 'zustand';

interface IsEnteringMeetingState {
	isEnteringMeeting: boolean;
	isSendRequest: boolean | string;
	isFree: boolean;
	setEnteringMeeting: () => void;
	setSendRequest: (name : string) => void;
	setFree: () => void;
}

export const useIsEnteringMeetingStore = create<IsEnteringMeetingState>((set) => ({
	isEnteringMeeting: false,
	isSendRequest: false,
	isFree: false,
	
	setEnteringMeeting: () => set({
		isEnteringMeeting: true,
		isSendRequest: false,
		isFree: false,
	}),
	
	setSendRequest: (name : string) => set({
		isEnteringMeeting: false,
		isSendRequest: name,
		isFree: false,
	}),
	
	setFree: () => set({
		isEnteringMeeting: false,
		isSendRequest: false,
		isFree: true,
	}),
}));