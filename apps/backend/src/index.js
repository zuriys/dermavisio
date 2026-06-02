const express = require("express");
const path = require("path");
const cors = require("cors");
const { db } = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const predictRoutes = require("./routes/predictRoutes");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();

// 1. Konfigurasi CORS (Sudah cukup menangani OPTIONS secara otomatis)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// 2. Middleware
app.use(fileUpload());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.urlencoded({ extended: true }));

// 3. Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/predict", predictRoutes);

// Database Sync & Server Start
const PORT = process.env.PORT || 5001;

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server Express running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("Koneksi DB Gagal:", err));
