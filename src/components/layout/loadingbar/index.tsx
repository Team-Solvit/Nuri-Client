'use client';

import {useEffect, useRef} from 'react';
import {usePathname} from 'next/navigation';
import NProgress from 'nprogress';
import "./style.css"

export default function TopLoadingBar() {
	const pathname = usePathname();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	
	useEffect(() => {
		timeoutRef.current = setTimeout(() => {
			NProgress.done();
		}, 1000);
		
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [pathname]);
	
	return null;
}