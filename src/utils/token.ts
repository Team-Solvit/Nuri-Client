import { headersToObject } from '@/utils/headers';

let refreshInFlight: Promise<string | null> | null = null;

export function extractTokenFromApolloResult(res: any): string | null {
  const headers = headersToObject(res?.__headers);
  const raw = headers['authorization'] || headers['x-access-token'] || '';
  const token = raw.replace(/^Bearer\s+/i, '') || (res?.data?.reissue ?? '');
  return token || null;
}

export function saveAccessToken(token: string | null) {
  if (!token) return;
  localStorage.setItem('AT', token);
}

export function getAccessToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem('AT') : null;
}

export function clearAccessToken() {
  localStorage.removeItem('AT');
}

export function withRefreshLock(fn: () => Promise<string | null>) {
  if (refreshInFlight) return refreshInFlight;
  refreshInFlight = fn().finally(() => { refreshInFlight = null; });
  return refreshInFlight;
}

export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    
    if (!exp) return true;
    
    // exp는 초 단위, Date.now()는 밀리초 단위
    const expirationTime = exp * 1000;
    const currentTime = Date.now();
    
    // 만료 2분 전이면 만료된 것으로 간주 (여유시간)
    const bufferTime = 2 * 60 * 1000;
    
    return currentTime >= (expirationTime - bufferTime);
  } catch (error) {
    // 토큰 파싱 실패 시 만료된 것으로 간주
    return true;
  }
}
