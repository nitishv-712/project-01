"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiFetch } from "@/utils/api";
import { getAuthUser } from "@/utils/auth";
import { Testimonial } from "@/types";

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [form, setForm] = useState({ name: "", role: "", text: "", rating: 5, active: true });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getAuthUser();
    if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
      router.replace('/login');
      return;
    }

    apiFetch<Testimonial[]>('/api/testimonials/all')
      .then((data) => {
        const testimonial = data.find(t => t._id === id);
        if (testimonial) {
          setForm({ name: testimonial.name, role: testimonial.role, text: testimonial.text, rating: testimonial.rating, active: testimonial.active });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch(`/api/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(form) });
      router.push('/admin/testimonials');
    } catch {} finally {
      setSaving(false);
    }
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Testimonial</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
          <input type="text" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Text *</label>
          <textarea rows={4} required value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5) *</label>
          <input type="number" min="1" max="5" required value={form.rating} onChange={(e) => setForm({ ...form, rating: +e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="rounded border-gray-300 text-orange-500" />
          <span className="text-sm text-gray-700">Active</span>
        </label>
        <div className="flex gap-4">
          <button type="submit" disabled={saving} className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
