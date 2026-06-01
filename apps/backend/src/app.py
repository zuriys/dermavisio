from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from src.models import db # Import db dari file models.py tadi

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Konfigurasi Database (Ganti dermavisio dengan nama database Anda di phpMyAdmin)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/dermavisio'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    Migrate(app, db)

    @app.route('/')
    def index():
        return {"message": "API Dermavisio is running"}

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)