from extensions import db

class VolunteerApplication(db.Model):
    __tablename__ = "Postulacion_voluntario"

    id_postulacion = db.Column(db.Integer, primary_key=True)

    id_usuario = db.Column(db.Integer, db.ForeignKey("Usuarios.id_usuario"), nullable=False)
    id_evento = db.Column(db.Integer, db.ForeignKey("Evento.id_evento"), nullable=True)
    fecha_postulacion = db.Column(db.Date, nullable=False)
    estado = db.Column(db.Enum("aceptada", "pendiente", "rechazada"), nullable=False)
    observaciones = db.Column(db.String(200))

    # Relaciones
    usuario = db.relationship(
        "User",
        back_populates="volunteer_applications"
    )

    evento = db.relationship(
        "Event",
        back_populates="volunteer_applications",
        lazy="joined" 
    )

    def to_dict(self):
        return {
            "id_postulacion": self.id_postulacion,
            "id_usuario": self.id_usuario,
            "id_evento": self.id_evento,
            "fecha_postulacion": self.fecha_postulacion.isoformat() if self.fecha_postulacion else None,
            "estado": self.estado,
            "observaciones": self.observaciones,
            "evento": self.evento.to_dict() if self.evento else None
        }