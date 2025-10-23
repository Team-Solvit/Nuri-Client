import {create} from "zustand";
import {ChatMessageResponse} from "@/containers/message/message-content/type";

type LoadingState = Record<string, { status: boolean; content: string | null; createAt: string | null }>;

interface MessageReflectState {
	message: ChatMessageResponse | null;
	setMessage: (message: ChatMessageResponse) => void;
	setLoading: (loadingState: Partial<LoadingState>) => void;
	setFalseLoading: (key: string) => void;
	isLoading: LoadingState;
}

export const useMessageReflectStore = create<MessageReflectState>((set) => ({
	message: null,
	setMessage: (message) => set({message}),
	setLoading: (loadingState) =>
		set((state) => {
			const newLoadingState = {...state.isLoading};
				Object.entries(loadingState).forEach(([key, value]) => {
					newLoadingState[key] = {
						...(state.isLoading[key] ?? {}),
				...(value ?? {}),
				};
			});
			return {...state, isLoading: newLoadingState};
		}),
	setFalseLoading: (key) =>
		set((state) => ({
			...state,
			isLoading: {
				...state.isLoading,
				[key]: {status: false, content: null, createAt: null}
			}
		})),
	isLoading: {},
}));