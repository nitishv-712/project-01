"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { apiFetch } from "@/utils/api";
import { getAuthUser } from "@/utils/auth";
import { Student, Course, Order } from "@/types";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const [student, setStudent] = useState<Student | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getAuthUser();
    if (!user || user.role !== 'admin') {
      router.replace('/login');
      return;
    }

    Promise.all([
      apiFetch<Student>(`/api/users/${userId}`),
      apiFetch<Course[]>('/api/courses/all'),
      apiFetch<Order[]>('/api/payment/orders/all'),
    ])
      .then(([studentData, allCourses, allOrders]) => {
        setStudent(studentData);
        setEnrolledCourses(allCourses.filter(c => studentData.enrolledCourses.includes(c.id)));
        setOrders(allOrders.filter(o => o.userId === studentData._id));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId, router]);

  const handleVerifyToggle = async () => {
    if (!student) return;
    try {
      await apiFetch(`/api/users/${userId}/verify`, { method: 'PATCH' });
      setStudent({ ...student, verified: !student.verified });
    } catch {}
  };

  const handleUnenroll = async (courseId: string) => {
    if (!confirm('Unenroll from this course?')) return;
    try {
      await apiFetch(`/api/users/${userId}/unenroll`, { method: 'PATCH', body: JSON.stringify({ courseId }) });
      setEnrolledCourses(enrolledCourses.filter(c => c.id !== courseId));
      if (student) setStudent({ ...student, enrolledCourses: student.enrolledCourses.filter(id => id !== courseId) });
    } catch {}
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className="p-8">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <Image src={student.avatar ?? '/default-avatar.svg'} alt={student.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
              {student.verified && (
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-gray-600">{student.email}</p>
            {student.phone && <p className="text-gray-500 text-sm mt-1">{student.phone}</p>}
            <p className="text-gray-400 text-sm mt-2">Joined {new Date(student.createdAt).toLocaleDateString('en-IN')}</p>
            <button onClick={handleVerifyToggle} className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm font-semibold">
              {student.verified ? 'Unverify' : 'Verify'} User
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Enrolled Courses ({enrolledCourses.length})</h2>
        {enrolledCourses.length === 0 ? (
          <p className="text-gray-500">No courses enrolled</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <Image src={course.image} alt={course.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{course.title}</div>
                  <div className="text-sm text-gray-500">{course.instructor}</div>
                </div>
                <button onClick={() => handleUnenroll(course.id)} className="text-red-500 hover:text-red-600 text-sm">
                  Unenroll
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order History ({orders.length})</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.courseId}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{order.amount.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'paid' ? 'bg-green-100 text-green-800' :
                        order.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">{order.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
