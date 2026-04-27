"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiFetch } from "@/utils/api";
import { getAuthUser } from "@/utils/auth";

interface InitiateData {
  orderId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  key: string;
  courseId: string;
  courseTitle: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const user = getAuthUser();
    if (!user || user.role !== "user") {
      router.replace(`/login?redirect=/checkout/${courseId}`);
      return;
    }

    apiFetch<InitiateData>("/api/payment/initiate", {
      method: "POST",
      body: JSON.stringify({ courseId }),
    })
      .then((data) => {
        setLoading(false);
        const options = {
          key: data.key,
          amount: data.amount,
          currency: data.currency,
          name: "Skill Course",
          description: data.courseTitle,
          order_id: data.razorpayOrderId,
          prefill: { name: user.name, email: user.email },
          handler: async (response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            try {
              await apiFetch("/api/payment/confirm", {
                method: "POST",
                body: JSON.stringify(response),
              });
              setSuccess(true);
              setTimeout(() => router.push("/dashboard"), 2000);
            } catch (err: any) {
              setError(err.message || "Payment confirmation failed");
            }
          },
          modal: {
            ondismiss: () => router.push(`/course/${courseId}`),
          },
        };

        new window.Razorpay(options).open();
      })
      .catch((err: any) => {
        setError(err.message || "Failed to initiate payment");
        setLoading(false);
      });
  }, [courseId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">You are now enrolled in the course</p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push(`/course/${courseId}`)}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  return null;
}
