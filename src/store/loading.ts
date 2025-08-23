import {create} from 'zustand';

interface LoadingState {
	isVisible: boolean;
	none: () => void;
	show: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
	isVisible: false,
	none: () => {
		set({
			isVisible: false,
		});
	},
	show: () => {
		console.log("show")
		// init 용 set
		set({
			isVisible: false,
		});
		// 실제 set
		setTimeout(() => {
			set({
				isVisible: true,
			});
		}, 0);
	}
}));