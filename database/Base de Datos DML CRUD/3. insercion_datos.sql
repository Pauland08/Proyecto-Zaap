/* ************************************************************************************* */
/* ------------------------------ 3. INSERCION DE DATOS -------------------------------- */
/* ************************************************************************************* */

-- Insercion de usuarios
INSERT INTO Usuarios (id_usuario, nombre_usuario, correo, password, rol, fecha_registro, estado) VALUES
(1, 'admin', 'admin@gmail.com', SHA2('Admin123', 256), 'Administrador', '2025-07-10', 1),
(2, 'voluntario_juan', 'juan@gmail.com', SHA2('Juan123', 256), 'Voluntario', '2025-07-20', 1),
(3, 'donante_ana', 'ana@gmail.com', SHA2('Ana123', 256), 'Donante', '2025-08-01', 1),
(4, 'ciudadano_david', 'david@gmail.com', SHA2('David123', 256), 'Ciudadano', '2025-08-10', 1),
(5, 'voluntario_maria', 'maria@gmail.com', SHA2('Maria123', 256), 'Voluntario', '2025-08-15', 1),
(6, 'donante_carlos', 'carlos@gmail.com', SHA2('Carlos123', 256), 'Donante', '2025-08-18', 1),
(7, 'ciudadano_luisa', 'luisa@gmail.com', SHA2('Luisa123', 256), 'Ciudadano', '2025-08-22', 1),
(8, 'voluntario_pedro', 'pedro@gmail.com', SHA2('Pedro123', 256), 'Voluntario', '2025-08-25', 1),
(9, 'donante_laura', 'laura@gmail.com', SHA2('Laura123', 256), 'Donante', '2025-08-28', 1),
(10, 'ciudadano_jose', 'jose@gmail.com', SHA2('Jose123', 256), 'Ciudadano', '2025-08-29', 1),
(11, 'voluntario_andrea', 'andrea@gmail.com', SHA2('Andrea123', 256), 'Voluntario', '2025-09-01', 1),
(12, 'donante_miguel', 'miguel@gmail.com', SHA2('Miguel123', 256), 'Donante', '2025-09-02', 1),
(13, 'ciudadano_catalina', 'catalina@gmail.com', SHA2('Catalina123', 256), 'Ciudadano', '2025-09-03', 1),
(14, 'voluntario_ricardo', 'ricardo@gmail.com', SHA2('Ricardo123', 256), 'Voluntario', '2025-09-04', 1),
(15, 'donante_sofia', 'sofia@gmail.com', SHA2('Sofia123', 256), 'Donante', '2025-09-05', 1);


-- Insercion de rescates
INSERT INTO Rescate (id_rescate, id_usuario, descripcion, foto, ubicacion, fecha_reporte, estado) VALUES
(301, 4, 'Gata callejera herida en la pata', 'luna_gato.jpg', 'Calle 100 - Carrera 15', '2025-08-20', 'pendiente'),
(302, 2, 'Perro abandonado, necesita hogar', 'tambo_perro.jpg', 'Parque de la 93', '2025-08-25', 'finalizado'),
(303, 5, 'Perro atropellado con fractura', 'frida_perro.jpg', 'Av. Suba', '2025-08-27', 'en proceso'),
(304, 7, 'Gato atrapado en un techo', 'michi_techo.jpg', 'Barrio Chapinero', '2025-08-28', 'pendiente'),
(305, 8, 'Cachorro encontrado en basurero', 'rocky_cachorro.jpg', 'Kennedy', '2025-08-29', 'finalizado');

-- Insercion de animales
INSERT INTO Animal (id_animal, id_rescate, id_usuario, nombre, especie, edad_aprox, estado_medico, descripcion, ubicacion, fotos, estado) VALUES
(201, 302, 2, 'Tambo', 'Perro', '3 años', 'En buen estado', 'Perro amigable y jugueton', 'Bogota', 'tambo_perro.jpg', 'disponible'),
(202, 301, 4, 'Luna', 'Gato', '1 año', 'Requiere vacunas', 'Gata timida pero carinosa', 'Bogota', 'luna_gato.jpg', 'en_tratamiento'),
(203, 302, 2, 'Toby', 'Perro', '5 años', 'En buen estado', 'Perro adoptado recientemente', 'Bogota', 'toby_perro.jpg', 'adoptado'),
(204, 303, 5, 'Frida', 'Perro', '2 años', 'Fractura en pata trasera', 'Perra rescatada de accidente', 'Bogota', 'frida_perro.jpg', 'en_tratamiento'),
(205, 304, 7, 'Michi', 'Gato', '6 meses', 'Leve deshidratacion', 'Gatito rescatado del techo', 'Bogota', 'michi_techo.jpg', 'disponible'),
(206, 305, 8, 'Rocky', 'Perro', '4 meses', 'En buen estado', 'Cachorro encontrado en basurero', 'Bogota', 'rocky_cachorro.jpg', 'disponible');

-- Insercion de donaciones
INSERT INTO Donacion (id_donacion, id_usuario, titulo, monto, comprobante, seguimiento, fecha) VALUES
(401, 3, 'Alimentos para animales', 500000, 'comp401.jpg', 'Entregado a voluntarios', '2025-08-01'),
(402, 6, 'Medicamentos urgentes', 300000, 'comp402.jpg', 'Comprados y entregados', '2025-08-15'),
(403, 9, 'Donacion de collares y correas', 200000, 'comp403.jpg', 'Distribuido en refugios', '2025-08-20'),
(404, 12, 'Alimento premium', 600000, 'comp404.jpg', 'Usado en jornadas', '2025-08-22'),
(405, 15, 'Donacion en efectivo', 1000000, 'comp405.jpg', 'Depositado a cuenta solidaria', '2025-08-30');

-- Insercion de tickets de soporte
INSERT INTO Ticket_soporte (id_ticket, id_usuario, titulo, mensaje, archivo_adj, fecha_envio, respuesta_admin, estado) VALUES
(501, 2, 'Error en el perfil', 'No puedo actualizar mi informacion de contacto.', NULL, '2025-08-20', NULL, 'abierto'),
(502, 5, 'Problema con rescate', 'No aparece mi rescate en el sistema.', NULL, '2025-08-25', 'Estamos revisando.', 'pendiente'),
(503, 7, 'Error en postulacion', 'No me deja postularme a un evento.', NULL, '2025-08-28', 'Error corregido, intenta de nuevo.', 'cerrado');

-- Insercion de solicitudes de adopcion
INSERT INTO Solicitud_adopcion (id_solicitud, id_usuario, id_animal, fecha_solicitud, mensaje, estado) VALUES
(601, 3, 201, '2025-08-28', 'Quiero adoptar a Tambo.', 'pendiente'),
(602, 4, 202, '2025-08-29', 'Estoy interesado en Luna.', 'pendiente'),
(603, 6, 205, '2025-08-30', 'Quiero dar hogar a Michi.', 'aprobado'),
(604, 9, 206, '2025-08-30', 'Estoy interesado en Rocky.', 'rechazado'),
(605, 10, 204, '2025-08-31', 'Me gustaria adoptar a Frida.', 'pendiente');

-- Insercion de eventos
INSERT INTO Evento (id_evento, id_usuario, titulo, fecha_evento, ubicacion, tipo, estado) VALUES
(701, 1, 'Jornada de Adopcion', '2025-07-30', 'Parque del Virrey', 'adopcion', 1),
(702, 1, 'Campana de Donacion', '2025-08-20', 'Centro Comercial Andino', 'donacion', 1),
(703, 1, 'Feria Animalista', '2025-09-15', 'Plaza Bolivar', 'informativa', 1);

-- Insercion de postulaciones a eventos
INSERT INTO Postulacion_voluntario (id_postulacion, id_usuario, id_evento, fecha_postulacion, estado, observaciones) VALUES
(801, 2, 701, '2025-07-25', 'aceptada', 'Disponible jornada completa'),
(802, 5, 701, '2025-07-26', 'pendiente', 'Disponible medio tiempo'),
(803, 8, 702, '2025-08-15', 'aceptada', 'Ayudare en la logistica'),
(804, 11, 703, '2025-08-25', 'pendiente', 'Puedo apoyar en la feria'),
(805, 14, 703, '2025-08-28', 'rechazada', 'No cumple requisitos');

-- Insercion de campañas
INSERT INTO Campania (id_campania, id_usuario, id_donacion, titulo, descripcion, categoria, meta, imagen, fecha_inicio, fecha_fin, estado) VALUES
(901, 1, 401, 'Campania de vacunacion', 'Recaudacion para vacunar animales rescatados', 'Salud', 2000000, 1, '2025-07-01', '2025-08-15', 'finalizada'),
(902, 3, 402, 'Alimentos solidarios', 'Recolectar alimentos balanceados para perros y gatos', 'Alimentos', 1500000, 2, '2025-08-05', '2025-09-10', 'activa'),
(903, 6, 404, 'Medicinas para rescates', 'Fondo para comprar medicinas de urgencia', 'Medicinas', 1000000, 3, '2025-08-10', '2025-09-20', 'activa');

-- Insercion de reportes estadisticos: reporte de adopción y de donación
INSERT INTO Reporte_estadistico (id_reporte, id_usuario, tipo_reporte, fecha_reporte, total_registros, total_dinero, tabulacion) VALUES
(1001, 1, 'Adopciones', '2025-08-31', 5, 0, JSON_OBJECT('aprobados', 1, 'rechazados', 1, 'pendientes', 3)),
(1002, 1, 'Donaciones', '2025-08-31', 5, 2600000, JSON_OBJECT('alimentos', 500000, 'medicinas', 300000, 'efectivo', 1000000, 'otros', 800000));