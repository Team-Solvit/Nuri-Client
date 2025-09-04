import {create} from 'zustand';

interface AlertState {
	isStatus: "none" | "success" | "error";
	isVisible: boolean;
	isLeavingAnimation: boolean;
	description: string;
	none: () => void;
	setIsLeavingAnimation: (isLeaving: boolean) => void;
	success: (des: string) => void;
	error: (des: string) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
	isStatus: 'none',
	isVisible: false,
	isLeavingAnimation: false,
	description: '',
	none: () => {
		set({
			isStatus: 'none',
			description: '',
			isVisible: false,
		});
	},
	setIsLeavingAnimation: (isLeaving: boolean) => {
		set({
			isLeavingAnimation: isLeaving,
		})
	},
	success: (des: string) => {
		// init 용 set
		set({
			isStatus: 'none',
			isVisible: false,
			isLeavingAnimation: false,
			description: '',
		});
		// 실제 set
		setTimeout(() => {
			set({
				isStatus: 'success',
				description: des,
				isVisible: true,
				isLeavingAnimation: true
			});
		}, 0);
	},
	error: (des: string) => {
		// init 용 set
		set({
			isStatus: 'none',
			isVisible: false,
			isLeavingAnimation: false,
			description: '',
		});
		// 실제 set
		setTimeout(() => {
			set({
				isStatus: 'error',
				description: des,
				isVisible: true,
				isLeavingAnimation: true
			});
		}, 0);
	},
}));