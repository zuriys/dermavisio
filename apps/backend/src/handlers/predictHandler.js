const predictService = require('../services/predictService');
const { mapLabel } = require('../utils/labelMapper'); // Pastikan nama fungsinya sesuai di labelMapper.js

const handlePredict = async (req, res) => {
    try {
        // 1. Cek apakah ada file gambar yang diupload
        if (!req.files || !req.files.image) {
            return res.status(400).json({ status: 'fail', message: 'No image uploaded' });
        }

        const image = req.files.image;
        const userId = req.body.userId; // Ambil ID User dari body request (atau req.user.id jika sudah pakai JWT)

        // 2. Kirim data asli ke Service (Titik-titik pertama diisi dengan ini)
        const result = await predictService.runMLAndSave(
            image.data,     // buffer gambar
            image.name,     // nama file
            userId          // id user
        );
        
        // 3. Terjemahkan angka hasil DB ke teks menggunakan Mapper
        const labelInfo = mapLabel(result.hasil); 

        // 4. Kirim respon sukses ke React
        res.status(200).json({
            status: 'success',
            data: {
                id: result.id_prediksi,
                label_raw: result.hasil,       // Misal: 1
                label_name: labelInfo.name,    // Misal: "Actinic Keratoses (A)"
                confidence: (result.confidence * 100).toFixed(2), // Jadi persen (misal: 98.50)
                color: labelInfo.color         // Misal: "red"
            }
        });

    } catch (error) {
        // 5. Error handling (Titik-titik kedua diisi dengan ini)
        console.error("Predict Handler Error:", error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = { handlePredict };