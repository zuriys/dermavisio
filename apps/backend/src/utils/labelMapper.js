const labelMap = {
    0: { name: "Actinic Keratoses", desc: "Pertumbuhan kulit kasar bersisik karena sinar matahari." },
    1: { name: "Basal Cell Carcinoma", desc: "Kanker kulit non-melanoma yang paling umum." },
    2: { name: "Benign Keratosis", desc: "Pertumbuhan kulit non-kanker yang menyerupai kutil." },
    3: { name: "Dermatofibroma", desc: "Benjolan kulit kecil yang bersifat jinak." },
    4: { name: "Melanoma", desc: "Jenis kanker kulit yang paling serius dan berbahaya." },
    5: { name: "Melanocytic Nevi", desc: "Tahi lalat biasa (Jinak)." },
    6: { name: "Vascular Lesions", desc: "Kondisi pembuluh darah kulit yang menonjol." }
};

const getLabelInfo = (index) => {
    return labelMap[index] || { name: "Tidak Diketahui", desc: "Data tidak terdaftar." };
};

module.exports = { getLabelInfo };