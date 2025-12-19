const express = require("express");
const router = express.Router();
const Visitor = require("../models/visitor");
const axios = require("axios");
const useragent = require("useragent");

router.get("/visit", async (req, res) => {
  try {
    // GET REAL CLIENT IP
    let ip =
      req.headers["x-client-ip"] ||
      req.headers["x-real-ip"] ||
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.ip ||
      req.socket.remoteAddress ||
      "0.0.0.0";

    if (ip.startsWith("::ffff:")) ip = ip.replace("::ffff:", "");

    // for localhost testing
    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "103.159.196.14";  // Sample India IP (works for testing)
    }

    console.log("Final IP Used:", ip);

    // DEFAULT LOCATION
    let location = {
      country: "Unknown",
      state: "Unknown",
      city: "Unknown",
      region: "Unknown",
      isp: "Unknown",
      timezone: "Unknown",
    };

    // FETCH GEO DATA
    try {
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      const geo = response.data;

      console.log("Geo Response:", geo);

      if (geo.status === "success") {
        location.country = geo.country || "Unknown";
        location.state = geo.regionName || "Unknown";
        location.city = geo.city || "Unknown";
        location.region = geo.region || "Unknown";
        location.isp = geo.isp || "Unknown";
        location.timezone = geo.timezone || "Unknown";
      }
    } catch (e) {
      console.log("Geo API Failed:", e.message);
    }

    // DEVICE DETAILS
    const agent = useragent.parse(req.headers["user-agent"]);
    const device = agent.device.family || "Unknown";
    const browser = agent.family || "Unknown";
    const os = agent.os.family || "Unknown";

    // FIND VISITOR
    let visitor = await Visitor.findOne({ ip });

    if (visitor) {
      visitor.totalVisits += 1;
      visitor.lastVisit = new Date();
      await visitor.save();
    } else {
      visitor = await Visitor.create({
        ip,

        country: location.country,
        state: location.state,
        city: location.city,
        region: location.region,
        isp: location.isp,
        timezone: location.timezone,

        device,
        browser,
        os,

        firstVisit: new Date(),
        lastVisit: new Date(),
        totalVisits: 1,
      });
    }

    res.json({ message: "Tracked", visitor });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Tracking failed" });
  }
});

module.exports = router;
