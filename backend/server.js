const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// *********** VERY IMPORTANT ***********
app.set("trust proxy", true);
// **************************************

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", require("./routes/visitorRoutes"));

app.listen(5000, () =>
  console.log("Server running on port 5000")
);
