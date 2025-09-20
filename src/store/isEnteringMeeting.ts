import { create } from 'zustand';

interface IsEnteringMeetingState {
	isEnteringMeeting: boolean | string;
	isSendRequest: boolean | string;
	isFree: boolean;
	setEnteringMeeting: (name : string) => void;
	setSendRequest: (name : string) => void;
	setFree: () => void;
}

export const useIsEnteringMeetingStore = create<IsEnteringMeetingState>((set) => ({
	isEnteringMeeting: false,
	isSendRequest: false,
	isFree: false,
	
	setEnteringMeeting: (name : string) => set({
		isEnteringMeeting: name,
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