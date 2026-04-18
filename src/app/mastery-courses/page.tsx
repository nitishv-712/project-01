import Image from "next/image";
import Link from "next/link";

import { apiFetch } from "@/utils/api";
import { Course } from "@/types";

async function getCourses() {
  try {
    return await apiFetch<Course[]>('/api/courses');
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Mastery Courses | Skill Course",
  description: "Explore all mastery courses by Satish Dhawale — Excel, Power BI, SQL, Python, Power Query, and AI for Data Analysis.",
};

export default async function MasteryCourses() {
  const courses = await getCourses();
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">All Courses</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Mastery Courses</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Job-oriented skill courses taught in simple Hinglish with real-world examples. Learn at your own pace with lifetime access.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
            {[["21+", "Expert Courses"], ["230K+", "Students"], ["1300+", "Video Tutorials"], ["Lifetime", "Access"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-orange-400">{val}</div>
                <div className="text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any) => (
              <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="relative h-52 overflow-hidden">
                  <Image src={course.image} alt={course.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                    <span className="bg-white text-gray-800 px-2.5 py-0.5 rounded-full text-xs font-semibold shadow">{course.language}</span>
                    <span className="bg-orange-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold shadow">{course.discount}% OFF</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-gray-900/80 text-white px-2.5 py-0.5 rounded-full text-xs font-medium">{course.category}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 mb-3 leading-snug hover:text-orange-500 transition">
                    <Link href={`/course/${course.id}`}>{course.title}</Link>
                  </h3>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                      {course.instructor}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>
                      {course.lessons} Lessons
                    </span>
                  </div>
                  <hr className="border-gray-100 mb-4" />
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-xs text-gray-400 line-through block">₹{course.originalPrice.toLocaleString("en-IN")}</span>
                      <span className="text-2xl font-bold text-orange-500">₹{course.price.toLocaleString("en-IN")}</span>
                    </div>
                    <Link href={`/course/${course.id}`} className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition text-sm font-medium flex items-center gap-1.5">
                      Explore
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-orange-500 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-3">Not sure which course to start?</h2>
          <p className="text-orange-100 mb-6">Check out our Data Analytics 3.0 bundle — the complete roadmap to become a Data Analyst.</p>
          <Link href="/data-analytics" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-3.5 rounded-lg hover:bg-orange-50 transition font-bold shadow-lg">
            View Data Analytics 3.0
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
