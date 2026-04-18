"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/utils/api";
import { getAuthUser } from "@/utils/auth";
import { Stats } from "@/types";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsForm, setStatsForm] = useState({ studentsEnrolled: "", videoTutorials: "", expertCourses: "", youtubeSubscribers: "" });
  const [adminForm, setAdminForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [savingStats, setSavingStats] = useState(false);
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const user = getAuthUser();
    if (!user || user.role !== 'admin') {
      router.replace('/login');
      return;
    }

    apiFetch<Stats>('/api/stats')
      .then((data) => {
        setStats(data);
        setStatsForm({
          studentsEnrolled: data.studentsEnrolled,
          videoTutorials: data.videoTutorials,
          expertCourses: data.expertCourses,
          youtubeSubscribers: data.youtubeSubscribers,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingStats(true);
    setMessage("");
    setError("");
    try {
      await apiFetch('/api/stats', { method: 'PUT', body: JSON.stringify(statsForm) });
      setMessage("Stats updated successfully");
    } catch (err: any) {
      setError(err.message || "Failed to update stats");
    } finally {
      setSavingStats(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingAdmin(true);
    setMessage("");
    setError("");
    try {
      await apiFetch('/api/auth/create-admin', { method: 'POST', body: JSON.stringify(adminForm) });
      setMessage("Admin created successfully");
      setAdminForm({ name: "", email: "", password: "" });
    } catch (err: any) {
      setError(err.message || "Failed to create admin");
    } finally {
      setCreatingAdmin(false);
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
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Platform configuration</p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Platform Stats</h2>
        <form onSubmit={handleSaveStats} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Students Enrolled</label>
              <input
                type="text"
                value={statsForm.studentsEnrolled}
                onChange={(e) => setStatsForm({ ...statsForm, studentsEnrolled: e.target.value })}
                placeholder="230,000+"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Tutorials</label>
              <input
                type="text"
                value={statsForm.videoTutorials}
                onChange={(e) => setStatsForm({ ...statsForm, videoTutorials: e.target.value })}
                placeholder="1,500+"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expert Courses</label>
              <input
                type="text"
                value={statsForm.expertCourses}
                onChange={(e) => setStatsForm({ ...statsForm, expertCourses: e.target.value })}
                placeholder="50+"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">YouTube Subscribers</label>
              <input
                type="text"
                value={statsForm.youtubeSubscribers}
                onChange={(e) => setStatsForm({ ...statsForm, youtubeSubscribers: e.target.value })}
                placeholder="500K+"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={savingStats}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold disabled:opacity-50"
          >
            {savingStats ? 'Saving...' : 'Save Stats'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Create Admin</h2>
        <form onSubmit={handleCreateAdmin} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              required
              value={adminForm.name}
              onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              required
              value={adminForm.email}
              onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
            <input
              type="password"
              required
              value={adminForm.password}
              onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <button
            type="submit"
            disabled={creatingAdmin}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold disabled:opacity-50"
          >
            {creatingAdmin ? 'Creating...' : 'Create Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
