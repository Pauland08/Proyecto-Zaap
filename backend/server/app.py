# server/app.py
from flask import Flask
from flask_jwt_extended import JWTManager
from config import Config
from extensions import db

# Controllers (Blueprints)
from controllers.auth_controller import auth_bp
from controllers.user_controller import user_bp
from controllers.animal_controller import animal_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar extensiones
    db.init_app(app)
    JWTManager(app)

    # Blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(user_bp, url_prefix="/users") #usuarios
    app.register_blueprint(animal_bp, url_prefix="/animals") #animales
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)