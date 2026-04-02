const express = require('express');
const router = express.Router();
const Stats = require('../models/Stats');

// Get stats
router.get('/', async (req, res) => {
  try {
    let stats = await Stats.findOne();
    if (!stats) {
      stats = await Stats.create({
        studentsEnrolled: "230,000+",
        videoTutorials: "1,300+",
        expertCourses: "21+",
        youtubeSubscribers: "2M+"
      });
    }
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update stats
router.put('/', async (req, res) => {
  try {
    let stats = await Stats.findOne();
    if (!stats) {
      stats = await Stats.create(req.body);
    } else {
      stats = await Stats.findByIdAndUpdate(stats._id, req.body, { new: true });
    }
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
