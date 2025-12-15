from extensions import db

class Event(db.Model):
    __tablename__ = "Evento"

    id_evento = db.Column(db.Integer, primary_key=True)

    id_usuario = db.Column(
        db.Integer,
        db.ForeignKey("Usuarios.id_usuario"),
        nullable=False
    )

    titulo = db.Column(db.String(45), nullable=False)
    fecha_evento = db.Column(db.Date, nullable=False)
    ubicacion = db.Column(db.String(100), nullable=False)
    tipo = db.Column(db.String(45))
    estado = db.Column(db.Integer, nullable=False)

    # Relaciones
    usuario = db.relationship("User", backref="events")

    volunteer_applications = db.relationship(
        "VolunteerApplication",
        back_populates="evento",
        cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id_evento": self.id_evento,
            "id_usuario": self.id_usuario,
            "titulo": self.titulo,
            "fecha_evento": self.fecha_evento.isoformat() if self.fecha_evento else None,
            "ubicacion": self.ubicacion,
            "tipo": self.tipo,
            "estado": self.estado
        }