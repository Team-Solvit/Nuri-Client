import {create} from 'zustand';

interface ConfirmState {
	isOpen: boolean;
	openConfirm: () => void;
	closeConfirm: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
	isOpen: false,
	openConfirm: () => set({isOpen: true}),
	closeConfirm: () => set({isOpen: false}),
}));