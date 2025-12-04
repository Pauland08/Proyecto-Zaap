# routes/animals.py
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Animal
from config import db

animals_bp = Blueprint('animals', __name__, url_prefix='/animales')

@animals_bp.route('/', methods=['GET'])
def listar_animales():
    animales = Animal.query.all()
    return [{
        'id': a.id_animal,
        'nombre': a.nombre,
        'especie': a.especie,
        'edad_aprox': a.edad_aprox,
        'ubicacion': a.ubicacion,
        'estado': a.estado,
        'fotos': a.fotos
    }], 200

@animals_bp.route('/', methods=['POST'])
@jwt_required()
def crear_animal():
    identidad = get_jwt_identity()
    if identidad.get('rol') not in ('Administrador', 'Fundacion'):
        return {"error": "Acceso denegado"}, 403

    data = request.get_json() or {}
    required = ['id_rescate', 'id_usuario', 'nombre', 'especie', 'ubicacion', 'fotos', 'estado']
    faltantes = [f for f in required if f not in data or data[f] in (None, "")]
    if faltantes:
        return {"error": "Campos requeridos faltantes", "fields": faltantes}, 400

    nuevo = Animal(**data)
    db.session.add(nuevo)
    db.session.commit()
    return {"message": "Animal creado", "id": nuevo.id_animal}, 201
