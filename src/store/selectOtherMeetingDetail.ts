import { create } from 'zustand';

interface SelectOtherMeetingDetailState {
	meetingName: string;
	setSelect: (name : string) => void;
	meetingId : string | null;
	setMeetingId : (id : string) => void;
}

export const useSelectOtherMeetingDetailStore = create<SelectOtherMeetingDetailState>((set) => ({
	meetingName: "",
	setSelect: (name : string) => set({meetingName : name}),
	meetingId : null,
	setMeetingId : (id : string) => set({meetingId : id}),
}));