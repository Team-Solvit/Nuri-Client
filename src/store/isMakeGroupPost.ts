import {create} from 'zustand';

interface IsMakeGroupPostState {
	isGroup: boolean;
	setGroup: () => void;
	unsetGroup: () => void;
}

export const useIsMakeGroupPostStore = create<IsMakeGroupPostState>((set) => ({
	isGroup: false,
	setGroup: () => set({isGroup: true}),
	unsetGroup: () => set({isGroup: false}),
}));