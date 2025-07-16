'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import NProgress from 'nprogress';
import "./style.css"

export default function TopLoadingBar() {
	const pathname = usePathname();
	useEffect(() => {
		NProgress.done();
	}, [pathname]);
	
	return null;
}