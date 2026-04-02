const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
  studentsEnrolled: { type: String, default: "230,000+" },
  videoTutorials: { type: String, default: "1,300+" },
  expertCourses: { type: String, default: "21+" },
  youtubeSubscribers: { type: String, default: "2M+" }
}, { timestamps: true });

module.exports = mongoose.model('Stats', StatsSchema);
