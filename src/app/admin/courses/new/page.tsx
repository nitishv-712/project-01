"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/utils/api";
import { getAuthUser } from "@/utils/auth";
import { CurriculumSection } from "@/types";

export default function NewCoursePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    id: "", title: "", subtitle: "", instructor: "", price: 0, originalPrice: 0, discount: 0,
    duration: "", lessons: 0, language: "", category: "", rating: 5, students: 0,
    lastUpdated: "", description: "", image: "", previewUrl: "", featured: false, active: true
  });
  const [whatYouLearn, setWhatYouLearn] = useState<string[]>([""]);
  const [curriculum, setCurriculum] = useState<CurriculumSection[]>([{ section: "", lessons: 0 }]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const user = getAuthUser();
    if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) router.replace('/login');
  }, [router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const token = localStorage.getItem('sc_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload/course-image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const { data } = await res.json();
      setForm({ ...form, image: data.url });
    } catch {} finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch('/api/courses', {
        method: 'POST',
        body: JSON.stringify({ ...form, whatYouLearn, curriculum }),
      });
      router.push('/admin/courses');
    } catch {} finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Course</h1>
        <p className="text-gray-500 mt-1">Create a new course</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course ID (slug) *</label>
            <input type="text" required value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="excel-mastery" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
            <input type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
            <input type="text" value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
            <input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: +e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
            <input type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: +e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="13 Hours" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lessons</label>
            <input type="number" value={form.lessons} onChange={(e) => setForm({ ...form, lessons: +e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <input type="text" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="Hinglish" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
            <input type="number" min="1" max="5" step="0.1" value={form.rating} onChange={(e) => setForm({ ...form, rating: +e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Students</label>
            <input type="number" value={form.students} onChange={(e) => setForm({ ...form, students: +e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Updated</label>
            <input type="text" value={form.lastUpdated} onChange={(e) => setForm({ ...form, lastUpdated: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="January 2025" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Course Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
          {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
          {form.image && <img src={form.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preview URL (YouTube/Vimeo)</label>
          <input type="text" value={form.previewUrl} onChange={(e) => setForm({ ...form, previewUrl: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">What You'll Learn</label>
          {whatYouLearn.map((item, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" value={item} onChange={(e) => setWhatYouLearn(whatYouLearn.map((v, idx) => idx === i ? e.target.value : v))} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
              <button type="button" onClick={() => setWhatYouLearn(whatYouLearn.filter((_, idx) => idx !== i))} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => setWhatYouLearn([...whatYouLearn, ""])} className="text-orange-500 text-sm">+ Add Item</button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Curriculum</label>
          {curriculum.map((item, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" placeholder="Section" value={item.section} onChange={(e) => setCurriculum(curriculum.map((v, idx) => idx === i ? { ...v, section: e.target.value } : v))} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
              <input type="number" placeholder="Lessons" value={item.lessons} onChange={(e) => setCurriculum(curriculum.map((v, idx) => idx === i ? { ...v, lessons: +e.target.value } : v))} className="w-24 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
              <button type="button" onClick={() => setCurriculum(curriculum.filter((_, idx) => idx !== i))} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => setCurriculum([...curriculum, { section: "", lessons: 0 }])} className="text-orange-500 text-sm">+ Add Section</button>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded border-gray-300 text-orange-500" />
            <span className="text-sm text-gray-700">Featured</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="rounded border-gray-300 text-orange-500" />
            <span className="text-sm text-gray-700">Active</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={saving} className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold disabled:opacity-50">
            {saving ? 'Creating...' : 'Create Course'}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
