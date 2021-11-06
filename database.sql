-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.27 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE `desafio`;

USE desafio;

-- Dumping structure for table desafio.file_uploader
CREATE TABLE IF NOT EXISTS `file_uploader` (
  `pk_file_uploader` bigint NOT NULL AUTO_INCREMENT,
  `fk_file_uploader_origin` bigint NOT NULL,
  `st_body` longtext,
  `fl_executed` bit(1) DEFAULT NULL,
  PRIMARY KEY (`pk_file_uploader`),
  KEY `fk_file_uploader_origin` (`fk_file_uploader_origin`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table desafio.file_uploader: ~33 rows (approximately)
/*!40000 ALTER TABLE `file_uploader` DISABLE KEYS */;
INSERT INTO `file_uploader` (`pk_file_uploader`, `fk_file_uploader_origin`, `st_body`, `fl_executed`) VALUES
	(1, 1, '3201903010000012200845152540736777****1313172712MARCOS PEREIRAMERCADO DA AVENIDA', b'0');
/*!40000 ALTER TABLE `file_uploader` ENABLE KEYS */;

-- Dumping structure for table desafio.file_uploader_origin
CREATE TABLE IF NOT EXISTS `file_uploader_origin` (
  `pk_file_uploader_origin` bigint unsigned NOT NULL AUTO_INCREMENT,
  `st_file_uploader_origin` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`pk_file_uploader_origin`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table desafio.file_uploader_origin: ~0 rows (approximately)
/*!40000 ALTER TABLE `file_uploader_origin` DISABLE KEYS */;
INSERT INTO `file_uploader_origin` (`pk_file_uploader_origin`, `st_file_uploader_origin`) VALUES
	(1, 'import cnab');
/*!40000 ALTER TABLE `file_uploader_origin` ENABLE KEYS */;

-- Dumping structure for table desafio.mov_cnab
CREATE TABLE IF NOT EXISTS `mov_cnab` (
  `pk_mov_cnab` bigint unsigned NOT NULL AUTO_INCREMENT,
  `fk_mov_cnab_type` bigint unsigned NOT NULL,
  `n_value` int NOT NULL DEFAULT '0',
  `n_cpf` bigint NOT NULL DEFAULT '0',
  `st_card` char(255) NOT NULL DEFAULT '',
  `dt_data` datetime NOT NULL,
  `st_store_owner` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `st_store_name` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`pk_mov_cnab`),
  KEY `fk_mov_cnab_type` (`fk_mov_cnab_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table desafio.mov_cnab: ~65 rows (approximately)
/*!40000 ALTER TABLE `mov_cnab` DISABLE KEYS */;
/*!40000 ALTER TABLE `mov_cnab` ENABLE KEYS */;

-- Dumping structure for table desafio.mov_cnab_type
CREATE TABLE IF NOT EXISTS `mov_cnab_type` (
  `pk_mov_cnab_type` bigint unsigned NOT NULL AUTO_INCREMENT,
  `st_mov_cnab_type` char(255) NOT NULL DEFAULT '',
  `n_type` int NOT NULL,
  `st_category` char(255) NOT NULL DEFAULT '',
  `st_signal` char(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`pk_mov_cnab_type`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table desafio.mov_cnab_type: ~9 rows (approximately)
/*!40000 ALTER TABLE `mov_cnab_type` DISABLE KEYS */;
INSERT INTO `mov_cnab_type` (`pk_mov_cnab_type`, `st_mov_cnab_type`, `n_type`, `st_category`, `st_signal`) VALUES
	(1, 'Débito', 1, 'Entrada', '+'),
	(2, 'Boleto', 2, 'Saída', '-'),
	(3, 'Financiamento', 3, 'Saída', '-'),
	(4, 'Crédito', 4, 'Entrada', '+'),
	(5, 'Recebimento Empréstimo	', 5, 'Entrada', '+'),
	(6, 'Vendas', 6, 'Entrada', '+'),
	(7, '	Recebimento TED', 7, 'Entrada', '+'),
	(8, 'Recebimento DOC	', 8, 'Entrada', '+'),
	(9, 'Aluguel', 9, 'Saída', '-');
/*!40000 ALTER TABLE `mov_cnab_type` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
