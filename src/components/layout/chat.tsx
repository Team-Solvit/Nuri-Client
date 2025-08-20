"use client";

import {useEffect} from 'react';
import {soketClient} from '@/lib/soketClient';
import {useUserStore} from '@/store/user';

export default function ChatComponent() {
	const {id} = useUserStore();
	
	useEffect(() => {
		if (!id) return;
		if (typeof window === "undefined") return;
		
		soketClient.activate();
		
		return () => {
			soketClient.deactivate();
		};
	}, [id]);
	
	return null;
}