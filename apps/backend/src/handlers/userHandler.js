const userService = require("../services/userService");
const path = require("path");
const fs = require("fs");

const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    let updateData = { nama: req.body.nama }; // Ambil nama dari body

    if (req.files && req.files.foto) {
      const file = req.files.foto;
      const fileName = `profile-${req.user.id}-${Date.now()}${path.extname(file.name)}`;
      const uploadPath = path.join(
        __dirname,
        "../../uploads/profiles/",
        fileName,
      );

      // Buat folder jika belum ada
      if (!fs.existsSync(path.join(__dirname, "../../uploads/profiles/"))) {
        fs.mkdirSync(path.join(__dirname, "../../uploads/profiles/"), {
          recursive: true,
        });
      }

      await file.mv(uploadPath);
      updateData.foto = fileName; // INI YANG AKAN DISIMPAN KE DB
    }

    // Panggil service untuk update ke MySQL
    const user = await userService.updateUserProfile(req.user.id, updateData);

    res.json({ status: "success", data: user });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await userService.getUserHistory(req.user.id);
    res.json({ status: "success", data: history });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const removeHistory = async (req, res) => {
  try {
    await userService.deleteHistory(req.user.id, req.params.id);
    res.json({ status: "success", message: "Riwayat berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

module.exports = { getProfile, updateProfile, getHistory, removeHistory };
