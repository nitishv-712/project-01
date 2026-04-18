"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiFetch } from "@/utils/api";
import { getAuthUser } from "@/utils/auth";
import { Course, CurriculumSection } from "@/types";

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [form, setForm] = useState({
    id: "", title: "", subtitle: "", instructor: "", price: 0, originalPrice: 0, discount: 0,
    duration: "", lessons: 0, language: "", category: "", rating: 5, students: 0,
    lastUpdated: "", description: "", image: "", previewUrl: "", featured: false, active: true
  });
  const [whatYouLearn, setWhatYouLearn] = useState<string[]>([""]);
  const [curriculum, setCurriculum] = useState<CurriculumSection[]>([{ section: "", lessons: 0 }]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getAuthUser();
    if (!user || user.role !== 'admin') {
      router.replace('/login');
      return;
    }

    apiFetch<Course>(`/api/courses/${courseId}`)
      .then((data) => {
        setCourse(data);
        setForm({
          id: data.id, title: data.title, subtitle: data.subtitle, instructor: data.instructor,
          price: data.price, originalPrice: data.originalPrice, discount: data.discount,
          duration: data.duration, lessons: data.lessons, language: data.language,
          category: data.category, rating: data.rating, students: data.students,
          lastUpdated: data.lastUpdated, description: data.description, image: data.image,
          previewUrl: data.previewUrl || "", featured: data.featured, active: data.active
        });
        setWhatYouLearn(data.whatYouLearn.length ? data.whatYouLearn : [""]);
        setCurriculum(data.curriculum.length ? data.curriculum : [{ section: "", lessons: 0 }]);
        if (data.videoMeta) {
          setVideoTitle(data.videoMeta.title || "");
          setVideoDescription(data.videoMeta.description || "");
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [courseId, router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
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
    } catch {}
  };

  const handleVideoUpload = () => {
    if (!videoFile) return;
    setUploading(true);
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (e) => setUploadProgress(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () => {
      const res = JSON.parse(xhr.responseText);
      if (res.success) {
        setCourse({ ...course!, videoPath: res.data.videoPath, videoMeta: res.data.videoMeta });
        setVideoFile(null);
        setUploadProgress(0);
      }
      setUploading(false);
    };
    xhr.onerror = () => setUploading(false);
    xhr.open('POST', `${process.env.NEXT_PUBLIC_API_URL}/api/upload/course-video`);
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('sc_token')}`);
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('courseId', course!.id);
    formData.append('title', videoTitle);
    formData.append('description', videoDescription);
    xhr.send(formData);
  };

  const handleRemoveVideo = async () => {
    if (!confirm('Remove video?')) return;
    try {
      await apiFetch(`/api/upload/course-video/${course!.id}`, { method: 'DELETE' });
      setCourse({ ...course!, videoPath: null, videoMeta: null });
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        body: JSON.stringify({ ...form, whatYouLearn, curriculum }),
      });
      router.push('/admin/courses');
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

  if (!course) return null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
        <p className="text-gray-500 mt-1">Update course details</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6 mb-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course ID (slug) *</label>
            <input type="text" required value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
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
            <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lessons</label>
            <input type="number" value={form.lessons} onChange={(e) => setForm({ ...form, lessons: +e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <input type="text" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
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
            <input type="text" value={form.lastUpdated} onChange={(e) => setForm({ ...form, lastUpdated: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Course Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
          {form.image && <img src={form.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preview URL</label>
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
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold">
            Cancel
          </button>
        </div>
      </form>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Course Video</h2>
        {course.videoPath ? (
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">Video: {course.videoMeta?.title || 'Uploaded'}</p>
            <button onClick={handleRemoveVideo} className="text-red-500 text-sm hover:text-red-600">Remove Video</button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video File</label>
              <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
              <input type="text" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Description</label>
              <textarea rows={3} value={videoDescription} onChange={(e) => setVideoDescription(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            {uploading && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
              </div>
            )}
            <button type="button" onClick={handleVideoUpload} disabled={!videoFile || uploading} className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold disabled:opacity-50">
              {uploading ? `Uploading ${uploadProgress}%` : 'Upload Video'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
