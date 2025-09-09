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

-- Contar cuántos donantes hay
SELECT COUNT(*) AS total_donantes FROM Usuarios WHERE rol = 'Donante';


-- ===================================================================================== --
--  --------------------------- 02. CONSULTA TABLA FUNDACIÓN --------------------------- --
-- ===================================================================================== --
-- 2.1 Listar fundaciones registradas
SELECT * FROM `Fundación`;

-- 2.2 Buscar fundación por ubicación
SELECT nombre_fundacion, ubicacion FROM `Fundación` WHERE ubicacion = 'Bogotá';

-- 2.3 Ver estado de validación de cada fundación
SELECT nombre_fundacion, estado_validacion FROM `Fundación`;


-- ===================================================================================== --
--  ------------------------------ 03. CONSULTA TABLA ANIMAL --------------------------- --
-- ===================================================================================== --
-- 3.1 Listar todos los animales
SELECT * FROM Animal;

-- 3.2 Ver animales disponibles para adopción
SELECT nombre, especie, estado FROM Animal WHERE estado = 'disponible';

-- 3.3 Buscar animales que estén en tratamiento médico
SELECT nombre, estado_medico FROM Animal WHERE estado = 'en_tratamiento';

-- 3.4 Contar cuántos perros hay en la fundación
SELECT COUNT(*) AS total_perros FROM Animal WHERE especie = 'Perro';


-- ===================================================================================== --
--  ------------------------------ 04. CONSULTA TABLA RESCATE -------------------------- --
-- ===================================================================================== --
-- 4.1 Listar rescates reportados
SELECT * FROM Rescate;

-- 4.2 Ver rescates pendientes
SELECT id_rescate, descripcion, estado FROM Rescate WHERE estado = 'pendiente';

-- 4.3 Buscar rescates por ubicación
SELECT descripcion, ubicacion FROM Rescate WHERE ubicacion LIKE '%Parque%';


-- ===================================================================================== --
--  ----------------------------- 05. CONSULTA TABLA DONACIÓN -------------------------- --
-- ===================================================================================== --
-- 5.1 Listar todas las donaciones
SELECT * FROM `Donación`;

-- 5.2 Ver donaciones de un usuario específico
SELECT titulo, monto, fecha FROM `Donación` WHERE id_usuario = 4;

-- 5.3 Total donado en la plataforma
SELECT SUM(monto) AS total_donado FROM `Donación`;


-- ===================================================================================== --
--  -------------------------- 06. CONSULTA TABLA TICKET SOPORTE ----------------------- --
-- ===================================================================================== --
-- 6.1 Listar tickets abiertos
SELECT * FROM `Ticket soporte` WHERE estado = 'abierto';

-- 6.2 Ver tickets enviados por un usuario
SELECT titulo, descripcion FROM `Ticket soporte` WHERE id_usuario = 2;

-- 6.3 Contar tickets por estado
SELECT estado, COUNT(*) AS cantidad FROM `Ticket soporte` GROUP BY estado;


-- ===================================================================================== --
--  ------------------------ 07. CONSULTA TABLA SOLICITUD ADOPCIÓN --------------------- --
-- ===================================================================================== --
-- 7.1 Listar solicitudes de adopción
SELECT * FROM `Solicitud adopción`;

-- 7.2 Ver solicitudes pendientes
SELECT id_solicitud, id_usuario, id_animal FROM `Solicitud adopción` WHERE estado = 'pendiente';

-- 7.3 Contar cuántas solicitudes existen
SELECT COUNT(*) AS total_solicitudes FROM `Solicitud adopción`;


-- ===================================================================================== --
--  ------------------------------- 08. CONSULTA TABLA EVENTO -------------------------- --
-- ===================================================================================== --
-- 8.1 Listar todos los eventos
SELECT * FROM Evento;

-- 8.2 Ver eventos activos
SELECT titulo, fecha_evento, ubicacion FROM Evento WHERE estado = 1;

-- 8.3 Buscar eventos por tipo
SELECT titulo, tipo FROM Evento WHERE tipo = 'adopción';


-- ===================================================================================== --
--  ------------------------------- 09. CONSULTA TABLA CAMPAÑA ------------------------- --
-- ===================================================================================== --
-- 9.1 Listar todas las campañas
SELECT * FROM `Campaña`;

-- 9.2 Ver campañas activas
SELECT titulo, descripcion, meta FROM `Campaña` WHERE estado = 'activa';

-- 9.3 Contar campañas finalizadas
SELECT COUNT(*) AS total_finalizadas FROM `Campaña` WHERE estado = 'finalizada';


-- ===================================================================================== --
--  ---------------------- 07. CONSULTA TABLA POSTULACIÓN VOLUNTARIO ------------------- --
-- ===================================================================================== --
-- 10.1 Listar todas las postulaciones
SELECT * FROM `Postulación voluntario`;

-- 10.2 Ver postulaciones aceptadas
SELECT id_postulacion, id_usuario, estado FROM `Postulación voluntario` WHERE estado = 'aceptada';

-- 10.3 Contar voluntarios por evento
SELECT id_evento, COUNT(*) AS total_postulantes FROM `Postulación voluntario` GROUP BY id_evento;
