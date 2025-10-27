import { create } from "zustand";

interface ContentReadFetchState {
	isActivate: boolean;
	setActivate: () => void;
}

export const useMessageContentReadFetchStore = create<ContentReadFetchState>((set) => ({
	isActivate: false,
	setActivate: () => set((state) => ({ isActivate: !state.isActivate })),
}));