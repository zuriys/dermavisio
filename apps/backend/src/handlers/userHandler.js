const userService = require("../services/userService");
const path = require("path");
const fs = require("fs");




const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Pastikan ini id_pengguna dari token JWT

    // 1. Ambil data profil
    const user = await userService.getUserProfile(userId);
    
    // 2. Ambil data history (Ini yang tadi terlupakan)
    const history = await userService.getUserHistory(userId);

    // 3. Kirim SATU PAKET ke Frontend
    res.json({ 
      status: "success", 
      data: {
        ...user.toJSON(),
        history: history // Sekarang data.history tidak lagi undefined!
      } 
    });
  } catch (error) {
    console.error("Gagal getProfile:", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
};




const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    let updateData = { nama: req.body.nama };

    // Cek apakah user mengupload file foto
    if (req.files && req.files.foto) {
      const file = req.files.foto;
      
      // ATURAN PENAMAAN: Agar rapi dan unik
      const extension = path.extname(file.name); // ambil .jpg atau .png
      const fileName = `user-${userId}-${Date.now()}${extension}`;
      
      // PATH FISIK: Disimpan di folder apps/backend/uploads/profiles/
      const uploadPath = path.join(__dirname, "../../uploads/profiles/", fileName);

      // Pastikan folder fisiknya ada, jika tidak buat dulu
      const dir = path.join(__dirname, "../../uploads/profiles/");
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // PINDAHKAN FILE KE FOLDER BACKEND
      await file.mv(uploadPath);

      // SIMPAN HANYA NAMA FILENYA KE DATABASE
      updateData.foto = fileName;
    }

    const user = await userService.updateUserProfile(userId, updateData);
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
