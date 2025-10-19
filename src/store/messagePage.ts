import {create} from "zustand";

type MessagePageState = {
  page: number;
  setPage: (p: number) => void;
  resetPage: () => void;
};

export const useMessagePageStore = create<MessagePageState>((set) => ({
  page: 0,
  setPage: (p: number) => set({ page: p }),
  resetPage: () => set({ page: 0 }),
}));

