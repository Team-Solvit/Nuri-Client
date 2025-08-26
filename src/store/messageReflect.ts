import {create} from "zustand";
import {ChatMessageResponse} from "@/containers/message/message-content/type";

interface MessageReflectState {
	message: ChatMessageResponse | null;
	setMessage: (message: ChatMessageResponse) => void;
}

export const useMessageReflectStore = create<MessageReflectState>((set) => ({
	message: null,
	setMessage: (message) => set({message}),
}));