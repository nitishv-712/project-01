const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, options);
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data as T;
}
