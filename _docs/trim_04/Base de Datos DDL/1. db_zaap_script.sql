/* ************************************************************************************* */
/* ---------------------------- 1. BASE DE DATOS: db_zaap` ----------------------------- */
/* ************************************************************************************* */

-- -----------------------------------------------------
-- Base de datos: db_zaap`
-- -----------------------------------------------------
SHOW DATABASES;
DROP DATABASE IF EXISTS db_zaap;
CREATE DATABASE db_zaap;
USE db_zaap;

-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Usuarios (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre_usuario` VARCHAR(100),
  `correo` VARCHAR(100) NOT NULL,
  `contraseña` VARCHAR(100) NOT NULL,
  `rol` ENUM('Administrador', 'Fundación', 'Voluntario', 'Donante', 'Ciudadano') NOT NULL,
  `fecha_registro` DATE NOT NULL,
  `estado` TINYINT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Fundación`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Fundación` (
  `id_fundacion` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `nombre_fundacion` VARCHAR(100) NOT NULL,
  `ubicacion` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(200) NOT NULL,
  `contacto` VARCHAR(50) NOT NULL,
  `redes_sociales` VARCHAR(200) NULL,
  `estado_validacion` TINYINT NOT NULL,
  PRIMARY KEY (`id_fundacion`),
  UNIQUE INDEX `id_fundación_UNIQUE` (`id_fundacion` ASC),
  INDEX `fk_fundacion_usuario_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_fundacion_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Animal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Animal` (
  `id_animal` INT NOT NULL AUTO_INCREMENT,
  `id_fundacion` INT NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `especie` VARCHAR(45) NOT NULL,
  `edad_aprox` VARCHAR(10) NULL,
  `estado_medico` VARCHAR(500) NULL,
  `descripcion` VARCHAR(200) NULL,
  `ubicacion` VARCHAR(100) NOT NULL,
  `fotos` VARCHAR(100) NOT NULL,
  `estado` ENUM('disponible', 'adoptado', 'en_tratamiento', 'fallecido') NOT NULL,
  PRIMARY KEY (`id_animal`),
  UNIQUE INDEX `id_animal_UNIQUE` (`id_animal` ASC),
  INDEX `fk_animal_fundacion_idx` (`id_fundacion` ASC),
  CONSTRAINT `fk_animal_fundacion`
    FOREIGN KEY (`id_fundacion`)
    REFERENCES `Fundación` (`id_fundacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Rescate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rescate` (
  `id_rescate` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_animal` INT NOT NULL,
  `descripcion` VARCHAR(200) NOT NULL,
  `foto` VARCHAR(200) NOT NULL,
  `ubicacion` VARCHAR(200) NOT NULL,
  `fecha_reporte` DATE NOT NULL,
  `estado` ENUM('pendiente', 'en proceso', 'finalizado') NOT NULL,
  PRIMARY KEY (`id_rescate`),
  UNIQUE INDEX `id_rescate_UNIQUE` (`id_rescate` ASC),
  INDEX `fk_rescate_usuarios_idx` (`id_usuario` ASC),
  INDEX `fk_rescate_animal_idx` (`id_animal` ASC),
  UNIQUE INDEX `idx_unique_animal` USING BTREE (`id_animal`),
  CONSTRAINT `fk_rescate_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_rescate_animal`
    FOREIGN KEY (`id_animal`)
    REFERENCES `Animal` (`id_animal`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Donación`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Donación` (
  `id_donacion` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `monto` DECIMAL NOT NULL,
  `comprobante` VARCHAR(50) NOT NULL,
  `seguimiento` VARCHAR(100) NOT NULL,
  `fecha` DATE NOT NULL,
  PRIMARY KEY (`id_donacion`),
  UNIQUE INDEX `id_donacion_UNIQUE` (`id_donacion` ASC),
  INDEX `fk_donacion_usuario_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_donacion_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Ticket soporte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ticket soporte` (
  `id_ticket` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_fundacion` INT NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(200) NOT NULL,
  `archivo_adj` VARCHAR(200) NULL,
  `fecha_envio` DATE NOT NULL,
  `respuesta_admin` VARCHAR(200) NULL,
  `estado` ENUM('abierto', 'cerrado', 'pendiente') NOT NULL,
  PRIMARY KEY (`id_ticket`),
  UNIQUE INDEX `idTicket soporte_UNIQUE` (`id_ticket` ASC),
  INDEX `fk_ticket_usuarios_idx` (`id_usuario` ASC),
  INDEX `fk_ticket_fundacion_idx` (`id_fundacion` ASC),
  CONSTRAINT `fk_ticket_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_fundacion`
    FOREIGN KEY (`id_fundacion`)
    REFERENCES `Fundación` (`id_fundacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Solicitud adopción`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Solicitud adopción` (
  `id_solicitud` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_animal` INT NOT NULL,
  `fecha_solicitud` DATE NOT NULL,
  `mensaje` VARCHAR(200) NULL,
  `estado` ENUM('aprobado', 'pendiente', 'rechazado') NOT NULL,
  PRIMARY KEY (`id_solicitud`),
  UNIQUE INDEX `idSolicitud adopción_UNIQUE` (`id_solicitud` ASC),
  INDEX `fk_solicitud_usuario_idx` (`id_usuario` ASC),
  INDEX `fk_solicitud_animal_idx` (`id_animal` ASC),
  CONSTRAINT `fk_solicitud_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_solicitud_animal`
    FOREIGN KEY (`id_animal`)
    REFERENCES `Animal` (`id_animal`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Evento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Evento` (
  `id_evento` INT NOT NULL AUTO_INCREMENT,
  `id_fundacion` INT NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `fecha_evento` DATE NOT NULL,
  `ubicacion` VARCHAR(100) NOT NULL,
  `tipo` VARCHAR(45) NULL,
  `estado` TINYINT NOT NULL,
  PRIMARY KEY (`id_evento`),
  UNIQUE INDEX `id_evento_UNIQUE` (`id_evento` ASC),
  INDEX `fk_evento_fundacion_idx` (`id_fundacion` ASC),
  CONSTRAINT `fk_evento_fundacion`
    FOREIGN KEY (`id_fundacion`)
    REFERENCES `Fundación` (`id_fundacion`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Campaña`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Campaña` (
  `id_capaña` INT NOT NULL AUTO_INCREMENT,
  `id_fundacion` INT NOT NULL,
  `id_donacion` INT NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(200) NOT NULL,
  `categoria` VARCHAR(50) NULL,
  `meta` DECIMAL NULL,
  `imagen` INT NULL,
  `fecha_inicio` DATE NOT NULL,
  `fecha_fin` DATE NOT NULL,
  `estado` ENUM('activa', 'inactiva', 'finalizada') NOT NULL,
  PRIMARY KEY (`id_capaña`),
  UNIQUE INDEX `id_capaña_UNIQUE` (`id_capaña` ASC),
  INDEX `fk_campaña_fundacion_idx` (`id_fundacion` ASC),
  INDEX `fk_campaña_donacion_idx` (`id_donacion` ASC),
  CONSTRAINT `fk_campaña_fundacion`
    FOREIGN KEY (`id_fundacion`)
    REFERENCES `Fundación` (`id_fundacion`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_campaña_donacion`
    FOREIGN KEY (`id_donacion`)
    REFERENCES `Donación` (`id_donacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Estructura de tabla para la tabla `Postulación voluntario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Postulación voluntario` (
  `id_postulacion` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_evento` INT NOT NULL,
  `fecha_postulacion` DATE NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  `observaciones` VARCHAR(200) NULL,
  PRIMARY KEY (`id_postulacion`),
  UNIQUE INDEX `id_postulacion_UNIQUE` (`id_postulacion` ASC),
  INDEX `fk_postulacion_usuario_idx` (`id_usuario` ASC),
  INDEX `fk_postulacion_evento_idx` (`id_evento` ASC),
  CONSTRAINT `fk_postulacion_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_postulacion_evento`
    FOREIGN KEY (`id_evento`)
    REFERENCES `Evento` (`id_evento`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

