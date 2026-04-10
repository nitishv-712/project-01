import Link from "next/link";

const topics = [
  "Excel Interface & Navigation",
  "Formulas & Functions (SUM, IF, VLOOKUP)",
  "Data Sorting & Filtering",
  "Pivot Tables & Pivot Charts",
  "Conditional Formatting",
  "Charts & Data Visualization",
  "Data Validation & Protection",
  "Power Query Basics",
];

const faqs = [
  { q: "Who is this course for?", a: "Anyone who wants to learn Excel from scratch — students, working professionals, or job seekers." },
  { q: "Do I need prior experience?", a: "No. This course starts from the very basics and gradually moves to advanced topics." },
  { q: "What version of Excel is used?", a: "Microsoft Excel 2019 / Office 365. Most content applies to Excel 2016+ as well." },
  { q: "Will I get a certificate?", a: "Yes, a certificate of completion is provided after finishing the course." },
];

export default function ExcelMicroCourse() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-green-800 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="inline-block bg-green-700 text-green-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Micro Course</span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Excel <span className="text-orange-400">Micro Course</span>
              </h1>
              <p className="text-green-100 text-lg leading-relaxed">
                Master Microsoft Excel from basics to advanced — formulas, pivot tables, charts, and more. Learn at your own pace with practical examples.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-green-200">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                  6–8 Hours
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>
                  40+ Lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                  Satish Dhawale
                </span>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="https://study.skillcourse.in" target="_blank" rel="noreferrer"
                  className="bg-orange-500 text-white px-8 py-3.5 rounded-lg hover:bg-orange-600 transition font-bold">
                  Enroll Now
                </a>
                <Link href="/mastery-courses" className="bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-lg hover:bg-white/20 transition font-semibold">
                  View All Courses
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="w-72 h-72 bg-green-700/50 rounded-2xl flex items-center justify-center">
                <svg className="w-40 h-40 text-green-300 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.5 2.5c0 1.5-1.5 7-1.5 7h-2S9.5 4 9.5 2.5a2.5 2.5 0 015 0zM12 12a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H5z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Curriculum</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">What You'll Learn</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {topics.map((topic) => (
              <div key={topic} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 text-sm">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">FAQs</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-orange-500 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-3">Start Learning Excel Today</h2>
          <p className="text-orange-100 mb-8">Join thousands of students who have already mastered Excel with Skill Course.</p>
          <a href="https://study.skillcourse.in" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-10 py-4 rounded-lg hover:bg-orange-50 transition font-bold text-lg shadow-lg">
            Enroll Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

    </div>
  );
}
