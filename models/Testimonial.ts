import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: String,
  text: { type: String, required: true },
  rating: { type: Number, default: 5 },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
