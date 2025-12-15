#models/donation_model.py
from extensions import db

class Donation(db.Model):
    __tablename__ = "Donacion"

    id_donacion = db.Column(db.Integer, primary_key=True)

    # FK DE USUARIO
    id_usuario = db.Column(
        db.Integer,
        db.ForeignKey("Usuarios.id_usuario"),
        nullable=False
    )

    titulo = db.Column(db.String(50), nullable=False)
    monto = db.Column(db.Numeric, nullable=False)
    comprobante = db.Column(db.String(100), nullable=False)
    seguimiento = db.Column(db.String(200))
    fecha = db.Column(db.Date, nullable=False)


    # RELACIÓN CON USUARIO
    usuario = db.relationship("User", back_populates="donations")

    def to_dict(self):
        return {
            "id_donacion": self.id_donacion,
            "id_usuario": self.id_usuario,
            "titulo": self.titulo,
            "monto": float(self.monto),
            "comprobante": self.comprobante,
            "seguimiento": self.seguimiento,
            "fecha": self.fecha.isoformat() if self.fecha else None
        }
