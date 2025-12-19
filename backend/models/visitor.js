const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  ip: { type: String, required: true },

  // GEO
  country: { type: String, default: "Unknown" },
  state: { type: String, default: "Unknown" },
  city: { type: String, default: "Unknown" },
  region: { type: String, default: "Unknown" },
  isp: { type: String, default: "Unknown" },
  timezone: { type: String, default: "Unknown" },

  // DEVICE
  device: { type: String, default: "Unknown" },
  browser: { type: String, default: "Unknown" },
  os: { type: String, default: "Unknown" },

  // VISITS
  totalVisits: { type: Number, default: 1 },
  firstVisit: { type: Date, default: Date.now },
  lastVisit: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Visitor", visitorSchema);
