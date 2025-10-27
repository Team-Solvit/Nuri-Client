import {create} from 'zustand';

interface ConfirmState {
	isOpen: boolean;
	type: "sure" | "delete" | "none";
	openConfirm: (type : "sure" | "delete") => void;
	closeConfirm: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
	isOpen: false,
	type : "none",
	openConfirm: (type :  "sure" | "delete") => set({isOpen: true, type : type ?? "none"}),
	closeConfirm: () => set({isOpen: false, type: "none"}),
}));