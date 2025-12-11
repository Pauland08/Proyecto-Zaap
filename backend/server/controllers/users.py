# controllers/users.py
from flask import Blueprint, request, jsonify
from config import db, bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from models.users_model import Usuario

from datetime import date

users_bp = Blueprint('usuarios', __name__, url_prefix='/usuarios')

def require_fields(data, fields):
    missing = [f for f in fields if f not in data or data[f] in (None, "")]
    return ({"error": "Campos requeridos faltantes", "fields": missing}, 400) if missing else None

@users_bp.route('/autoRegister', methods=['POST'])
def auto_register():
    data = request.get_json(force=True) or {}
    err = require_fields(data, ['nombre', 'correo', 'password'])
    if err: return err

    if Usuario.query.filter_by(correo=data['correo']).first():
        return {"error": "Correo ya registrado"}, 400

    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    nuevo = Usuario(
        nombre_usuario=data['nombre'],
        correo=data['correo'],
        password=hashed_pw,
        rol=data.get('rol', 'Ciudadano'),
        fecha_registro=date.today(),
        estado=True
    )
    db.session.add(nuevo)
    db.session.commit()
    return {"mensaje": "Usuario registrado correctamente", "id": nuevo.id_usuario}, 201

@users_bp.route('/createUser', methods=['POST'])
def create_user():
    # Reutiliza la lógica de auto_register
    return auto_register()

@users_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json(force=True) or {}
    err = require_fields(data, ['correo', 'password'])
    if err: return err

    usuario = Usuario.query.filter_by(correo=data["correo"]).first()
    if not usuario or not bcrypt.check_password_hash(usuario.password, data["password"]):
        return {"error": "Credenciales incorrectas"}, 401

    token = create_access_token(identity={"id": usuario.id_usuario, "rol": usuario.rol})
    return {
        "token": token,
        "usuario": {
            "id": usuario.id_usuario,
            "correo": usuario.correo,
            "rol": usuario.rol
        }
    }, 200

@users_bp.route('/getAllUsers', methods=['GET'])
@jwt_required()
def get_all_users():
    identidad = get_jwt_identity()
    if not identidad or identidad.get('rol') != 'Administrador':
        return {"error": "Acceso denegado"}, 403

    lista = Usuario.query.all()
    return [{
        'id': u.id_usuario,
        'nombre': u.nombre_usuario,
        'correo': u.correo,
        'rol': u.rol,
        'fecha_registro': u.fecha_registro.isoformat(),
        'estado': u.estado
    } for u in lista], 200

@users_bp.route('/getByIdUser/<int:id>', methods=['GET'])
@jwt_required()
def get_by_id_user(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return {"error": "Usuario no encontrado"}, 404
    return {
        'id': usuario.id_usuario,
        'nombre': usuario.nombre_usuario,
        'correo': usuario.correo,
        'rol': usuario.rol,
        'fecha_registro': usuario.fecha_registro.isoformat(),
        'estado': usuario.estado
    }, 200

@users_bp.route('/updateUser/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    data = request.get_json(force=True) or {}
    usuario = Usuario.query.get(id)
    if not usuario:
        return {"error": "Usuario no encontrado"}, 404

    usuario.nombre_usuario = data.get('nombre', usuario.nombre_usuario)
    usuario.correo = data.get('correo', usuario.correo)
    if 'password' in data and data['password']:
        usuario.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    usuario.rol = data.get('rol', usuario.rol)
    usuario.estado = data.get('estado', usuario.estado)
    db.session.commit()
    return {"mensaje": "Usuario actualizado correctamente"}, 200

@users_bp.route('/deleteUser/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return {"error": "Usuario no encontrado"}, 404
    db.session.delete(usuario)
    db.session.commit()
    return {"mensaje": "Usuario eliminado correctamente"}, 200