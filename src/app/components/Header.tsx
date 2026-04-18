"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthUser, logout } from "@/utils/auth";

const navLinks = [
  { label: "Data Analytics 3.0", href: "/data-analytics" },
  { label: "Mastery Courses", href: "/mastery-courses" },
];

const microCourses = [
  { label: "Excel Micro Course", href: "/micro-courses/excel" },
  { label: "Power BI Micro Course", href: "/micro-courses/power-bi" },
  { label: "SQL Micro Course", href: "/micro-courses/sql" },
];

const moreLinks = [
  { label: "About Us", href: "/about-skill-course" },
  { label: "Blogs", href: "/blogs" },
  { label: "Our Learners", href: "/our-learners" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [microOpen, setMicroOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof getAuthUser>>(null);

  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.png" alt="Skill Course Logo" width={40} height={40} className="w-10 h-10 object-contain" suppressHydrationWarning />
            <div>
              <div className="text-xl font-bold leading-tight">
                Skill<span className="text-orange-500">Course</span>
              </div>
              <div className="text-[10px] text-gray-500 leading-tight">E-learning Platform By Satish Dhawale</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-gray-700 hover:text-orange-500 transition font-medium whitespace-nowrap">
                {l.label}
              </Link>
            ))}

            <div className="relative" onMouseEnter={() => setMicroOpen(true)} onMouseLeave={() => setMicroOpen(false)}>
              <button className="text-sm text-gray-700 hover:text-orange-500 transition font-medium flex items-center gap-1">
                Micro Courses
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {microOpen && (
                <div className="absolute top-full left-0 bg-white rounded-lg shadow-lg border border-gray-100 pt-4 pb-2 w-52 z-50">
                  {microCourses.map((c) => (
                    <Link key={c.href} href={c.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
              <button className="text-sm text-gray-700 hover:text-orange-500 transition font-medium flex items-center gap-1">
                More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {moreOpen && (
                <div className="absolute top-full right-0 bg-white rounded-lg shadow-lg border border-gray-100 pt-4 pb-2 w-44 z-50">
                  {moreLinks.map((c) => (
                    <Link key={c.href} href={c.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="relative" onMouseEnter={() => setProfileOpen(true)} onMouseLeave={() => setProfileOpen(false)}>
                <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition">
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:inline">{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {profileOpen && (
                  <div className="absolute top-full right-0 bg-white rounded-lg shadow-lg border border-gray-100 pt-2 pb-2 w-48 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                    </div>
                    <Link
                      href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
                      onClick={() => setProfileOpen(false)}
                    >
                      {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </Link>
            )}
          </nav>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-3 pb-6">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-gray-700 hover:text-orange-500 transition text-sm font-medium">
                {l.label}
              </Link>
            ))}
            <div className="font-medium text-sm text-gray-700">Micro Courses</div>
            {microCourses.map((c) => (
              <Link key={c.href} href={c.href} className="pl-4 text-sm text-gray-600 hover:text-orange-500 transition">
                {c.label}
              </Link>
            ))}
            {moreLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-gray-700 hover:text-orange-500 transition text-sm">
                {l.label}
              </Link>
            ))}
            {user ? (
              <>
                <div className="border-t border-gray-200 pt-3 mt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                    className="block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-center text-sm font-medium mb-2"
                  >
                    {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-center text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link href="/login" className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-center text-sm font-medium mt-2">
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
