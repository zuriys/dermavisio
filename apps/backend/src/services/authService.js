const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (userData) => {
    const { nama, email, password, gender, tanggal_lahir, telepon } = userData;

    // 1. Cek apakah email sudah terdaftar
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
        throw new Error("Email already registered");
    }

    // 2. Hash Password (dikali 10 kali putaran biar kuat)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Simpan ke Database
    return await User.create({
        nama,
        email,
        password: hashedPassword,
        gender,
        tanggal_lahir,
        telepon
    });
};

const login = async (email, password) => {
    // 1. Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error("User not found");
    }

    // 2. Cek apakah password cocok
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid password");
    }

    // 3. Buat Token JWT (Kunci akses digital)
    const token = jwt.sign(
        { id: user.id_pengguna, email: user.email },
        'RAHASIA_NEGARA_123', // Nanti pindahkan ke .env
        { expiresIn: '1d' }
    );

    return { user, token };
};

module.exports = { register, login };