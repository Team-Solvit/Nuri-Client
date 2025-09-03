import { create } from "zustand";
import {Meeting} from "@/containers/meetings/accession/type";

interface MeetingState {
	meeting : Meeting | null;
	select : (m : Meeting) => void;
}

export const useMeetingStore = create<MeetingState>((set) => ({
	meeting: null,
	select: (m) => set({ meeting: m }),
}));