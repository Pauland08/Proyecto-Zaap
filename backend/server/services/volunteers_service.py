from models.volunteers_models import Postulacion_voluntario
from config import db
from datetime import date

def crear_postulacion(data, id_usuario):
    nueva = Postulacion_voluntario(
        id_usuario=id_usuario,
        id_evento=data['id_evento'],
        fecha_postulacion=date.today(),
        estado=data['estado'],
        observaciones=data.get('observaciones')
    )
    db.session.add(nueva)
    db.session.commit()
    return nueva

def obtener_postulacion_por_id(id):
    return Postulacion_voluntario.query.get(id)

def actualizar_postulacion(id, data):
    postulacion = Postulacion_voluntario.query.get(id)
    if not postulacion: return None
    for campo, valor in data.items():
        setattr(postulacion, campo, valor)
    db.session.commit()
    return postulacion

def eliminar_postulacion(id):
    postulacion = Postulacion_voluntario.query.get(id)
    if not postulacion: return False
    db.session.delete(postulacion)
    db.session.commit()
    return True
