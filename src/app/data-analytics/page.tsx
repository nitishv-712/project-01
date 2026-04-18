import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Data Analytics 3.0 | Complete Data Analyst Program",
  description: "Master Excel, Power BI, SQL, Python, Power Query, and AI for Data Analysis in one comprehensive bundle.",
};

const bundleCourses = [
  { title: "Excel Mastery", duration: "13 Hours", lessons: 53, image: "/excel.webp" },
  { title: "Power BI Mastery", duration: "13 Hours", lessons: 74, image: "/powerbi.webp" },
  { title: "SQL Mastery", duration: "8 Hours", lessons: 47, image: "/sql.webp" },
  { title: "Python Mastery", duration: "10 Hours", lessons: 60, image: "/python.webp" },
  { title: "Power Query Mastery", duration: "8.4 Hours", lessons: 32, image: "/powerquery.webp" },
  { title: "AI for Data Analysis", duration: "7 Hours", lessons: 27, image: "/ai.webp" },
];

const features = [
  "6 Complete Mastery Courses in One Bundle",
  "59+ Hours of High-Quality Video Content",
  "293+ Lessons with Real-World Examples",
  "Lifetime Access & Free Updates",
  "Downloadable Resources & Practice Files",
  "Certificate of Completion",
  "Dedicated Support Team",
  "Learn at Your Own Pace",
];

export default function DataAnalytics() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Complete Data Analyst Program
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Data Analytics 3.0
              </h1>
              <p className="text-orange-50 text-lg leading-relaxed">
                The most comprehensive data analytics program in India. Master all essential tools — Excel, Power BI, SQL, Python, Power Query, and AI — in one complete bundle.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <div>
                  <span className="text-sm text-orange-100 line-through block">₹24,500</span>
                  <span className="text-4xl font-bold">₹9,999</span>
                </div>
                <span className="bg-white text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold">Save 59%</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/login" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-3.5 rounded-lg hover:bg-orange-50 transition font-bold shadow-lg">
                  Enroll Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                <Link href="#curriculum" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white border-2 border-white px-8 py-3.5 rounded-lg hover:bg-white/20 transition font-bold">
                  View Curriculum
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {bundleCourses.slice(0, 4).map((c) => (
                <div key={c.title} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                  <div className="relative h-24 mb-3 rounded-lg overflow-hidden">
                    <Image src={c.image} alt={c.title} fill className="object-cover" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{c.title}</h4>
                  <p className="text-xs text-orange-100">{c.lessons} Lessons</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section id="curriculum" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Complete Bundle</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">What's Included?</h2>
            <p className="text-gray-500 mt-3">6 comprehensive mastery courses covering everything you need to become a Data Analyst</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bundleCourses.map((course) => (
              <div key={course.title} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:border-orange-200 transition">
                <div className="relative h-40">
                  <Image src={course.image} alt={course.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>
                      {course.lessons} Lessons
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Data Analytics 3.0?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-100">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Data Analytics Journey Today</h2>
          <p className="text-gray-300 mb-8 text-lg">Join 230,000+ students who are building successful careers in data analytics</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login" className="inline-flex items-center gap-2 bg-orange-500 text-white px-10 py-4 rounded-lg hover:bg-orange-600 transition font-bold text-lg shadow-lg">
              Enroll Now at ₹9,999
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/mastery-courses" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white border-2 border-white px-10 py-4 rounded-lg hover:bg-white/20 transition font-bold text-lg">
              View Individual Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
