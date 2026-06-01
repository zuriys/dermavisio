const authService = require('../services/authService');

const registerHandler = async (req, res) => {
    try {
        // Memanggil service register yang Anda buat tadi
        const user = await authService.register(req.body);
        
        res.status(201).json({
            status: 'success',
            message: 'User berhasil didaftarkan',
            data: { userId: user.id_pengguna }
        });
    } catch (error) {
        // Menangkap error dari service (misal: Email already registered)
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);
        
        res.status(200).json({
            status: 'success',
            token,
            data: {
                id: user.id_pengguna,
                nama: user.nama,
                email: user.email
            }
        });
    } catch (error) {
        res.status(401).json({
            status: 'fail',
            message: error.message
        });
    }
};

module.exports = { registerHandler, loginHandler };