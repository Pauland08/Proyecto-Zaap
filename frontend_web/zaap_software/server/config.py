from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask import Flask

app = Flask(__name__)

# Configuración base de la BD y JWT
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost:3306/db_zaap'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'tu_clave_secreta_super_segura'

db = SQLAlchemy(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
