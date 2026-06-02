const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const User = db.define(
  "User",
  {
    id_pengguna: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female"),
      allowNull: false,
    },
    tanggal_lahir: {
      type: DataTypes.DATEONLY, // DATEONLY menyimpan YYYY-MM-DD tanpa waktu
      allowNull: false,
    },
    telepon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true, // Boleh kosong
    },
  },
  {
    tableName: "users", // Pastikan sesuai dengan nama tabel di MySQL
    timestamps: false, // Set true jika Anda punya kolom createdAt & updatedAt
  },
);

module.exports = User;
