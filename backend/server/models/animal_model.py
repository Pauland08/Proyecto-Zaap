from extensions import db

class Animal(db.Model):
    __tablename__ = "Animal"

    id_animal = db.Column(db.Integer, primary_key=True)
    id_rescate = db.Column(db.Integer, nullable=True)
    id_usuario = db.Column(db.Integer, nullable=False)

    nombre = db.Column(db.String(100), nullable=False)
    especie = db.Column(db.String(50), nullable=False)
    edad_aprox = db.Column(db.String(50))
    estado_medico = db.Column(db.String(150))
    descripcion = db.Column(db.Text)
    ubicacion = db.Column(db.String(100))
    fotos = db.Column(db.String(150))
    estado = db.Column(db.String(50), default="disponible")

    # Convertir el objeto a JSON
    def to_dict(self):
        return {
            "id_animal": self.id_animal,
            "id_rescate": self.id_rescate,
            "id_usuario": self.id_usuario,
            "nombre": self.nombre,
            "especie": self.especie,
            "edad_aprox": self.edad_aprox,
            "estado_medico": self.estado_medico,
            "descripcion": self.descripcion,
            "ubicacion": self.ubicacion,
            "fotos": self.fotos,
            "estado": self.estado
        }
