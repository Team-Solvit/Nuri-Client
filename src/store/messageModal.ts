import { create } from 'zustand';
import {Contract} from "@/types/message";

export type messageType =  "contract" | "roomtour" 
export type type = "sent" | "received"

interface ModalState {
	contractData ?: Contract | null;
	setContractData : (data : Contract)=>void;
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
	setContractData : (data : Contract)=>set({contractData : data}),
	isOpen: false,
    messageType : null,
    master : false,
    setMaster : ()=>set({master : true}),
    unSetMaster : () =>set({master : false}),
    setMessageType : (type)=>set({messageType : type}),
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
    type : null,
    setType : (type)=>set({type : type})
}));