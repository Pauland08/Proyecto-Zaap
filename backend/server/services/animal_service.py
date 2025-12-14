from extensions import db
from models.animal_model import Animal


# LISTAR TODOS LOS ANIMALES

def get_animals():
    return Animal.query.all()



# OBTENER ANIMAL POR ID

def get_animal_by_id(animal_id):
    return Animal.query.get(animal_id)



# CREAR ANIMAL

def create_animal(data, user_id):
    animal = Animal(
        id_rescate=data.get("id_rescate"),
        id_usuario=user_id,
        nombre=data["nombre"],
        especie=data["especie"],
        edad_aprox=data.get("edad_aprox"),
        estado_medico=data.get("estado_medico"),
        descripcion=data.get("descripcion"),
        ubicacion=data.get("ubicacion"),
        fotos=data.get("fotos"),
        estado=data.get("estado", "disponible")
    )

    db.session.add(animal)
    db.session.commit()
    return animal

# ACTUALIZAR ANIMAL

def update_animal(animal_id, data):
    animal = Animal.query.get(animal_id)

    if not animal:
        return None

    animal.nombre = data.get("nombre", animal.nombre)
    animal.especie = data.get("especie", animal.especie)
    animal.edad_aprox = data.get("edad_aprox", animal.edad_aprox)
    animal.estado_medico = data.get("estado_medico", animal.estado_medico)
    animal.descripcion = data.get("descripcion", animal.descripcion)
    animal.ubicacion = data.get("ubicacion", animal.ubicacion)
    animal.fotos = data.get("fotos", animal.fotos)
    animal.estado = data.get("estado", animal.estado)

    db.session.commit()
    return animal



# ELIMINAR ANIMAL

def delete_animal(animal_id):
    animal = Animal.query.get(animal_id)

    if not animal:
        return None

    db.session.delete(animal)
    db.session.commit()
    return animal
