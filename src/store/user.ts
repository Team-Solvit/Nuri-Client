import {create} from 'zustand';

interface UserState {
	id: string;
	role: string;
	setAuth: (id: string, role: string) => void
}

export const useUserStore = create<UserState>((set) => ({
	id: '',
	role: '',
	setAuth: (id, role) => set({id, role}),
}));