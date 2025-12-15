# controller/donation_controller.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.donation_service import *

donation_bp = Blueprint("donations", __name__)

# Obtener todas las donaciones
@donation_bp.route("/", methods=["GET"])
@jwt_required()
def list_donations():
    try:
        donations = get_donations()
        return jsonify([d.to_dict() for d in donations])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Obtener una donación por ID
@donation_bp.route("/<int:donation_id>", methods=["GET"])
@jwt_required()
def get_donation(donation_id):
    donation = get_donation_by_id(donation_id)
    if not donation:
        return jsonify({"msg": "Donación no encontrada"}), 404
    return jsonify(donation.to_dict())

# Crear una nueva donación
@donation_bp.route("/createDonation", methods=["POST"])
@jwt_required()
def create_donation_controller():
    data = request.get_json()
    user_id = get_jwt_identity()
    donation = create_donation(data, user_id)
    return jsonify(donation.to_dict()), 201

# Actualizar una donación
@donation_bp.route("/updateDonation/<int:donation_id>", methods=["PUT"])
@jwt_required()
def update_donation_controller(donation_id):
    data = request.get_json()
    donation = update_donation(donation_id, data)
    if not donation:
        return jsonify({"msg": "Donación no encontrada"}), 404
    return jsonify(donation.to_dict())

# Eliminar una donación
@donation_bp.route("/deleteDonation/<int:donation_id>", methods=["DELETE"])
@jwt_required()
def delete_donation_controller(donation_id):
    donation = delete_donation(donation_id)
    if not donation:
        return jsonify({"msg": "Donación no encontrada"}), 404
    return jsonify({"msg": "Donación eliminada correctamente"})
