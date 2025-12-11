from config import db

# --------------------------------- ANIMALES ---------------------------------
class Animal(db.Model):
    __tablename__ = 'Animal'
    id_animal = db.Column(db.Integer, primary_key=True)
    id_rescate = db.Column(db.Integer, db.ForeignKey('Rescate.id_rescate'), nullable=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuarios.id_usuario'), nullable=False)
    nombre = db.Column(db.String(50), nullable=False)
    especie = db.Column(db.String(45), nullable=False)
    edad_aprox = db.Column(db.String(10), nullable=True)
    estado_medico = db.Column(db.String(500), nullable=True)
    descripcion = db.Column(db.String(200), nullable=True)
    ubicacion = db.Column(db.String(100), nullable=False)
    fotos = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.Enum('disponible', 'adoptado', 'en_tratamiento', 'fallecido'), nullable=False)