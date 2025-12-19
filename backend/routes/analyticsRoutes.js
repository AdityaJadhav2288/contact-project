const express = require("express");
const Visitor = require("../models/visitor");
const router = express.Router();

// 📊 Visitors per Day Chart
router.get("/chart", async (req, res) => {
  try {
    const data = await Visitor.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$lastVisit" }
          },
          visits: { $sum: "$visitCount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.json({ error: "chart failed" });
  }
});

module.exports = router;
