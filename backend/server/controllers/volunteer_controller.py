# controllers/volunteer_controller.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.volunteer_service import *

volunteer_bp = Blueprint("volunteers", __name__)


@volunteer_bp.route("/", methods=["GET"])
@jwt_required()
def list_applications():
    try:
        applications = get_applications()
        return jsonify([a.to_dict() for a in applications])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@volunteer_bp.route("/<int:application_id>", methods=["GET"])
@jwt_required()
def get_application(application_id):
    application = get_application_by_id(application_id)
    if not application:
        return jsonify({"msg": "Postulación no encontrada"}), 404
    return jsonify(application.to_dict())

@volunteer_bp.route("/createVolunteer", methods=["POST"])
@jwt_required()
def create_application_controller():
    data = request.get_json()
    user_id = get_jwt_identity()
    application = create_application(data, user_id)
    return jsonify(application.to_dict()), 201

@volunteer_bp.route("/updateVolunteer/<int:application_id>", methods=["PUT"])
@jwt_required()
def update_application_controller(application_id):
    data = request.get_json()
    application = update_application(application_id, data)
    if not application:
        return jsonify({"msg": "Postulación no encontrada"}), 404
    return jsonify(application.to_dict())

@volunteer_bp.route("/deleteVolunteer/<int:application_id>", methods=["DELETE"])
@jwt_required()
def delete_application_controller(application_id):
    application = delete_application(application_id)
    if not application:
        return jsonify({"msg": "Postulación no encontrada"}), 404
    return jsonify({"msg": "Postulación eliminada correctamente"})