# import numpy as np
# import tensorflow as tf
# from flask import Flask, request, jsonify
# from PIL import Image
# import io

# app = Flask(__name__)
# model = tf.keras.models.load_model('skin_cancer_model.keras')

# @app.route('/predict-process', methods=['POST'])
# def predict_process():
#     file = request.files['image']
    
#     # 1. Preprocessing (Sesuaikan ukuran dengan instruksi tim ML!)
#     img = Image.open(io.BytesIO(file.read())).convert('RGB')
#     img = img.resize((224, 224)) # Contoh: 224x224
#     img_array = np.array(img) / 255.0
#     img_array = np.expand_dims(img_array, axis=0)

#     # 2. Prediksi (Menghasilkan array 7 angka probability)
#     predictions = model.predict(img_array)[0] 

#     # 3. Ambil "Pemenang" (Index dengan angka terbesar)
#     predicted_index = np.argmax(predictions) 
    
#     # 4. Ambil skor probabilitasnya
#     confidence_score = predictions[predicted_index]

#     return jsonify({
#         "label_index": int(predicted_index),
#         "confidence": float(confidence_score)
#     })



import os
import tensorflow as tf
from flask import Flask, request, jsonify

app = Flask(__name__)

# 1. Tentukan path ke file model
# Menggunakan os.path agar aman di Windows maupun Linux
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'skin_cancer_model.keras')

# 2. Load model saat server mulai
print("🔄 Sedang memuat model AI, harap tunggu...")
model = tf.keras.models.load_model(MODEL_PATH)
print("✅ Model AI berhasil dimuat!")

@app.route('/predict-process', methods=['POST'])
def predict_process():
    # ... logika preprocessing gambar ...
    # predictions = model.predict(img_array)
    # ...
    return jsonify({"label_index": 1, "confidence": 0.95})

if __name__ == '__main__':
    app.run(port=8000)