from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from services.user_service import (
    get_users,
    get_user_by_id,
    create_user,
    update_user,
    delete_user,
    auto_register
)

# Blueprint del módulo usuarios
user_bp = Blueprint("users", __name__)


# AUTO REGISTRO (SIN TOKEN)

@user_bp.route("/autoRegister", methods=["POST"])
def auto_register_user():
    data = request.get_json()
    user = auto_register(data)
    return jsonify(user.to_dict()), 201



# LISTAR TODOS LOS USUARIOS

@user_bp.route("/", methods=["GET"])
@jwt_required()
def list_users():
    users = get_users()
    return jsonify([u.to_dict() for u in users])



# OBTENER USUARIO POR ID

@user_bp.route("/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user(user_id):
    user = get_user_by_id(user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify(user.to_dict())



# CREAR USUARIO (ADMIN)

@user_bp.route("/createUser", methods=["POST"])
@jwt_required()
def create_user_route():
    data = request.get_json()

    if not data:
        return jsonify({"msg": "Datos requeridos"}), 400

    user = create_user(data)
    return jsonify(user.to_dict()), 201



# ACTUALIZAR USUARIO

@user_bp.route("/updateUser/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user_route(user_id):
    data = request.get_json()
    user = update_user(user_id, data)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify(user.to_dict())



# ELIMINAR USUARIO (SOFT DELETE)

@user_bp.route("/deleteUser/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user_route(user_id):
    user = delete_user(user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify({"msg": "Usuario eliminado correctamente"})
