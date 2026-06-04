// const express = require('express');
// const cors = require('cors');
// const { db } = require('./config/database');
// const authRoutes = require('./routes/authRoutes');
// require('dotenv').config();


// const app = express();

// // Middleware
// app.use(cors()); // SANGAT PENTING: Agar React bisa akses
// app.use(express.json()); // Agar bisa baca JSON dari req.body

// // Routes
// app.use('/api/auth', authRoutes);

// // Database Sync & Server Start
// const PORT = process.env.PORT || 5001;

// db.sync() // Membuat tabel otomatis jika belum ada (berdasarkan Model)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`🚀 Server Express running on http://localhost:${PORT}`);
//     });
//   })
//   .catch(err => console.log('Koneksi DB Gagal:', err));


// const express = require('express');
// const cors = require('cors');
// const fileUpload = require('express-fileupload'); // 1. Tambahkan ini untuk handle gambar
// const { db } = require('./config/database');
// const authRoutes = require('./routes/authRoutes');
// const predictRoutes = require('./routes/predictRoutes'); // 2. Import rute prediksi
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors()); 
// app.use(express.json());
// app.use(fileUpload()); // 3. Aktifkan middleware upload file

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/predict', predictRoutes);
//  // 4. Daftarkan pintu /api/predict di sini

// // Database Sync & Server Start
// const PORT = process.env.PORT || 5001;

// db.sync() 
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`🚀 Server Express running on http://localhost:${PORT}`);
//     });
//   })
//   .catch(err => console.log('Koneksi DB Gagal:', err));








const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { db } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const predictRoutes = require('./routes/predictRoutes');
const userRoutes = require('./routes/userRoutes'); 
const User = require('./models/user');
const path = require('path');
const Prediction = require('./models/prediction')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/predict', predictRoutes);
app.use('/api/user', userRoutes); // 2. TAMBAHKAN INI (Menghubungkan ke /api/user)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

User.associate({ Prediction });
Prediction.associate({ User });

const PORT = process.env.PORT || 5001;

db.sync()
.then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server Express running on http://localhost:${PORT}`);
  });
})
.catch(err => console.log('Koneksi DB Gagal:', err));