const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  date: String,
  totalVisits: {
    type: Number,
    default: 0
  },
  uniqueVisits: {
    type: Number,
    default: 0
  },
  countries: {
    type: Object,
    default: {}
  }
});

module.exports = mongoose.model("Analytics", analyticsSchema);
