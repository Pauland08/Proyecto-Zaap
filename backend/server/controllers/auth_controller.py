
from flask import Blueprint, request, jsonify
from services.auth_service import authenticate_user, generate_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = authenticate_user(data["correo"], data["password"])

    if not user:
        return jsonify({"msg": "Credenciales incorrectas"}), 401

    token = generate_token(user.id_usuario)
    return jsonify({"token": token, "rol": user.rol})
