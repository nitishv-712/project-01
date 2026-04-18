"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { apiFetch } from "@/utils/api";
import { getAuthUser } from "@/utils/auth";
import { Course } from "@/types";

export default function CoursePlayer() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authUser = getAuthUser();
    if (!authUser || authUser.role !== 'user') {
      router.replace('/login');
      return;
    }

    apiFetch<Course>(`/api/courses/${courseId}`)
      .then((data) => {
        setCourse(data);
        if (data.videoPath) {
          return apiFetch<{ url: string }>('/api/upload/video-url', {
            method: 'POST',
            body: JSON.stringify({ videoPath: data.videoPath, courseId: data.id }),
          });
        }
      })
      .then((res) => {
        if (res?.url) setVideoUrl(res.url);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [courseId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="aspect-video bg-black">
            {videoUrl ? (
              <video src={videoUrl} controls className="w-full h-full" />
            ) : course.previewUrl ? (
              <iframe src={course.previewUrl} className="w-full h-full" allowFullScreen />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-400">Video coming soon</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {course.instructor}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {course.duration}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">{course.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
