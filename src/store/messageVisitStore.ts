import {create} from 'zustand';

interface VisitState {
	visit : string;
	out : string;
	visitUser : (userId : string)=>void;
	outUser : (userId : string)=>void;
	clear : () => void;
}

export const useVisitStore = create<VisitState>((set) => ({
	visit:"",
	out:"",
	visitUser : (userId : string)=>set({
		visit : userId
	}),
	outUser : (userId : string)=>set({
		out : userId
	}),
	clear : ()=>set({
		visit : "",
		out : ""
	})
}));