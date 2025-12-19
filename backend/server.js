const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
console.log("ENV VALUE =", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Visitor route
app.use("/api", require("./routes/visitorRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));


app.listen(5000, () =>
  console.log("Server running on port 5000")
);
