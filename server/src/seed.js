require('dotenv').config();
const connectDB = require('./config/db');
const Course = require('./models/Course');
const Testimonial = require('./models/Testimonial');
const Stats = require('./models/Stats');

const coursesData = [
  {
    id: "ai-data-analysis",
    title: "AI for Data Analysts Mastery",
    subtitle: "Learn how to use AI tools to supercharge your data analysis workflow",
    instructor: "Satish Dhawale",
    duration: "7 Hours",
    lessons: 27,
    language: "Hinglish",
    discount: 56,
    originalPrice: 4500,
    price: 1999,
    image: "/ai.webp",
    category: "AI & Analytics",
    enrollUrl: "https://skillcourse.in/course/ai-for-data-analysts-mastery/",
    rating: 4.9,
    students: 12400,
    lastUpdated: "November 2024",
    description: "Master AI tools like ChatGPT, Copilot, and more to automate and enhance your data analysis tasks. This course is designed for data analysts who want to stay ahead of the curve by integrating AI into their daily workflow.",
    whatYouLearn: [
      "Use ChatGPT for data analysis and automation",
      "Leverage Microsoft Copilot in Excel and Power BI",
      "Automate repetitive data tasks with AI",
      "Write better formulas and queries using AI assistance",
      "Generate insights and reports faster with AI tools",
      "Understand AI limitations and best practices"
    ],
    curriculum: [
      { section: "Introduction to AI for Data Analysis", lessons: 4 },
      { section: "ChatGPT for Data Analysts", lessons: 6 },
      { section: "Microsoft Copilot Integration", lessons: 5 },
      { section: "AI-Powered Excel & Power BI", lessons: 7 },
      { section: "Real-World Projects", lessons: 5 }
    ],
    featured: true
  },
  {
    id: "power-query",
    title: "Power Query Mastery",
    subtitle: "Transform and clean data like a pro with Power Query",
    instructor: "Satish Dhawale",
    duration: "8.4 Hours",
    lessons: 32,
    language: "Hinglish",
    discount: 43,
    originalPrice: 3500,
    price: 1999,
    image: "/powerquery.webp",
    category: "Excel & Power Tools",
    enrollUrl: "https://study.skillcourse.in/login/?redirect_to=https%3A%2F%2Fstudy.skillcourse.in%2F",
    rating: 4.8,
    students: 18200,
    lastUpdated: "October 2024",
    description: "Power Query is the most powerful data transformation tool in Excel and Power BI. Learn to clean, reshape, and automate your data workflows without writing a single line of code.",
    whatYouLearn: [
      "Import data from multiple sources",
      "Clean and transform messy data",
      "Merge and append queries",
      "Create automated data refresh workflows",
      "Use M language for advanced transformations",
      "Build reusable query templates"
    ],
    curriculum: [
      { section: "Power Query Basics", lessons: 6 },
      { section: "Data Transformation Techniques", lessons: 8 },
      { section: "Merging & Appending Data", lessons: 6 },
      { section: "Advanced M Language", lessons: 7 },
      { section: "Real-World Projects", lessons: 5 }
    ],
    featured: true
  },
  {
    id: "excel",
    title: "Excel Mastery",
    subtitle: "From beginner to advanced Excel — the complete guide",
    instructor: "Satish Dhawale",
    duration: "13 Hours",
    lessons: 53,
    language: "Hinglish",
    discount: 51,
    originalPrice: 3500,
    price: 1699,
    image: "/excel.webp",
    category: "Excel & Power Tools",
    enrollUrl: "https://study.skillcourse.in/login/?redirect_to=https%3A%2F%2Fstudy.skillcourse.in%2F",
    rating: 4.9,
    students: 65000,
    lastUpdated: "December 2024",
    description: "The most comprehensive Excel course in India. Learn everything from basic formulas to advanced pivot tables, dashboards, and automation with macros.",
    whatYouLearn: [
      "Master all essential Excel formulas and functions",
      "Build professional dashboards and reports",
      "Work with Pivot Tables and Pivot Charts",
      "Use VLOOKUP, INDEX-MATCH, and advanced lookups",
      "Automate tasks with Macros and VBA basics",
      "Data validation, conditional formatting, and more"
    ],
    curriculum: [
      { section: "Excel Fundamentals", lessons: 8 },
      { section: "Formulas & Functions", lessons: 12 },
      { section: "Data Analysis Tools", lessons: 10 },
      { section: "Pivot Tables & Charts", lessons: 9 },
      { section: "Dashboards & Reporting", lessons: 8 },
      { section: "Automation & Macros", lessons: 6 }
    ],
    featured: true
  },
  {
    id: "power-bi",
    title: "Power BI Mastery",
    subtitle: "Create stunning dashboards and business intelligence reports",
    instructor: "Satish Dhawale",
    duration: "13 Hours",
    lessons: 74,
    language: "Hinglish",
    discount: 47,
    originalPrice: 4500,
    price: 2399,
    image: "/powerbi.webp",
    category: "Business Intelligence",
    enrollUrl: "https://study.skillcourse.in/login/?redirect_to=https%3A%2F%2Fstudy.skillcourse.in%2F",
    rating: 4.9,
    students: 42000,
    lastUpdated: "November 2024",
    description: "Become a Power BI expert. Learn to connect data sources, build interactive dashboards, write DAX formulas, and share reports with your organization.",
    whatYouLearn: [
      "Connect and import data from multiple sources",
      "Build interactive dashboards and reports",
      "Write DAX formulas for advanced calculations",
      "Create custom visuals and charts",
      "Publish and share reports in Power BI Service",
      "Row-level security and data modeling"
    ],
    curriculum: [
      { section: "Power BI Introduction", lessons: 8 },
      { section: "Data Modeling", lessons: 12 },
      { section: "DAX Fundamentals", lessons: 15 },
      { section: "Advanced DAX", lessons: 14 },
      { section: "Visualizations & Dashboards", lessons: 15 },
      { section: "Power BI Service & Sharing", lessons: 10 }
    ],
    featured: true
  },
  {
    id: "sql",
    title: "SQL Mastery",
    subtitle: "Master SQL for data analysis and database management",
    instructor: "Satish Dhawale",
    duration: "8 Hours",
    lessons: 47,
    language: "Hinglish",
    discount: 47,
    originalPrice: 4500,
    price: 2399,
    image: "/sql.webp",
    category: "Database",
    enrollUrl: "https://study.skillcourse.in/login/?redirect_to=https%3A%2F%2Fstudy.skillcourse.in%2F",
    rating: 4.8,
    students: 28000,
    lastUpdated: "October 2024",
    description: "Learn SQL from scratch and become proficient in querying databases for data analysis. Covers everything from basic SELECT statements to advanced joins, subqueries, and window functions.",
    whatYouLearn: [
      "Write SQL queries from basic to advanced",
      "Master JOINs, subqueries, and CTEs",
      "Use aggregate functions and GROUP BY",
      "Window functions for advanced analytics",
      "Database design and normalization",
      "Real-world data analysis projects"
    ],
    curriculum: [
      { section: "SQL Basics", lessons: 8 },
      { section: "Filtering & Sorting", lessons: 7 },
      { section: "Joins & Relationships", lessons: 10 },
      { section: "Aggregate Functions", lessons: 8 },
      { section: "Advanced SQL", lessons: 9 },
      { section: "Real-World Projects", lessons: 5 }
    ],
    featured: true
  },
  {
    id: "python",
    title: "Python Mastery",
    subtitle: "Learn Python for data analysis and automation",
    instructor: "Satish Dhawale",
    duration: "10 Hours",
    lessons: 60,
    language: "Hinglish",
    discount: 50,
    originalPrice: 4000,
    price: 1999,
    image: "/python.webp",
    category: "Programming",
    enrollUrl: "https://study.skillcourse.in/login/?redirect_to=https%3A%2F%2Fstudy.skillcourse.in%2F",
    rating: 4.8,
    students: 35000,
    lastUpdated: "December 2024",
    description: "Learn Python programming with a focus on data analysis. Master Pandas, NumPy, Matplotlib, and more to analyze and visualize data like a professional data analyst.",
    whatYouLearn: [
      "Python fundamentals and programming basics",
      "Data manipulation with Pandas",
      "Numerical computing with NumPy",
      "Data visualization with Matplotlib & Seaborn",
      "Automating Excel and data tasks with Python",
      "Real-world data analysis projects"
    ],
    curriculum: [
      { section: "Python Fundamentals", lessons: 10 },
      { section: "Pandas for Data Analysis", lessons: 15 },
      { section: "NumPy Essentials", lessons: 8 },
      { section: "Data Visualization", lessons: 12 },
      { section: "Automation Projects", lessons: 8 },
      { section: "Capstone Projects", lessons: 7 }
    ],
    featured: true
  }
];

const testimonialsData = [
  { name: "Rahul Sharma", role: "Data Analyst, Pune", text: "Incredible course with engaging, expertly delivered content and real-world examples. User-friendly platform and fantastic support. Highly recommended!", rating: 5 },
  { name: "Priya Patel", role: "MIS Executive, Mumbai", text: "Simple language makes complex topics easy to understand. Clear, well-structured lessons with effective teaching. Highly valuable for professionals!", rating: 5 },
  { name: "Amit Verma", role: "Finance Manager, Delhi", text: "Great for time management, boosting productivity. Easy to follow and no compromise on quality. The Excel mastery course changed my career.", rating: 5 },
  { name: "Sneha Joshi", role: "Business Analyst, Bangalore", text: "The Power BI course was exceptional. Got promoted within 3 months of completing it. The instructor explains everything step by step.", rating: 5 }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Course.deleteMany({});
    await Testimonial.deleteMany({});
    await Stats.deleteMany({});

    console.log('Seeding courses...');
    await Course.insertMany(coursesData);
    console.log(`✓ ${coursesData.length} courses added`);

    console.log('Seeding testimonials...');
    await Testimonial.insertMany(testimonialsData);
    console.log(`✓ ${testimonialsData.length} testimonials added`);

    console.log('Seeding stats...');
    await Stats.create({
      studentsEnrolled: "230,000+",
      videoTutorials: "1,300+",
      expertCourses: "21+",
      youtubeSubscribers: "2M+"
    });
    console.log('✓ Stats added');

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
