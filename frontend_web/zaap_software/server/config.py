from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv     # carga variables desde .env
import os                         # lee variables del sistema

app = Flask(__name__)

# Cargar variables desde .env
# Esto permite no hardcodear credenciales y cambiarlas sin tocar el código.
load_dotenv()

# Construir la cadena de conexión usando PyMySQL (driver que ya instalaste)
# Usa valores por defecto si alguna variable falta, para no romper el arranque.
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "db_zaap")

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Clave de JWT (usar .env)
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "clave_secreta_segura")

# CORS: permite que tu frontend (React en http://localhost:3000) consuma la API
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}}, supports_credentials=True)

# Inicializaciones de librerías
db = SQLAlchemy(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
