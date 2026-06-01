const { DataTypes } = require('sequelize');
const { db } = require('../config/database'); // Tambahkan kurung kurawal { } di sini

const User = db.define('User', {
  id_pengguna: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nama: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING },
  tanggal_lahir: { type: DataTypes.DATEONLY },
  telepon: { type: DataTypes.STRING }
}, { tableName: 'pengguna', timestamps: true });

module.exports = User;