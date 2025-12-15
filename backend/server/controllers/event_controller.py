from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from services.event_service import *

event_bp = Blueprint("events", __name__)

# Consulta todos los eventos
@event_bp.route("/", methods=["GET"])
@jwt_required()
def list_events():
    try:
        events = get_events()
        return jsonify([e.to_dict() for e in events])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Consulta un evento por ID
@event_bp.route("/<int:event_id>", methods=["GET"])
@jwt_required()
def get_event(event_id):
    event = get_event_by_id(event_id)
    if not event:
        return jsonify({"msg": "Evento no encontrado"}), 404
    return jsonify(event.to_dict())

# Crea un nuevo evento
@event_bp.route("/createEvent", methods=["POST"])
@jwt_required()
def create_event_controller():
    data = request.get_json()
    event = create_event(data)
    return jsonify(event.to_dict()), 201

# Actualiza un evento existente
@event_bp.route("/updateEvent/<int:event_id>", methods=["PUT"])
@jwt_required()
def update_event_controller(event_id):
    data = request.get_json()
    event = update_event(event_id, data)
    if not event:
        return jsonify({"msg": "Evento no encontrado"}), 404
    return jsonify(event.to_dict())

# Elimina un evento
@event_bp.route("/deleteEvent/<int:event_id>", methods=["DELETE"])
@jwt_required()
def delete_event_controller(event_id):
    event = delete_event(event_id)
    if not event:
        return jsonify({"msg": "Evento no encontrado"}), 404
    return jsonify({"msg": "Evento eliminada correctamente"})