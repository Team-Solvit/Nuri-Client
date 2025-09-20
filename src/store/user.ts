import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
	id: string | null;
	role: string | null;
	setAuth: (id: string, role: string) => void;
	clear: () => void;
};

export const useUserStore = create<State>()(
	persist(
		(set) => ({
			id: null,
			role: null,
			setAuth: (id, role) => set({ id, role }),
			clear: () => set({ id: null, role: null }),
		}),
		{ name: 'nuri-user' }
	)
);