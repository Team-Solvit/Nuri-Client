import { create } from 'zustand';

interface MessageConnectState {
	subscriptions: Record<string, { id: string; unsubscribe: () => void }>;
	addSubscription: (id: string, unsubscribe: () => void) => void;
	removeSubscription: (id: string) => void;
	clearSubscriptions: () => void;
}

export const useMessageConnectStore = create<MessageConnectState>((set) => ({
	subscriptions: {},
	
	addSubscription: (id, unsubscribe) =>
		set((state) => ({
			subscriptions: {
				...state.subscriptions,
				[id]: { id, unsubscribe },
			},
		})),
	
	removeSubscription: (id) =>
		set((state) => {
			const newSubs = { ...state.subscriptions };
			delete newSubs[id];
			return { subscriptions: newSubs };
		}),
	
	clearSubscriptions: () =>
		set((state) => {
			Object.values(state.subscriptions).forEach((sub) => sub.unsubscribe());
			return { subscriptions: {} };
		}),
}));