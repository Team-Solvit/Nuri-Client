'use client';

import {useRouter} from 'next/navigation';
import NProgress from 'nprogress';
import {useCallback} from 'react';

export function useNavigationWithProgress() {
	const router = useRouter();
	
	const navigate = useCallback(
		(path: string) => {
			const currentUrl = new URL(window.location.href);
			const targetUrl = new URL(path, window.location.origin);
			
			if (currentUrl.pathname === targetUrl.pathname) return;
			
			NProgress.start();
			router.push(path);
		},
		[router]
	);
	
	return navigate;
}