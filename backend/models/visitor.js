const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    ip: String,
    userAgent: String,
    visits: { type: Number, default: 1 },
    lastVisited: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);
