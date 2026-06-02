const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "fail",
      message: "Akses ditolak, token tidak ditemukan",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Gunakan secret yang sama dengan authService
    req.user = decoded; // Menyimpan id_pengguna ke dalam request
    next();
  } catch (error) {
    res.status(401).json({ status: "fail", message: "Token tidak valid" });
  }
};

module.exports = authMiddleware;
