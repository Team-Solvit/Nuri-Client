import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

interface UpdateRoomNumber {
	roomNumber: string | null;
	setRoomNumber: (roomNumber: string) => void;
	
	refetch: (() => void) | null;
	setRefetch: (fn: () => void) => void;
}

export const useUpdateRoomNumber = create<UpdateRoomNumber>()(
	persist(
		(set) => ({
			roomNumber: null,
			setRoomNumber: (num: string) => set({roomNumber: num}),
			
			refetch: null,
			setRefetch: (fn: () => void) => set({refetch: fn}),
		}),
		{
			name: 'nuri/update-room-number',
			storage: typeof window !== 'undefined'
				? createJSONStorage(() => sessionStorage)
				: undefined,
			partialize: (state) => ({
				roomNumber: state.roomNumber,
			}),
			version: 1,
		}
	)
);