#services/donation_service.py
from extensions import db
from models.donation_model import Donation

def get_donations():
    """Obtener todas las donaciones"""
    return Donation.query.all()

def get_donation_by_id(donation_id):
    """Obtener una donación por ID"""
    return Donation.query.get(donation_id)

def create_donation(data, user_id):
    """Crear una donación"""
    donation = Donation(
        id_usuario=user_id,
        titulo=data["titulo"],
        monto=data["monto"],
        comprobante=data["comprobante"],
        seguimiento=data.get("seguimiento"),
        fecha=data.get("fecha")  # formato YYYY-MM-DD
    )

    db.session.add(donation)
    db.session.commit()
    return donation

def update_donation(donation_id, data):
    """Actualizar una donación"""
    donation = Donation.query.get(donation_id)
    if not donation:
        return None

    donation.titulo = data.get("titulo", donation.titulo)
    donation.monto = data.get("monto", donation.monto)
    donation.comprobante = data.get("comprobante", donation.comprobante)
    donation.seguimiento = data.get("seguimiento", donation.seguimiento)
    donation.fecha = data.get("fecha", donation.fecha)

    db.session.commit()
    return donation

def delete_donation(donation_id):
    """Eliminar una donación"""
    donation = Donation.query.get(donation_id)
    if not donation:
        return None

    db.session.delete(donation)
    db.session.commit()
    return donation