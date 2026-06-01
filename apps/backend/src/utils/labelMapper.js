// apps/backend/src/utils/labelMapper.js

const labelDictionary = {
    0: { name: "Normal" },
    1: { name: "Actinic Keratoses"},
    2: { name: "Basal Cell Carcinoma"},
    3: { name: "Benign Keratosis"},
    4: { name: "Dermatofibroma"},
    5: { name: "Melanoma" },
    6: { name: "Vascular Lesions"}
};

const mapLabel = (index) => {
    return labelDictionary[index] || { name: "Unknown" };
};

module.exports = { mapLabel };