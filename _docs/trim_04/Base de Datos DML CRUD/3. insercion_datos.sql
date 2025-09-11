/* ************************************************************************************* */
/* ------------------------------ 3. INSERCIÓN DE DATOS -------------------------------- */
/* ************************************************************************************* */

-- Inserción de usuarios
INSERT INTO Usuarios (id_usuario, nombre_usuario, correo, contraseña, rol, fecha_registro, estado) VALUES
(1, 'admin', 'admin@email.com', 'Admin123', 'Administrador', '2025-07-10', 1),
(2, 'voluntario_juan', 'juan@gmail.com', 'Juan123', 'Voluntario', '2025-07-20', 1),
(3, 'donante_ana', 'ana@gmail.com', 'Ana123', 'Donante', '2025-08-01', 1),
(4, 'ciudadano_david', 'david@gmail.com', 'David123', 'Ciudadano', '2025-08-10', 1);

-- Inserción de rescates
INSERT INTO Rescate (id_rescate, id_usuario, descripcion, foto, ubicacion, fecha_reporte, estado) VALUES
(301, 4, 'Gata callejera herida en la pata', 'luna_gato.jpg', 'Calle 100 - Carrera 15', '2025-08-20', 'pendiente'),
(302, 2, 'Perro abandonado, necesita hogar', 'tambo_perro.jpg', 'Parque de la 93', '2025-08-25', 'finalizado');

-- Inserción de animales
INSERT INTO Animal (id_animal, id_rescate, id_usuario, nombre, especie, edad_aprox, estado_medico, descripcion, ubicacion, fotos, estado) VALUES
(201, 302, 2, 'Tambo', 'Perro', '3 años', 'En buen estado', 'Perro amigable y juguetón', 'Bogotá', 'tambo_perro.jpg', 'disponible'),
(202, 301, 4, 'Luna', 'Gato', '1 año', 'Requiere vacunas', 'Gata tímida, pero cariñosa', 'Bogotá', 'luna_gato.jpg', 'en_tratamiento'),
(203, 302, 2, 'Toby', 'Perro', '5 años', 'En buen estado', 'Perro adoptado recientemente', 'Bogotá', 'toby_perro.jpg', 'adoptado');

-- Inserción de donaciones
INSERT INTO Donacion (id_donacion, id_usuario, titulo, monto, comprobante, seguimiento, fecha) VALUES
(401, 3, 'Alimentos para animales', 500000, 'comp401.jpg', 'Entregado a voluntarios', '2025-08-01');

-- Inserción de tickets de soporte
INSERT INTO Ticket_soporte (id_ticket, id_usuario, titulo, mensaje, archivo_adj, fecha_envio, respuesta_admin, estado) VALUES
(501, 2, 'Error en el perfil', 'No puedo actualizar mi información de contacto.', NULL, '2025-08-20', NULL, 'abierto');

-- Inserción de solicitudes de adopción
INSERT INTO Solicitud_adopcion (id_solicitud, id_usuario, id_animal, fecha_solicitud, estado) VALUES
(601, 3, 201, '2025-08-28', 'pendiente');

-- Inserción de eventos
INSERT INTO Evento (id_evento, id_usuario, titulo, fecha_evento, ubicacion, tipo, estado) VALUES
(701, 1, 'Jornada de Adopción', '2025-07-30', 'Parque del Virrey', 'adopcion', 1);

-- Inserción de postulaciones a eventos
INSERT INTO Postulacion_voluntario (id_postulacion, id_usuario, id_evento, fecha_postulacion, estado, observaciones) VALUES
(801, 2, 701, '2025-07-25', 'aceptada', 'Disponible para la jornada completa.');

-- Inserción de campañas
INSERT INTO `Campaña` (id_capaña, id_usuario, id_donacion, titulo, descripcion, categoria, meta, imagen, fecha_inicio, fecha_fin, estado) VALUES
(901, 1, 401, 'Campaña de vacunación', 'Recaudación para vacunar animales rescatados', 'Salud', 2000000, 'campania_vacunacion.jpg', '2025-07-01', '2025-08-15', 'finalizada'),
(902, 3, 401, 'Alimentos solidarios', 'Campaña para recolectar alimentos balanceados para perros y gatos', 'Alimentos', 1500000, 'campania_alimentos.jpg', '2025-08-05', '2025-09-10', 'activa');

-- Inserción de reportes estadísticos
INSERT INTO Reporte_estadístico (id_reporte, id_usuario, tipo_reporte, fecha_reporte, total_registros, total_dinero, tabulacion) VALUES
(1001, 1, 'Adopciones', '2025-08-31', 15, 0, JSON_OBJECT('adoptados', 12, 'rechazados', 3)),
(1002, 3, 'Donaciones', '2025-08-31', 5, 500000, JSON_OBJECT('alimentos', 300000, 'medicinas', 200000));
