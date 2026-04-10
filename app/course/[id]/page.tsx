import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";

async function getCourse(id: string) {
  try {
    await dbConnect();
    const course = await Course.findOne({ id, active: true }).lean();
    return course ? JSON.parse(JSON.stringify(course)) : null;
  } catch {
    return null;
  }
}

async function getAllCourses() {
  try {
    await dbConnect();
    const courses = await Course.find({ active: true }).lean();
    return JSON.parse(JSON.stringify(courses));
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map((course: any) => ({ id: course.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await getCourse(id);
  if (!course) return {};
  return {
    title: `${course.title} | Skill Course`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await getCourse(id);
  if (!course) notFound();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-12 md:py-16 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-5">
              <Link href="/mastery-courses" className="inline-flex items-center gap-1 text-orange-400 text-sm hover:text-orange-300 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                All Courses
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">{course.title}</h1>
              <p className="text-gray-300 text-lg">{course.subtitle}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                  <span className="text-yellow-400 font-semibold ml-1">{course.rating}</span>
                </div>
                <span className="text-gray-400">({course.students.toLocaleString("en-IN")} students)</span>
                <span className="bg-orange-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">{course.language}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                  {course.instructor}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                  {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>
                  {course.lessons} Lessons
                </span>
                <span className="text-gray-400">Updated {course.lastUpdated}</span>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-2xl">
              <div className="relative h-48 rounded-xl overflow-hidden mb-5">
                <Image src={course.image} alt={course.title} fill className="object-cover" />
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {course.discount}% OFF
                </div>
              </div>
              <div className="mb-4">
                <span className="text-sm text-gray-400 line-through block">₹{course.originalPrice.toLocaleString("en-IN")}</span>
                <span className="text-4xl font-bold text-orange-500">₹{course.price.toLocaleString("en-IN")}</span>
              </div>
              <a
                href={course.enrollUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-orange-500 text-white py-3.5 rounded-lg hover:bg-orange-600 transition font-bold text-base flex items-center justify-center gap-2 mb-3"
              >
                Enroll Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
              <Link
                href="/login"
                className="w-full bg-gray-900 text-white py-3.5 rounded-lg hover:bg-gray-700 transition font-semibold text-base flex items-center justify-center gap-2"
              >
                Already Enrolled? Login
              </Link>
              <div className="mt-4 space-y-2 text-xs text-gray-500">
                {["Lifetime Access", "Certificate of Completion", "Free Updates", "Dedicated Support"].map((item: string) => (
                  <div key={item} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">What You&apos;ll Learn</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {course.whatYouLearn.map((item: string) => (
              <div key={item} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Description */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">About This Course</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">{course.description}</p>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Course Curriculum</h2>
          <div className="space-y-3 max-w-3xl">
            {course.curriculum.map((section: any, i: number) => (
              <div key={section.section} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-orange-200 transition">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-medium text-gray-900">{section.section}</span>
                </div>
                <span className="text-sm text-gray-500 flex-shrink-0">{section.lessons} lessons</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-orange-500 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="text-orange-100 mb-6">Join thousands of students already learning {course.title}</p>
          <a
            href={course.enrollUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-10 py-4 rounded-lg hover:bg-orange-50 transition font-bold text-lg shadow-lg"
          >
            Enroll Now at ₹{course.price.toLocaleString("en-IN")}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </a>
        </div>
      </section>
    </div>
  );
}
