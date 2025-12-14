import hashlib
from models.user_model import User
from extensions import db

# Encriptar contraseña con SHA256
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

# Auto registro (ciudadanos / donantes)
def auto_register(data):
    hashed_password = hash_password(data["password"])

    user = User(
        nombre_usuario=data["nombre_usuario"],
        correo=data["correo"],
        password=hashed_password,
        rol=data.get("rol", "Ciudadano"),  # Rol por defecto
        estado=1
    )

    db.session.add(user)
    db.session.commit()
    return user

# Crear usuario (ADMIN)
def create_user(data):
    hashed_password = hash_password(data["password"])

    user = User(
        nombre_usuario=data["nombre_usuario"],
        correo=data["correo"],
        password=hashed_password,
        rol=data["rol"],
        estado=1
    )

    db.session.add(user)
    db.session.commit()
    return user

# Listar usuarios activos
def get_users():
    return User.query.filter_by(estado=1).all()

# Obtener usuario por ID
def get_user_by_id(user_id):
    return User.query.get(user_id)

# Actualizar usuario
def update_user(user_id, data):
    user = User.query.get(user_id)

    if not user:
        return None

    user.nombre_usuario = data.get("nombre_usuario", user.nombre_usuario)
    user.correo = data.get("correo", user.correo)
    user.rol = data.get("rol", user.rol)

    if "password" in data:
        user.password = hash_password(data["password"])

    db.session.commit()
    return user

# Eliminación lógica (NO borra de la BD)
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return None

    user.estado = 0
    db.session.commit()
    return user
