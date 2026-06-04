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
  app.listen(PORT,"0.0.0.0", () => {
    console.log(`🚀 Server Express running on http://localhost:${PORT}`);
  });
})
.catch(err => console.log('Koneksi DB Gagal:', err));