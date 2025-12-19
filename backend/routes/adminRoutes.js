const express = require("express");
const Visitor = require("../models/visitor");
const Analytics = require("../models/analytics");

const router = express.Router();

// Simple Security Key
const ADMIN_KEY = process.env.ADMIN_KEY;

router.get("/stats", async (req, res) => {
  try {
    const key = req.headers.authorization;

    if (!key || key !== ADMIN_KEY) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const totalVisitors = await Visitor.countDocuments();

    const uniqueVisitors = await Visitor.countDocuments();

    const today = new Date().toISOString().split("T")[0];
    const todayStats =
      await Analytics.findOne({ date: today }) || {
        totalVisits: 0,
        uniqueVisits: 0,
        countries: {}
      };

    const last7Days = await Analytics.find()
      .sort({ _id: -1 })
      .limit(7);

    res.json({
      success: true,
      totalVisitors,
      uniqueVisitors,
      today: todayStats,
      last7Days
    });

  } catch (err) {
    console.log(err);
    res.json({ error: "Analytics fetch failed" });
  }
});

module.exports = router;
