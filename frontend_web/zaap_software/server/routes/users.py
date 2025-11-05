from flask import Blueprint, request, jsonify
from config import db, bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import Usuario
from datetime import date

users_bp = Blueprint('users', __name__)

@users_bp.route('/usuarios', methods=['POST'])
def crear_usuario():
    data = request.get_json()
    hashed_pw = bcrypt.generate_password_hash(data['contraseña']).decode('utf-8')
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
    return jsonify({"mensaje": "Usuario creado correctamente"}), 201

@users_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    usuario = Usuario.query.filter_by(correo=data['correo']).first()
    if usuario and bcrypt.check_password_hash(usuario.password, data['contraseña']):
        token = create_access_token(identity=usuario.id_usuario)
        return jsonify({"token": token}), 200
    else:
        return jsonify({"error": "Credenciales incorrectas"}), 401

# Ejemplo de ruta protegida
@users_bp.route('/usuarios', methods=['GET'])
@jwt_required()
def obtener_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([{
        'id': u.id_usuario,
        'nombre': u.nombre_usuario,
        'correo': u.correo,
        'rol': u.rol,
        'fecha_registro': u.fecha_registro.isoformat(),
        'estado': u.estado
    } for u in usuarios])
