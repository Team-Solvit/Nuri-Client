import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MessageHeaderState {
	chatProfile: string
	chatRoomName: string
	setValues: (payload: { chatProfile: string; chatRoomName: string }) => void
}

export const useMessageHeaderStore = create<MessageHeaderState>()(
	persist(
		(set) => ({
			chatProfile: '',
			chatRoomName: '',
			setValues: ({ chatProfile, chatRoomName }) =>
				set({
					chatProfile,
					chatRoomName,
				}),
		}),
		{
			name: 'message-header-store',
		}
	)
)