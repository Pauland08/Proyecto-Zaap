# utils/jwt_utils.py
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

def token_required(f):
    return jwt_required()(f)

def generate_token(user_id, rol):
    return create_access_token(identity={"id": user_id, "rol": rol})

def get_current_user():
    return get_jwt_identity()