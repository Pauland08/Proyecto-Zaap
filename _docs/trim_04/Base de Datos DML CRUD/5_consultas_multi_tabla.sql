/* ************************************************************************************* */
/* ------------------------- 5. CONSULTAS MULTI TABLA (JOINs) -------------------------- */
/* ************************************************************************************* */

-- ===================================================================================== --
--  ------------------------ 01. CONSULTA USUARIOS Y FUNDACIONES ----------------------- --
-- ===================================================================================== --
-- Ver usuarios que son fundaciones con su información
SELECT u.id_usuario, u.nombre_usuario, f.nombre_fundacion, f.ubicacion
FROM Usuarios u
JOIN Fundación f ON u.id_usuario = f.id_usuario;


-- ===================================================================================== --
--  ----------------------- 02. CONSULTA FUNDACCIONES Y ANIMALES ----------------------- --
-- ===================================================================================== --
-- Ver todos los animales con la fundación a la que pertenecen
SELECT a.id_animal, a.nombre AS animal, a.especie, f.nombre_fundacion
FROM Animal a
JOIN Fundación f ON a.id_fundacion = f.id_fundacion;


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
-- Ver qué animal está en qué rescate
SELECT a.nombre AS animal, r.descripcion AS reporte, r.estado
FROM Rescate r
JOIN Animal a ON r.id_animal = a.id_animal;


-- ===================================================================================== --
--  ------------------------- 05. CONSULTA USUARIOS Y DONACIONES ----------------------- --
-- ===================================================================================== --
-- Ver donaciones hechas por usuarios donantes
SELECT d.id_donacion, u.nombre_usuario, d.titulo, d.monto, d.fecha
FROM Donación d
JOIN Usuarios u ON d.id_usuario = u.id_usuario;


-- ===================================================================================== --
--  -------------- 06. CONSULTA USUARIOS, FUNDACIONES Y TICKETS DE SOPORTE ------------- --
-- ===================================================================================== --
-- Ver tickets de soporte con usuario que lo creó y la fundación
SELECT t.id_ticket, u.nombre_usuario, f.nombre_fundacion, t.titulo, t.estado
FROM `Ticket soporte` t
JOIN Usuarios u ON t.id_usuario = u.id_usuario
JOIN Fundación f ON t.id_fundacion = f.id_fundacion;


-- ===================================================================================== --
--  ------------ 07. CONSULTA USUARIOS, ANIMALES Y SOLICITUDES DE ADOPCIÓN ------------- --
-- ===================================================================================== --
-- Ver quién quiere adoptar qué animal
SELECT s.id_solicitud, u.nombre_usuario, a.nombre AS animal, s.fecha_solicitud, s.estado
FROM `Solicitud adopción` s
JOIN Usuarios u ON s.id_usuario = u.id_usuario
JOIN Animal a ON s.id_animal = a.id_animal;


-- ===================================================================================== --
--  -------------------------- 08. CONSULTA FUNDACIONES Y EVENTOS ---------------------- --
-- ===================================================================================== --
-- Ver eventos organizados por cada fundación
SELECT e.id_evento, e.titulo, e.fecha_evento, f.nombre_fundacion
FROM Evento e
JOIN Fundación f ON e.id_fundacion = f.id_fundacion;


-- ===================================================================================== --
--  ---------------- 09. CONSULTA EVENTOS Y POSTULACIÓN DE VOLUNTARIOS ----------------- --
-- ===================================================================================== --
-- Ver voluntarios postulados en eventos
SELECT p.id_postulacion, u.nombre_usuario, e.titulo AS evento, p.estado
FROM `Postulación voluntario` p
JOIN Usuarios u ON p.id_usuario = u.id_usuario
JOIN Evento e ON p.id_evento = e.id_evento;


-- ===================================================================================== --
--  ---------------- 10. CONSULTA TABLA FUNDACIONES, DONACIONES Y CAMPAÑAS ------------- --
-- ===================================================================================== --
-- Ver campañas de fundaciones con sus donaciones
SELECT c.id_capaña, c.titulo AS campaña, f.nombre_fundacion, d.titulo AS donacion, d.monto, c.estado
FROM Campaña c
JOIN Fundación f ON c.id_fundacion = f.id_fundacion
JOIN Donación d ON c.id_donacion = d.id_donacion;
