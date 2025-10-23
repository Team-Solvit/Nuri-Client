import { create } from 'zustand';
import {Contract, RoomTour} from "@/types/message";

export type messageType =  "contract" | "roomtour" 
export type type = "sent" | "received"

interface ModalState {
	contractData ?: Contract | RoomTour | null;
	setContractData : (data : Contract | RoomTour)=>void;
	clearContractData: () => void;
	isOpen: boolean;
	open: () => void;
	close: () => void;
    master : boolean;
    setMaster : ()=>void;
    unSetMaster : ()=>void;
    messageType : messageType | null,
    setMessageType : (type : messageType)=>void;
    type : type | null;
    setType : (type : type )=>void;
}

export const useMessageModalStore = create<ModalState>((set) => ({
	contractData : null,
	setContractData : (data : Contract | RoomTour)=>set({contractData : data}),
	isOpen: false,
	messageType : null,
	master : false,
	clearContractData: () => set({contractData: null}),
	setMaster : ()=>set({master : true}),
	unSetMaster : () =>set({master : false}),
	setMessageType : (type)=>set({messageType : type}),
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
	type : null,
	setType : (type)=>set({type : type})
}));