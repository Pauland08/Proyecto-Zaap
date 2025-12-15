# auth_service
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import hashlib
from models.user_model import User
from extensions import db
from datetime import date

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

#def generate_token(user_id):
    #return create_access_token(identity=str(user_id))

def generate_token(user):
    return create_access_token(
        identity=str(user.id_usuario),
        additional_claims={
            "rol": user.rol
        }
    )

def get_current_user_id():
    return get_jwt_identity()

def authenticate_user(email, password):
    hashed = hash_password(password)
    return User.query.filter_by(correo=email, password=hashed).first()
