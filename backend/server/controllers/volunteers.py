# controllers/volunteers.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.volunteers_models import Postulacion_voluntario
from config import db
from datetime import date

volunteers_bp = Blueprint('voluntarios', __name__, url_prefix='/voluntarios')

@volunteers_bp.route('/getAllVolunteers', methods=['GET'])
@jwt_required()
def get_all_volunteers():
    lista = Postulacion_voluntario.query.all()
    return [{
        "id": v.id_postulacion,
        "usuario": v.id_usuario,
        "evento": v.id_evento,
        "fecha_postulacion": v.fecha_postulacion.isoformat(),
        "estado": v.estado,
        "observaciones": v.observaciones
    } for v in lista], 200

@volunteers_bp.route('/getByIdVolunteer/<int:id>', methods=['GET'])
@jwt_required()
def get_by_id_volunteer(id):
    v = Postulacion_voluntario.query.get(id)
    if not v: return {"error": "Postulación no encontrada"}, 404
    return {
        "id": v.id_postulacion,
        "usuario": v.id_usuario,
        "evento": v.id_evento,
        "fecha_postulacion": v.fecha_postulacion.isoformat(),
        "estado": v.estado,
        "observaciones": v.observaciones
    }, 200

@volunteers_bp.route('/createVolunteer', methods=['POST'])
@jwt_required()
def create_volunteer():
    data = request.get_json(force=True) or {}
    identidad = get_jwt_identity()
    nueva = Postulacion_voluntario(
        id_usuario=identidad['id'],
        id_evento=data['id_evento'],
        fecha_postulacion=date.today(),
        estado=data['estado'],
        observaciones=data.get('observaciones')
    )
    db.session.add(nueva)
    db.session.commit()
    return {"mensaje": "Postulación creada", "id": nueva.id_postulacion}, 201

@volunteers_bp.route('/updateVolunteer/<int:id>', methods=['PUT'])
@jwt_required()
def update_volunteer(id):
    data = request.get_json(force=True) or {}
    v = Postulacion_voluntario.query.get(id)
    if not v: return {"error": "Postulación no encontrada"}, 404
    if 'estado' in data: v.estado = data['estado']
    if 'observaciones' in data: v.observaciones = data['observaciones']
    db.session.commit()
    return {"mensaje": "Postulación actualizada"}, 200

@volunteers_bp.route('/deleteVolunteer/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_volunteer(id):
    v = Postulacion_voluntario.query.get(id)
    if not v: return {"error": "Postulación no encontrada"}, 404
    db.session.delete(v)
    db.session.commit()
    return {"mensaje": "Postulación eliminada"}, 200