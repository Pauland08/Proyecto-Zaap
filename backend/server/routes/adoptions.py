# routes/adoptions.py
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Solicitud_adopcion, Animal
from config import db
from datetime import date

adoptions_bp = Blueprint('adopciones', __name__, url_prefix='/adopciones')

@adoptions_bp.route('/', methods=['POST'])
@jwt_required()
def crear_solicitud():
    identidad = get_jwt_identity()
    data = request.get_json() or {}
    required = ['id_animal', 'mensaje']
    falt = [f for f in required if f not in data or not data[f]]
    if falt: return {"error": "Campos requeridos faltantes", "fields": falt}, 400

    if not Animal.query.get(data['id_animal']):
        return {"error": "Animal no encontrado"}, 404

    solicitud = Solicitud_adopcion(
        id_usuario=identidad['id'],
        id_animal=data['id_animal'],
        fecha_solicitud=date.today(),
        mensaje=data.get('mensaje', ''),
        estado='pendiente'
    )
    db.session.add(solicitud)
    db.session.commit()
    return {"message": "Solicitud registrada", "id": solicitud.id_solicitud}, 201

@adoptions_bp.route('/', methods=['GET'])
@jwt_required()
def listar_solicitudes():
    identidad = get_jwt_identity()
    # Admin/Fundación ven todas; usuario ve las suyas
    if identidad.get('rol') in ('Administrador', 'Fundacion'):
        q = Solicitud_adopcion.query.all()
    else:
        q = Solicitud_adopcion.query.filter_by(id_usuario=identidad['id']).all()
    return [{
        "id": s.id_solicitud,
        "id_usuario": s.id_usuario,
        "id_animal": s.id_animal,
        "fecha_solicitud": s.fecha_solicitud.isoformat(),
        "estado": s.estado
    }], 200
