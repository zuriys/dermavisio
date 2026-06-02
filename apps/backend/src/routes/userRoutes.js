const express = require("express");
const router = express.Router();
const userHandler = require("../handlers/userHandler");
const authMiddleware = require("../middleware/authMiddleware");

// Semua route di sini diproteksi oleh authMiddleware
router.use(authMiddleware);

router.get("/profile", userHandler.getProfile);
router.put("/profile", userHandler.updateProfile);
router.get("/history", userHandler.getHistory);
router.delete("/history/:id", userHandler.removeHistory);

module.exports = router;
