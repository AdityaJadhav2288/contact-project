const express = require("express");
const router = express.Router();
const Visitor = require("../models/visitor");
const axios = require("axios");
const useragent = require("useragent");

router.get("/visit", async (req, res) => {
  try {
    // ------- GET REAL IP -------
    let ip =
      req.headers["x-real-ip"] ||
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      "0.0.0.0";

    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "103.159.196.14"; // dummy India IP for local testing
    }

    console.log("User IP:", ip);

    // ------- GEO DETAILS -------
    let geo = {
      country: "Unknown",
      state: "Unknown",
      city: "Unknown",
      region: "Unknown",
      isp: "Unknown",
      timezone: "Unknown",
    };

    try {
      const r = await axios.get(`http://ip-api.com/json/${ip}`);
      if (r.data.status === "success") {
        geo.country = r.data.country;
        geo.state = r.data.regionName;
        geo.city = r.data.city;
        geo.region = r.data.regionName;
        geo.isp = r.data.isp;
        geo.timezone = r.data.timezone;
      }
    } catch (err) {
      console.log("Geo lookup failed");
    }

    // ------- DEVICE INFO -------
    const agent = useragent.parse(req.headers["user-agent"]);
    const device = agent.device.family || "Unknown";
    const browser = agent.family || "Unknown";
    const os = agent.os.family || "Unknown";

    let visitor = await Visitor.findOne({ ip });

    if (visitor) {
      visitor.totalVisits += 1;
      visitor.lastVisit = new Date();
      await visitor.save();
    } else {
      visitor = await Visitor.create({
        ip,
        ...geo,
        device,
        browser,
        os,
        totalVisits: 1,
        firstVisit: new Date(),
        lastVisit: new Date(),
      });
    }

    res.json({ success: true, visitor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Tracking failed" });
  }
});

module.exports = router;
