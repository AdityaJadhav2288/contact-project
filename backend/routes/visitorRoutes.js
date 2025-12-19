const express = require("express");
const axios = require("axios");
const Visitor = require("../models/visitor");
const Analytics = require("../models/analytics");

const router = express.Router();

// Get Real Client IP
function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    "unknown"
  );
}

router.get("/visit", async (req, res) => {
  try {
    const ip = getClientIp(req);

    // Fetch geo location
    const geo = await axios.get(`https://ipapi.co/${ip}/json/`).catch(() => ({
      data: {}
    }));

    const country = geo.data.country_name || "Unknown";
    const city = geo.data.city || "Unknown";

    const userAgent = req.headers["user-agent"] || "";
    const device = userAgent.includes("Mobile") ? "Mobile" : "Desktop";
    const browser =
      userAgent.includes("Chrome") ? "Chrome" :
      userAgent.includes("Firefox") ? "Firefox" :
      userAgent.includes("Safari") ? "Safari" :
      "Other";

    // Check if unique visitor exists
    let visitor = await Visitor.findOne({ ip });

    if (!visitor) {
      visitor = new Visitor({
        ip,
        country,
        city,
        device,
        browser
      });
      await visitor.save();
    } else {
      visitor.totalVisits++;
      visitor.lastVisit = Date.now();
      await visitor.save();
    }

    // Analytics Today
    const today = new Date().toISOString().split("T")[0];

    let analytics = await Analytics.findOne({ date: today });

    if (!analytics) {
      analytics = new Analytics({
        date: today,
        totalVisits: 1,
        uniqueVisits: 1,
        countries: { [country]: 1 }
      });
    } else {
      analytics.totalVisits++;

      if (!await Visitor.exists({ ip })) {
        analytics.uniqueVisits++;
      }

      analytics.countries[country] =
        (analytics.countries[country] || 0) + 1;
    }

    await analytics.save();

    const totalVisitors = await Visitor.countDocuments();
    res.json({
      success: true,
      totalVisitors,
      uniqueVisitors: totalVisitors,
      todayStats: analytics
    });

  } catch (error) {
    console.log(error);
    res.json({ error: "Tracking failed" });
  }
});

module.exports = router;
