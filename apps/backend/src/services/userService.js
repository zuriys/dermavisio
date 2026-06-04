const User = require("../models/user");
const Prediction = require("../models/prediction");
const { getLabelInfo } = require("../utils/labelMapper");


const getUserProfile = async (userId) => {
  return await User.findByPk(userId, {
    attributes: { exclude: ["password"] }, // Jangan kirim password ke frontend
  });
};

const updateUserProfile = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User tidak ditemukan");
  return await user.update(updateData);
};

const getUserHistory = async (userId) => {
  const rawHistory = await Prediction.findAll({
    where: { id_pengguna: userId },
    order: [["createdAt", "DESC"]],
  });

  return rawHistory.map((item) => {
    const info = getLabelInfo(item.hasil); // Memakai labelMapper.js
    return {
      ...item.toJSON(),
      hasil_teks: info.name, // Agar di React muncul "Melanoma" dsb
      confidence: item.confidence,
      created_at: item.createdAt
    };
  });
};

const deleteHistory = async (userId, predictionId) => {
  return await Prediction.destroy({
    where: { id_prediksi: predictionId, id_pengguna: userId },
  });
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserHistory,
  deleteHistory,
};
