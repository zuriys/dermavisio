const User = require("../models/user");
const { Prediction } = require("../models/prediction");

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
  return await Prediction.findAll({
    where: { id_pengguna: userId },
    order: [["created_at", "DESC"]], // Riwayat terbaru di atas
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
