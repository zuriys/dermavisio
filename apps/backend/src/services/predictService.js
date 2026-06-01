const axios = require('axios');
const FormData = require('form-data');
const { Prediction } = require('../models/prediction'); // Pastikan model sudah dibuat

const runMLAndSave = async (imageBuffer, fileName, userId) => {
    // 1. Kirim file ke Flask (ML Service)
    const form = new FormData();
    form.append('image', imageBuffer, fileName);

    const mlResponse = await axios.post('http://localhost:8000/predict-process', form, {
        headers: form.getHeaders()
    });

    const { label, confidence } = mlResponse.data;

    // 2. Simpan ke MySQL via Sequelize
    const savedData = await Prediction.create({
        id_pengguna: userId,
        hasil: label,
        confidence: confidence,
        image_url: fileName // Simpan nama filenya
    });

    return savedData;
};

module.exports = { runMLAndSave };