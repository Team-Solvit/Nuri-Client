import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MessageHeaderState {
	chatProfile: string
	chatRoomName: string,
	memberCount : number,
	setValues: (payload: { chatProfile: string; chatRoomName: string, memberCount:number }) => void
}

export const useMessageHeaderStore = create<MessageHeaderState>()(
	persist(
		(set) => ({
			chatProfile: '',
			chatRoomName: '',
			memberCount : 0,
			setValues: ({ chatProfile, chatRoomName, memberCount }) =>
				set({
					chatProfile,
					chatRoomName,
					memberCount
				}),
		}),
		{
			name: 'message-header-store',
		}
	)
)