/* ************************************************************************************* */
/* ------------------------- 5. CONSULTAS MULTI TABLA (JOINs) -------------------------- */
/* ************************************************************************************* */

-- ===================================================================================== --
--  ------------------------ 01. CONSULTA USUARIOS Y SUS ROLES ------------------------- --
-- ===================================================================================== --
-- Ver todos los usuarios con su rol
SELECT u.id_usuario, u.nombre_usuario, u.rol
FROM Usuarios u;


-- ===================================================================================== --
--  ----------------------- 02. CONSULTA USUARIOS Y ANIMALES --------------------------- --
-- ===================================================================================== --
-- Ver todos los animales con el usuario responsable (quien reportó o gestiona)
SELECT a.id_animal, a.nombre AS animal, a.especie, u.nombre_usuario AS responsable
FROM Animal a
JOIN Usuarios u ON a.id_usuario = u.id_usuario;


-- ===================================================================================== --
--  -------------------------- 03. CONSULTA USUARIOS Y RESCATES ------------------------ --
-- ===================================================================================== --
-- Ver rescates realizados por usuarios
SELECT r.id_rescate, u.nombre_usuario, r.descripcion, r.estado, r.fecha_reporte
FROM Rescate r
JOIN Usuarios u ON r.id_usuario = u.id_usuario;


-- ===================================================================================== --
--  --------------------------- 04. CONSULTA ANIMALES Y RESCATES ----------------------- --
-- ===================================================================================== --
-- Ver qué animal corresponde a qué rescate
SELECT a.nombre AS animal, r.descripcion AS reporte, r.estado
FROM Rescate r
JOIN Animal a ON a.id_rescate = r.id_rescate;


-- ===================================================================================== --
--  ------------------------- 05. CONSULTA USUARIOS Y DONACIONES ----------------------- --
-- ===================================================================================== --
-- Ver donaciones hechas por usuarios donantes
SELECT d.id_donacion, u.nombre_usuario, d.titulo, d.monto, d.fecha
FROM Donacion d
JOIN Usuarios u ON d.id_usuario = u.id_usuario;


-- ===================================================================================== --
--  --------------------- 06. CONSULTA USUARIOS Y TICKETS DE SOPORTE ------------------- --
-- ===================================================================================== --
-- Ver tickets de soporte con usuario que los creó
SELECT t.id_ticket, u.nombre_usuario, t.titulo, t.estado
FROM Ticket_soporte t
JOIN Usuarios u ON t.id_usuario = u.id_usuario;


-- ===================================================================================== --
--  ------------ 07. CONSULTA USUARIOS, ANIMALES Y SOLICITUDES DE ADOPCIÓN ------------- --
-- ===================================================================================== --
-- Ver quién quiere adoptar qué animal
SELECT s.id_solicitud, u.nombre_usuario, a.nombre AS animal, s.fecha_solicitud, s.estado
FROM Solicitud_adopcion s
JOIN Usuarios u ON s.id_usuario = u.id_usuario
JOIN Animal a ON s.id_animal = a.id_animal;


-- ===================================================================================== --
--  -------------------------- 08. CONSULTA USUARIOS Y EVENTOS ------------------------- --
-- ===================================================================================== --
-- Ver eventos organizados por cada usuario (administrador o voluntario)
SELECT e.id_evento, e.titulo, e.fecha_evento, u.nombre_usuario AS organizador
FROM Evento e
JOIN Usuarios u ON e.id_usuario = u.id_usuario;


-- ===================================================================================== --
--  ---------------- 09. CONSULTA EVENTOS Y POSTULACIÓN DE VOLUNTARIOS ----------------- --
-- ===================================================================================== --
-- Ver voluntarios postulados en eventos
SELECT p.id_postulacion, u.nombre_usuario, e.titulo AS evento, p.estado
FROM Postulacion_voluntario p
JOIN Usuarios u ON p.id_usuario = u.id_usuario
JOIN Evento e ON p.id_evento = e.id_evento;


-- ===================================================================================== --
--  --------------------- 10. CONSULTA CAMPAÑAS, DONACIONES Y USUARIOS ----------------- --
-- ===================================================================================== --
-- Ver campañas con su donación asociada y el usuario que la gestiona
SELECT c.id_capaña, c.titulo AS campaña, d.titulo AS donacion, d.monto, c.estado, u.nombre_usuario
FROM `Campaña` c
JOIN Donacion d ON c.id_donacion = d.id_donacion
JOIN Usuarios u ON c.id_usuario = u.id_usuario;
