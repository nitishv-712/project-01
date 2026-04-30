"use client";

import Link from "next/link";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiFetch } from "@/utils/api";
import { getAuthUser } from "@/utils/auth";
import { AuthResponse } from "@/types";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || null;
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const [showAdminMode, setShowAdminMode] = useState(false);

  useEffect(() => {
    const user = getAuthUser();
    if (user) {
      router.replace((user.role === 'admin' || user.role === 'superadmin') ? '/admin/dashboard' : '/dashboard');
    }
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setFieldErrors({ email: "", password: "" });

    // Validation
    const errors = { email: "", password: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (errors.email || errors.password) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const data = await apiFetch<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      localStorage.setItem('sc_token', data.token);
      
      if (redirect) {
        router.push(redirect);
      } else if (data.role === 'admin' || data.role === 'superadmin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-100 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Link href="/" className="text-2xl font-bold">
                Skill<span className="text-orange-500">Course</span>
              </Link>
              <button
                type="button"
                onClick={() => setShowAdminMode(!showAdminMode)}
                className="text-orange-500 hover:text-orange-600 transition"
                title="Admin Login"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {showAdminMode ? "Admin Access" : "Welcome Back!"}
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              {showAdminMode ? "Restricted area - Admin credentials required" : "Login to access your courses"}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
                }}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm ${
                  fieldErrors.email ? "border-red-300 bg-red-50" : "border-gray-200"
                }`}
              />
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs text-red-600">{fieldErrors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: "" });
                }}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm ${
                  fieldErrors.password ? "border-red-300 bg-red-50" : "border-gray-200"
                }`}
              />
              {fieldErrors.password && (
                <p className="mt-1.5 text-xs text-red-600">{fieldErrors.password}</p>
              )}
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-orange-500" />
                Remember me
              </label>
              <span className="text-gray-400 font-medium cursor-not-allowed" title="Coming soon">
                Forgot password?
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3.5 rounded-lg hover:bg-orange-600 transition font-semibold text-base disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login to My Courses"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-orange-500 hover:text-orange-600 font-semibold">
              Create Account
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            Secure Login
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            ISO Certified
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
            230K+ Students
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
