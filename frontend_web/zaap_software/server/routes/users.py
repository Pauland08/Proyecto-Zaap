from flask import Blueprint, request, jsonify
from config import db
from models import Usuario

users_bp = Blueprint('users', __name__)

# GET - Obtener todos los usuarios
@users_bp.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([u.to_dict() for u in usuarios])

# POST - Crear un nuevo usuario
@users_bp.route('/usuarios', methods=['POST'])
def crear_usuario():
    data = request.get_json()
    nuevo = Usuario(
        nombre=data['nombre'],
        correo=data['correo'],
        contraseña=data['contraseña']
    )
    db.session.add(nuevo)
    db.session.commit()
    return jsonify({"mensaje": "Usuario creado correctamente"}), 201

# PUT - Actualizar usuario existente
@users_bp.route('/usuarios/<int:id>', methods=['PUT'])
def actualizar_usuario(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.get_json()
    usuario.nombre = data.get('nombre', usuario.nombre)
    usuario.correo = data.get('correo', usuario.correo)
    db.session.commit()
    return jsonify({"mensaje": "Usuario actualizado correctamente"})

# DELETE - Eliminar usuario
@users_bp.route('/usuarios/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    db.session.delete(usuario)
    db.session.commit()
    return jsonify({"mensaje": "Usuario eliminado correctamente"})

# PATCH - Deshabilitar usuario (marcar como inactivo)
@users_bp.route('/usuarios/<int:id>/deshabilitar', methods=['PATCH'])
def deshabilitar_usuario(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    usuario.activo = False
    db.session.commit()
    return jsonify({"mensaje": "Usuario deshabilitado correctamente"})

