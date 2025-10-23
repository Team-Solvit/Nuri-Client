import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LoginUserResponse } from '@/types/auth';

type State = {
	id: string | null;
	userId: string | null;
	country: string | null;
	language: string | null;
	name: string | null;
	email: string | null;
	phoneNumber: string | null;
	profile: string | null;
	role: string | null;
	setAuth: (user: LoginUserResponse) => void;
	clear: () => void;
};

export const useUserStore = create<State>()(
	persist(
		(set) => ({
			id: null,
			userId: null,
			country: null,
			language: null,
			name: null,
			email: null,
			phoneNumber: null,
			profile: null,
			role: null,
			setAuth: (user) =>
				set({
					id: user.id,
					userId: user.userId,
					country: user.country,
					language: user.language,
					name: user.name,
					email: user.email,
					phoneNumber: user.phoneNumber,
					profile: user.profile,
					role: user.role,
				}),
			clear: () =>
				set({
					id: null,
					userId: null,
					country: null,
					language: null,
					name: null,
					email: null,
					phoneNumber: null,
					profile: null,
					role: null,
				}),
		}),
		{ name: 'nuri-user' }
	)
);
