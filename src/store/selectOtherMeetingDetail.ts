import { create } from 'zustand';

interface SelectOtherMeetingDetailState {
	meetingName: string;
	setSelect: (name : string) => void;
	meetingId : number | null;
	setMeetingId : (id : number) => void;
}

export const useSelectOtherMeetingDetailStore = create<SelectOtherMeetingDetailState>((set) => ({
	meetingName: "",
	setSelect: (name : string) => set({meetingName : name}),
	meetingId : null,
	setMeetingId : (id : number) => set({meetingId : id}),
}));