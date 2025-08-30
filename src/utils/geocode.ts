export interface LatLng { lat: number; lng: number }

const GEO_CACHE_KEY = 'geoCache';
const cache: Record<string, LatLng> = {};

function hydrate() {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(GEO_CACHE_KEY);
    if (!raw) return;
    const arr: [string, LatLng][] = JSON.parse(raw);
    for (const [k,v] of arr) cache[k] = v;
  } catch {}
}
function persist() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(GEO_CACHE_KEY, JSON.stringify(Object.entries(cache)));
  } catch {}
}
if (typeof window !== 'undefined') hydrate();

export function getGeocodeFromCache(address: string) {
  return cache[address];
}

export function clearGeocodeCache() {
  if (typeof window === 'undefined') return;
  Object.keys(cache).forEach(k => delete cache[k]);
  try { localStorage.removeItem(GEO_CACHE_KEY); } catch {}
}

export async function geocode(address: string): Promise<LatLng | null> {
  if (!address) return null;
  if (cache[address]) return cache[address];
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  try {
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`);
    const json = await res.json();
    const loc = json.results?.[0]?.geometry?.location;
    if (json.status === 'OK' && loc?.lat && loc?.lng) {
      const val = { lat: loc.lat, lng: loc.lng };
      cache[address] = val;
      persist();
      return val;
    }
  } catch (e) {
  }
  return null;
}
