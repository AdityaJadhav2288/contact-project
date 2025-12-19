const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  ip: String,

  country: String,
  state: String,
  city: String,
  region: String,
  isp: String,
  timezone: String,

  device: String,
  browser: String,
  os: String,

  firstVisit: { type: Date, default: Date.now },
  lastVisit: { type: Date, default: Date.now },

  totalVisits: { type: Number, default: 1 },
});

module.exports = mongoose.model("Visitor", visitorSchema);
