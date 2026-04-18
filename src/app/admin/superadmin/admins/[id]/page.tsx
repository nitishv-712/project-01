"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiFetch } from "@/utils/api";
import { getAuthUser, isSuperAdmin } from "@/utils/auth";
import { Admin, Permission } from "@/types";

const PERMISSION_GROUPS = [
  { label: 'Courses', permissions: ['courses:read', 'courses:create', 'courses:update', 'courses:delete'] as Permission[] },
  { label: 'Users', permissions: ['users:read', 'users:update', 'users:delete'] as Permission[] },
  { label: 'Testimonials', permissions: ['testimonials:read', 'testimonials:create', 'testimonials:update', 'testimonials:delete'] as Permission[] },
  { label: 'Orders', permissions: ['orders:read'] as Permission[] },
  { label: 'Stats', permissions: ['stats:read', 'stats:update'] as Permission[] },
  { label: 'Media', permissions: ['media:upload', 'media:delete'] as Permission[] },
  { label: 'Profile', permissions: ['profile:manage_own'] as Permission[] },
];

export default function EditAdminPage() {
  const router = useRouter();
  const params = useParams();
  const adminId = params.id as string;
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = getAuthUser();
    if (!user || !isSuperAdmin()) {
      router.replace('/admin/dashboard');
      return;
    }

    apiFetch<Admin>(`/api/superadmin/admins/${adminId}`)
      .then((data) => {
        setAdmin(data);
        setSelectedPermissions(data.permissions);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [adminId, router]);

  const togglePermission = async (permission: Permission) => {
    const hasPermission = selectedPermissions.includes(permission);
    
    try {
      if (hasPermission) {
        await apiFetch(`/api/superadmin/admins/${adminId}/revoke`, {
          method: 'PATCH',
          body: JSON.stringify({ permission }),
        });
        setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
      } else {
        await apiFetch(`/api/superadmin/admins/${adminId}/grant`, {
          method: 'PATCH',
          body: JSON.stringify({ permission }),
        });
        setSelectedPermissions([...selectedPermissions, permission]);
      }
      setMessage("Permission updated");
      setTimeout(() => setMessage(""), 2000);
    } catch {}
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      await apiFetch(`/api/superadmin/admins/${adminId}/permissions`, {
        method: 'PATCH',
        body: JSON.stringify({ permissions: selectedPermissions }),
      });
      setMessage("All permissions saved");
      setTimeout(() => setMessage(""), 2000);
    } catch {} finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this admin account? This action cannot be undone.')) return;
    try {
      await apiFetch(`/api/superadmin/admins/${adminId}`, { method: 'DELETE' });
      router.push('/admin/superadmin/admins');
    } catch {}
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="p-8">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Admin: {admin.name}</h1>
        <p className="text-gray-500 mt-1">{admin.email}</p>
        <p className="text-xs text-gray-400 mt-1">Joined {new Date(admin.createdAt).toLocaleDateString('en-IN')}</p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Permissions</h2>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold text-sm disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>

        <div className="space-y-4">
          {PERMISSION_GROUPS.map((group) => (
            <div key={group.label} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{group.label}</h3>
              <div className="grid grid-cols-2 gap-3">
                {group.permissions.map((permission) => (
                  <div key={permission} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{permission.split(':')[1]}</span>
                    <button
                      onClick={() => togglePermission(permission)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        selectedPermissions.includes(permission) ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          selectedPermissions.includes(permission) ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
        <h2 className="text-xl font-bold text-red-600 mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-600 mb-4">Permanently delete this admin account</p>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition font-semibold"
        >
          Delete Admin Account
        </button>
      </div>
    </div>
  );
}
