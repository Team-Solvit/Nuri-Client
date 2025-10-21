import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MessageHeaderState {
	chatProfile: string
	chatRoomName: string,
	memberCount : number,
	setValues: (payload: { chatProfile: string; chatRoomName: string, memberCount:number }) => void
	incrementMemberCount: () => void
	decrementMemberCount: () => void
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
			incrementMemberCount: () =>
				set((state) => ({
					memberCount: state.memberCount + 1
				})),
			decrementMemberCount: () =>
				set((state) => ({
					memberCount: Math.max(0, state.memberCount - 1)
				})),
		}),
		{
			name: 'message-header-store',
		}
	)
)