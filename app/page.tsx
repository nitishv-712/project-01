import Image from "next/image";
import Link from "next/link";

type Course = {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  lessons: number;
  language: string;
  discount: number;
  originalPrice: number;
  price: number;
  image: string;
};

import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import Stats from "@/models/Stats";
import Testimonial from "@/models/Testimonial";

async function getCourses() {
  try {
    await dbConnect();
    const courses = await Course.find({ active: true }).sort({ createdAt: -1 }).limit(6).lean();
    return JSON.parse(JSON.stringify(courses));
  } catch {
    return [];
  }
}

async function getStats() {
  try {
    await dbConnect();
    const stats = await Stats.findOne().lean() as any;
    if (stats) {
      return [
        { value: stats.studentsEnrolled, label: "Students Enrolled" },
        { value: stats.videoTutorials, label: "Video Tutorials" },
        { value: stats.expertCourses, label: "Expert Courses" },
        { value: stats.youtubeSubscribers, label: "YouTube Subscribers" },
      ];
    }
  } catch {}
  return [
    { value: "230,000+", label: "Students Enrolled" },
    { value: "1,300+", label: "Video Tutorials" },
    { value: "21+", label: "Expert Courses" },
    { value: "2M+", label: "YouTube Subscribers" },
  ];
}

async function getTestimonials() {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find({ active: true }).sort({ createdAt: -1 }).limit(4).lean();
    return JSON.parse(JSON.stringify(testimonials));
  } catch {
    return [];
  }
}

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Learn Anywhere, Anytime",
    desc: "Access all your courses anytime, from any device — at your own pace.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "ISO Certified Platform",
    desc: "Officially recognized with an ISO Certificate, ensuring top-quality education.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Expert Instructors",
    desc: "Learn from Satish Dhawale with 16+ years of hands-on teaching experience.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Dedicated Support",
    desc: "Get your doubts resolved quickly — 180,000+ doubts solved and counting.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Lifetime Access & Updates",
    desc: "Get lifetime access to course material plus free updates as content evolves.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "Practical, Real-World Skills",
    desc: "Hands-on training with real examples to boost your job performance immediately.",
  },
];



const companies = [
  "Infosys", "TCS", "Wipro", "HCL", "Tech Mahindra",
  "Deloitte", "Accenture", "IBM", "Capgemini", "KPMG",
];

// ─── Components ───────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-52 overflow-hidden">
        <Image src={course.image} alt={course.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className="bg-white text-gray-800 px-2.5 py-0.5 rounded-full text-xs font-semibold shadow">
            {course.language}
          </span>
          <span className="bg-orange-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold shadow">
            {course.discount}% OFF
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 mb-3 leading-snug hover:text-orange-500 transition">
          <Link href={`/course/${course.id}`}>{course.title}</Link>
        </h3>

        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            {course.instructor}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            {course.lessons} Lessons
          </span>
        </div>

        <hr className="border-gray-100 mb-4" />

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-gray-400 line-through block">₹{course.originalPrice.toLocaleString("en-IN")}</span>
            <span className="text-2xl font-bold text-orange-500">₹{course.price.toLocaleString("en-IN")}</span>
          </div>
          <Link
            href={`/course/${course.id}`}
            className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition text-sm font-medium flex items-center gap-1.5"
          >
            Explore
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const courses = await getCourses();
  const stats = await getStats();
  const testimonials = await getTestimonials();
  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fadeInLeft">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse-slow" />
                ISO Certified E-learning Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight text-gray-900">
                Learn skills that help you<br />
                build a <span className="text-orange-500">Better Career</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                We offer job-oriented skill courses at an affordable cost, designed to enhance your <strong>professional capabilities</strong> and boost your career prospects, opening new doors to high-paying jobs.
              </p>
              <ul className="space-y-3">
                {["Learn From Expert (16+ Years Experience)", "Get Dedicated Support Team", "Updated Course Curriculum"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/mastery-courses"
                  className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3.5 rounded-lg hover:bg-orange-600 transition text-base font-semibold shadow-lg shadow-orange-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Explore Courses
                </Link>
                <Link
                  href="/data-analytics"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 border border-gray-300 px-8 py-3.5 rounded-lg hover:border-orange-400 hover:text-orange-500 transition text-base font-semibold"
                >
                  Data Analytics 3.0
                </Link>
              </div>
            </div>
            <div className="flex justify-center animate-fadeInRight">
              <Image
                src="/(20260409105023).png"
                alt="Learn Job Skills"
                width={580}
                height={580}
                className="w-full max-w-lg h-auto drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────── */}
      <section className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label} className="text-white">
                <div className="text-3xl font-bold text-orange-400">{s.value}</div>
                <div className="text-sm text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mastery Courses ──────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Mastery Courses</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Our skill-based courses help you learn tools like Power BI, SQL, Excel, and more — taught in simple steps with real examples.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any, index: number) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/mastery-courses" className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition font-semibold">
              View All Courses
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Why Skill Course</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Why Choose Us?</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Established in 2020, Skill Course has helped thousands of learners grow professionally with affordable, high-quality training.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Satish / Banner ─────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">About the Founder</span>
              <h2 className="text-3xl md:text-4xl font-bold">Satish Dhawale</h2>
              <p className="text-gray-300 leading-relaxed">
                With over <strong className="text-white">16+ years</strong> of hands-on teaching experience, Satish Dhawale has guided millions of people worldwide. As the director of Skill Course, he is committed to delivering practical, job-ready education at an affordable price.
              </p>
              <ul className="space-y-3">
                {[
                  "2 Million+ YouTube Subscribers",
                  "1,300+ High-Quality Video Tutorials",
                  "180,000+ Doubts Solved",
                  "ISO-Certified Education Platform",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/about-skill-course" className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold">
                Know More About Us
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "230K+", label: "Happy Students" },
                { num: "21+", label: "Expert Courses" },
                { num: "5+", label: "Years of Trust" },
                { num: "180K+", label: "Doubts Solved" },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/10">
                  <div className="text-3xl font-bold text-orange-400">{item.num}</div>
                  <div className="text-sm text-gray-300 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Student Reviews</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">What Our Learners Say</h2>
            <p className="text-gray-500 mt-3">Thousands of students have transformed their careers with Skill Course.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t: any) => (
              <div key={t.name} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-orange-200 transition">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/our-learners" className="text-orange-500 font-semibold hover:text-orange-600 transition text-sm flex items-center justify-center gap-1">
              View All Testimonials
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Companies ────────────────────────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Students Work At</h2>
            <p className="text-gray-500 mt-2 text-sm">Top companies trust our training</p>
          </div>
          {/* Scrolling marquee */}
          <div className="overflow-hidden">
            <div className="flex gap-6 animate-marquee w-max">
              {[...companies, ...companies].map((company, i) => (
                <div key={i} className="flex items-center justify-center px-8 py-4 bg-white rounded-xl shadow-sm border border-gray-100 h-16 min-w-[140px]">
                  <span className="text-gray-600 font-semibold text-sm whitespace-nowrap">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-orange-500">
        <div className="container mx-auto px-4 max-w-3xl text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Upgrade Your Skills?</h2>
          <p className="text-orange-100 mb-8 text-lg">
            Join 230,000+ learners who are building better careers with Skill Course.
          </p>
          <Link href="/mastery-courses" className="inline-flex items-center gap-2 bg-white text-orange-600 px-10 py-4 rounded-lg hover:bg-orange-50 transition font-bold text-lg shadow-lg">
            Start Learning Today
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  );
}
