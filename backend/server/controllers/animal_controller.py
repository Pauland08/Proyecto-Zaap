from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.animal_service import *

animal_bp = Blueprint("animals", __name__)


# LISTAR ANIMALES

@animal_bp.route("/", methods=["GET"])
@jwt_required()
def list_animals():
    animals = get_animals()
    return jsonify([a.to_dict() for a in animals])



# OBTENER ANIMAL POR ID

@animal_bp.route("/<int:animal_id>", methods=["GET"])
@jwt_required()
def get_animal(animal_id):
    animal = get_animal_by_id(animal_id)

    if not animal:
        return jsonify({"msg": "Animal no encontrado"}), 404

    return jsonify(animal.to_dict())



# CREAR ANIMAL

@animal_bp.route("/createAnimal", methods=["POST"])
@jwt_required()
def create():
    data = request.get_json()

    #id del usuario autenticado (desde el token)
    current_user_id = get_jwt_identity()

    animal = create_animal(data, current_user_id)
    return jsonify(animal.to_dict()), 201



# ACTUALIZAR ANIMAL

@animal_bp.route("/updateAnimal/<int:animal_id>", methods=["PUT"])
@jwt_required()
def update(animal_id):
    data = request.get_json()
    animal = update_animal(animal_id, data)

    if not animal:
        return jsonify({"msg": "Animal no encontrado"}), 404

    return jsonify(animal.to_dict())



# ELIMINAR ANIMAL

@animal_bp.route("/deleteAnimal/<int:animal_id>", methods=["DELETE"])
@jwt_required()
def delete(animal_id):
    animal = delete_animal(animal_id)

    if not animal:
        return jsonify({"msg": "Animal no encontrado"}), 404

    return jsonify({"msg": "Animal eliminado correctamente"})
