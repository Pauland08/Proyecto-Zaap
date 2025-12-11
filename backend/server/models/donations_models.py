from config import db

# ---------------------------------- DONACIONES ----------------------------------
class Donacion(db.Model):
    __tablename__ = 'Donacion'
    id_donacion = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuarios.id_usuario'), nullable=False)
    titulo = db.Column(db.String(50), nullable=False)
    monto = db.Column(db.Numeric(10, 2), nullable=False)
    comprobante = db.Column(db.String(100), nullable=False)
    seguimiento = db.Column(db.String(200), nullable=False)
    fecha = db.Column(db.Date, nullable=False)