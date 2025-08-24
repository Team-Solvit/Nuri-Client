import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type State = {
	id: string | null;
	role: string | null;
	accessToken: string | null;
	setAuth: (id: string, role: string, AT: string) => void;
	clear: () => void;
};

export const useUserStore = create<State>()(
	persist(
		(set) => ({
			id: null,
			role: null,
			accessToken: null,
			setAuth: (id, role, AT) => set({id, role, accessToken: AT}),
			clear: () => set({id: null, role: null, accessToken: null}),
		}),
		{name: 'nuri-user'}
	)
);
