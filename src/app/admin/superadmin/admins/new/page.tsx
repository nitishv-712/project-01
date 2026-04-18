"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/utils/api";
import { getAuthUser, isSuperAdmin } from "@/utils/auth";
import { Permission, PermissionsResponse } from "@/types";

const PERMISSION_GROUPS = [
  { label: 'Courses', permissions: ['courses:read', 'courses:create', 'courses:update', 'courses:delete'] as Permission[] },
  { label: 'Users', permissions: ['users:read', 'users:update', 'users:delete'] as Permission[] },
  { label: 'Testimonials', permissions: ['testimonials:read', 'testimonials:create', 'testimonials:update', 'testimonials:delete'] as Permission[] },
  { label: 'Orders', permissions: ['orders:read'] as Permission[] },
  { label: 'Stats', permissions: ['stats:read', 'stats:update'] as Permission[] },
  { label: 'Media', permissions: ['media:upload', 'media:delete'] as Permission[] },
  { label: 'Profile', permissions: ['profile:manage_own'] as Permission[] },
];

export default function NewAdminPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
  const [presets, setPresets] = useState<any>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = getAuthUser();
    if (!user || !isSuperAdmin()) {
      router.replace('/admin/dashboard');
      return;
    }

    apiFetch<PermissionsResponse>('/api/superadmin/permissions')
      .then((data) => setPresets(data.presets))
      .catch(() => {});
  }, [router]);

  const handlePresetChange = (preset: string) => {
    if (!preset || !presets) {
      setSelectedPermissions([]);
      return;
    }
    setSelectedPermissions(presets[preset] || []);
  };

  const togglePermission = (permission: Permission) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError("");

    try {
      const { data } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/create-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('sc_token')}`,
        },
        body: JSON.stringify(form),
      }).then(res => res.json());

      if (selectedPermissions.length > 0) {
        await apiFetch(`/api/superadmin/admins/${data._id}/permissions`, {
          method: 'PATCH',
          body: JSON.stringify({ permissions: selectedPermissions }),
        });
      }

      router.push('/admin/superadmin/admins');
    } catch (err: any) {
      setError(err.message || "Failed to create admin");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Admin Account</h1>
        <p className="text-gray-500 mt-1">Create a new admin with custom permissions</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6 max-w-3xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Permission Preset</label>
          <select
            onChange={(e) => handlePresetChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Custom</option>
            <option value="full_admin">Full Admin</option>
            <option value="course_manager">Course Manager</option>
            <option value="content_editor">Content Editor</option>
            <option value="user_manager">User Manager</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">Permissions</label>
          <div className="space-y-4">
            {PERMISSION_GROUPS.map((group) => (
              <div key={group.label} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">{group.label}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {group.permissions.map((permission) => (
                    <label key={permission} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(permission)}
                        onChange={() => togglePermission(permission)}
                        className="rounded border-gray-300 text-orange-500"
                      />
                      <span className="text-sm text-gray-700">{permission.split(':')[1]}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={creating}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold disabled:opacity-50"
          >
            {creating ? 'Creating...' : 'Create Admin'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
