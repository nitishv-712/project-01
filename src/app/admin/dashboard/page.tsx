"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/utils/api";
import { getAuthUser, logout } from "@/utils/auth";
import { Course, Student, Stats } from "@/types";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ courses: 0, students: 0, active: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getAuthUser();
    if (!user || user.role !== 'admin') {
      router.replace('/login');
      return;
    }

    Promise.all([
      apiFetch<Course[]>('/api/courses/all'),
      apiFetch<Student[]>('/api/users'),
    ])
      .then(([courses, students]) => {
        setStats({
          courses: courses.length,
          active: courses.filter(c => c.active).length,
          students: students.length,
        });
      })
      .finally(() => setLoading(false));
  }, [router]);

  function handleLogout() {
    logout();
    router.push('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-6 border-b border-gray-800">
        <div className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="text-sm bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="text-3xl font-bold text-orange-500 mb-2">{stats.courses}</div>
                <div className="text-gray-600">Total Courses</div>
                <div className="text-sm text-gray-400 mt-1">{stats.active} active</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="text-3xl font-bold text-orange-500 mb-2">{stats.students}</div>
                <div className="text-gray-600">Total Students</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="text-3xl font-bold text-orange-500 mb-2">{stats.active}</div>
                <div className="text-gray-600">Active Courses</div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/admin/courses" className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-500 hover:shadow-md transition text-center">
                <svg className="w-12 h-12 text-orange-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <div className="font-semibold text-gray-900">Manage Courses</div>
              </Link>
              <Link href="/admin/testimonials" className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-500 hover:shadow-md transition text-center">
                <svg className="w-12 h-12 text-orange-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <div className="font-semibold text-gray-900">Testimonials</div>
              </Link>
              <Link href="/admin/users" className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-500 hover:shadow-md transition text-center">
                <svg className="w-12 h-12 text-orange-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <div className="font-semibold text-gray-900">Manage Users</div>
              </Link>
              <Link href="/admin/settings" className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-500 hover:shadow-md transition text-center">
                <svg className="w-12 h-12 text-orange-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="font-semibold text-gray-900">Settings</div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
