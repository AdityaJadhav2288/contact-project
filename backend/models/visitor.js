const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  ip: String,
  country: String,
  city: String,
  device: String,
  browser: String,

  firstVisit: {
    type: Date,
    default: Date.now
  },

  lastVisit: {
    type: Date,
    default: Date.now
  },

  totalVisits: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model("Visitor", visitorSchema);
