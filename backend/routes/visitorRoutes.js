const express = require("express");
const router = express.Router();
const Visitor = require("../models/visitor");

router.get("/visit", async (req, res) => {
  try {
    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress;

    const userAgent = req.headers["user-agent"];

    let visitor = await Visitor.findOne({ ip, userAgent });

    if (visitor) {
      visitor.visits += 1;
      visitor.lastVisited = new Date();
      await visitor.save();
    } else {
      await Visitor.create({ ip, userAgent });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Tracking failed" });
  }
});

module.exports = router;
