/* ************************************************************************************* */
/* ------------------------------ 3. INSERCIÓN DE DATOS -------------------------------- */
/* ************************************************************************************* */

-- Inserción de roles
INSERT INTO Usuarios (id_usuario, nombre_usuario, correo, contraseña, rol, fecha_registro, estado) VALUES
(1, 'admin', 'admin@email.com', 'Admin123', 'Administrador', '2025-07-10', 1),
(2, 'fundacion_ikigai', 'ikigai@gmail.com', 'Fundacion123', 'Fundación', '2025-07-15', 1),
(3, 'voluntario_juan', 'juan@gmail.com', 'Juan123', 'Voluntario', '2025-07-20', 1),
(4, 'donante_ana', 'ana@gmail.com', 'Ana123', 'Donante', '2025-08-01', 1),
(5, 'ciudadano_david', 'david@gmail.com', 'David123', 'Ciudadano', '2025-08-10', 1);

-- Inserción de datos de la fundación
INSERT INTO `Fundación` (id_fundacion, id_usuario, nombre_fundacion, ubicacion, descripcion, contacto, redes_sociales, estado_validacion) VALUES
(101, 2, 'Fundación ikigai', 'Bogotá', 'Rescate y adopción de animales', '321 0456789', 'instagram.com/ikigai', 1);

-- Inserción de animales que pertenecen a una fundación
INSERT INTO `Animal` (id_animal, id_fundacion, nombre, especie, edad_aprox, estado_medico, descripcion, ubicacion, fotos, estado) VALUES
(201, 101, 'Tambo', 'Perro', '3 años', 'En buen estado', 'Perro amigable y juguetón', 'Bogotá', 'tambo_perro.jpg', 'disponible'),
(202, 101, 'Luna', 'Gato', '1 año', 'Requiere vacunas', 'Gata tímida, pero cariñosa', 'Bogotá', 'luna_gato.jpg', 'en_tratamiento'),
(203, 101, 'Toby', 'Perro', '5 años', 'En buen estado', 'Perro adoptado recientemente', 'Bogotá', 'toby_perro.jpg', 'adoptado');

-- Inserción de reportes de rescate que se relacionan con un usuario y un animal
INSERT INTO `Rescate` (id_rescate, id_usuario, id_animal, descripcion, foto, ubicacion, fecha_reporte, estado) VALUES
(301, 5, 202, 'Gata callejera herida en la pata', 'luna_gato.jpg', 'Calle 100 - Carrera 15', '2025-08-20', 'pendiente'),
(302, 3, 201, 'Perro abandonado, necesita hogar', 'tambo_perro.jpg', 'Parque de la 93', '2025-08-25', 'finalizado');

-- Inserción de una donación que se relaciona con un usuario
INSERT INTO `Donación` (id_donacion, id_usuario, titulo, monto, comprobante, seguimiento, fecha) VALUES
(401, 4, 'Alimentos para animales', 500.000, 'comp401.jpg', 'Entregado a fundación', '2025-08-01');

-- Inserción de un ticket de soporte que se relaciona con un usuario y una fundación
INSERT INTO `Ticket soporte` (id_ticket, id_usuario, id_fundacion, titulo, descripcion, archivo_adj, fecha_envio, respuesta_admin, estado) VALUES
(501, 2, 101, 'Error en el perfil', 'No puedo actualizar mi información de contacto.', NULL, '2025-08-20', NULL, 'abierto');

-- Inserción de una solicitud de adopción que se relaciona con un usuario y un animal
INSERT INTO `Solicitud adopción` (id_solicitud, id_usuario, id_animal, fecha_solicitud, mensaje, estado) VALUES
(601, 4, 201, '2025-08-28', 'Estoy interesado en adoptar a Tambo.', 'pendiente');

-- Inserción de un evento de una fundación
INSERT INTO `Evento` (id_evento, id_fundacion, titulo, fecha_evento, ubicacion, tipo, estado) VALUES
(701, 101, 'Jornada de Adopción', '2025-07-30', 'Parque del Virrey', 'adopción', 1);

-- Inserción de postulación de un voluntario a un evento
INSERT INTO `Postulación voluntario` (id_postulacion, id_usuario, id_evento, fecha_postulacion, estado, observaciones) VALUES
(801, 3, 701, '2025-07-25', 'aceptada', 'Disponible para la jornada completa.');

