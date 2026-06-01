const express = require('express');
const cors = require('cors');
const { db } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // SANGAT PENTING: Agar React bisa akses
app.use(express.json()); // Agar bisa baca JSON dari req.body

// Routes
app.use('/api/auth', authRoutes);

// Database Sync & Server Start
const PORT = process.env.PORT || 5000;

db.sync() // Membuat tabel otomatis jika belum ada (berdasarkan Model)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server Express running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log('Koneksi DB Gagal:', err));