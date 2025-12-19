const express = require("express");
const router = express.Router();
const Visitor = require("../models/visitor");
const axios = require("axios");
const useragent = require("useragent");

router.get("/visit", async (req, res) => {
  try {
    // Get Real IP
    let ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.connection.remoteAddress ||
      req.ip ||
      "0.0.0.0";

    // Localhost Fix
    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "1.1.1.1"; // Fake testing IP
    }

    let location = {
      country: "Unknown",
      city: "Unknown",
      region: "Unknown",
      isp: "Unknown",
      timezone: "Unknown"
    };

    let state = "Unknown";

    try {
      const geo = await axios.get(`https://ipapi.co/${ip}/json/`);
      location.country = geo.data.country_name || "Unknown";
      location.city = geo.data.city || "Unknown";
      location.region = geo.data.region || "Unknown";
      location.isp = geo.data.org || "Unknown";
      location.timezone = geo.data.timezone || "Unknown";

      state = geo.data.region || "Unknown";
    } catch (err) {
      console.log("Geo API failed");
    }

    // Device Details
    const agent = useragent.parse(req.headers["user-agent"]);
    const device = agent.device.family || "Unknown";
    const browser = agent.family || "Unknown";
    const os = agent.os.family || "Unknown";

    // Check Visitor
    let visitor = await Visitor.findOne({ ip });

    if (visitor) {
      visitor.totalVisits += 1;
      visitor.lastVisit = new Date();
      visitor.country = location.country;
      visitor.city = location.city;
      visitor.region = location.region;
      visitor.state = state;
      await visitor.save();
    } else {
      visitor = await Visitor.create({
        ip,
        country: location.country,
        city: location.city,
        region: location.region,
        state,
        isp: location.isp,
        timezone: location.timezone,
        device,
        browser,
        os,
        totalVisits: 1,
        firstVisit: new Date(),
        lastVisit: new Date()
      });
    }

    res.json({ success: true, visitor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Tracking failed" });
  }
});

module.exports = router;
