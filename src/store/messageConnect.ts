import { create } from 'zustand';
interface SubscriptionItem {
	id: string;
	unsubscribe: () => void;
}

interface MessageConnectState {
	subscriptions: Record<string, SubscriptionItem>;
	addSubscription: (id : string, item : SubscriptionItem) => void;
	removeSubscription: (id: string) => void;
	clearSubscriptions: () => void;
}

export const useMessageConnectStore = create<MessageConnectState>((set) => ({
	subscriptions: {},
	
	addSubscription: (id : string, item : SubscriptionItem) =>
		set((state) => {
			return ({
				subscriptions: {
					...state.subscriptions,
					[id]: {id, unsubscribe: item.unsubscribe} ,
				},
			})
		}),
	
	removeSubscription: (id) =>
		set((state) => {
			const newSubs = { ...state.subscriptions };
			const sub = newSubs[id];
			if (!sub) return { subscriptions: newSubs };
			try {
				sub.unsubscribe();
			} catch (e) {
				console.error("unsubscribe 실패:", e);
			}
			delete newSubs[id];
			return { subscriptions: newSubs };
		}),
	
	clearSubscriptions: () =>
		set((state) => {
			Object.values(state.subscriptions).forEach((sub) => sub.unsubscribe());
			return { subscriptions: {} };
		}),
}));