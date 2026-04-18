import Link from "next/link";

const topics = [
  "Introduction to Databases & SQL",
  "SELECT, WHERE & ORDER BY",
  "GROUP BY & Aggregate Functions",
  "JOINs (INNER, LEFT, RIGHT, FULL)",
  "Subqueries & Nested Queries",
  "INSERT, UPDATE & DELETE",
  "Indexes & Query Optimization",
  "Real-world Data Analysis Projects",
];

const faqs = [
  { q: "Who is this course for?", a: "Beginners, data analysts, and developers who want to query and manage databases using SQL." },
  { q: "Which SQL database is used?", a: "MySQL is used throughout the course. The concepts apply to PostgreSQL, SQL Server, and SQLite as well." },
  { q: "Do I need programming experience?", a: "No programming experience is needed. SQL is beginner-friendly and this course starts from zero." },
  { q: "Will I get a certificate?", a: "Yes, a certificate of completion is provided after finishing the course." },
];

export default function SQLMicroCourse() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="inline-block bg-blue-700 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Micro Course</span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                SQL <span className="text-orange-400">Micro Course</span>
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed">
                Learn SQL from scratch — write queries, analyze data, and manage databases with confidence. Practical, hands-on, and job-ready.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-blue-200">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                  7–9 Hours
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>
                  45+ Lessons
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
              <div className="w-72 h-72 bg-blue-700/50 rounded-2xl flex items-center justify-center">
                <svg className="w-40 h-40 text-blue-300 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 4.69 2 8v8c0 3.31 4.48 6 10 6s10-2.69 10-6V8c0-3.31-4.48-6-10-6zm0 2c4.42 0 8 2.02 8 4s-3.58 4-8 4-8-2.02-8-4 3.58-4 8-4zm0 14c-4.42 0-8-2.02-8-4v-2.55C5.49 13.1 8.6 14 12 14s6.51-.9 8-2.55V16c0 1.98-3.58 4-8 4z"/>
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
          <h2 className="text-3xl font-bold mb-3">Start Writing SQL Queries Today</h2>
          <p className="text-orange-100 mb-8">Join thousands of students who have already mastered SQL with Skill Course.</p>
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
