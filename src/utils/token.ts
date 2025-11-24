import { headersToObject } from '@/utils/headers';

let refreshLock: Promise<string | null> | null = null;

export async function withRefreshLock(
  refreshFn: () => Promise<string | null>
): Promise<string | null> {
  if (refreshLock) {
    return refreshLock;
  }

  refreshLock = (async () => {
    try {
      return await refreshFn();
    } finally {
      refreshLock = null;
    }
  })();

  return refreshLock;
}

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

export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;

    if (!exp) return true;

    const expirationTime = exp * 1000;
    const currentTime = Date.now();

    const bufferTime = 2 * 60 * 1000;

    return currentTime >= (expirationTime - bufferTime);
  } catch (error) {
    return true;
  }
}

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