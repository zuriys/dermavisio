import os
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from PIL import Image
import io

app = Flask(__name__)

# --- CONFIGURASI PATH MODEL ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Pastikan nama file ini SAMA PERSIS dengan yang ada di folder 'model'
FILE_NAME = 'CNN_translearn_Mobilevnet2.keras' 
MODEL_PATH = os.path.join(BASE_DIR, 'model', FILE_NAME)

# --- CEK APAKAH FILE ADA SEBELUM LOAD ---
print(f"🔎 Mencari model di: {MODEL_PATH}")

if not os.path.exists(MODEL_PATH):
    print("❌ ERROR: File model tidak ditemukan!")
    print(f"Isi folder 'model' saat ini: {os.listdir(os.path.join(BASE_DIR, 'model')) if os.path.exists(os.path.join(BASE_DIR, 'model')) else 'Folder tidak ada'}")
    # Jangan matikan script, biar kita bisa lihat lognya di terminal
else:
    print("✅ File ditemukan! Sedang memuat model AI...")
    try:
        model = tf.keras.models.load_model(MODEL_PATH)
        print("🚀 Model AI berhasil dimuat!")
    except Exception as e:
        print(f"❌ Gagal memuat model: {str(e)}")

@app.route('/predict-process', methods=['POST'])
def predict_process():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    try:
        file = request.files['image']
        
        # 1. Preprocessing Gambar (Sesuai instruksi tim ML: 224x224 & /255)
        img = Image.open(io.BytesIO(file.read())).convert('RGB')
        img = img.resize((224, 224))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0) # Tambah dimensi batch

        # 2. Jalankan Prediksi
        predictions = model.predict(img_array)[0]
        
        # 3. Ambil Index Tertinggi (Softmax)
        predicted_index = np.argmax(predictions)
        confidence_score = float(np.max(predictions))

        print(f"✅ Prediksi Berhasil: Index {predicted_index} (Conf: {confidence_score})")

        return jsonify({
            "label_index": int(predicted_index),
            "confidence": confidence_score
        })

    except Exception as e:
        print(f"❌ Error saat prediksi: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=False) # Matikan debug biar tidak load model 2x