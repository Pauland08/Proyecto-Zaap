from config import db

# ----------------------------- POSTULACION VOLUNTARIO -----------------------------
class Postulacion_voluntario(db.Model):
    __tablename__ = 'Postulacion_voluntario'
    id_postulacion = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuarios.id_usuario'), nullable=False)
    id_evento = db.Column(db.Integer, db.ForeignKey('Evento.id_evento'), nullable=False)
    fecha_postulacion = db.Column(db.Date, nullable=False)
    estado = db.Column(db.String(45), nullable=False)
    observaciones = db.Column(db.String(200), nullable=True)