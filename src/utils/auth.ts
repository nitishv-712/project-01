import { jwtDecode } from 'jwt-decode';
import { AuthUser, Permission } from '@/types';

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

export function can(permission: Permission): boolean {
  const user = getAuthUser();
  if (!user) return false;
  if (user.role === 'superadmin') return true;
  return user.permissions.includes(permission);
}

export function isSuperAdmin(): boolean {
  return getAuthUser()?.role === 'superadmin';
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
