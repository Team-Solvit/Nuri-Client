import { create } from "zustand";

interface MeetingListItem {
  id: number;
  title: string;
  time: string;
  location: string;
}

interface MeetingState {
  selected: MeetingListItem | null;
  select: (m: MeetingListItem) => void;
}

export const useMeetingStore = create<MeetingState>((set) => ({
  selected: null,
  select: (m) => set({ selected: m }),
}));