import Link from "next/link";
import Image from "next/image";

const stats = [
  { num: "230K+", label: "Happy Students" },
  { num: "2M+", label: "YouTube Subscribers" },
  { num: "21+", label: "Expert Courses" },
  { num: "180K+", label: "Doubts Solved" },
];

const milestones = [
  { year: "2020", title: "Skill Course Founded", desc: "Started with a mission to provide affordable, job-oriented skill training." },
  { year: "2021", title: "ISO Certification", desc: "Received ISO certification, establishing credibility as a quality education platform." },
  { year: "2022", title: "100K Students", desc: "Crossed 100,000 enrolled students across all courses." },
  { year: "2023", title: "2M YouTube Subscribers", desc: "Reached 2 million subscribers on YouTube, becoming a trusted learning channel." },
  { year: "2024", title: "230K+ Learners", desc: "Expanded course catalog and crossed 230,000 active learners." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
            About <span className="text-orange-500">Skill Course</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            An ISO-certified e-learning platform founded by Satish Dhawale, dedicated to delivering job-oriented skill training at an affordable cost.
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

      {/* About Satish */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Our Founder</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">Satish Dhawale</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Satish Dhawale is a passionate educator with over <strong className="text-gray-900">16+ years of hands-on teaching experience</strong>. He has guided millions of learners worldwide through his YouTube channel and online courses.
                </p>
                <p>
                  His mission is simple — make quality education accessible to everyone, regardless of their background or budget. Every course is designed to be practical, easy to understand, and directly applicable to real-world jobs.
                </p>
                <p>
                  As the founder and director of Skill Course, Satish has built an ISO-certified platform trusted by over 230,000 students across India and beyond.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/mastery-courses" className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold">
                  Explore Courses
                </Link>
                <Link href="/contact" className="border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition font-semibold">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl bg-gray-100 flex items-center justify-center">
                <Image src="/hero-image.webp" alt="Satish Dhawale" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide affordable, high-quality, job-oriented skill training that empowers individuals to build better careers and achieve financial independence.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become India's most trusted e-learning platform, where every learner gets access to world-class education that transforms their professional life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Milestones</h2>
          </div>
          <div className="relative border-l-2 border-orange-200 pl-8 space-y-10">
            {milestones.map((m) => (
              <div key={m.year} className="relative">
                <div className="absolute -left-[2.65rem] w-5 h-5 bg-orange-500 rounded-full border-4 border-white shadow" />
                <span className="text-orange-500 font-bold text-sm">{m.year}</span>
                <h3 className="font-bold text-gray-900 mt-1">{m.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-orange-500 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-orange-100 mb-8">Join 230,000+ learners building better careers with Skill Course.</p>
          <Link href="/mastery-courses" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-3.5 rounded-lg hover:bg-orange-50 transition font-bold">
            Browse Courses
          </Link>
        </div>
      </section>

    </div>
  );
}
