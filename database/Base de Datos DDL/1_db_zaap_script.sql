/* ************************************************************************************* */
/* ---------------------------- 1. BASE DE DATOS: db_zaap` ----------------------------- */
/* ************************************************************************************* */


-- -----------------------------------------------------
-- Base de datos: db_zaap`
-- -----------------------------------------------------
-- DROP SCHEMA IF EXISTS `db_zaap` ;

-- -----------------------------------------------------
-- Schema db_zaap
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_zaap` DEFAULT CHARACTER SET utf8 ;
USE `db_zaap` ;

-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_zaap`.`Usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre_usuario` VARCHAR(100) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `rol` ENUM('Administrador', 'Fundacion', 'Voluntario', 'Donante', 'Ciudadano'),
  `fecha_registro` DATE NOT NULL,
  `estado` TINYINT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC)
  ) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Rescate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_zaap`.`Rescate` (
  `id_rescate` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `descripcion` VARCHAR(200) NOT NULL,
  `foto` VARCHAR(200) NOT NULL,
  `ubicacion` VARCHAR(200) NOT NULL,
  `fecha_reporte` DATE NOT NULL,
  `estado` ENUM('pendiente', 'en proceso', 'finalizado') NOT NULL,
  PRIMARY KEY (`id_rescate`),
  INDEX `fk_rescate_usuarios_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_rescate_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `db_zaap`.`Usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Animal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_zaap`.`Animal` (
  `id_animal` INT NOT NULL AUTO_INCREMENT,
  `id_rescate` INT NULL,
  `id_usuario` INT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `especie` VARCHAR(45) NOT NULL,
  `edad_aprox` VARCHAR(10) NULL,
  `estado_medico` VARCHAR(500) NULL,
  `descripcion` VARCHAR(200) NULL,
  `ubicacion` VARCHAR(100) NOT NULL,
  `fotos` VARCHAR(250) NOT NULL,
  `estado` ENUM('disponible', 'adoptado', 'en_tratamiento', 'fallecido') NOT NULL DEFAULT 'disponible',
  PRIMARY KEY (`id_animal`),
  INDEX `fk_animal_rescate_idx` (`id_rescate` ASC),
  CONSTRAINT `fk_animal_rescate`
    FOREIGN KEY (`id_rescate`)
    REFERENCES `db_zaap`.`Rescate` (`id_rescate`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_animal_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `db_zaap`.`Usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Donación`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_zaap`.`Donacion` (
  `id_donacion` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `titulo` VARCHAR(50) NOT NULL,
  `monto` DECIMAL NOT NULL,
  `comprobante` VARCHAR(100) NOT NULL,
  `seguimiento` VARCHAR(200) NOT NULL,
  `fecha` DATE NOT NULL,
  PRIMARY KEY (`id_donacion`),
  INDEX `fk_donacion_usuario_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_donacion_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `db_zaap`.`Usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Ticket soporte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_zaap`.`Ticket_soporte` (
  `id_ticket` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `mensaje` VARCHAR(200) NOT NULL,
  `archivo_adj` VARCHAR(200) NULL,
  `fecha_envio` DATE NOT NULL,
  `respuesta_admin` VARCHAR(200) NULL,
  `estado` ENUM('abierto', 'cerrado', 'pendiente') NOT NULL,
  PRIMARY KEY (`id_ticket`),
  INDEX `fk_ticket_usuarios_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_ticket_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `db_zaap`.`Usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `Solicitud adopción`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_zaap`.`Solicitud_adopcion` (
  `id_solicitud` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_animal` INT NOT NULL,
  `fecha_solicitud` DATE NOT NULL,
  `mensaje` VARCHAR(200) NULL,
  `estado` ENUM('aprobado', 'pendiente', 'rechazado') NOT NULL,
  PRIMARY KEY (`id_solicitud`),
  INDEX `fk_solicitud_usuario_idx` (`id_usuario` ASC),
  INDEX `fk_solicitud_animal_idx` (`id_animal` ASC),
  CONSTRAINT `fk_solicitud_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `db_zaap`.`Usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_solicitud_animal`
    FOREIGN KEY (`id_animal`)
    REFERENCES `db_zaap`.`Animal` (`id_animal`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Evento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_zaap`.`Evento` (
  `id_evento` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `fecha_evento` DATE NOT NULL,
  `ubicacion` VARCHAR(100) NOT NULL,
  `tipo` VARCHAR(45) NULL,
  `estado` TINYINT NOT NULL,
  PRIMARY KEY (`id_evento`),
  CONSTRAINT `fk_evento_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `db_zaap`.`Usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- --------------------------------------------------------
-- Estructura de tabla para la tabla `Campaña` (Campania)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_zaap`.`Campania` (
  `id_campania` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_donacion` INT NOT NULL,
  `titulo` VARCHAR(50) NOT NULL,
  `descripcion` VARCHAR(200) NOT NULL,
  `categoria` VARCHAR(50) NULL,
  `meta` DECIMAL NULL,
  `imagen` VARCHAR(200) NULL NULL,
  `fecha_inicio` DATE NOT NULL,
  `fecha_fin` DATE NOT NULL,
  `estado` ENUM('activa', 'inactiva', 'finalizada') NOT NULL,
  PRIMARY KEY (`id_campania`),
  INDEX `fk_campaña_donacion_idx` (`id_donacion` ASC),
  CONSTRAINT `fk_campaña_donacion`
    FOREIGN KEY (`id_donacion`)
    REFERENCES `db_zaap`.`Donacion` (`id_donacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_campaña_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `db_zaap`.`Usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -------------------------------------------------------------
-- Estructura de tabla para la tabla `Postulación voluntario`
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_zaap`.`Postulacion_voluntario` (
  `id_postulacion` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_evento` INT NOT NULL,
  `fecha_postulacion` DATE NOT NULL,
  `estado` ENUM('aceptada', 'pendiente', 'rechazada') NOT NULL,
  `observaciones` VARCHAR(200) NULL,
  PRIMARY KEY (`id_postulacion`),
  INDEX `fk_postulacion_usuario_idx` (`id_usuario` ASC),
  INDEX `fk_postulacion_evento_idx` (`id_evento` ASC),
  CONSTRAINT `fk_postulacion_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `db_zaap`.`Usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_postulacion_evento`
    FOREIGN KEY (`id_evento`)
    REFERENCES `db_zaap`.`Evento` (`id_evento`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------------
-- Estructura de tabla para la tabla `Reporte estadístico`
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_zaap`.`Reporte_estadistico` (
  `id_reporte` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `tipo_reporte` VARCHAR(50) NOT NULL,
  `fecha_reporte` DATE NOT NULL,
  `total_registros` INT NOT NULL,
  `total_dinero` DECIMAL NOT NULL,
  `tabulacion` JSON NOT NULL,
  PRIMARY KEY (`id_reporte`),
  CONSTRAINT `fk_reporte_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `db_zaap`.`Usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;