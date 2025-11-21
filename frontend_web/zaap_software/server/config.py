from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS


app = Flask(__name__)

# Configuración de conexión a MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:tu_contraseña@localhost/tu_basedatos'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'clave_secreta_segura'
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})

db = SQLAlchemy(app)
jwt = JWTManager(app)
