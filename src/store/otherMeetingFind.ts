import {create} from 'zustand';

interface OtherMeetingFind {
	find: boolean
	setFind: (find: boolean) => void
}

export const useOtherMeetingFind = create<OtherMeetingFind>((set) => ({
	find: false,
	setFind: (find: boolean) => set({find}),
}));