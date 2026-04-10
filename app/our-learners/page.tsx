"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const testimonials = [
  { name: "Rahul Sharma", role: "Data Analyst at TCS", course: "Power BI Mastery", text: "This course completely changed my career. I got a promotion within 3 months of completing the Power BI course. The practical examples made everything so easy to understand.", rating: 5 },
  { name: "Priya Patel", role: "MIS Executive at Infosys", course: "Excel Mastery", text: "I was struggling with Excel at work. After this course, I can now build complex dashboards and automate reports. My manager was really impressed!", rating: 5 },
  { name: "Amit Verma", role: "Business Analyst at Wipro", course: "SQL Mastery", text: "The SQL course is incredibly well-structured. I went from knowing nothing about databases to writing complex queries in just a few weeks.", rating: 5 },
  { name: "Sneha Kulkarni", role: "Fresher → Data Analyst", course: "Data Analytics 3.0", text: "I was a fresher with no job. After completing the Data Analytics course, I got placed at a startup with a great package. Thank you Satish sir!", rating: 5 },
  { name: "Vikram Singh", role: "Finance Manager at KPMG", course: "Excel Mastery", text: "As a finance professional, Excel is my daily tool. This course taught me things I never knew existed. Pivot tables and Power Query are game changers.", rating: 5 },
  { name: "Anjali Desai", role: "HR Analyst at Deloitte", course: "Power BI Mastery", text: "I use Power BI every day now to create HR dashboards. The course was so practical and easy to follow. Highly recommend to anyone in analytics.", rating: 5 },
  { name: "Rohan Mehta", role: "Software Developer at HCL", course: "SQL Mastery", text: "Even as a developer, I learned so many SQL optimization techniques from this course. The real-world projects were the best part.", rating: 5 },
  { name: "Kavya Nair", role: "Operations Analyst at Accenture", course: "Data Analytics 3.0", text: "The Data Analytics 3.0 course is a complete package. Excel, SQL, Power BI — everything in one place. Best investment I've made in my career.", rating: 5 },
];

const stats = [
  { num: "230K+", label: "Happy Learners" },
  { num: "4.9★", label: "Average Rating" },
  { num: "180K+", label: "Doubts Solved" },
  { num: "50+", label: "Companies" },
];

export default function OurLearnersPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("sc_logged_in");
    if (!isLoggedIn) {
      router.replace("/login?redirect=/our-learners");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Checking login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Success Stories</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
            Our <span className="text-orange-500">Learners</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Real students. Real results. See how Skill Course has transformed careers across India.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-orange-500 py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold">{s.num}</div>
                <div className="text-sm text-orange-100 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">What Our Students Say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:border-orange-200 hover:shadow-md transition">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                    </div>
                  </div>
                  <span className="text-xs bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full font-medium">{t.course}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-orange-500 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-orange-100 mb-8">Join 230,000+ learners who are building better careers with Skill Course.</p>
          <Link href="/mastery-courses"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-10 py-4 rounded-lg hover:bg-orange-50 transition font-bold text-lg shadow-lg">
            Browse Courses
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  );
}
