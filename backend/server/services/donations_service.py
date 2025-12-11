from models.donations_models import Donacion
from config import db
from datetime import date

def crear_donacion(data, id_usuario):
    nueva = Donacion(
        id_usuario=id_usuario,
        titulo=data['titulo'],
        monto=data['monto'],
        comprobante=data['comprobante'],
        seguimiento=data['seguimiento'],
        fecha=date.today()
    )
    db.session.add(nueva)
    db.session.commit()
    return nueva

def obtener_donacion_por_id(id):
    return Donacion.query.get(id)

def actualizar_donacion(id, data):
    donacion = Donacion.query.get(id)
    if not donacion: return None
    for campo, valor in data.items():
        setattr(donacion, campo, valor)
    db.session.commit()
    return donacion

def eliminar_donacion(id):
    donacion = Donacion.query.get(id)
    if not donacion: return False
    db.session.delete(donacion)
    db.session.commit()
    return True
