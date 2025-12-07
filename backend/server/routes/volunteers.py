# routes/volunteers.py
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Postulacion_voluntario
from config import db
from datetime import date

volunteers_bp = Blueprint('voluntarios', __name__, url_prefix='/voluntarios')

@volunteers_bp.route('/postulaciones', methods=['POST'])
@jwt_required()
def crear_postulacion():
    identidad = get_jwt_identity()
    data = request.get_json() or {}
    required = ['id_evento', 'estado']
    falt = [f for f in required if f not in data or not data[f]]
    if falt: return {"error": "Campos requeridos faltantes", "fields": falt}, 400

    p = Postulacion_voluntario(
        id_usuario=identidad['id'],
        id_evento=data['id_evento'],
        fecha_postulacion=date.today(),
        estado=data['estado'],
        observaciones=data.get('observaciones')
    )
    db.add(p) if hasattr(db, 'add') else db.session.add(p)
    db.session.commit()
    return {"message": "Postulación registrada", "id": p.id_postulacion}, 201

@volunteers_bp.route('/postulaciones', methods=['GET'])
@jwt_required()
def listar_postulaciones():
    identidad = get_jwt_identity()
    q = Postulacion_voluntario.query.filter_by(id_usuario=identidad['id']).all()
    return [{
        "id": p.id_postulacion,
        "id_evento": p.id_evento,
        "fecha": p.fecha_postulacion.isoformat(),
        "estado": p.estado
    } for p in q], 200