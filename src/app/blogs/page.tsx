import Link from "next/link";

const blogs = [
  {
    slug: "how-to-learn-excel-fast",
    category: "Excel",
    title: "How to Learn Excel Fast: A Complete Beginner's Guide",
    excerpt: "Excel is one of the most in-demand skills in the job market. Here's a step-by-step guide to mastering it quickly, even if you're starting from scratch.",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    color: "bg-green-100 text-green-700",
  },
  {
    slug: "power-bi-vs-tableau",
    category: "Power BI",
    title: "Power BI vs Tableau: Which One Should You Learn in 2025?",
    excerpt: "Both are powerful data visualization tools, but which one is better for your career? We break down the key differences to help you decide.",
    date: "Jan 10, 2025",
    readTime: "7 min read",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    slug: "sql-for-data-analysis",
    category: "SQL",
    title: "SQL for Data Analysis: Top 10 Queries Every Analyst Must Know",
    excerpt: "From basic SELECT statements to advanced window functions — these are the SQL queries that will make you stand out in any data role.",
    date: "Jan 5, 2025",
    readTime: "6 min read",
    color: "bg-blue-100 text-blue-700",
  },
  {
    slug: "data-analytics-career-guide",
    category: "Career",
    title: "How to Start a Data Analytics Career in 2025 (No Degree Needed)",
    excerpt: "Data analytics is one of the fastest-growing fields. Learn exactly what skills you need, what tools to master, and how to land your first job.",
    date: "Dec 28, 2024",
    readTime: "8 min read",
    color: "bg-purple-100 text-purple-700",
  },
  {
    slug: "python-for-beginners",
    category: "Python",
    title: "Python for Beginners: Why It's the Best First Programming Language",
    excerpt: "Python is simple, powerful, and in high demand. Here's why you should learn it and how to get started with zero prior coding experience.",
    date: "Dec 20, 2024",
    readTime: "5 min read",
    color: "bg-orange-100 text-orange-700",
  },
  {
    slug: "work-from-home-skills",
    category: "Career",
    title: "Top 5 Skills That Will Help You Work From Home in 2025",
    excerpt: "Remote work is here to stay. These are the most valuable digital skills that employers are looking for in remote candidates right now.",
    date: "Dec 15, 2024",
    readTime: "4 min read",
    color: "bg-pink-100 text-pink-700",
  },
];

const categories = ["All", "Excel", "Power BI", "SQL", "Python", "Career"];

export default function BlogsPage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Our Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
            Tips, Guides & <span className="text-orange-500">Career Advice</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Practical articles to help you learn faster, grow your skills, and advance your career.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-gray-100 py-4 sticky top-16 z-40">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  cat === "All"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <article key={blog.slug} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${blog.color}`}>
                    {blog.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span>{blog.date}</span>
                    <span>·</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h2 className="font-bold text-gray-900 mb-3 leading-snug hover:text-orange-500 transition">
                    <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{blog.excerpt}</p>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-orange-500 font-semibold text-sm hover:text-orange-600 transition"
                  >
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-14 bg-orange-500 text-white text-center">
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-2xl font-bold mb-2">Get New Articles in Your Inbox</h2>
          <p className="text-orange-100 mb-6 text-sm">No spam. Just practical tips to help you grow.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-sm outline-none"
            />
            <button className="bg-gray-900 text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition font-semibold text-sm whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
