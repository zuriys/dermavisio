const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

const Prediction = db.define('Prediction', {
  id_prediksi: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_pengguna: { type: DataTypes.INTEGER, allowNull: false },
  hasil: { type: DataTypes.STRING, allowNull: false },
  confidence: { type: DataTypes.FLOAT },
  image_url: { type: DataTypes.STRING }
}, { tableName: 'prediksi', timestamps: true });


Prediction.associate = (models) => {
  Prediction.belongsTo(models.User, {
    foreignKey: 'id_pengguna',
    as: 'pemilik'
  });
};


module.exports = Prediction;