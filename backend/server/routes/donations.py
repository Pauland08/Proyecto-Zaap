# routes/donations.py
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Donacion
from config import db
from datetime import date

donations_bp = Blueprint('donaciones', __name__, url_prefix='/donaciones')

@donations_bp.route('/', methods=['POST'])
@jwt_required()
def crear_donacion():
    identidad = get_jwt_identity()
    data = request.get_json() or {}
    required = ['titulo', 'monto', 'comprobante', 'seguimiento']
    falt = [f for f in required if f not in data or not data[f]]
    if falt: return {"error": "Campos requeridos faltantes", "fields": falt}, 400

    d = Donacion(
        id_usuario=identidad['id'],
        titulo=data['titulo'],
        monto=data['monto'],
        comprobante=data['comprobante'],
        seguimiento=data['seguimiento'],
        fecha=date.today()
    )
    db.session.add(d)
    db.session.commit()
    return {"message": "Donación registrada", "id": d.id_donacion}, 201

@donations_bp.route('/', methods=['GET'])
@jwt_required()
def listar_donaciones():
    identidad = get_jwt_identity()
    if identidad.get('rol') == 'Administrador':
        q = Donacion.query.all()
    else:
        q = Donacion.query.filter_by(id_usuario=identidad['id']).all()
    return [{
        "id": d.id_donacion,
        "titulo": d.titulo,
        "monto": str(d.monto),
        "fecha": d.fecha.isoformat()
    } for d in q], 200