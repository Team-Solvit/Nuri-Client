import { create } from 'zustand';

interface UpdateRoomNumber {
	roomNumber: string | null;
	setRoomNumber: (roomNumber: string) => void;
	
	refetch: (() => void) | null;
	setRefetch: (fn: () => void) => void;
}

export const useUpdateRoomNumber = create<UpdateRoomNumber>((set) => ({
	roomNumber: null,
	setRoomNumber: (num: string) => set({ roomNumber: num }),
	
	refetch: null,
	setRefetch: (fn: () => void) => set({ refetch: fn }),
}));