import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MessageHeaderState {
	chatProfile: string
	chatRoomName: string,
	memberCount : number,
	roomId: string,
	setValues: (payload: { chatProfile: string; chatRoomName: string, memberCount:number, roomId: string }) => void
	incrementMemberCount: () => void
	decrementMemberCount: () => void
}

export const useMessageHeaderStore = create<MessageHeaderState>()(
	persist(
		(set) => ({
			chatProfile: '',
			chatRoomName: '',
			memberCount : 0,
			roomId: '',
			setValues: ({ chatProfile, chatRoomName, memberCount, roomId }) =>
				set({
					chatProfile,
					chatRoomName,
					memberCount,
					roomId
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