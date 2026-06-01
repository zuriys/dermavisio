from flask import Flask, request, jsonify
import tensorflow as tf # atau library yang digunakan tim ML
import numpy as np
from PIL import Image
import io

app = Flask(__name__)

# Load model (Minta file .h5 dari tim ML)
# model = tf.keras.models.load_model('model_kanker_kulit.h5')

@app.route('/predict-process', methods=['POST'])
def predict_process():
    if 'image' not in request.files:
        return jsonify({"error": "No file"}), 400
    
    file = request.files['image']
    
    # --- LOGIC PREPROCESSING (Minta tim ML) ---
    img = Image.open(io.BytesIO(file.read()))
    img = img.resize((224, 224)) # Contoh ukuran input
    # ------------------------------------------

    # --- SIMULASI PREDIKSI (Ganti dengan model.predict nanti) ---
    # label = ["Melanoma", "Normal", "Basal Cell"]
    # result = model.predict(img)
    
    return jsonify({
        "label": "Melanoma", 
        "confidence": 0.98
    })

if __name__ == '__main__':
    app.run(port=8000, debug=True)