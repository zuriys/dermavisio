from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Pengguna(db.Model):
    __tablename__ = 'pengguna'
    id_pengguna = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.String(20))
    tanggal_lahir = db.Column(db.Date)
    email = db.Column(db.String(120), unique=True, nullable=False)
    telepon = db.Column(db.String(20))
    password = db.Column(db.String(255), nullable=False)
    
    # Relasi ke Prediksi
    prediksi = db.relationship('Prediksi', backref='pemilik', lazy=True)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

class Prediksi(db.Model):
    __tablename__ = 'prediksi'
    id_prediksi = db.Column(db.Integer, primary_key=True)
    id_pengguna = db.Column(db.Integer, db.ForeignKey('pengguna.id_pengguna'), nullable=False)
    hasil = db.Column(db.String(100), nullable=False)
    confidence = db.Column(db.Float)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)