import { headersToObject } from '@/utils/headers';

<<<<<<< Updated upstream
=======
let refreshInFlight: Promise<string | null> | null = null;

export async function refreshAccessToken(): Promise<string | null> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        operationName: 'Reissue',
        query: `
          mutation Reissue {
            reissue {
              id
            }
          }
        `,
      }),
    });

    const headers = headersToObject(response.headers);

    const raw = headers['authorization'] || headers['x-access-token'] || '';
    const token = raw.replace(/^Bearer\s+/i, '');

    if (token) {
      saveAccessToken(token);
      return token;
    }
    return null;
  } catch (error) {
    return null;
  }
}

>>>>>>> Stashed changes
export function extractTokenFromApolloResult(res: any): string | null {
  const headers = headersToObject(res?.__headers);
  const raw = headers['authorization'] || headers['x-access-token'] || '';
  const token = raw.replace(/^Bearer\s+/i, '') || (res?.data?.reissue ?? '');
  return token || null;
}

export function saveAccessToken(token: string | null) {
  if (!token) return;
  if (typeof window === 'undefined') return;
  localStorage.setItem('AT', token);
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('AT');
}

export function clearAccessToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('AT');
  localStorage.removeItem('nuri-user');
}

/**
 * JWT 토큰이 만료되었는지 체크
 * 만료 2분 전부터 만료된 것으로 간주 (버퍼)
 */
export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  try {
    // JWT 디코딩 (페이로드 부분만)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;

    if (!exp) return true;

    // exp는 초 단위, Date.now()는 밀리초 단위
    const expirationTime = exp * 1000;
    const currentTime = Date.now();

    // 만료 2분 전이면 만료된 것으로 간주 (여유시간)
<<<<<<< Updated upstream
    const bufferTime = 2 * 60 * 1000; // 2분
    
=======
    const bufferTime = 2 * 60 * 1000;

>>>>>>> Stashed changes
    return currentTime >= (expirationTime - bufferTime);
  } catch (error) {
    console.error('Token decode error:', error);
    // 토큰 파싱 실패 시 만료된 것으로 간주
    return true;
  }
}

/**
 * 토큰의 남은 시간(초) 반환
 */
export function getTokenRemainingTime(token: string | null): number {
  if (!token) return 0;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    
    if (!exp) return 0;
    
    const expirationTime = exp * 1000;
    const currentTime = Date.now();
    const remaining = Math.max(0, Math.floor((expirationTime - currentTime) / 1000));
    
    return remaining;
  } catch {
    return 0;
  }
}