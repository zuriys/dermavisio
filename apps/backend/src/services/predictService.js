
// const axios = require('axios');
// const FormData = require('form-data');
// const { Prediction } = require('../models/prediction');

// const runMLAndSave = async (imageBuffer, fileName, userId) => {
//     // 1. BUAT FORM DATA DULU (Pindahkan ke atas)
//     const form = new FormData();
//     // Berikan nama field 'image' agar sesuai dengan request.files['image'] di Flask
//     form.append('image', imageBuffer, { filename: fileName });

//     // 2. TEMBAK FLASK AI
//     const mlResponse = await axios.post('http://localhost:8000/predict-process', form, {
//         headers: {
//             ...form.getHeaders(), // <--- INI ISI TITIK-TITIKNYA
//         },
//     });

//     const { label_index, confidence } = mlResponse.data;

//     // 3. SIMPAN KE DATABASE
//     const savedData = await Prediction.create({
//         id_pengguna: userId,
//         hasil: label_index,
//         confidence: confidence,
//         image_url: fileName
//     });

const axios = require("axios");
const FormData = require("form-data");
const Prediction = require("../models/prediction"); // Pastikan model sudah dibuat

const runMLAndSave = async (imageBuffer, fileName, userId) => {
  // 1. Kirim file ke Flask (ML Service)
  const form = new FormData();
  form.append("image", imageBuffer, fileName);

  const mlResponse = await axios.post(
    "http://127.0.0.1:8000/predict-process",
    form,
    {
      headers: form.getHeaders(),
    },
  );


  console.log("Respon dari Flask:", mlResponse.data);

  const { label_index, confidence } = mlResponse.data;

  // 2. Simpan ke MySQL via Sequelize
  const savedData = await Prediction.create({
    id_pengguna: userId,
    hasil: label_index,
    confidence: confidence,
    image_url: fileName, // Simpan nama filenya
  });


  return savedData;
};

module.exports = { runMLAndSave };
