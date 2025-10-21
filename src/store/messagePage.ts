import {create} from "zustand";
import { RoomReadResponseDto } from "@/types/message";

type MessagePageState = {
  page: number;
  setPage: (p: number) => void;
  resetPage: () => void;
  roomDataList: RoomReadResponseDto[];
  setRoomDataList: (rooms: RoomReadResponseDto[]) => void;
  addRoomDataList: (rooms: RoomReadResponseDto[]) => void;
  resetRoomDataList: () => void;
};

export const useMessagePageStore = create<MessagePageState>((set) => ({
  page: 0,
  setPage: (p: number) => set({ page: p }),
  resetPage: () => set({ page: 0 }),
  roomDataList: [],
  setRoomDataList: (rooms: RoomReadResponseDto[]) => set({ roomDataList: rooms }),
  addRoomDataList: (rooms: RoomReadResponseDto[]) => set((state) => ({
    roomDataList: [...state.roomDataList, ...rooms]
  })),
  resetRoomDataList: () => set({ roomDataList: [] }),
}));
