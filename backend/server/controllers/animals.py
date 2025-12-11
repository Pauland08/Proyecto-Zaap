# controllers/animals.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models.animals_model import Animal
from config import db

animals_bp = Blueprint('animales', __name__, url_prefix='/animales')

@animals_bp.route('/getAllAnimals', methods=['GET'])
@jwt_required()
def get_all_animals():
    lista = Animal.query.all()
    return [{
        "id": a.id_animal,
        "nombre": a.nombre,
        "especie": a.especie,
        "estado": a.estado
    } for a in lista], 200

@animals_bp.route('/getByIdAnimal/<int:id>', methods=['GET'])
@jwt_required()
def get_by_id_animal(id):
    a = Animal.query.get(id)
    if not a: return {"error": "Animal no encontrado"}, 404
    return {
        "id": a.id_animal,
        "nombre": a.nombre,
        "especie": a.especie,
        "estado": a.estado
    }, 200

@animals_bp.route('/createAnimal', methods=['POST'])
@jwt_required()
def create_animal():
    data = request.get_json(force=True) or {}
    nuevo = Animal(**data)
    db.session.add(nuevo)
    db.session.commit()
    return {"mensaje": "Animal creado", "id": nuevo.id_animal}, 201

@animals_bp.route('/updateAnimal/<int:id>', methods=['PUT'])
@jwt_required()
def update_animal(id):
    data = request.get_json(force=True) or {}
    a = Animal.query.get(id)
    if not a: return {"error": "Animal no encontrado"}, 404
    for campo, valor in data.items():
        setattr(a, campo, valor)
    db.session.commit()
    return {"mensaje": "Animal actualizado"}, 200

@animals_bp.route('/deleteAnimal/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_animal(id):
    a = Animal.query.get(id)
    if not a: return {"error": "Animal no encontrado"}, 404
    db.session.delete(a)
    db.session.commit()
    return {"mensaje": "Animal eliminado"}, 200