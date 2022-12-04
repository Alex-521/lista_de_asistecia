-- nombre de la DB 'db_gruposyclases'

-- Volcando estructura para tabla db_gruposyclases.tbl_alumnos
CREATE TABLE IF NOT EXISTS `tbl_alumnos` (
  `matricula` int(4) NOT NULL AUTO_INCREMENT,
  `grupo` int(4) DEFAULT NULL,
  `nombre` varchar(32) DEFAULT NULL,
  `apellidoP` varchar(32) DEFAULT NULL,
  `apellidoM` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`matricula`),
  KEY `FK_tbl_alumnos_tbl_grupos` (`grupo`),
  CONSTRAINT `FK_tbl_alumnos_tbl_grupos` FOREIGN KEY (`grupo`) REFERENCES `tbl_grupos` (`id_g`)
) ENGINE=InnoDB AUTO_INCREMENT=20003 DEFAULT CHARSET=latin1;
INSERT INTO `tbl_alumnos` (`matricula`, `grupo`, `nombre`, `apellidoP`, `apellidoM`) VALUES
	(20001, 1, 'juan jose de jesus', 'martinez', 'martinez'),
	(20002, 1, 'arturo', 'beltran', 'leyva');



-- Volcando estructura para tabla db_gruposyclases.tbl_clases
CREATE TABLE IF NOT EXISTS `tbl_clases` (
  `id_c` int(4) NOT NULL AUTO_INCREMENT,
  `grupo` int(4) DEFAULT NULL,
  `fecha` varchar(10) NOT NULL,
  `tema_programado` varchar(150) NOT NULL,
  `avances` varchar(150) NOT NULL,
  `comentarios` varchar(150) NOT NULL,
  PRIMARY KEY (`id_c`) USING BTREE,
  KEY `FK_tbl_clases_tbl_grupos` (`grupo`),
  CONSTRAINT `FK_tbl_clases_tbl_grupos` FOREIGN KEY (`grupo`) REFERENCES `tbl_grupos` (`id_g`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
INSERT INTO `tbl_clases` (`id_c`, `grupo`, `fecha`, `tema_programado`, `avances`, `comentarios`) VALUES
	(1, 2, '2022-10-09', 'Generar una API', 'No hubo clases', ''),
	(2, 1, '2022-10-07', 'Nose no asisti :T', 'ninguno', ''),
	(3, 1, '2022-10-10', 'Examen 1 parcial', 'Todos acabaron', '3 Alumnos copiaron'),
	(17, 10, '2022-10-10', 'Examen 1 parcial', 'nunguno', 'todos aprobaron');



-- Volcando estructura para tabla db_gruposyclases.tbl_grupos
CREATE TABLE IF NOT EXISTS `tbl_grupos` (
  `id_g` int(4) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_g`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
INSERT INTO `tbl_grupos` (`id_g`, `nombre`) VALUES
	(1, '2022-3-IDGS704'),
	(2, '2023-2-DSM91D'),
	(5, '1994-2-DSM69D'),
	(10, '2022-1-dsm5d');



-- Volcando estructura para tabla db_gruposyclases.tbl_materia
CREATE TABLE IF NOT EXISTS `tbl_materia` (
  `id_materia` int(11) NOT NULL AUTO_INCREMENT,
  `materia_nombre` varchar(64) DEFAULT NULL,
  `grupo` int(4) DEFAULT NULL,
  `maestro` int(4) DEFAULT NULL,
  `alumno` json DEFAULT NULL,
  `clasesProgramada` json DEFAULT NULL,
  `asistencia` json DEFAULT NULL,
  PRIMARY KEY (`id_materia`),
  KEY `FK_materia_grupos` (`grupo`),
  KEY `FK_materia_maesto` (`maestro`),
  CONSTRAINT `FK_materia_grupos` FOREIGN KEY (`grupo`) REFERENCES `tbl_grupos` (`id_g`),
  CONSTRAINT `FK_materia_maesto` FOREIGN KEY (`maestro`) REFERENCES `tb_empleados` (`id_NumeroEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
INSERT INTO `tbl_materia` (`id_materia`, `materia_nombre`, `grupo`, `maestro`, `alumno`, `clasesProgramada`, `asistencia`) VALUES
	(1, 'ingles 4', 1, 20002, '{"alumnos": [{"nombres": "juan jose de jesus", "apellidos": "martinez martinez", "matricula": 20001}, {"nombre": "arturo", "apellidos": "beltran leyva", "matricula": 20002}]}', '{"Clases": ["2022-10-03", "2022-10-07", "2022-10-07"]}', '{"20001": ["A", "F"], "20002": ["A", "R"]}'),
	(2, 'arquitectura de software', 1, 20001, '{"alumnos": [{"nombres": "juan jose de jesus", "apellidos": "martinez martinez", "matricula": 20001}, {"nombre": "arturo", "apellidos": "beltran leyva", "matricula": 20002}]}', '{"Clases": ["2022-10-03", "2022-10-07", "2022-10-07"]}', '{"20001": ["A", "F"], "20002": ["A", "R"]}');



-- Volcando estructura para tabla db_gruposyclases.tb_empleados
CREATE TABLE IF NOT EXISTS `tb_empleados` (
  `id_NumeroEmpleado` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(32) DEFAULT NULL,
  `apellidoP` varchar(32) DEFAULT NULL,
  `apellidoM` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id_NumeroEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=20003 DEFAULT CHARSET=latin1;
INSERT INTO `tb_empleados` (`id_NumeroEmpleado`, `nombre`, `apellidoP`, `apellidoM`) VALUES
	(20001, 'jorge armando', 'morales', 'vargas'),
	(20002, 'juan jose', 'lopez', 'martinez');

