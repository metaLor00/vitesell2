import onError from '@utils/onError';

/**
 * Centralized fetch wrapper to attach base URL, headers and error handling
 */
export const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || '';

function normalizePath(path: string) {
  // avoid double slashes
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const base = API_BASE.replace(/\/+$/, '');
  const p = path.replace(/^\/+/, '');
  return base ? `${base}/${p}` : `/${p}`;
}

async function parseJsonOrNull(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function apiFetch<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const url = normalizePath(path);
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init.headers as Record<string, string>),
  };
  if (token) headers['x-auth-token'] = token;

  const res = await fetch(url, { ...init, headers, credentials: 'include' as RequestCredentials });
  const data = await parseJsonOrNull(res);
  if (!res.ok) {
    const err = { response: { status: res.status, data } } as any;
    const normalized = onError(err);
    const e = new Error(normalized.message || 'Request failed');
    (e as any).status = normalized.status;
    (e as any).errors = normalized.errors;
    throw e;
  }
  return data as T;
}

export function get<T = any>(path: string) {
  return apiFetch<T>(path, { method: 'GET' });
}

export function post<T = any>(path: string, body?: any) {
  return apiFetch<T>(path, { method: 'POST', body: JSON.stringify(body) });
}

export function put<T = any>(path: string, body?: any) {
  return apiFetch<T>(path, { method: 'PUT', body: JSON.stringify(body) });
}

export function del<T = any>(path: string) {
  return apiFetch<T>(path, { method: 'DELETE' });
}

export default apiFetch;
