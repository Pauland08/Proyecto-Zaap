/* ************************************************************************************* */
/* ---------------------------- 4. CONSULTAS POR UNA TABLA ----------------------------- */
/* ************************************************************************************* */

-- ===================================================================================== --
--  ---------------------------- 01. CONSULTA TABLA USUARIOS --------------------------- --
-- ===================================================================================== --
-- 1.1 Listar todos los usuarios
SELECT * FROM Usuarios;

-- 1.2 Buscar usuario por rol
SELECT * FROM Usuarios WHERE rol = 'Voluntario';

-- 1.3 Ver correos de usuarios activos
SELECT nombre_usuario, correo FROM Usuarios WHERE estado = 1;

-- 1.4 Contar cuántos donantes hay
SELECT COUNT(*) AS total_donantes FROM Usuarios WHERE rol = 'Donante';


-- ===================================================================================== --
--  ------------------------------ 02. CONSULTA TABLA ANIMAL --------------------------- --
-- ===================================================================================== --
-- 2.1 Listar todos los animales
SELECT * FROM Animal;

-- 2.2 Ver animales disponibles para adopción
SELECT nombre, especie, estado FROM Animal WHERE estado = 'disponible';

-- 2.3 Buscar animales que estén en tratamiento médico
SELECT nombre, estado_medico FROM Animal WHERE estado = 'en_tratamiento';

-- 2.4 Contar cuántos perros hay registrados
SELECT COUNT(*) AS total_perros FROM Animal WHERE especie = 'Perro';


-- ===================================================================================== --
--  ------------------------------ 03. CONSULTA TABLA RESCATE -------------------------- --
-- ===================================================================================== --
-- 3.1 Listar rescates reportados
SELECT * FROM Rescate;

-- 3.2 Ver rescates pendientes
SELECT id_rescate, descripcion, estado FROM Rescate WHERE estado = 'pendiente';

-- 3.3 Buscar rescates por ubicación
SELECT descripcion, ubicacion FROM Rescate WHERE ubicacion LIKE '%Parque%';


-- ===================================================================================== --
--  ----------------------------- 04. CONSULTA TABLA DONACION -------------------------- --
-- ===================================================================================== --
-- 4.1 Listar todas las donaciones
SELECT * FROM Donacion;

-- 4.2 Ver donaciones de un usuario específico
SELECT titulo, monto, fecha FROM Donacion WHERE id_usuario = 3;

-- 4.3 Total donado en la plataforma
SELECT SUM(monto) AS total_donado FROM Donacion;


-- ===================================================================================== --
--  -------------------------- 05. CONSULTA TABLA TICKET SOPORTE ----------------------- --
-- ===================================================================================== --
-- 5.1 Listar tickets abiertos
SELECT * FROM Ticket_soporte WHERE estado = 'abierto';

-- 5.2 Ver tickets enviados por un usuario
SELECT titulo, mensaje FROM Ticket_soporte WHERE id_usuario = 2;

-- 5.3 Contar tickets por estado
SELECT estado, COUNT(*) AS cantidad FROM Ticket_soporte GROUP BY estado;


-- ===================================================================================== --
--  ------------------------ 06. CONSULTA TABLA SOLICITUD ADOPCION --------------------- --
-- ===================================================================================== --
-- 6.1 Listar solicitudes de adopción
SELECT * FROM Solicitud_adopcion;

-- 6.2 Ver solicitudes pendientes
SELECT id_solicitud, id_usuario, id_animal FROM Solicitud_adopcion WHERE estado = 'pendiente';

-- 6.3 Contar cuántas solicitudes existen
SELECT COUNT(*) AS total_solicitudes FROM Solicitud_adopcion;


-- ===================================================================================== --
--  ------------------------------- 07. CONSULTA TABLA EVENTO -------------------------- --
-- ===================================================================================== --
-- 7.1 Listar todos los eventos
SELECT * FROM Evento;

-- 7.2 Ver eventos activos
SELECT titulo, fecha_evento, ubicacion FROM Evento WHERE estado = 1;

-- 7.3 Buscar eventos por tipo
SELECT titulo, tipo FROM Evento WHERE tipo = 'adopcion';


-- ===================================================================================== --
--  ------------------------------- 08. CONSULTA TABLA CAMPAÑA ------------------------- --
-- ===================================================================================== --
-- 8.1 Listar todas las campañas
SELECT * FROM `Campaña`;

-- 8.2 Ver campañas activas
SELECT titulo, descripcion, meta FROM `Campaña` WHERE estado = 'activa';

-- 8.3 Contar campañas finalizadas
SELECT COUNT(*) AS total_finalizadas FROM `Campaña` WHERE estado = 'finalizada';


-- ===================================================================================== --
--  --------------------- 09. CONSULTA TABLA POSTULACION VOLUNTARIO -------------------- --
-- ===================================================================================== --
-- 9.1 Listar todas las postulaciones
SELECT * FROM Postulacion_voluntario;

-- 9.2 Ver postulaciones aceptadas
SELECT id_postulacion, id_usuario, estado FROM Postulacion_voluntario WHERE estado = 'aceptada';

-- 9.3 Contar voluntarios por evento
SELECT id_evento, COUNT(*) AS total_postulantes FROM Postulacion_voluntario GROUP BY id_evento;


-- ===================================================================================== --
--  -------------------------- 10. CONSULTA TABLA REPORTE ESTADISTICO ------------------ --
-- ===================================================================================== --
-- 10.1 Listar todos los reportes
SELECT * FROM Reporte_estadístico;

-- 10.2 Ver reportes de un usuario
SELECT id_reporte, tipo_reporte, fecha_reporte FROM Reporte_estadístico WHERE id_usuario = 1;

-- 10.3 Contar reportes generados
SELECT COUNT(*) AS total_reportes FROM Reporte_estadístico;
