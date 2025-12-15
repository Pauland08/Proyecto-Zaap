# services/volunteer_service.py
from extensions import db
from models.user_model import User
from models.volunteer_model import VolunteerApplication

# Obtener todas las postulaciones de voluntariado
def get_applications():
    return VolunteerApplication.query.all()

# Obtener una postulacion por ID
def get_application_by_id(application_id):
    return VolunteerApplication.query.get(application_id)

# Crear una nueva postulacion de voluntariado
def create_application(data, user_id):
    application = VolunteerApplication(
        id_usuario=user_id,
        id_evento=data.get("id_evento"),  # puede ser None
        fecha_postulacion=data["fecha_postulacion"],  # formato YYYY-MM-DD
        estado=data.get("estado", "pendiente"),
        observaciones=data.get("observaciones")
    )
    db.session.add(application)
    db.session.commit()
    return application

# Actualizar una postulacion de voluntariado
def update_application(application_id, data):
    application = VolunteerApplication.query.get(application_id)
    if not application:
        return None

    application.id_evento = data.get("id_evento", application.id_evento)
    application.fecha_postulacion = data.get("fecha_postulacion", application.fecha_postulacion)
    application.estado = data.get("estado", application.estado)
    application.observaciones = data.get("observaciones", application.observaciones)

    db.session.commit()
    return application

# Eliminar una postulacion de voluntariado
def delete_application(application_id):
    application = VolunteerApplication.query.get(application_id)
    if not application:
        return None

    db.session.delete(application)
    db.session.commit()
    return application