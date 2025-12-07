from config import db

# --------------------------------- USUARIOS ---------------------------------
class Usuario(db.Model):
    __tablename__ = 'Usuarios'
    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(db.String(100), nullable=False)
    correo = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    rol = db.Column(db.Enum('Administrador', 'Fundacion', 'Voluntario', 'Donante', 'Ciudadano'))
    fecha_registro = db.Column(db.Date, nullable=False)
    estado = db.Column(db.Boolean, nullable=False)

    rescates = db.relationship('Rescate', backref='usuario', lazy=True)
    donaciones = db.relationship('Donacion', backref='usuario', lazy=True)


# --------------------------------- RESCATE ---------------------------------
class Rescate(db.Model):
    __tablename__ = 'Rescate'
    id_rescate = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuarios.id_usuario'), nullable=False)
    descripcion = db.Column(db.String(200), nullable=False)
    foto = db.Column(db.String(200), nullable=False)
    ubicacion = db.Column(db.String(200), nullable=False)
    fecha_reporte = db.Column(db.Date, nullable=False)
    estado = db.Column(db.Enum('pendiente', 'en proceso', 'finalizado'), nullable=False)


# --------------------------------- ANIMAL ---------------------------------
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


# ---------------------------------- DONACION ----------------------------------
class Donacion(db.Model):
    __tablename__ = 'Donacion'
    id_donacion = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuarios.id_usuario'), nullable=False)
    titulo = db.Column(db.String(50), nullable=False)
    monto = db.Column(db.Numeric(10, 2), nullable=False)
    comprobante = db.Column(db.String(100), nullable=False)
    seguimiento = db.Column(db.String(200), nullable=False)
    fecha = db.Column(db.Date, nullable=False)


# -------------------------------- TICKET DE SOPORTE ---------------------------------
class Ticket_soporte(db.Model):
    __tablename__ = 'Ticket_soporte'
    id_ticket = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuarios.id_usuario'), nullable=False)
    titulo = db.Column(db.String(45), nullable=False)
    mensaje = db.Column(db.String(200), nullable=False)
    archivo_adj = db.Column(db.String(200), nullable=True)
    fecha_envio = db.Column(db.Date, nullable=False)
    respuesta_admin = db.Column(db.String(200), nullable=True)
    estado = db.Column(db.Enum('abierto', 'cerrado', 'pendiente'), nullable=False)


# ----------------------------- SOLICITUD DE ADOPCION -----------------------------
class Solicitud_adopcion(db.Model):
    __tablename__ = 'Solicitud_adopcion'
    id_solicitud = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuarios.id_usuario'), nullable=False)
    id_animal = db.Column(db.Integer, db.ForeignKey('Animal.id_animal'), nullable=False)
    fecha_solicitud = db.Column(db.Date, nullable=False)
    mensaje = db.Column(db.String(200), nullable=True)
    estado = db.Column(db.Enum('aprobado', 'pendiente', 'rechazado'), nullable=False)


# ---------------------------------- EVENTO ---------------------------------
class Evento(db.Model):
    __tablename__ = 'Evento'
    id_evento = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuarios.id_usuario'), nullable=False)
    titulo = db.Column(db.String(45), nullable=False)
    fecha_evento = db.Column(db.Date, nullable=False)
    ubicacion = db.Column(db.String(100), nullable=False)
    tipo = db.Column(db.String(45), nullable=True)
    estado = db.Column(db.Boolean, nullable=False)


# ---------------------------------- CAMPAÑA --------------------------------
class Campania(db.Model):
    __tablename__ = 'Campania'
    id_campania = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuarios.id_usuario'), nullable=False)
    id_donacion = db.Column(db.Integer, db.ForeignKey('Donacion.id_donacion'), nullable=False)
    titulo = db.Column(db.String(50), nullable=False)
    descripcion = db.Column(db.String(200), nullable=False)
    categoria = db.Column(db.String(50), nullable=True)
    meta = db.Column(db.Numeric(10, 2), nullable=True)
    imagen = db.Column(db.String(200), nullable=True)
    fecha_inicio = db.Column(db.Date, nullable=False)
    fecha_fin = db.Column(db.Date, nullable=False)
    estado = db.Column(db.Enum('activa', 'inactiva', 'finalizada'), nullable=False)


# ----------------------------- POSTULACION VOLUNTARIO -----------------------------
class Postulacion_voluntario(db.Model):
    __tablename__ = 'Postulacion_voluntario'
    id_postulacion = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuarios.id_usuario'), nullable=False)
    id_evento = db.Column(db.Integer, db.ForeignKey('Evento.id_evento'), nullable=False)
    fecha_postulacion = db.Column(db.Date, nullable=False)
    estado = db.Column(db.String(45), nullable=False)
    observaciones = db.Column(db.String(200), nullable=True)


# ----------------------------- REPORTE ESTADISTICO -----------------------------
class Reporte_estadistico(db.Model):
    __tablename__ = 'Reporte_estadistico'
    id_reporte = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('Usuarios.id_usuario'), nullable=False)
    tipo_reporte = db.Column(db.String(50), nullable=False)
    fecha_reporte = db.Column(db.Date, nullable=False)
    total_registros = db.Column(db.Integer, nullable=False)
    total_dinero = db.Column(db.Numeric(10, 2), nullable=False)
    tabulacion = db.Column(db.JSON, nullable=False)