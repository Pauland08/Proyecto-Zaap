# server/app.py
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # IMPORTAR CORS
from config import Config
from extensions import db

# Controllers (Blueprints)
from controllers.auth_controller import auth_bp  # autenticación
from controllers.user_controller import user_bp  # usuarios
from controllers.animal_controller import animal_bp  # animales
from controllers.donation_controller import donation_bp  # donaciones
from controllers.volunteer_controller import volunteer_bp  # voluntarios
from controllers.event_controller import event_bp  # eventos


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # HABILITAR CORS PARA FRONTEND REACT (localhost:3000)
    # Esto permite que el navegador deje consumir la API
    CORS(
        app,
        resources={r"/*": {"origins": "http://localhost:3000"}},
        supports_credentials=True
    )

    # Inicializar extensiones
    db.init_app(app)
    JWTManager(app)

    # Registrar Blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")  # autenticación
    app.register_blueprint(user_bp, url_prefix="/users")  # usuarios
    app.register_blueprint(animal_bp, url_prefix="/animals")  # animales
    app.register_blueprint(donation_bp, url_prefix="/donations")  # donaciones
    app.register_blueprint(volunteer_bp, url_prefix="/volunteers")  # voluntarios
    app.register_blueprint(event_bp, url_prefix="/events")  # eventos

    return app


if __name__ == "__main__":
    app = create_app()
    # IMPORTANTE: host 0.0.0.0 para aceptar conexiones externas (React)
    app.run(host="0.0.0.0", port=5000, debug=True)
