# config.py
# Carga de .env, DB, JWT, CORS y bcrypt
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os

app = Flask(__name__)

# Cargar variables de entorno (.env)
load_dotenv()

# Variables con defaults seguros
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "db_zaap")

# Conexión MySQL usando PyMySQL (instalado)
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# JWT
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "clave_secreta_segura")

# CORS: habilita requests desde tu React
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}}, supports_credentials=True)

# Inicializaciones
db = SQLAlchemy(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
