"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { apiFetch } from "@/utils/api";
import { getAuthUser } from "@/utils/auth";
import { Course, Lesson } from "@/types";

export default function CoursePlayer() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [embedUrl, setEmbedUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(false);

  useEffect(() => {
    const authUser = getAuthUser();
    if (!authUser || authUser.role !== "user") {
      router.replace("/login");
      return;
    }

    apiFetch<Course>(`/api/courses/${courseId}`)
      .then((data) => {
        setCourse(data);
        const firstLesson = data.curriculum?.[0]?.lessons?.[0];
        if (firstLesson) loadVideo(data.id, firstLesson);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [courseId, router]);

  async function loadVideo(cId: string, lesson: Lesson) {
    if (!lesson.videoId) {
      setActiveLesson(lesson);
      setEmbedUrl("");
      return;
    }
    setVideoLoading(true);
    setActiveLesson(lesson);
    try {
      const res = await apiFetch<{ data: { embedUrl: string; streamUrl: string } }>(
        "/api/upload/video-url",
        {
          method: "POST",
          body: JSON.stringify({ courseId: cId, lessonId: lesson.lessonId }),
        }
      );
      setEmbedUrl(res.data?.embedUrl ?? "");
    } catch {
      setEmbedUrl("");
    } finally {
      setVideoLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
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
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div className="flex gap-6">
          {/* Video + Info */}
          <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="aspect-video bg-black relative">
              {videoLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
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
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{course.title}</h1>
              {activeLesson && (
                <p className="text-orange-500 font-medium mb-3">{activeLesson.title}</p>
              )}
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
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

          {/* Curriculum Sidebar */}
          <div className="w-80 bg-white rounded-xl shadow-sm overflow-y-auto max-h-[80vh]">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-900">Course Content</h2>
            </div>
            {course.curriculum.map((section) => (
              <div key={section.section}>
                <div className="px-4 py-2 bg-gray-50 text-sm font-medium text-gray-700">
                  {section.section}
                </div>
                {section.lessons.map((lesson) => (
                  <button
                    key={lesson.lessonId}
                    onClick={() => loadVideo(course.id, lesson)}
                    className={`w-full text-left px-4 py-3 text-sm border-b hover:bg-orange-50 transition-colors flex items-center gap-2 ${
                      activeLesson?.lessonId === lesson.lessonId
                        ? "bg-orange-50 text-orange-600 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span className="flex-1">{lesson.title}</span>
                    {!lesson.videoId && (
                      <span className="text-xs text-gray-400">Soon</span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
