'use client';
import {useEffect} from 'react';
import {useApollo} from '@/lib/apolloClient';
import {AuthGQL} from '@/services/auth';
import {useUserStore} from '@/store/user';
import {extractTokenFromApolloResult, getAccessToken, saveAccessToken} from '@/utils/token';
import {decodeJWT} from '@/utils/jwt';

export default function AuthBootstrap() {
	const client = useApollo();
	const setAuth = useUserStore(s => s.setAuth);
	
	useEffect(() => {
		let cancelled = false;
		
		(async () => {
			try {
				let token = getAccessToken();
				if (!token) {
					const r = await client.mutate({mutation: AuthGQL.MUTATIONS.REISSUE, fetchPolicy: 'no-cache'});
					token = extractTokenFromApolloResult(r);
					if (token) saveAccessToken(token);
				}
				
				if (token && !cancelled) {
					const d = decodeJWT(token);
					const userId = d?.sub ?? d?.userId ?? d?.id ?? null;
					const role = d?.role ?? 'USER';
					if (userId) setAuth(userId, role, token);
				}
			} catch {
				// 비로그인 유지
			}
		})();
		
		return () => {
			cancelled = true;
		};
	}, [client, setAuth]);
	
	return null;
}