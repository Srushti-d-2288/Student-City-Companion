const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();   // ✅ FIRST create app

app.use(cors());         // ✅ THEN use middleware

app.use("/uploads", express.static("uploads"));
app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const pgRoutes = require("./routes/pgRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/pg", pgRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});