import { create } from "zustand";
import type { MeetingListItem } from '@/types/group';

interface MeetingState {
  selected: MeetingListItem | null;
  select: (m: MeetingListItem) => void;
}

export const useMeetingStore = create<MeetingState>((set) => ({
  selected: null,
  select: (m) => set({ selected: m }),
}));