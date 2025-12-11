from config import db


# --------------------------------- USUARIOS ---------------------------------
class Usuario(db.Model):
    __tablename__ = 'Usuarios'
    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(db.String(100), nullable=False)
    correo = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    password_sha1 = db.Column(db.String(255), nullable=True)
    rol = db.Column(db.Enum('Administrador', 'Fundacion', 'Voluntario', 'Donante', 'Ciudadano'))
    fecha_registro = db.Column(db.Date, nullable=False)
    estado = db.Column(db.Boolean, nullable=False)

    rescates = db.relationship('Rescate', backref='usuario', lazy=True)
    donaciones = db.relationship('Donacion', backref='usuario', lazy=True)