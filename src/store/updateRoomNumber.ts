import {create} from 'zustand';

interface UpdateRoomNumber {
	roomNumber: number | null
	setRoomNumber: (roomNumber: number) => void
}

export const useUpdateRoomNumber = create<UpdateRoomNumber>((set) => ({
	roomNumber : null,
	setRoomNumber: (num: number) => set({roomNumber: num}),
}));