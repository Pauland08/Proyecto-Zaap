# routes/users.py
from flask import Blueprint, request, jsonify
from config import db, bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import Usuario
from datetime import date

users_bp = Blueprint('users', __name__, url_prefix='')  # puedes usar un prefix si quieres e.g., '/api'

# Utilidad: validar campos requeridos de forma simple
def require_fields(data, fields):
    missing = [f for f in fields if f not in data or data[f] in (None, "")]
    if missing:
        return {"error": "Campos requeridos faltantes", "fields": missing}, 400
    return None

@users_bp.route('/usuarios', methods=['POST'])
def crear_usuario():
    data = request.get_json() or {}
    err = require_fields(data, ['nombre', 'correo', 'contraseña'])
    if err:
        return err

    # Verificar si correo ya existe
    existe = Usuario.query.filter_by(correo=data['correo']).first()
    if existe:
        return {"error": "Correo ya registrado"}, 400

    # Hashear contraseña
    hashed_pw = bcrypt.generate_password_hash(data['contraseña']).decode('utf-8')

    # Crear usuario
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

    return {"mensaje": "Usuario creado correctamente", "id": nuevo.id_usuario}, 201

@users_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    err = require_fields(data, ['correo', 'contraseña'])
    if err:
        return err

    usuario = Usuario.query.filter_by(correo=data['correo']).first()
    if not usuario:
        return {"error": "Credenciales incorrectas"}, 401

    if not bcrypt.check_password_hash(usuario.password, data['contraseña']):
        return {"error": "Credenciales incorrectas"}, 401

    # Incluir id y rol en el token, para que el frontend sepa si redirigir a admin
    token = create_access_token(identity={"id": usuario.id_usuario, "rol": usuario.rol})
    return {"token": token}, 200

@users_bp.route('/usuarios', methods=['GET'])
@jwt_required()
def obtener_usuarios():
    identidad = get_jwt_identity()
    # Opcional: restringir a Administrador
    if identidad.get('rol') != 'Administrador':
        return {"error": "Acceso denegado"}, 403

    usuarios = Usuario.query.all()
    return [{
        'id': u.id_usuario,
        'nombre': u.nombre_usuario,
        'correo': u.correo,
        'rol': u.rol,
        'fecha_registro': u.fecha_registro.isoformat(),
        'estado': u.estado
    }], 200
