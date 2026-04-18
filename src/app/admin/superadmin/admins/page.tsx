"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/utils/api";
import { getAuthUser, isSuperAdmin } from "@/utils/auth";
import { Admin } from "@/types";

export default function SuperadminAdminsPage() {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getAuthUser();
    if (!user || !isSuperAdmin()) {
      router.replace('/admin/dashboard');
      return;
    }

    apiFetch<Admin[]>('/api/superadmin/admins')
      .then(setAdmins)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this admin account? This action cannot be undone.')) return;
    try {
      await apiFetch(`/api/superadmin/admins/${id}`, { method: 'DELETE' });
      setAdmins(admins.filter(a => a._id !== id));
    } catch {}
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Accounts</h1>
          <p className="text-gray-500 mt-1">Manage admin users and permissions</p>
        </div>
        <Link href="/admin/superadmin/admins/new" className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold">
          Create Admin
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permissions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {admins.map((admin) => (
              <tr key={admin._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{admin.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{admin.email}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {admin.permissions.length === 0 ? (
                      <span className="text-xs text-gray-400">No permissions</span>
                    ) : (
                      admin.permissions.slice(0, 3).map((perm) => (
                        <span key={perm} className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {perm.split(':')[0]}
                        </span>
                      ))
                    )}
                    {admin.permissions.length > 3 && (
                      <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{admin.permissions.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(admin.createdAt).toLocaleDateString('en-IN')}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/superadmin/admins/${admin._id}`} className="text-blue-500 hover:text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <button onClick={() => handleDelete(admin._id)} className="text-red-500 hover:text-red-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
