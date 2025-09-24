/* ************************************************************************************* */
/* -------------------------------- 2. SENTENCIAS DDL ---------------------------------- */
/* ************************************************************************************* */


-- ===================================================================================== --
-- 01. Mostrar BBDDs ------------------------------------------------------------------- --
-- ===================================================================================== --
SHOW DATABASES;

-- ===================================================================================== --
-- 02. Eliminar BBDD si existe y crear de nuevo ---------------------------------------- --
-- ===================================================================================== --
DROP DATABASE IF EXISTS db_zaap;
CREATE DATABASE db_zaap DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_zaap;

-- ===================================================================================== --
-- 03. Mostrar Tablas ------------------------------------------------------------------ --
-- ===================================================================================== --
SHOW TABLES;

-- ===================================================================================== --
-- 04. Mostrar Columnas ---------------------------------------------------------------- --
-- ===================================================================================== --
SHOW COLUMNS FROM Usuarios;
DESCRIBE `Usuarios`;
DESCRIBE `Animal`;
DESCRIBE `Rescate`;
DESCRIBE `Donacion`;
DESCRIBE `Ticket_soporte`;
DESCRIBE `Solicitud_adopcion`;
DESCRIBE `Evento`;
DESCRIBE `Campania`;
DESCRIBE `Postulacion_voluntario`;

-- ===================================================================================== --
-- 05. Agregar Columna ----------------------------------------------------------------- --
-- ===================================================================================== --
ALTER TABLE `Evento` ADD descripcion VARCHAR(200);

-- ===================================================================================== --
-- 06. Renombrar Columna --------------------------------------------------------------- --
-- ===================================================================================== --
ALTER TABLE `Ticket_soporte` CHANGE `descripcion` `mensaje` VARCHAR(200);

-- ===================================================================================== --
-- 07. Eliminar Columna ---------------------------------------------------------------- --
-- ===================================================================================== --
ALTER TABLE `Solicitud_adopcion` DROP `mensaje`;

-- ===================================================================================== --
-- 08. Agregar Valor por Defecto ------------------------------------------------------- --
-- ===================================================================================== --
ALTER TABLE `Animal` ALTER COLUMN especie SET DEFAULT 'Golden';

-- ===================================================================================== --
-- 09. Eliminar Valor por Defecto ------------------------------------------------------ --
-- ===================================================================================== --
ALTER TABLE `Animal` ALTER COLUMN especie DROP DEFAULT;

-- ===================================================================================== --
-- 10. Mostrar Creación de Tablas ------------------------------------------------------ --
-- ===================================================================================== --
SHOW CREATE TABLE `Usuarios`;
SHOW CREATE TABLE `Animal`;
SHOW CREATE TABLE `Rescate`;
SHOW CREATE TABLE `Donacion`;
SHOW CREATE TABLE `Ticket_soporte`;
SHOW CREATE TABLE `Solicitud_adopcion`;
SHOW CREATE TABLE `Evento`;
SHOW CREATE TABLE `Campania`;
SHOW CREATE TABLE `Postulacion_voluntario`;

-- ===================================================================================== --
-- 11. Eliminar Restricción ------------------------------------------------------------ --
-- ===================================================================================== --
-- (Se eliminó Fundación, así que este ejemplo ya no aplica)
-- Ejemplo alternativo: eliminar restricción de Rescate
ALTER TABLE `Rescate` DROP FOREIGN KEY `fk_rescate_usuarios`;

-- ===================================================================================== --
-- 12. Eliminar Índice ----------------------------------------------------------------- --
-- ===================================================================================== --
ALTER TABLE `Usuarios` DROP INDEX `correo_UNIQUE`;

-- ===================================================================================== --
-- 13. Eliminar Llave Primaria --------------------------------------------------------- --
-- ===================================================================================== --
-- Ejemplo con tabla temporal que está en 16. Crear nueva tabla
ALTER TABLE `Donante_temporal` DROP PRIMARY KEY;

-- ===================================================================================== --
-- 14. Limpiar Registros --------------------------------------------------------------- --
-- ===================================================================================== --
TRUNCATE `Postulacion_voluntario`;

-- ===================================================================================== --
-- 15. Eliminar Tabla ------------------------------------------------------------------ --
-- ===================================================================================== --
DROP TABLE `Donante_temporal`;

-- ===================================================================================== --
-- 16. Crear Nueva Tabla --------------------------------------------------------------- --
-- ===================================================================================== --
CREATE TABLE `Donante_temporal` (
  `id_donante_t` INT NOT NULL,
  `nombre` VARCHAR(100),
  PRIMARY KEY (`id_donante_t`)
) ENGINE = InnoDB;

-- ===================================================================================== --
-- 17. Renombrar Tabla ----------------------------------------------------------------- --
-- ===================================================================================== --
RENAME TABLE `Donante_temporal` TO `Donantes_temporales`;

-- ===================================================================================== --
-- 18. Crear Llave Primaria ------------------------------------------------------------ --
-- ===================================================================================== --
ALTER TABLE `Donantes_temporales` ADD PRIMARY KEY (`id_donante_t`);

-- ===================================================================================== --
-- 19. Crear Índices ------------------------------------------------------------------- --
-- ===================================================================================== --
-- Índice simple
CREATE INDEX `idx_animal_estado` ON `Animal` (`estado`);

-- Índice compuesto
CREATE INDEX `idx_animal_ubicacion_especie` ON `Animal` (`ubicacion`, `especie`);

-- Índice único
CREATE UNIQUE INDEX `idx_unique_nombre_usuario` ON `Usuarios` (`nombre_usuario`);

-- ===================================================================================== --
-- 20. Crear Restricción --------------------------------------------------------------- --
-- ===================================================================================== --
ALTER TABLE `Donantes_temporales` ADD COLUMN `id_usuario` INT NOT NULL;

ALTER TABLE `Donantes_temporales`
ADD CONSTRAINT `fk_donante_temporal_usuario`
FOREIGN KEY (`id_usuario`)
REFERENCES `Usuarios` (`id_usuario`)
ON DELETE CASCADE
ON UPDATE CASCADE;

/* ************************************************************************************* */
/* -------------------------------- 2. PROCEDMIENTOS ----------------------------------- */
/* ************************************************************************************* */

-- 2.1 Procedimiento para registrar una donación
DELIMITER //
CREATE PROCEDURE RegistrarDonacion(
    IN p_id_usuario INT,
    IN p_titulo VARCHAR(50),
    IN p_monto DECIMAL(10,2),
    IN p_comprobante VARCHAR(100),
    IN p_seguimiento VARCHAR(200),
    IN p_fecha DATE
)
BEGIN
    INSERT INTO Donacion (id_usuario, titulo, monto, comprobante, seguimiento, fecha)
    VALUES (p_id_usuario, p_titulo, p_monto, p_comprobante, p_seguimiento, p_fecha);
END //
DELIMITER ;


-- Ejecución del procedimiento para registrar una donación
CALL RegistrarDonacion(3, 'Donación test', 250000, 'comp999.jpg', 'Entregado a refugio', '2025-09-24');


-- 2.2 Procedimiento para actualizar estado de un animal
DELIMITER //
CREATE PROCEDURE ActualizarEstadoAnimal(
    IN p_id_animal INT,
    IN p_estado VARCHAR(20)
)
BEGIN
    UPDATE Animal
    SET estado = p_estado
    WHERE id_animal = p_id_animal;
END //
DELIMITER ;

-- Ejecución del procedimiento para actualizar estado de un animal
CALL ActualizarEstadoAnimal(201, 'adoptado');

/* ********************************************************************************************* */
/* ------------------------------------ 3. TRIGGERS --------------------------------------- */
/* ********************************************************************************************* */

-- 3.1 Cuando se aprueba una solicitud de adopción, cambiar estado del animal a "adoptado"
DELIMITER //
CREATE TRIGGER trg_actualizar_estado_animal
AFTER UPDATE ON Solicitud_adopcion
FOR EACH ROW
BEGIN
    IF NEW.estado = 'aprobado' THEN
        UPDATE Animal
        SET estado = 'adoptado'
        WHERE id_animal = NEW.id_animal;
    END IF;
END //
DELIMITER ;

-- 3.2 Registrar automáticamente un ticket de soporte cuando se crea un usuario "Ciudadano"
DELIMITER //
CREATE TRIGGER trg_ticket_nuevo_usuario
AFTER INSERT ON Usuarios
FOR EACH ROW
BEGIN
    IF NEW.rol = 'Ciudadano' THEN
        INSERT INTO Ticket_soporte (id_usuario, titulo, mensaje, fecha_envio, estado)
        VALUES (NEW.id_usuario, 'Bienvenida', 'Gracias por registrarte en la plataforma.', CURDATE(), 'abierto');
    END IF;
END //
DELIMITER ;

