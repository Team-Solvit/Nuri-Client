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