import { create } from 'zustand';

interface IsEnteringMeetingState {
	isEnteringMeeting: boolean;
	isSendRequest: boolean;
	isFree: boolean;
	setEnteringMeeting: () => void;
	setSendRequest: () => void;
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
	
	setSendRequest: () => set({
		isEnteringMeeting: false,
		isSendRequest: true,
		isFree: false,
	}),
	
	setFree: () => set({
		isEnteringMeeting: false,
		isSendRequest: false,
		isFree: true,
	}),
}));