import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema({
  studentsEnrolled: { type: String, default: "230,000+" },
  videoTutorials: { type: String, default: "1,300+" },
  expertCourses: { type: String, default: "21+" },
  youtubeSubscribers: { type: String, default: "2M+" }
}, { timestamps: true });

export default mongoose.models.Stats || mongoose.model("Stats", StatsSchema);
