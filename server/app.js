require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URL}`);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", todoRoutes);

//Test Route
app.get("/api/test", (req, res) => {
  res.send("Server is successfully running!");
});

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "dist")));
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
