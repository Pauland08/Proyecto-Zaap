
from extensions import db

class User(db.Model):
    __tablename__ = "Usuarios"

    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(db.String(100))
    correo = db.Column(db.String(120))
    password = db.Column(db.String(255))
    rol = db.Column(db.String(50))
    estado = db.Column(db.Integer)

    donations = db.relationship(
        "Donation",
        back_populates="usuario",
        cascade="all, delete-orphan"
    )

    volunteer_applications = db.relationship(
        "VolunteerApplication",
        back_populates="usuario",
        cascade="all, delete-orphan"
    )


    # Convertir objeto a JSON
    def to_dict(self):
        return {
            "id_usuario": self.id_usuario,
            "nombre_usuario": self.nombre_usuario,
            "correo": self.correo,
            "rol": self.rol,
            "estado": self.estado
        }