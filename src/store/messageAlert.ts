import {create} from 'zustand';

interface MessageAlertState {
	isStatus: "none" | "in";
	isVisible: boolean;
	isLeavingAnimation: boolean;
	ima_url: string | null;
	user_id: string;
	content: string;
	date: string;
	chat_id: string;
	none: () => void;
	setIsLeavingAnimation: (isLeaving: boolean) => void;
	fadeIn: (url: string | null, chat_id:string, user_id: string, content: string, date: string) => void;
}

export const useMessageAlertStore = create<MessageAlertState>((set) => ({
	isStatus: "none",
	isVisible: false,
	isLeavingAnimation: false,
	ima_url: null,
	user_id: '',
	content: '',
	chat_id: '',
	date: '',
	none: () => {
		set({
			isStatus: 'none',
			ima_url: '',
			user_id: '',
			date: '',
			content: '',
			isVisible: false,
			chat_id : '',
		});
	},
	setIsLeavingAnimation: (isLeaving: boolean) => {
		set({
			isLeavingAnimation: isLeaving,
		})
	},
	fadeIn: (url: string | null, chat_id:string, user_id: string, content: string, date: string) => {
		// init 용 set
		set({
			isStatus: 'none',
			isVisible: false,
			isLeavingAnimation: false,
			ima_url: '',
			user_id: '',
			content: '',
			date: '',
			chat_id : '',
		});
		// 실제 set
		setTimeout(() => {
			set({
				isStatus: 'in',
				ima_url: url,
				user_id: user_id,
				content: content,
				date: date,
				isVisible: true,
				isLeavingAnimation: true,
				chat_id : chat_id
			});
		}, 0);
	},
}));