from extensions import db
from models.event_model import Event

def get_events():
    return Event.query.all()

def get_event_by_id(event_id):
    return Event.query.get(event_id)

def create_event(data):
    event = Event(
        id_usuario=data["id_usuario"],          # O del JWT si luego lo quieres
        titulo=data["titulo"],
        fecha_evento=data["fecha_evento"],
        ubicacion=data["ubicacion"],
        tipo=data.get("tipo"),
        estado=data["estado"]
    )

    db.session.add(event)
    db.session.commit()
    return event

def update_event(event_id, data):
    event = Event.query.get(event_id)
    if not event:
        return None

    event.titulo = data.get("titulo", event.titulo)
    event.fecha_evento = data.get("fecha_evento", event.fecha_evento)
    event.ubicacion = data.get("ubicacion", event.ubicacion)
    event.tipo = data.get("tipo", event.tipo)
    event.estado = data.get("estado", event.estado)

    db.session.commit()
    return event

def delete_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return None

    db.session.delete(event)
    db.session.commit()
    return event