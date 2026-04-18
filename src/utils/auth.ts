import { jwtDecode } from 'jwt-decode';
import { AuthUser } from '@/types';

export function getAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('sc_token');
  if (!token) return null;
  try {
    return jwtDecode<AuthUser>(token);
  } catch {
    return null;
  }
}

export function isAdmin(): boolean {
  return getAuthUser()?.role === 'admin';
}

export function isStudent(): boolean {
  return getAuthUser()?.role === 'user';
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('sc_token');
  }
}
