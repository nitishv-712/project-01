"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/utils/api";
import { getAuthUser } from "@/utils/auth";

interface EnrollButtonProps {
  courseId: string;
  coursePrice: number;
}

export default function EnrollButton({ courseId, coursePrice }: EnrollButtonProps) {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getAuthUser>>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const authUser = getAuthUser();
    setUser(authUser);

    if (authUser?.role === 'user') {
      apiFetch<{ enrolledCourses: string[] }>('/api/auth/me')
        .then((data) => {
          setEnrolled(data.enrolledCourses.includes(courseId));
        })
        .catch(() => {})
        .finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, [courseId]);

  const handleBuyNow = () => {
    if (!user) {
      router.push(`/login?redirect=/course/${courseId}`);
      return;
    }

    if (user.role !== 'user') {
      return;
    }

    router.push(`/checkout/${courseId}`);
  };

  if (checking) {
    return (
      <div className="w-full bg-gray-200 text-gray-400 py-3.5 rounded-lg font-bold text-base flex items-center justify-center gap-2">
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        Loading...
      </div>
    );
  }

  if (enrolled) {
    return (
      <Link
        href="/dashboard"
        className="w-full bg-green-500 text-white py-3.5 rounded-lg hover:bg-green-600 transition font-bold text-base flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Already Enrolled - Go to Dashboard
      </Link>
    );
  }

  if (!user) {
    return (
      <button
        onClick={handleBuyNow}
        className="w-full bg-orange-500 text-white py-3.5 rounded-lg hover:bg-orange-600 transition font-bold text-base flex items-center justify-center gap-2"
      >
        Login to Buy
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }

  if (user.role === 'admin') {
    return (
      <div className="w-full bg-gray-300 text-gray-600 py-3.5 rounded-lg font-bold text-base flex items-center justify-center gap-2 cursor-not-allowed">
        Admin Account - Cannot Purchase
      </div>
    );
  }

  return (
    <button
      onClick={handleBuyNow}
      className="w-full bg-orange-500 text-white py-3.5 rounded-lg hover:bg-orange-600 transition font-bold text-base flex items-center justify-center gap-2"
    >
      Buy Now - ₹{coursePrice.toLocaleString("en-IN")}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
