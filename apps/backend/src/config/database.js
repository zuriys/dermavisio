const { Sequelize } = require('sequelize');
require('dotenv').config();

// Railway menyediakan MYSQL_URL secara otomatis jika Anda menggunakan layanan MySQL mereka.
// Jika tidak ada (di localhost), maka akan menggunakan data manual dari .env.
const connectionString = process.env.MYSQL_URL;

const config = {
  development: {
    // TAMBAHKAN BARIS INI: prioritaskan URL jika ada
    url: process.env.MYSQL_URL || null, 
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'dermavisio',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    // Tambahkan ini agar aman saat konek ke cloud
    dialectOptions: {
      ssl: process.env.MYSQL_URL ? { rejectUnauthorized: false } : false
    }
  },
  production: {
    use_env_variable: 'MYSQL_URL',
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
};

let db;

if (connectionString) {
  // Jika ada di server (Railway), gunakan URL koneksi
  db = new Sequelize(connectionString, {
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Jika di localhost, gunakan settingan manual
  db = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      host: config.development.host,
      port: config.development.port,
      dialect: config.development.dialect,
      logging: config.development.logging
    }
  );
}

// Ekspor agar bisa dibaca CLI dan App
module.exports = config; 
module.exports.db = db;