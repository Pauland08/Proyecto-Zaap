from models.users_model import Usuario
from config import db, bcrypt
from datetime import date

def crear_usuario(data):
    hashed_pw = bcrypt.generate_password_hash(data['contraseña']).decode('utf-8')
    nuevo = Usuario(
        nombre_usuario=data['nombre'],
        correo=data['correo'],
        password=hashed_pw,
        rol=data.get('rol', 'Ciudadano'),
        fecha_registro=date.today(),
        estado=True
    )
    db.session.add(nuevo)
    db.session.commit()
    return nuevo

def verificar_credenciales(correo, contraseña):
    usuario = Usuario.query.filter_by(correo=correo).first()
    if usuario and bcrypt.check_password_hash(usuario.password, contraseña):
        return usuario
    return None

def obtener_usuario_por_id(id_usuario):
    return Usuario.query.get(id_usuario)
