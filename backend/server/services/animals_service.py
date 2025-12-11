from models.animals_model import Animal
from config import db

def crear_animal(data):
    nuevo = Animal(**data)
    db.session.add(nuevo)
    db.session.commit()
    return nuevo

def obtener_animal_por_id(id):
    return Animal.query.get(id)

def actualizar_animal(id, data):
    animal = Animal.query.get(id)
    if not animal: return None
    for campo, valor in data.items():
        setattr(animal, campo, valor)
    db.session.commit()
    return animal

def eliminar_animal(id):
    animal = Animal.query.get(id)
    if not animal: return False
    db.session.delete(animal)
    db.session.commit()
    return True
