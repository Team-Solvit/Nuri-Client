import { create } from 'zustand';
import {Accession} from "@/containers/meetings/accession/type";

interface MeetingAccessionData {
	accessMeeting: Accession
	setAccession: (meeting : Accession) => void;
}

export const useMeetingAccessionStore = create<MeetingAccessionData>((set) => ({
	accessMeeting: {
		groupId : "",
		name : "",
	},
	setAccession: (meeting : Accession) => set({accessMeeting : meeting}),
}));