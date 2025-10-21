"use client";

import {useEffect} from 'react';
import {client} from '@/lib/socketClient';
import {useUserStore} from '@/store/user';

export default function ChatComponent() {
	const {id} = useUserStore();
	
	useEffect(() => {
		if (!id) return;
		if (typeof window === "undefined") return;
		
		client.activate();
		
		return () => {
			client.deactivate();
		};
	}, [id]);
	
	return null;
}