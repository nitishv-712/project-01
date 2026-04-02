import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: String,
  instructor: { type: String, default: "Satish Dhawale" },
  duration: String,
  lessons: Number,
  language: { type: String, default: "Hinglish" },
  discount: Number,
  originalPrice: Number,
  price: Number,
  image: String,
  category: String,
  enrollUrl: String,
  rating: { type: Number, default: 4.8 },
  students: { type: Number, default: 0 },
  lastUpdated: String,
  description: String,
  whatYouLearn: [String],
  curriculum: [{
    section: String,
    lessons: Number
  }],
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
