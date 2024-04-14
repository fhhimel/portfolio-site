require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URL}`);

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
//app.use("/api/project", projectRoutes);

//Test Route
app.get("/api/test", (req, res) => {
  res.send("Server is successfully running!");
});
app.get("/", (req, res) => {
  res.send("Welcome!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
