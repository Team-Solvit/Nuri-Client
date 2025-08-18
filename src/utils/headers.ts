export function headersToObject(h?: Headers | null) {
  const obj: Record<string, string> = {};
  if (!h) return obj;
  h.forEach((v, k) => (obj[k.toLowerCase()] = v));
  return obj;
}