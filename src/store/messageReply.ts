import {create} from 'zustand';
import {ReplyChatInput} from "@/types/message";

interface MessageReplyState {
	reply: null | ReplyChatInput;
	setReply: (reply: null | ReplyChatInput) => void;
	clearReply: () => void;
}

export const useMessageReplyStore = create<MessageReplyState>((set) => ({
	reply: null,
	setReply: (reply) => set({reply}),
	clearReply: () => set({reply: null}),
}));