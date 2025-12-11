# controllers/donations.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.donations_models import Donacion
from config import db
from datetime import date

donations_bp = Blueprint('donaciones', __name__, url_prefix='/donaciones')

@donations_bp.route('/getAllDonations', methods=['GET'])
@jwt_required()
def get_all_donations():
    lista = Donacion.query.all()
    return [{
        "id": d.id_donacion,
        "titulo": d.titulo,
        "monto": float(d.monto),
        "fecha": d.fecha.isoformat()
    } for d in lista], 200

@donations_bp.route('/getByIdDonation/<int:id>', methods=['GET'])
@jwt_required()
def get_by_id_donation(id):
    d = Donacion.query.get(id)
    if not d: return {"error": "Donación no encontrada"}, 404
    return {
        "id": d.id_donacion,
        "titulo": d.titulo,
        "monto": float(d.monto),
        "fecha": d.fecha.isoformat()
    }, 200

@donations_bp.route('/createDonation', methods=['POST'])
@jwt_required()
def create_donation():
    data = request.get_json(force=True) or {}
    identidad = get_jwt_identity()
    nueva = Donacion(
        id_usuario=identidad['id'],
        titulo=data['titulo'],
        monto=data['monto'],
        comprobante=data.get('comprobante', ''),
        seguimiento=data.get('seguimiento', ''),
        fecha=date.today()
    )
    db.session.add(nueva)
    db.session.commit()
    return {"mensaje": "Donación registrada", "id": nueva.id_donacion}, 201

@donations_bp.route('/updateDonation/<int:id>', methods=['PUT'])
@jwt_required()
def update_donation(id):
    data = request.get_json(force=True) or {}
    d = Donacion.query.get(id)
    if not d: return {"error": "Donación no encontrada"}, 404
    for campo, valor in data.items():
        setattr(d, campo, valor)
    db.session.commit()
    return {"mensaje": "Donación actualizada"}, 200

@donations_bp.route('/deleteDonation/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_donation(id):
    d = Donacion.query.get(id)
    if not d: return {"error": "Donación no encontrada"}, 404
    db.session.delete(d)
    db.session.commit()
    return {"mensaje": "Donación eliminada"}, 200