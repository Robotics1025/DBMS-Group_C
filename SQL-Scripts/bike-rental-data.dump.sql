<<<<<<< HEAD
/*
 Navicat Premium Dump SQL

 Source Server         : WAMP CONNECTION INSTANCE
 Source Server Type    : MySQL
 Source Server Version : 50714 (5.7.14)
 Source Host           : localhost:3306
 Source Schema         : bike-rental

 Target Server Type    : MySQL
 Target Server Version : 50714 (5.7.14)
 File Encoding         : 65001

 Date: 23/09/2025 14:06:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bike
-- ----------------------------
DROP TABLE IF EXISTS `bike`;
CREATE TABLE `bike`  (
  `BikeID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `BikeSerialNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `Model` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `BikeType` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `CurrentStatus` enum('Available','Rented','In Maintenance') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `LastMaintenanceDate` date NULL DEFAULT NULL,
  `RentalRatePerMinute` decimal(5, 2) NOT NULL,
  `LocationID` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`BikeID`) USING BTREE,
  UNIQUE INDEX `BikeSerialNumber`(`BikeSerialNumber`) USING BTREE,
  INDEX `LocationID`(`LocationID`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bike
-- ----------------------------
INSERT INTO `bike` VALUES (1, 'BIK-001-KMP', 'Trek FX 3 Disc', 'Hybrid', 'Available', '2025-09-20', 100.00, 1);
INSERT INTO `bike` VALUES (2, 'BIK-002-KMP', 'Giant Escape 2', 'City', 'Available', '2025-09-21', 100.00, 2);
INSERT INTO `bike` VALUES (3, 'BIK-003-KMP', 'Specialized Sirrus', 'Hybrid', 'Available', '2025-09-18', 100.00, 3);
INSERT INTO `bike` VALUES (4, 'BIK-004-KMP', 'Cannondale Quick 4', 'Road', 'In Maintenance', '2025-09-15', 150.00, 4);
INSERT INTO `bike` VALUES (5, 'BIK-005-KMP', 'GT Aggressor Pro', 'Mountain', 'Available', '2025-09-19', 150.00, 5);
INSERT INTO `bike` VALUES (6, 'BIK-006-KMP', 'Raleigh Cadent 2', 'Hybrid', 'Available', '2025-09-21', 100.00, 6);
INSERT INTO `bike` VALUES (7, 'BIK-007-KMP', 'Fuji Feather', 'Fixed Gear', 'Available', '2025-09-20', 120.00, 7);
INSERT INTO `bike` VALUES (8, 'BIK-008-KMP', 'Kona Dew', 'City', 'Available', '2025-09-17', 100.00, 8);
INSERT INTO `bike` VALUES (9, 'BIK-009-KMP', 'Schwinn Airdyne', 'Exercise', 'Available', '2025-09-15', 200.00, 9);
INSERT INTO `bike` VALUES (10, 'BIK-010-KMP', 'Trek Marlin 5', 'Mountain', 'In Maintenance', '2025-09-12', 150.00, 10);
INSERT INTO `bike` VALUES (11, 'BIK-011-KMP', 'Giant Contend', 'Road', 'Available', '2025-09-21', 150.00, 11);
INSERT INTO `bike` VALUES (12, 'BIK-012-KMP', 'Specialized Rockhopper', 'Mountain', 'Available', '2025-09-20', 150.00, 12);
INSERT INTO `bike` VALUES (13, 'BIK-013-KMP', 'Cannondale Treadwell', 'Hybrid', 'Available', '2025-09-19', 100.00, 13);
INSERT INTO `bike` VALUES (14, 'BIK-014-KMP', 'GT Avalanche', 'Mountain', 'Available', '2025-09-17', 150.00, 14);
INSERT INTO `bike` VALUES (15, 'BIK-015-KMP', 'Raleigh Redux', 'City', 'In Maintenance', '2025-09-15', 100.00, 15);
INSERT INTO `bike` VALUES (16, 'BIK-016-KMP', 'Fuji Nevada', 'Mountain', 'Available', '2025-09-21', 150.00, 16);
INSERT INTO `bike` VALUES (17, 'BIK-017-KMP', 'Kona Lana\'i', 'Mountain', 'Available', '2025-09-20', 150.00, 17);
INSERT INTO `bike` VALUES (18, 'BIK-018-KMP', 'Hero Hunter', 'Hybrid', 'Available', '2025-09-18', 100.00, 18);
INSERT INTO `bike` VALUES (19, 'BIK-019-KMP', 'Trek Fuel EX 5', 'Mountain', 'Available', '2025-09-16', 200.00, 19);
INSERT INTO `bike` VALUES (20, 'BIK-020-KMP', 'Giant Talon 3', 'Mountain', 'Rented', '2025-09-21', 150.00, 20);
INSERT INTO `bike` VALUES (21, 'BIK-021-KMP', 'Specialized Fuse', 'Mountain', 'Available', '2025-09-20', 150.00, 21);
INSERT INTO `bike` VALUES (22, 'BIK-022-KMP', 'Cannondale Trail 8', 'Mountain', 'In Maintenance', '2025-09-19', 150.00, 22);
INSERT INTO `bike` VALUES (23, 'BIK-023-KMP', 'GT Verb', 'Mountain', 'Available', '2025-09-17', 150.00, 23);
INSERT INTO `bike` VALUES (24, 'BIK-024-KMP', 'Raleigh Carlton', 'Road', 'Available', '2025-09-15', 150.00, 24);
INSERT INTO `bike` VALUES (25, 'BIK-025-KMP', 'Fuji Jari', 'Gravel', 'Available', '2025-09-13', 180.00, 25);
INSERT INTO `bike` VALUES (26, 'BIK-026-KMP', 'Kona Unit', 'Mountain', 'Available', '2025-09-21', 150.00, 26);
INSERT INTO `bike` VALUES (27, 'BIK-027-KMP', 'Schwinn Phocus', 'Road', 'Available', '2025-09-20', 150.00, 27);
INSERT INTO `bike` VALUES (28, 'BIK-028-KMP', 'Trek FX 1 Disc', 'Hybrid', 'Available', '2025-09-18', 100.00, 28);
INSERT INTO `bike` VALUES (29, 'BIK-029-KMP', 'Giant Escape 3 Disc', 'City', 'In Maintenance', '2025-09-16', 100.00, 29);
INSERT INTO `bike` VALUES (30, 'BIK-030-KMP', 'Specialized Sirrus X', 'Hybrid', 'Available', '2025-09-14', 120.00, 30);
INSERT INTO `bike` VALUES (31, 'BIK-031-KMP', 'Cannondale Quick 6', 'Hybrid', 'Available', '2025-09-21', 100.00, 31);
INSERT INTO `bike` VALUES (32, 'BIK-032-KMP', 'GT Aggressor Expert', 'Mountain', 'Available', '2025-09-20', 150.00, 32);
INSERT INTO `bike` VALUES (33, 'BIK-033-KMP', 'Raleigh Cadent 3', 'Hybrid', 'Available', '2025-09-18', 100.00, 33);
INSERT INTO `bike` VALUES (34, 'BIK-034-KMP', 'Fuji Feather CX+', 'Cyclocross', 'Available', '2025-09-16', 180.00, 34);
INSERT INTO `bike` VALUES (35, 'BIK-035-KMP', 'Kona Dew Deluxe', 'City', 'Available', '2025-09-14', 120.00, 35);
INSERT INTO `bike` VALUES (36, 'BIK-036-KMP', 'Schwinn Hybrid', 'Hybrid', 'Rented', '2025-09-21', 100.00, 36);
INSERT INTO `bike` VALUES (37, 'BIK-037-KMP', 'Trek Marlin 6', 'Mountain', 'Available', '2025-09-20', 150.00, 37);
INSERT INTO `bike` VALUES (38, 'BIK-038-KMP', 'Giant Contend AR', 'Road', 'Available', '2025-09-18', 150.00, 38);
INSERT INTO `bike` VALUES (39, 'BIK-039-KMP', 'Specialized Rockhopper Sport', 'Mountain', 'Available', '2025-09-16', 150.00, 39);
INSERT INTO `bike` VALUES (40, 'BIK-040-KMP', 'Cannondale Treadwell 2', 'Hybrid', 'Rented', '2025-09-14', 100.00, 40);
INSERT INTO `bike` VALUES (41, 'BIK-041-KMP', 'GT Avalanche Comp', 'Mountain', 'Available', '2025-09-21', 150.00, 41);
INSERT INTO `bike` VALUES (42, 'BIK-042-KMP', 'Raleigh Redux 2', 'City', 'Available', '2025-09-20', 100.00, 42);
INSERT INTO `bike` VALUES (43, 'BIK-043-KMP', 'Fuji Nevada 1.9', 'Mountain', 'Available', '2025-09-18', 150.00, 43);
INSERT INTO `bike` VALUES (44, 'BIK-044-KMP', 'Kona Lana\'i', 'Mountain', 'Available', '2025-09-16', 150.00, 44);
INSERT INTO `bike` VALUES (45, 'BIK-045-KMP', 'Hero Octane 26T', 'Hybrid', 'Available', '2025-09-14', 100.00, 45);
INSERT INTO `bike` VALUES (46, 'BIK-046-KMP', 'Trek Fuel EX 8', 'Mountain', 'Available', '2025-09-21', 200.00, 46);
INSERT INTO `bike` VALUES (47, 'BIK-047-KMP', 'Giant Talon 4', 'Mountain', 'Available', '2025-09-20', 150.00, 47);
INSERT INTO `bike` VALUES (48, 'BIK-048-KMP', 'Specialized Fuse Comp', 'Mountain', 'Available', '2025-09-18', 150.00, 48);
INSERT INTO `bike` VALUES (49, 'BIK-049-KMP', 'Cannondale Trail 7', 'Mountain', 'Rented', '2025-09-16', 150.00, 49);
INSERT INTO `bike` VALUES (50, 'BIK-050-KMP', 'GT Verb Elite', 'Mountain', 'Available', '2025-09-14', 150.00, 50);
INSERT INTO `bike` VALUES (51, 'BIK-051-KMP', 'Raleigh Carlton 2', 'Road', 'Available', '2025-09-21', 150.00, 51);
INSERT INTO `bike` VALUES (52, 'BIK-052-KMP', 'Fuji Jari 1.3', 'Gravel', 'Available', '2025-09-20', 180.00, 52);
INSERT INTO `bike` VALUES (53, 'BIK-053-KMP', 'Kona Unit X', 'Mountain', 'Available', '2025-09-18', 150.00, 53);
INSERT INTO `bike` VALUES (54, 'BIK-054-KMP', 'Schwinn Phocus 1500', 'Road', 'Available', '2025-09-16', 150.00, 54);
INSERT INTO `bike` VALUES (55, 'BIK-055-KMP', 'Trek Domane AL 2', 'Road', 'Available', '2025-09-14', 150.00, 55);
INSERT INTO `bike` VALUES (56, 'BIK-056-KMP', 'Giant Escape 1', 'City', 'Available', '2025-09-21', 120.00, 56);
INSERT INTO `bike` VALUES (57, 'BIK-057-KMP', 'Specialized Sirrus 2.0', 'Hybrid', 'Available', '2025-09-20', 100.00, 57);
INSERT INTO `bike` VALUES (58, 'BIK-058-KMP', 'Cannondale Quick 5', 'Hybrid', 'Rented', '2025-09-18', 100.00, 58);
INSERT INTO `bike` VALUES (59, 'BIK-059-KMP', 'GT Aggressor Sport', 'Mountain', 'Available', '2025-09-16', 150.00, 59);
INSERT INTO `bike` VALUES (60, 'BIK-060-KMP', 'Raleigh Cadent 4', 'Hybrid', 'Available', '2025-09-14', 100.00, 60);
INSERT INTO `bike` VALUES (61, 'BIK-061-KMP', 'Fuji Feather CX', 'Cyclocross', 'Available', '2025-09-21', 180.00, 61);
INSERT INTO `bike` VALUES (62, 'BIK-062-KMP', 'Kona Dew Plus', 'City', 'Available', '2025-09-20', 120.00, 62);
INSERT INTO `bike` VALUES (63, 'BIK-063-KMP', 'Schwinn Hybrid Elite', 'Hybrid', 'Available', '2025-09-18', 120.00, 63);
INSERT INTO `bike` VALUES (64, 'BIK-064-KMP', 'Trek Marlin 7', 'Mountain', 'Available', '2025-09-16', 150.00, 64);
INSERT INTO `bike` VALUES (65, 'BIK-065-KMP', 'Giant Contend 1', 'Road', 'Available', '2025-09-14', 150.00, 65);
INSERT INTO `bike` VALUES (66, 'BIK-066-KMP', 'Hero Roadstar', 'Hybrid', 'In Maintenance', '2025-09-21', 100.00, 66);
INSERT INTO `bike` VALUES (67, 'BIK-067-KMP', 'Specialized Rockhopper Comp', 'Mountain', 'Available', '2025-09-20', 150.00, 67);
INSERT INTO `bike` VALUES (68, 'BIK-068-KMP', 'Cannondale Treadwell 3', 'Hybrid', 'Available', '2025-09-18', 100.00, 68);
INSERT INTO `bike` VALUES (69, 'BIK-069-KMP', 'GT Avalanche Elite', 'Mountain', 'Rented', '2025-09-16', 150.00, 69);
INSERT INTO `bike` VALUES (70, 'BIK-070-KMP', 'Raleigh Redux 3', 'City', 'Available', '2025-09-14', 100.00, 70);
INSERT INTO `bike` VALUES (71, 'BIK-071-KMP', 'Fuji Nevada 1.7', 'Mountain', 'Available', '2025-09-21', 150.00, 71);
INSERT INTO `bike` VALUES (72, 'BIK-072-KMP', 'Kona Mahuna', 'Mountain', 'Available', '2025-09-20', 150.00, 72);
INSERT INTO `bike` VALUES (73, 'BIK-073-KMP', 'Hero Stark', 'City', 'Available', '2025-09-18', 100.00, 73);
INSERT INTO `bike` VALUES (74, 'BIK-074-KMP', 'Trek Roscoe 6', 'Mountain', 'Available', '2025-09-16', 200.00, 74);
INSERT INTO `bike` VALUES (75, 'BIK-075-KMP', 'Giant ATX 2', 'Mountain', 'Available', '2025-09-14', 150.00, 75);
INSERT INTO `bike` VALUES (76, 'BIK-076-KMP', 'Specialized Stumpjumper', 'Mountain', 'Available', '2025-09-21', 200.00, 76);
INSERT INTO `bike` VALUES (77, 'BIK-077-KMP', 'Cannondale Scalpel HT', 'Mountain', 'Available', '2025-09-20', 200.00, 77);
INSERT INTO `bike` VALUES (78, 'BIK-078-KMP', 'GT Aggressor Pro', 'Mountain', 'Available', '2025-09-18', 150.00, 78);
INSERT INTO `bike` VALUES (79, 'BIK-079-KMP', 'Raleigh Talus', 'Hybrid', 'Rented', '2025-09-16', 100.00, 79);
INSERT INTO `bike` VALUES (80, 'BIK-080-KMP', 'Fuji Absolute', 'City', 'Available', '2025-09-14', 100.00, 80);
INSERT INTO `bike` VALUES (81, 'BIK-081-KMP', 'Kona Honzo', 'Mountain', 'Available', '2025-09-21', 200.00, 81);
INSERT INTO `bike` VALUES (82, 'BIK-082-KMP', 'Schwinn Slick', 'Fixed Gear', 'Available', '2025-09-20', 120.00, 82);
INSERT INTO `bike` VALUES (83, 'BIK-083-KMP', 'Trek Verve 1', 'Hybrid', 'Available', '2025-09-18', 100.00, 83);
INSERT INTO `bike` VALUES (84, 'BIK-084-KMP', 'Giant Escape 2', 'City', 'Available', '2025-09-16', 100.00, 84);
INSERT INTO `bike` VALUES (85, 'BIK-085-KMP', 'Specialized Sirrus X 3.0', 'Hybrid', 'Available', '2025-09-14', 120.00, 85);
INSERT INTO `bike` VALUES (86, 'BIK-086-KMP', 'Cannondale Quick 7', 'Hybrid', 'Available', '2025-09-21', 100.00, 86);
INSERT INTO `bike` VALUES (87, 'BIK-087-KMP', 'GT Aggressor Pro', 'Mountain', 'Available', '2025-09-20', 150.00, 87);
INSERT INTO `bike` VALUES (88, 'BIK-088-KMP', 'Raleigh Cadent 1', 'Hybrid', 'Available', '2025-09-18', 100.00, 88);
INSERT INTO `bike` VALUES (89, 'BIK-089-KMP', 'Fuji Feather', 'Fixed Gear', 'Rented', '2025-09-16', 120.00, 89);
INSERT INTO `bike` VALUES (90, 'BIK-090-KMP', 'Kona Dew', 'City', 'Available', '2025-09-14', 100.00, 90);
INSERT INTO `bike` VALUES (91, 'BIK-091-KMP', 'Schwinn Airdyne Pro', 'Exercise', 'Available', '2025-09-21', 200.00, 91);
INSERT INTO `bike` VALUES (92, 'BIK-092-KMP', 'Trek Marlin 8', 'Mountain', 'Available', '2025-09-20', 150.00, 92);
INSERT INTO `bike` VALUES (93, 'BIK-093-KMP', 'Giant Contend 3', 'Road', 'Available', '2025-09-18', 150.00, 93);
INSERT INTO `bike` VALUES (94, 'BIK-094-KMP', 'Hero Sprint Pro', 'Hybrid', 'Available', '2025-09-16', 100.00, 94);
INSERT INTO `bike` VALUES (95, 'BIK-095-KMP', 'Specialized Rockhopper Elite', 'Mountain', 'Available', '2025-09-14', 150.00, 95);
INSERT INTO `bike` VALUES (96, 'BIK-096-KMP', 'Cannondale Treadwell 4', 'Hybrid', 'Available', '2025-09-21', 100.00, 96);
INSERT INTO `bike` VALUES (97, 'BIK-097-KMP', 'GT Aggressor Pro', 'Mountain', 'Available', '2025-09-20', 150.00, 97);
INSERT INTO `bike` VALUES (98, 'BIK-098-KMP', 'Raleigh Cadent 1', 'Hybrid', 'Available', '2025-09-18', 100.00, 98);
INSERT INTO `bike` VALUES (99, 'BIK-099-KMP', 'Fuji Feather', 'Fixed Gear', 'Available', '2025-09-16', 120.00, 99);
INSERT INTO `bike` VALUES (100, 'BIK-100-KMP', 'Kona Dew', 'City', 'Available', '2025-09-14', 100.00, 100);

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `CustomerID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `NationalID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `FirstName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `LastName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `PhoneNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `DateOfBirth` date NULL DEFAULT NULL,
  `RegistrationDate` datetime NOT NULL,
  `Password` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`CustomerID`) USING BTREE,
  UNIQUE INDEX `NationalID`(`NationalID`) USING BTREE,
  UNIQUE INDEX `Email`(`Email`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES (1, 'CM90000101E09', 'Lwanga', 'Peter', 'lwanga.p@example.com', '256-772-101001', '1995-03-10', '2025-08-01 09:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (2, 'CM90000102E09', 'Nantume', 'Sarah', 'nantume.s@example.com', '256-772-101002', '1998-07-25', '2025-08-01 09:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (3, 'CM90000103E09', 'Ssekandi', 'Andrew', 'ssekandi.a@example.com', '256-772-101003', '1992-11-15', '2025-08-01 09:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (4, 'CM90000104E09', 'Nakalema', 'Mary', 'nakalema.m@example.com', '256-772-101004', '2000-01-05', '2025-08-01 09:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (5, 'CM90000105E09', 'Mukasa', 'Joseph', 'mukasa.j@example.com', '256-772-101005', '1990-08-20', '2025-08-01 09:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (6, 'CM90000106E09', 'Akello', 'Grace', 'akello.g@example.com', '256-772-101006', '1996-04-30', '2025-08-01 09:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (7, 'CM90000107E09', 'Ochola', 'Dennis', 'ochola.d@example.com', '256-772-101007', '1993-02-18', '2025-08-01 09:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (8, 'CM90000108E09', 'Atim', 'Brenda', 'atim.b@example.com', '256-772-101008', '1999-09-01', '2025-08-01 09:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (9, 'CM90000109E09', 'Wasswa', 'Hassan', 'wasswa.h@example.com', '256-772-101009', '1994-06-12', '2025-08-01 09:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (10, 'CM90000110E09', 'Nabatanzi', 'Esther', 'nabatanzi.e@example.com', '256-772-101010', '1997-12-28', '2025-08-01 09:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (11, 'CM90000111E09', 'Kato', 'Ronald', 'kato.r@example.com', '256-772-101011', '1991-03-03', '2025-08-02 10:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (12, 'CM90000112E09', 'Nansubuga', 'Ritah', 'nansubuga.r@example.com', '256-772-101012', '1999-05-22', '2025-08-02 10:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (13, 'CM90000113E09', 'Ssenyonga', 'Fred', 'ssenyonga.f@example.com', '256-772-101013', '1995-09-19', '2025-08-02 10:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (14, 'CM90000114E09', 'Auma', 'Joan', 'auma.j@example.com', '256-772-101014', '1998-04-11', '2025-08-02 10:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (15, 'CM90000115E09', 'Lukwago', 'David', 'lukwago.d@example.com', '256-772-101015', '1990-10-08', '2025-08-02 10:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (16, 'CM90000116E09', 'Nakato', 'Janet', 'nakato.j@example.com', '256-772-101016', '1996-01-28', '2025-08-02 10:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (17, 'CM90000117E09', 'Onyango', 'Paul', 'onyango.p@example.com', '256-772-101017', '1993-08-05', '2025-08-02 10:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (18, 'CM90000118E09', 'Nabisere', 'Catherine', 'nabisere.c@example.com', '256-772-101018', '2000-11-10', '2025-08-02 10:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (19, 'CM90000119E09', 'Ssekitoleko', 'Robert', 'ssekitoleko.r@example.com', '256-772-101019', '1994-07-20', '2025-08-02 10:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (20, 'CM90000120E09', 'Namulindwa', 'Phiona', 'namulindwa.p@example.com', '256-772-101020', '1997-02-14', '2025-08-02 10:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (21, 'CM90000121E09', 'Kyeyune', 'Mike', 'kyeyune.m@example.com', '256-772-101021', '1992-05-01', '2025-08-03 11:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (22, 'CM90000122E09', 'Nakibuuka', 'Esther', 'nakibuuka.e@example.com', '256-772-101022', '1998-03-25', '2025-08-03 11:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (23, 'CM90000123E09', 'Mugisha', 'John', 'mugisha.j@example.com', '256-772-101023', '1995-12-10', '2025-08-03 11:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (24, 'CM90000124E09', 'Nakafeero', 'Grace', 'nakafeero.g@example.com', '256-772-101024', '1999-07-07', '2025-08-03 11:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (25, 'CM90000125E09', 'Lwanga', 'Ronald', 'lwanga.r@example.com', '256-772-101025', '1991-09-02', '2025-08-03 11:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (26, 'CM90000126E09', 'Namaganda', 'Patricia', 'namaganda.p@example.com', '256-772-101026', '1996-06-18', '2025-08-03 11:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (27, 'CM90000127E09', 'Odongo', 'James', 'odongo.j@example.com', '256-772-101027', '1993-01-01', '2025-08-03 11:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (28, 'CM90000128E09', 'Nankunda', 'Annet', 'nankunda.a@example.com', '256-772-101028', '2000-08-28', '2025-08-03 11:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (29, 'CM90000129E09', 'Kalanzi', 'Edward', 'kalanzi.jj@example.com', '256-772-101029', '1994-04-14', '2025-08-03 11:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (30, 'CM90000130E09', 'Nakaggwa', 'Lydia', 'nakaggwa.l@example.com', '256-772-101030', '1997-11-20', '2025-08-03 11:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (31, 'CM90000131E09', 'Semakula', 'Peter', 'semakula.p@example.com', '256-772-101031', '1992-02-09', '2025-08-04 12:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (32, 'CM90000132E09', 'Nakanwagi', 'Judith', 'nakanwagi.j@example.com', '256-772-101032', '1998-05-08', '2025-08-04 12:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (33, 'CM90000133E09', 'Mwesigye', 'Ivan', 'mwesigye.i@example.com', '256-772-101033', '1995-09-29', '2025-08-04 12:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (34, 'CM90000134E09', 'Nagawa', 'Stella', 'nagawa.s@example.com', '256-772-101034', '1999-03-17', '2025-08-04 12:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (35, 'CM90000135E09', 'Musoke', 'Fredrick', 'musoke.f@example.com', '256-772-101035', '1991-08-11', '2025-08-04 12:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (36, 'CM90000136E09', 'Namatovu', 'Brenda', 'namatovu.b@example.com', '256-772-101036', '1996-05-05', '2025-08-04 12:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (37, 'CM90000137E09', 'Sserunjogi', 'Mike', 'sserunjogi.m@example.com', '256-772-101037', '1993-09-30', '2025-08-04 12:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (38, 'CM90000138E09', 'Nabulya', 'Justine', 'nabulya.j@example.com', '256-772-101038', '2000-02-28', '2025-08-04 12:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (39, 'CM90000139E09', 'Kasozi', 'Samuel', 'kasozi.s@example.com', '256-772-101039', '1994-07-07', '2025-08-04 12:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (40, 'CM90000140E09', 'Namusoke', 'Doreen', 'namusoke.d@example.com', '256-772-101040', '1997-12-19', '2025-08-04 12:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (41, 'CM90000141E09', 'Wanyama', 'Eric', 'wanyama.e@example.com', '256-772-101041', '1992-05-09', '2025-08-05 13:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (42, 'CM90000142E09', 'Nabwire', 'Sarah', 'nabwire.s@example.com', '256-772-101042', '1998-03-01', '2025-08-05 13:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (43, 'CM90000143E09', 'Kisitu', 'Henry', 'kisitu.h@example.com', '256-772-101043', '1995-10-23', '2025-08-05 13:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (44, 'CM90000144E09', 'Namatovu', 'Gloria', 'namatovu.g@example.com', '256-772-101044', '1999-04-16', '2025-08-05 13:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (45, 'CM90000145E09', 'Sentongo', 'Geoffrey', 'sentongo.g@example.com', '256-772-101045', '1991-09-08', '2025-08-05 13:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (46, 'CM90000146E09', 'Nakayiza', 'Irene', 'nakayiza.i@example.com', '256-772-101046', '1996-06-25', '2025-08-05 13:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (47, 'CM90000147E09', 'Ssali', 'Joseph', 'ssali.j@example.com', '256-772-101047', '1993-01-13', '2025-08-05 13:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (48, 'CM90000148E09', 'Nakyeyune', 'Cynthia', 'nakyeyune.c@example.com', '256-772-101048', '2000-08-05', '2025-08-05 13:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (49, 'CM90000149E09', 'Mugisha', 'Peter', 'mugisha.p@example.com', '256-772-101049', '1994-04-29', '2025-08-05 13:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (50, 'CM90000150E09', 'Nalubega', 'Diana', 'nalubega.d@example.com', '256-772-101050', '1997-11-04', '2025-08-05 13:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (51, 'CM90000151E09', 'Kasule', 'Godfrey', 'kasule.g@example.com', '256-772-101051', '1992-03-22', '2025-08-06 14:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (52, 'CM90000152E09', 'Namatovu', 'Juliet', 'namatovu.j@example.com', '256-772-101052', '1998-06-19', '2025-08-06 14:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (53, 'CM90000153E09', 'Tumusiime', 'Ronald', 'tumusiime.r@example.com', '256-772-101053', '1995-09-12', '2025-08-06 14:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (54, 'CM90000154E09', 'Nankya', 'Sarah', 'nankya.s@example.com', '256-772-101054', '1999-01-30', '2025-08-06 14:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (55, 'CM90000155E09', 'Katende', 'Paul', 'katende.p@example.com', '256-772-101055', '1991-07-27', '2025-08-06 14:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (56, 'CM90000156E09', 'Namuyomba', 'Jane', 'namuyomba.j@example.com', '256-772-101056', '1996-04-14', '2025-08-06 14:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (57, 'CM90000157E09', 'Odoi', 'Sam', 'odoi.s@example.com', '256-772-101057', '1993-02-12', '2025-08-06 14:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (58, 'CM90000158E09', 'Nakayima', 'Brenda', 'nakayima.b@example.com', '256-772-101058', '2000-09-09', '2025-08-06 14:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (59, 'CM90000159E09', 'Bwambale', 'Peter', 'bwambale.p@example.com', '256-772-101059', '1994-05-18', '2025-08-06 14:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (60, 'CM90000160E09', 'Nassuna', 'Phiona', 'nassuna.p@example.com', '256-772-101060', '1997-12-07', '2025-08-06 14:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (61, 'CM90000161E09', 'Sserwadda', 'John', 'sserwadda.j@example.com', '256-772-101061', '1992-06-25', '2025-08-07 15:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (62, 'CM90000162E09', 'Nalubwama', 'Monica', 'nalubwama.m@example.com', '256-772-101062', '1998-04-20', '2025-08-07 15:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (63, 'CM90000163E09', 'Tumwesigye', 'Joseph', 'tumwesigye.j@example.com', '256-772-101063', '1995-11-13', '2025-08-07 15:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (64, 'CM90000164E09', 'Nakiyingi', 'Lillian', 'nakiyingi.l@example.com', '256-772-101064', '1999-08-08', '2025-08-07 15:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (65, 'CM90000165E09', 'Musisi', 'Peter', 'musisi.p@example.com', '256-772-101065', '1991-03-05', '2025-08-07 15:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (66, 'CM90000166E09', 'Nalukwago', 'Miriam', 'nalukwago.m@example.com', '256-772-101066', '1996-07-23', '2025-08-07 15:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (67, 'CM90000167E09', 'Lubega', 'Hassan', 'lubega.hassan@example.com', '256-772-101067', '1993-04-10', '2025-08-07 15:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (68, 'CM90000168E09', 'Nakabugo', 'Mary', 'nakabugo.m@example.com', '256-772-101068', '2000-01-08', '2025-08-07 15:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (69, 'CM90000169E09', 'Wassajja', 'Patrick', 'wassajja.p@example.com', '256-772-101069', '1994-09-02', '2025-08-07 15:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (70, 'CM90000170E09', 'Namaganda', 'Betty', 'namaganda.b@example.com', '256-772-101070', '1997-03-21', '2025-08-07 15:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (71, 'CM90000171E09', 'Sekadde', 'John', 'sekadde.j@example.com', '256-772-101071', '1992-04-17', '2025-08-08 16:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (72, 'CM90000172E09', 'Nakyeyune', 'Maria', 'nakyeyune.m@example.com', '256-772-101072', '1998-05-15', '2025-08-08 16:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (73, 'CM90000173E09', 'Kyagulanyi', 'Ivan', 'kyagulanyi.i@example.com', '256-772-101073', '1995-12-08', '2025-08-08 16:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (74, 'CM90000174E09', 'Nakitto', 'Joan', 'nakitto.j@example.com', '256-772-101074', '1999-07-29', '2025-08-08 16:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (75, 'CM90000175E09', 'Lubwama', 'Hassan', 'lubwama.h@example.com', '256-772-101075', '1991-09-04', '2025-08-08 16:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (76, 'CM90000176E09', 'Namubiru', 'Brenda', 'namubiru.b@example.com', '256-772-101076', '1996-06-20', '2025-08-08 16:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (77, 'CM90000177E09', 'Okello', 'Patrick', 'okello.p@example.com', '256-772-101077', '1993-01-25', '2025-08-08 16:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (78, 'CM90000178E09', 'Nakyobe', 'Sylvia', 'nakyobe.easter@example.com', '256-772-101078', '2000-08-15', '2025-08-08 16:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (79, 'CM90000179E09', 'Mugambe', 'Fred', 'mugambe.f@example.com', '256-772-101079', '1994-04-03', '2025-08-08 16:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (80, 'CM90000180E09', 'Nansereko', 'Jane', 'nansereko.oo@example.com', '256-772-101080', '1997-11-12', '2025-08-08 16:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (81, 'CM90000181E09', 'Kayanja', 'George', 'kayanja.g@example.com', '256-772-101081', '1992-03-01', '2025-08-09 17:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (82, 'CM90000182E09', 'Nalule', 'Stella', 'nalule.s@example.com', '256-772-101082', '1998-06-05', '2025-08-09 17:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (83, 'CM90000183E09', 'Kavuma', 'Richard', 'kavuma.r@example.com', '256-772-101083', '1995-09-21', '2025-08-09 17:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (84, 'CM90000184E09', 'Nakabuye', 'Christine', 'nakabuye.c@example.com', '256-772-101084', '1999-02-18', '2025-08-09 17:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (85, 'CM90000185E09', 'Mugabo', 'Steven', 'mugabo.s@example.com', '256-772-101085', '1991-07-16', '2025-08-09 17:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (86, 'CM90000186E09', 'Nakimera', 'Rose', 'nakimera.r@example.com', '256-772-101086', '1996-04-09', '2025-08-09 17:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (87, 'CM90000187E09', 'Okeny', 'Simon', 'okeny.sam@example.com', '256-772-101087', '1993-02-04', '2025-08-09 17:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (88, 'CM90000188E09', 'Nabbanja', 'Grace', 'nabbanja.g@example.com', '256-772-101088', '2000-09-19', '2025-08-09 17:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (89, 'CM90000189E09', 'Ssemanda', 'Alex', 'ssemanda.a@example.com', '256-772-101089', '1994-05-11', '2025-08-09 17:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (90, 'CM90000190E09', 'Nansamba', 'Deborah', 'nansamba.diina@example.com', '256-772-101090', '1997-12-01', '2025-08-09 17:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (91, 'CM90000191E09', 'Wasswa', 'Hassan', 'wasswa.h2@example.com', '256-772-101091', '1992-06-08', '2025-08-10 18:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (92, 'CM90000192E09', 'Nabukenya', 'Florence', 'nabukenya.f@example.com', '256-772-101092', '1998-04-15', '2025-08-10 18:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (93, 'CM90000193E09', 'Kayongo', 'Samuel', 'kayongo.s@example.com', '256-772-101093', '1995-11-09', '2025-08-10 18:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (94, 'CM90000194E09', 'Nambooze', 'Sarah', 'nambooze.io@example.com', '256-772-101094', '1999-08-02', '2025-08-10 18:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (95, 'CM90000195E09', 'Mutebi', 'Denis', 'mutebi.dan@example.com', '256-772-101095', '1991-03-09', '2025-08-10 18:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (96, 'CM90000196E09', 'Nakakawa', 'Monica', 'nakakawa.xx@example.com', '256-772-101096', '1996-07-16', '2025-08-10 18:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (97, 'CM90000197E09', 'Kisekka', 'Henry', 'kisekka@example.com', '256-772-101097', '1993-04-05', '2025-08-10 18:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (98, 'CM90000198E09', 'Nakaayi', 'Ruth', 'nakaayi.r@example.com', '256-772-101098', '2000-01-01', '2025-08-10 18:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (99, 'CM90000199E09', 'Mwanje', 'Joseph', 'mwanje.j@example.com', '256-772-101099', '1994-09-28', '2025-08-10 18:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (100, 'CM90000200E09', 'Nalumansi', 'Grace', 'nalumansi.g@example.com', '256-772-101100', '1997-03-16', '2025-08-10 18:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback`  (
  `FeedbackID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `RentalID` int(10) UNSIGNED NOT NULL,
  `Rating` tinyint(4) NOT NULL,
  `Comments` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL,
  `FeedbackDate` datetime NOT NULL,
  PRIMARY KEY (`FeedbackID`) USING BTREE,
  UNIQUE INDEX `RentalID`(`RentalID`) USING BTREE,
  INDEX `Rating`(`Rating`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of feedback
-- ----------------------------
INSERT INTO `feedback` VALUES (1, 1, 5, 'Great bike, very smooth ride.', '2025-09-22 08:35:00');
INSERT INTO `feedback` VALUES (2, 2, 4, 'Bike was a bit old, but service was good.', '2025-09-22 08:50:00');
INSERT INTO `feedback` VALUES (3, 3, 5, 'The staff was very helpful and quick!', '2025-09-22 08:30:00');
INSERT INTO `feedback` VALUES (4, 4, 3, 'Gears were a bit hard to change.', '2025-09-22 08:55:00');
INSERT INTO `feedback` VALUES (5, 5, 5, 'Excellent experience. Will rent again.', '2025-09-22 09:15:00');
INSERT INTO `feedback` VALUES (6, 6, 2, 'The bike had a wobbly pedal.', '2025-09-22 09:00:00');
INSERT INTO `feedback` VALUES (7, 7, 4, 'Good value for money.', '2025-09-22 09:20:00');
INSERT INTO `feedback` VALUES (8, 8, 5, 'Very clean and well-maintained bike.', '2025-09-22 09:10:00');
INSERT INTO `feedback` VALUES (9, 9, 3, 'Seat was a bit uncomfortable for me.', '2025-09-22 09:15:00');
INSERT INTO `feedback` VALUES (10, 10, 4, 'Enjoyed the ride, easy process.', '2025-09-22 09:35:00');
INSERT INTO `feedback` VALUES (11, 11, 5, 'Quick service, staff was friendly.', '2025-09-22 09:25:00');
INSERT INTO `feedback` VALUES (12, 12, 4, 'No issues. The bike was in good condition.', '2025-09-22 09:45:00');
INSERT INTO `feedback` VALUES (13, 13, 3, 'Brakes were squeaky, but worked.', '2025-09-22 09:35:00');
INSERT INTO `feedback` VALUES (14, 14, 5, 'Amazing experience!', '2025-09-22 10:00:00');
INSERT INTO `feedback` VALUES (15, 15, 4, 'Could use more bikes at this location.', '2025-09-22 09:35:00');
INSERT INTO `feedback` VALUES (16, 16, 2, 'Front light was not working.', '2025-09-22 10:05:00');
INSERT INTO `feedback` VALUES (17, 17, 5, 'Perfect!', '2025-09-22 09:55:00');
INSERT INTO `feedback` VALUES (18, 18, 4, 'The bike was a little dirty.', '2025-09-22 10:10:00');
INSERT INTO `feedback` VALUES (19, 19, 5, 'Smooth and easy rental.', '2025-09-22 09:50:00');
INSERT INTO `feedback` VALUES (20, 20, 3, 'Flat tire during the ride.', '2025-09-22 10:25:00');
INSERT INTO `feedback` VALUES (21, 21, 5, 'Very quick check-out process.', '2025-09-22 10:35:00');
INSERT INTO `feedback` VALUES (22, 22, 4, 'Bike was fine, app could be better.', '2025-09-22 10:20:00');
INSERT INTO `feedback` VALUES (23, 23, 5, 'No complaints, a great ride.', '2025-09-22 10:25:00');
INSERT INTO `feedback` VALUES (24, 24, 3, 'Chain made some noise.', '2025-09-22 10:45:00');
INSERT INTO `feedback` VALUES (25, 25, 5, 'Everything worked as expected.', '2025-09-22 10:35:00');
INSERT INTO `feedback` VALUES (26, 26, 4, 'Good condition.', '2025-09-22 10:50:00');
INSERT INTO `feedback` VALUES (27, 27, 5, 'Pleasant staff and smooth process.', '2025-09-22 11:05:00');
INSERT INTO `feedback` VALUES (28, 28, 3, 'The seat was loose.', '2025-09-22 10:35:00');
INSERT INTO `feedback` VALUES (29, 29, 5, 'Perfect ride, thank you.', '2025-09-22 11:15:00');
INSERT INTO `feedback` VALUES (30, 30, 4, 'Bike was fine, but a little scratched.', '2025-09-22 11:10:00');
INSERT INTO `feedback` VALUES (31, 31, 5, 'Excellent.', '2025-09-22 11:15:00');
INSERT INTO `feedback` VALUES (32, 32, 4, 'Smooth ride.', '2025-09-22 11:30:00');
INSERT INTO `feedback` VALUES (33, 33, 3, 'Gears were sticky.', '2025-09-22 11:20:00');
INSERT INTO `feedback` VALUES (34, 34, 5, 'Great.', '2025-09-22 11:35:00');
INSERT INTO `feedback` VALUES (35, 35, 4, 'Good service.', '2025-09-22 11:20:00');
INSERT INTO `feedback` VALUES (36, 36, 2, 'Wobbly handlebar.', '2025-09-22 11:45:00');
INSERT INTO `feedback` VALUES (37, 37, 5, 'No issues at all.', '2025-09-22 11:35:00');
INSERT INTO `feedback` VALUES (38, 38, 4, 'Good condition.', '2025-09-22 11:50:00');
INSERT INTO `feedback` VALUES (39, 39, 5, 'Easy to use.', '2025-09-22 12:05:00');
INSERT INTO `feedback` VALUES (40, 40, 3, 'Felt heavy to pedal.', '2025-09-22 11:50:00');
INSERT INTO `feedback` VALUES (41, 41, 5, 'Wonderful ride.', '2025-09-22 12:05:00');
INSERT INTO `feedback` VALUES (42, 42, 4, 'Bike was slightly worn.', '2025-09-22 12:20:00');
INSERT INTO `feedback` VALUES (43, 43, 5, 'Fast check-in.', '2025-09-22 12:05:00');
INSERT INTO `feedback` VALUES (44, 44, 3, 'Brakes were soft.', '2025-09-22 12:25:00');
INSERT INTO `feedback` VALUES (45, 45, 5, 'Great!', '2025-09-22 12:15:00');
INSERT INTO `feedback` VALUES (46, 46, 4, 'Smooth ride.', '2025-09-22 12:30:00');
INSERT INTO `feedback` VALUES (47, 47, 5, 'Love the service.', '2025-09-22 12:40:00');
INSERT INTO `feedback` VALUES (48, 48, 3, 'Bell was broken.', '2025-09-22 12:35:00');
INSERT INTO `feedback` VALUES (49, 49, 5, 'Excellent!', '2025-09-22 12:45:00');
INSERT INTO `feedback` VALUES (50, 50, 4, 'No complaints, easy.', '2025-09-22 12:55:00');
INSERT INTO `feedback` VALUES (51, 51, 5, 'The bike was in top shape.', '2025-09-22 12:45:00');
INSERT INTO `feedback` VALUES (52, 52, 4, 'Quick and efficient.', '2025-09-22 13:10:00');
INSERT INTO `feedback` VALUES (53, 53, 5, 'Good.', '2025-09-22 13:00:00');
INSERT INTO `feedback` VALUES (54, 54, 3, 'Seat was wobbly.', '2025-09-22 13:15:00');
INSERT INTO `feedback` VALUES (55, 55, 5, 'Staff was very friendly.', '2025-09-22 13:20:00');
INSERT INTO `feedback` VALUES (56, 56, 4, 'No issues.', '2025-09-22 13:05:00');
INSERT INTO `feedback` VALUES (57, 57, 5, 'Great ride.', '2025-09-22 13:25:00');
INSERT INTO `feedback` VALUES (58, 58, 3, 'Brakes were soft.', '2025-09-22 13:35:00');
INSERT INTO `feedback` VALUES (59, 59, 5, 'Smooth process.', '2025-09-22 13:30:00');
INSERT INTO `feedback` VALUES (60, 60, 4, 'Good condition.', '2025-09-22 13:45:00');
INSERT INTO `feedback` VALUES (61, 61, 5, 'Perfect!', '2025-09-22 13:50:00');
INSERT INTO `feedback` VALUES (62, 62, 4, 'Good.', '2025-09-22 13:35:00');
INSERT INTO `feedback` VALUES (63, 63, 5, 'Easy to use.', '2025-09-22 14:00:00');
INSERT INTO `feedback` VALUES (64, 64, 3, 'Chain fell off once.', '2025-09-22 14:05:00');
INSERT INTO `feedback` VALUES (65, 65, 5, 'Great ride.', '2025-09-22 14:10:00');
INSERT INTO `feedback` VALUES (66, 66, 4, 'Bike was fine.', '2025-09-22 14:00:00');
INSERT INTO `feedback` VALUES (67, 67, 5, 'Love it!', '2025-09-22 14:20:00');
INSERT INTO `feedback` VALUES (68, 68, 4, 'Good bike.', '2025-09-22 14:10:00');
INSERT INTO `feedback` VALUES (69, 69, 5, 'No problems.', '2025-09-22 14:35:00');
INSERT INTO `feedback` VALUES (70, 70, 3, 'Gears were hard to shift.', '2025-09-22 14:20:00');
INSERT INTO `feedback` VALUES (71, 71, 5, 'Everything was great.', '2025-09-22 14:45:00');
INSERT INTO `feedback` VALUES (72, 72, 4, 'Brakes were a little soft.', '2025-09-22 14:40:00');
INSERT INTO `feedback` VALUES (73, 73, 5, 'Smooth rental process.', '2025-09-22 14:50:00');
INSERT INTO `feedback` VALUES (74, 74, 3, 'The bike was a bit squeaky.', '2025-09-22 14:55:00');
INSERT INTO `feedback` VALUES (75, 75, 5, 'Great!', '2025-09-22 14:45:00');
INSERT INTO `feedback` VALUES (76, 76, 4, 'Good.', '2025-09-22 15:00:00');
INSERT INTO `feedback` VALUES (77, 77, 5, 'Staff was very helpful.', '2025-09-22 15:05:00');
INSERT INTO `feedback` VALUES (78, 78, 4, 'No complaints.', '2025-09-22 15:20:00');
INSERT INTO `feedback` VALUES (79, 79, 5, 'Perfect.', '2025-09-22 15:15:00');
INSERT INTO `feedback` VALUES (80, 80, 3, 'Seat was wobbly.', '2025-09-22 15:10:00');
INSERT INTO `feedback` VALUES (81, 81, 5, 'Bike was in good condition.', '2025-09-22 15:25:00');
INSERT INTO `feedback` VALUES (82, 82, 4, 'Smooth ride.', '2025-09-22 15:35:00');
INSERT INTO `feedback` VALUES (83, 83, 5, 'Awesome!', '2025-09-22 15:25:00');
INSERT INTO `feedback` VALUES (84, 84, 4, 'Easy to use.', '2025-09-22 15:50:00');
INSERT INTO `feedback` VALUES (85, 85, 5, 'Great service.', '2025-09-22 15:35:00');
INSERT INTO `feedback` VALUES (86, 86, 4, 'No issues.', '2025-09-22 15:50:00');
INSERT INTO `feedback` VALUES (87, 87, 5, 'Perfect.', '2025-09-22 16:00:00');
INSERT INTO `feedback` VALUES (88, 88, 4, 'Bike was well-maintained.', '2025-09-22 15:50:00');
INSERT INTO `feedback` VALUES (89, 89, 5, 'Loved the ride!', '2025-09-22 16:05:00');
INSERT INTO `feedback` VALUES (90, 90, 4, 'Good condition.', '2025-09-22 16:15:00');
INSERT INTO `feedback` VALUES (91, 91, 5, 'Quick process.', '2025-09-22 16:05:00');
INSERT INTO `feedback` VALUES (92, 92, 3, 'Brakes were soft.', '2025-09-22 16:25:00');
INSERT INTO `feedback` VALUES (93, 93, 5, 'Great!', '2025-09-22 16:35:00');
INSERT INTO `feedback` VALUES (94, 94, 4, 'No complaints.', '2025-09-22 16:20:00');
INSERT INTO `feedback` VALUES (95, 95, 5, 'Excellent service.', '2025-09-22 16:30:00');
INSERT INTO `feedback` VALUES (96, 96, 4, 'Bike was fine.', '2025-09-22 16:40:00');
INSERT INTO `feedback` VALUES (97, 97, 5, 'Wonderful.', '2025-09-22 16:45:00');
INSERT INTO `feedback` VALUES (98, 98, 4, 'Smooth ride.', '2025-09-22 16:55:00');
INSERT INTO `feedback` VALUES (99, 99, 5, 'Highly recommend.', '2025-09-22 17:05:00');
INSERT INTO `feedback` VALUES (100, 100, 3, 'Gears were a bit hard to shift.', '2025-09-22 17:00:00');

-- ----------------------------
-- Table structure for location
-- ----------------------------
DROP TABLE IF EXISTS `location`;
CREATE TABLE `location`  (
  `LocationID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `LocationName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `Address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `City` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `PhoneNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `Capacity` int(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`LocationID`) USING BTREE,
  UNIQUE INDEX `LocationName`(`LocationName`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of location
-- ----------------------------
INSERT INTO `location` VALUES (1, 'Makerere Hill Road', '123 Makerere Hill Rd', 'Kampala', '256-772-111221', 50);
INSERT INTO `location` VALUES (2, 'Wandegeya Market', '45 Wandegeya Rd', 'Kampala', '256-772-111222', 40);
INSERT INTO `location` VALUES (3, 'Kiwatule Recreation Centre', '78 Kiwatule Rd', 'Kampala', '256-772-111223', 60);
INSERT INTO `location` VALUES (4, 'Ntinda Junction', '101 Ntinda St', 'Kampala', '256-772-111224', 55);
INSERT INTO `location` VALUES (5, 'Bugolobi Village Mall', '20 Kyadondo Rd', 'Kampala', '256-772-111225', 50);
INSERT INTO `location` VALUES (6, 'Acacia Mall', '16-20 Cooper Rd', 'Kampala', '256-772-111226', 45);
INSERT INTO `location` VALUES (7, 'Nakasero Market', '34 Nakasero Rd', 'Kampala', '256-772-111227', 30);
INSERT INTO `location` VALUES (8, 'Kasubi Tombs', '50 Kasubi Hill Rd', 'Kampala', '256-772-111228', 25);
INSERT INTO `location` VALUES (9, 'Entebbe International Airport', 'Entebbe Rd', 'Entebbe', '256-772-111229', 70);
INSERT INTO `location` VALUES (10, 'Jinja Main Street', '15 Main St', 'Jinja', '256-772-111230', 50);
INSERT INTO `location` VALUES (11, 'Kireka Stone Depot', '88 Kireka Rd', 'Kampala', '256-772-111231', 40);
INSERT INTO `location` VALUES (12, 'Muyenga Tank Hill', '75 Muyenga Rd', 'Kampala', '256-772-111232', 30);
INSERT INTO `location` VALUES (13, 'Busega Taxi Park', '22 Busega Rd', 'Kampala', '256-772-111233', 50);
INSERT INTO `location` VALUES (14, 'Kawempe Main Stage', '19 Kawempe Rd', 'Kampala', '256-772-111234', 60);
INSERT INTO `location` VALUES (15, 'Ggaba Landing Site', '33 Ggaba Rd', 'Kampala', '256-772-111235', 45);
INSERT INTO `location` VALUES (16, 'Wobulenzi Town Centre', '10 Wobulenzi Rd', 'Wobulenzi', '256-772-111236', 35);
INSERT INTO `location` VALUES (17, 'Bombo Barracks', '65 Bombo Rd', 'Bombo', '256-772-111237', 20);
INSERT INTO `location` VALUES (18, 'Nansana Town Council', '90 Nansana Rd', 'Nansana', '256-772-111238', 50);
INSERT INTO `location` VALUES (19, 'Kitgum Central', '55 Kitgum Rd', 'Kitgum', '256-772-111239', 40);
INSERT INTO `location` VALUES (20, 'Lira City Centre', '8 Lira Rd', 'Lira', '256-772-111240', 30);
INSERT INTO `location` VALUES (21, 'Mbarara Town Square', '12 Mbarara Rd', 'Mbarara', '256-772-111241', 55);
INSERT INTO `location` VALUES (22, 'Fort Portal', '44 Fort Portal Rd', 'Fort Portal', '256-772-111242', 45);
INSERT INTO `location` VALUES (23, 'Kasese Town', '11 Kasese Rd', 'Kasese', '256-772-111243', 25);
INSERT INTO `location` VALUES (24, 'Masaka Main', '76 Masaka Rd', 'Masaka', '256-772-111244', 50);
INSERT INTO `location` VALUES (25, 'Hoima City', '99 Hoima Rd', 'Hoima', '256-772-111245', 40);
INSERT INTO `location` VALUES (26, 'Gulu Town', '22 Gulu Rd', 'Gulu', '256-772-111246', 60);
INSERT INTO `location` VALUES (27, 'Arua Hill', '31 Arua Rd', 'Arua', '256-772-111247', 50);
INSERT INTO `location` VALUES (28, 'Kabale Town', '67 Kabale Rd', 'Kabale', '256-772-111248', 30);
INSERT INTO `location` VALUES (29, 'Soroti Central', '88 Soroti Rd', 'Soroti', '256-772-111249', 45);
INSERT INTO `location` VALUES (30, 'Mbale City', '5 Mbale Rd', 'Mbale', '256-772-111250', 50);
INSERT INTO `location` VALUES (31, 'Iganga Market', '44 Iganga Rd', 'Iganga', '256-772-111251', 40);
INSERT INTO `location` VALUES (32, 'Tororo Town', '7 Tororo Rd', 'Tororo', '256-772-111252', 30);
INSERT INTO `location` VALUES (33, 'Entebbe Wildlife Education Centre', '33 Entebbe Rd', 'Entebbe', '256-772-111253', 55);
INSERT INTO `location` VALUES (34, 'Kololo Hill', '11 Kololo Rd', 'Kampala', '256-772-111254', 60);
INSERT INTO `location` VALUES (35, 'Bweyogerere', '56 Bweyogerere Rd', 'Kampala', '256-772-111255', 45);
INSERT INTO `location` VALUES (36, 'Ndejje University', '7 Ndejje Rd', 'Ndejje', '256-772-111256', 20);
INSERT INTO `location` VALUES (37, 'Masindi Town', '18 Masindi Rd', 'Masindi', '256-772-111257', 30);
INSERT INTO `location` VALUES (38, 'Mubende Main', '62 Mubende Rd', 'Mubende', '256-772-111258', 50);
INSERT INTO `location` VALUES (39, 'Jinja Source of the Nile', '2 Jinja Rd', 'Jinja', '256-772-111259', 70);
INSERT INTO `location` VALUES (40, 'Kajjansi Town', '44 Kajjansi Rd', 'Kajjansi', '256-772-111260', 40);
INSERT INTO `location` VALUES (41, 'Kawuku Trading Centre', '57 Kawuku Rd', 'Kawuku', '256-772-111261', 25);
INSERT INTO `location` VALUES (42, 'Busia Border Point', '83 Busia Rd', 'Busia', '256-772-111262', 35);
INSERT INTO `location` VALUES (43, 'Mityana Town', '91 Mityana Rd', 'Mityana', '256-772-111263', 50);
INSERT INTO `location` VALUES (44, 'Wakiso Main', '13 Wakiso Rd', 'Wakiso', '256-772-111264', 60);
INSERT INTO `location` VALUES (45, 'Mpigi Town', '30 Mpigi Rd', 'Mpigi', '256-772-111265', 45);
INSERT INTO `location` VALUES (46, 'Kiryandongo', '67 Kiryandongo Rd', 'Kiryandongo', '256-772-111266', 20);
INSERT INTO `location` VALUES (47, 'Kotido Town', '12 Kotido Rd', 'Kotido', '256-772-111267', 30);
INSERT INTO `location` VALUES (48, 'Moroto City', '88 Moroto Rd', 'Moroto', '256-772-111268', 50);
INSERT INTO `location` VALUES (49, 'Kasese National Park', '4 Kasese Park Rd', 'Kasese', '256-772-111269', 70);
INSERT INTO `location` VALUES (50, 'Jinja Railway Station', '10 Jinja Station Rd', 'Jinja', '256-772-111270', 40);
INSERT INTO `location` VALUES (51, 'Namugongo Martyrs Shrine', '55 Namugongo Rd', 'Kampala', '256-772-111271', 60);
INSERT INTO `location` VALUES (52, 'Kyambogo University', '75 Kyambogo Rd', 'Kampala', '256-772-111272', 50);
INSERT INTO `location` VALUES (53, 'Lugogo Forest Mall', '1 Forest Mall Rd', 'Kampala', '256-772-111273', 45);
INSERT INTO `location` VALUES (54, 'Kansanga Trading Centre', '23 Kansanga Rd', 'Kampala', '256-772-111274', 35);
INSERT INTO `location` VALUES (55, 'Banda Trading Centre', '45 Banda Rd', 'Kampala', '256-772-111275', 50);
INSERT INTO `location` VALUES (56, 'Kisaasi', '66 Kisaasi Rd', 'Kampala', '256-772-111276', 40);
INSERT INTO `location` VALUES (57, 'Naalya Housing Estate', '12 Naalya Rd', 'Kampala', '256-772-111277', 60);
INSERT INTO `location` VALUES (58, 'Mbuya Hill', '89 Mbuya Hill Rd', 'Kampala', '256-772-111278', 30);
INSERT INTO `location` VALUES (59, 'Kitintale Market', '33 Kitintale Rd', 'Kampala', '256-772-111279', 55);
INSERT INTO `location` VALUES (60, 'Kajjansi Airfield', '1 Kajjansi Airfield Rd', 'Kajjansi', '256-772-111280', 25);
INSERT INTO `location` VALUES (61, 'Gayaza Town', '70 Gayaza Rd', 'Gayaza', '256-772-111281', 40);
INSERT INTO `location` VALUES (62, 'Mukono City', '21 Mukono Rd', 'Mukono', '256-772-111282', 50);
INSERT INTO `location` VALUES (63, 'Kayunga Town', '84 Kayunga Rd', 'Kayunga', '256-772-111283', 30);
INSERT INTO `location` VALUES (64, 'Luwero Town', '1 Luwero Rd', 'Luwero', '256-772-111284', 45);
INSERT INTO `location` VALUES (65, 'Bwindi Impenetrable Forest', '1 Bwindi Rd', 'Kanungu', '256-772-111285', 20);
INSERT INTO `location` VALUES (66, 'Murchison Falls National Park', '1 Murchison Rd', 'Masindi', '256-772-111286', 30);
INSERT INTO `location` VALUES (67, 'Queen Elizabeth National Park', '1 Queen Elizabeth Rd', 'Kasese', '256-772-111287', 50);
INSERT INTO `location` VALUES (68, 'Lake Mburo National Park', '1 Lake Mburo Rd', 'Kiruhura', '256-772-111288', 40);
INSERT INTO `location` VALUES (69, 'Sipi Falls', '1 Sipi Falls Rd', 'Kapchorwa', '256-772-111289', 30);
INSERT INTO `location` VALUES (70, 'Lake Bunyonyi', '1 Lake Bunyonyi Rd', 'Kabale', '256-772-111290', 50);
INSERT INTO `location` VALUES (71, 'Ggaba Road Market', '110 Ggaba Rd', 'Kampala', '256-772-111291', 60);
INSERT INTO `location` VALUES (72, 'Kabalagala', '200 Kabalagala Rd', 'Kampala', '256-772-111292', 50);
INSERT INTO `location` VALUES (73, 'Lubaga Road', '55 Lubaga Rd', 'Kampala', '256-772-111293', 40);
INSERT INTO `location` VALUES (74, 'Busega', '1 Busega Trading Centre', 'Kampala', '256-772-111294', 30);
INSERT INTO `location` VALUES (75, 'Ntinda Industrial Area', '10 Ntinda Rd', 'Kampala', '256-772-111295', 55);
INSERT INTO `location` VALUES (76, 'Kireka Trading Centre', '7 Kireka Rd', 'Kampala', '256-772-111296', 45);
INSERT INTO `location` VALUES (77, 'Kyaliwajjala', '35 Kyaliwajjala Rd', 'Kampala', '256-772-111297', 25);
INSERT INTO `location` VALUES (78, 'Bwaise', '2 Bwaise Rd', 'Kampala', '256-772-111298', 50);
INSERT INTO `location` VALUES (79, 'Namirembe Cathedral', '1 Namirembe Rd', 'Kampala', '256-772-111299', 40);
INSERT INTO `location` VALUES (80, 'Kawempe T-Junction', '40 Kawempe Rd', 'Kampala', '256-772-111300', 30);
INSERT INTO `location` VALUES (81, 'Kamwokya', '1 Kamwokya Rd', 'Kampala', '256-772-111301', 50);
INSERT INTO `location` VALUES (82, 'Kitgum Central Market', '88 Kitgum Market Rd', 'Kitgum', '256-772-111302', 60);
INSERT INTO `location` VALUES (83, 'Lira Main Street', '12 Lira St', 'Lira', '256-772-111303', 45);
INSERT INTO `location` VALUES (84, 'Mbarara University', '20 Mbarara University Rd', 'Mbarara', '256-772-111304', 20);
INSERT INTO `location` VALUES (85, 'Fort Portal City', '77 Fort Portal City Rd', 'Fort Portal', '256-772-111305', 30);
INSERT INTO `location` VALUES (86, 'Kasese Main', '3 Kasese Main Rd', 'Kasese', '256-772-111306', 50);
INSERT INTO `location` VALUES (87, 'Masaka Town Square', '45 Masaka Square Rd', 'Masaka', '256-772-111307', 40);
INSERT INTO `location` VALUES (88, 'Hoima Oil City', '9 Hoima Oil Rd', 'Hoima', '256-772-111308', 30);
INSERT INTO `location` VALUES (89, 'Gulu University', '6 Gulu University Rd', 'Gulu', '256-772-111309', 50);
INSERT INTO `location` VALUES (90, 'Arua Main Market', '15 Arua Market Rd', 'Arua', '256-772-111310', 60);
INSERT INTO `location` VALUES (91, 'Kabale Main Road', '50 Kabale Main Rd', 'Kabale', '256-772-111311', 45);
INSERT INTO `location` VALUES (92, 'Soroti Town Centre', '2 Soroti Centre Rd', 'Soroti', '256-772-111312', 20);
INSERT INTO `location` VALUES (93, 'Mbale Industrial Park', '10 Mbale Park Rd', 'Mbale', '256-772-111313', 30);
INSERT INTO `location` VALUES (94, 'Iganga Central Market', '5 Iganga Central Rd', 'Iganga', '256-772-111314', 50);
INSERT INTO `location` VALUES (95, 'Tororo Cement', '1 Tororo Cement Rd', 'Tororo', '256-772-111315', 40);
INSERT INTO `location` VALUES (96, 'Wobulenzi Main Market', '20 Wobulenzi Market Rd', 'Wobulenzi', '256-772-111316', 30);
INSERT INTO `location` VALUES (97, 'Entebbe Old Town', '6 Entebbe Old Town Rd', 'Entebbe', '256-772-111317', 50);
INSERT INTO `location` VALUES (98, 'Bweyogerere Industrial Park', '3 Bweyogerere Park Rd', 'Kampala', '256-772-111318', 60);
INSERT INTO `location` VALUES (99, 'Nansana Market', '15 Nansana Market Rd', 'Nansana', '256-772-111319', 45);
INSERT INTO `location` VALUES (100, 'Kireka Business Centre', '4 Kireka Business Rd', 'Kampala', '256-772-111320', 25);

-- ----------------------------
-- Table structure for maintenance
-- ----------------------------
DROP TABLE IF EXISTS `maintenance`;
CREATE TABLE `maintenance`  (
  `MaintenanceID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `BikeID` int(10) UNSIGNED NOT NULL,
  `StaffID` int(10) UNSIGNED NOT NULL,
  `MaintenanceDate` datetime NOT NULL,
  `Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `Cost` decimal(8, 2) NOT NULL,
  PRIMARY KEY (`MaintenanceID`) USING BTREE,
  INDEX `BikeID`(`BikeID`) USING BTREE,
  INDEX `StaffID`(`StaffID`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of maintenance
-- ----------------------------
INSERT INTO `maintenance` VALUES (1, 4, 1, '2025-09-16 10:00:00', 'Flat tire on front wheel, replaced inner tube.', 15000.00);
INSERT INTO `maintenance` VALUES (2, 10, 2, '2025-09-13 11:30:00', 'Brake pads replaced and adjusted.', 20000.00);
INSERT INTO `maintenance` VALUES (3, 15, 3, '2025-09-16 14:00:00', 'Gears were not shifting smoothly, full tune-up performed.', 35000.00);
INSERT INTO `maintenance` VALUES (4, 22, 4, '2025-09-20 09:15:00', 'Handlebars loose, tightened and checked for security.', 5000.00);
INSERT INTO `maintenance` VALUES (5, 29, 5, '2025-09-17 12:00:00', 'Chain fell off, re-installed and lubricated.', 10000.00);
INSERT INTO `maintenance` VALUES (6, 36, 6, '2025-09-22 08:30:00', 'Wobbly pedal, replaced axle.', 18000.00);
INSERT INTO `maintenance` VALUES (7, 40, 7, '2025-09-22 09:00:00', 'Brakes felt spongy, bled fluid and replaced pads.', 25000.00);
INSERT INTO `maintenance` VALUES (8, 49, 8, '2025-09-17 15:45:00', 'Seat post clamp broken, replaced with a new one.', 12000.00);
INSERT INTO `maintenance` VALUES (9, 58, 9, '2025-09-19 10:00:00', 'Headlight not working, replaced bulb and checked wiring.', 8000.00);
INSERT INTO `maintenance` VALUES (10, 66, 10, '2025-09-22 10:30:00', 'Chain is rusty and making noise, cleaned and lubricated.', 7500.00);
INSERT INTO `maintenance` VALUES (11, 69, 11, '2025-09-17 11:00:00', 'Spokes are bent on the rear wheel, trued the wheel.', 22000.00);
INSERT INTO `maintenance` VALUES (12, 79, 12, '2025-09-17 14:00:00', 'Frame has minor scratches, polished and buffed.', 5000.00);
INSERT INTO `maintenance` VALUES (13, 89, 13, '2025-09-17 16:30:00', 'Flat tire, inner tube replaced.', 15000.00);
INSERT INTO `maintenance` VALUES (14, 96, 14, '2025-09-22 11:00:00', 'Brakes are weak, adjusted tension and inspected cables.', 12000.00);
INSERT INTO `maintenance` VALUES (15, 1, 15, '2025-09-22 09:00:00', 'General check-up and tire pressure adjustment.', 2000.00);
INSERT INTO `maintenance` VALUES (16, 2, 16, '2025-09-22 09:30:00', 'Brake cable lubricated.', 3000.00);
INSERT INTO `maintenance` VALUES (17, 3, 17, '2025-09-22 10:00:00', 'Chain cleaned and tensioned.', 5000.00);
INSERT INTO `maintenance` VALUES (18, 5, 18, '2025-09-22 10:30:00', 'Gears tuned for smoother shifting.', 7000.00);
INSERT INTO `maintenance` VALUES (19, 6, 19, '2025-09-22 11:00:00', 'Quick safety check.', 1000.00);
INSERT INTO `maintenance` VALUES (20, 7, 20, '2025-09-22 11:30:00', 'Rear tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (21, 8, 21, '2025-09-22 12:00:00', 'Brake lever tightened.', 3000.00);
INSERT INTO `maintenance` VALUES (22, 9, 22, '2025-09-22 12:30:00', 'Seat post height adjusted.', 2000.00);
INSERT INTO `maintenance` VALUES (23, 11, 23, '2025-09-22 13:00:00', 'Full service, including chain and gear check.', 15000.00);
INSERT INTO `maintenance` VALUES (24, 12, 24, '2025-09-22 13:30:00', 'Brake caliper inspection.', 4000.00);
INSERT INTO `maintenance` VALUES (25, 13, 25, '2025-09-22 14:00:00', 'Tire pressure check and inflation.', 500.00);
INSERT INTO `maintenance` VALUES (26, 14, 26, '2025-09-22 14:30:00', 'Handlebar grips replaced.', 8000.00);
INSERT INTO `maintenance` VALUES (27, 16, 27, '2025-09-22 15:00:00', 'General cleaning and lubrication.', 6000.00);
INSERT INTO `maintenance` VALUES (28, 17, 28, '2025-09-22 15:30:00', 'Chain tension adjusted.', 4000.00);
INSERT INTO `maintenance` VALUES (29, 18, 29, '2025-09-22 16:00:00', 'Pedal check, replaced one.', 10000.00);
INSERT INTO `maintenance` VALUES (30, 19, 30, '2025-09-22 16:30:00', 'Brake pad inspection, replaced worn pads.', 15000.00);
INSERT INTO `maintenance` VALUES (31, 20, 31, '2025-09-22 17:00:00', 'Tire puncture repair.', 10000.00);
INSERT INTO `maintenance` VALUES (32, 21, 32, '2025-09-22 17:30:00', 'Quick safety check.', 1000.00);
INSERT INTO `maintenance` VALUES (33, 23, 33, '2025-09-22 18:00:00', 'Gears tuned.', 7000.00);
INSERT INTO `maintenance` VALUES (34, 24, 34, '2025-09-22 18:30:00', 'Tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (35, 25, 35, '2025-09-22 19:00:00', 'Brake lever adjusted.', 3000.00);
INSERT INTO `maintenance` VALUES (36, 26, 36, '2025-09-22 19:30:00', 'Chain lubed.', 3000.00);
INSERT INTO `maintenance` VALUES (37, 27, 37, '2025-09-22 20:00:00', 'Full service and check-up.', 20000.00);
INSERT INTO `maintenance` VALUES (38, 28, 38, '2025-09-22 20:30:00', 'Tire pressure check.', 500.00);
INSERT INTO `maintenance` VALUES (39, 30, 39, '2025-09-22 21:00:00', 'Brake pads replaced.', 15000.00);
INSERT INTO `maintenance` VALUES (40, 31, 40, '2025-09-22 21:30:00', 'Minor repair on bike frame.', 10000.00);
INSERT INTO `maintenance` VALUES (41, 32, 41, '2025-09-22 22:00:00', 'Chain replaced.', 25000.00);
INSERT INTO `maintenance` VALUES (42, 33, 42, '2025-09-22 22:30:00', 'General check-up.', 2000.00);
INSERT INTO `maintenance` VALUES (43, 34, 43, '2025-09-22 23:00:00', 'Tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (44, 35, 44, '2025-09-22 23:30:00', 'Brake lever tightened.', 3000.00);
INSERT INTO `maintenance` VALUES (45, 37, 45, '2025-09-23 00:00:00', 'Gears tuned.', 7000.00);
INSERT INTO `maintenance` VALUES (46, 38, 46, '2025-09-23 00:30:00', 'Full service.', 20000.00);
INSERT INTO `maintenance` VALUES (47, 39, 47, '2025-09-23 01:00:00', 'Tire pressure check and inflation.', 500.00);
INSERT INTO `maintenance` VALUES (48, 41, 48, '2025-09-23 01:30:00', 'Chain lubricated.', 3000.00);
INSERT INTO `maintenance` VALUES (49, 42, 49, '2025-09-23 02:00:00', 'Brake system inspection.', 10000.00);
INSERT INTO `maintenance` VALUES (50, 43, 50, '2025-09-23 02:30:00', 'Seat post tightened.', 2000.00);
INSERT INTO `maintenance` VALUES (51, 44, 51, '2025-09-23 03:00:00', 'General check-up.', 2000.00);
INSERT INTO `maintenance` VALUES (52, 45, 52, '2025-09-23 03:30:00', 'Tire pressure adjustment.', 500.00);
INSERT INTO `maintenance` VALUES (53, 46, 53, '2025-09-23 04:00:00', 'Brake pad replacement.', 15000.00);
INSERT INTO `maintenance` VALUES (54, 47, 54, '2025-09-23 04:30:00', 'Gears tuned.', 7000.00);
INSERT INTO `maintenance` VALUES (55, 48, 55, '2025-09-23 05:00:00', 'Chain cleaned and lubed.', 5000.00);
INSERT INTO `maintenance` VALUES (56, 50, 56, '2025-09-23 05:30:00', 'Full safety check.', 10000.00);
INSERT INTO `maintenance` VALUES (57, 51, 57, '2025-09-23 06:00:00', 'Tire pressure check.', 500.00);
INSERT INTO `maintenance` VALUES (58, 52, 58, '2025-09-23 06:30:00', 'Brake adjustment.', 5000.00);
INSERT INTO `maintenance` VALUES (59, 53, 59, '2025-09-23 07:00:00', 'General maintenance.', 8000.00);
INSERT INTO `maintenance` VALUES (60, 54, 60, '2025-09-23 07:30:00', 'Minor repair to frame.', 10000.00);
INSERT INTO `maintenance` VALUES (61, 55, 61, '2025-09-23 08:00:00', 'Tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (62, 56, 62, '2025-09-23 08:30:00', 'Chain lubricated.', 3000.00);
INSERT INTO `maintenance` VALUES (63, 57, 63, '2025-09-23 09:00:00', 'Brake cables replaced.', 15000.00);
INSERT INTO `maintenance` VALUES (64, 59, 64, '2025-09-23 09:30:00', 'General check-up.', 2000.00);
INSERT INTO `maintenance` VALUES (65, 60, 65, '2025-09-23 10:00:00', 'Gears tuned.', 7000.00);
INSERT INTO `maintenance` VALUES (66, 61, 66, '2025-09-23 10:30:00', 'Full service.', 20000.00);
INSERT INTO `maintenance` VALUES (67, 62, 67, '2025-09-23 11:00:00', 'Tire pressure check.', 500.00);
INSERT INTO `maintenance` VALUES (68, 63, 68, '2025-09-23 11:30:00', 'Brake pad replacement.', 15000.00);
INSERT INTO `maintenance` VALUES (69, 64, 69, '2025-09-23 12:00:00', 'General cleaning and lubrication.', 6000.00);
INSERT INTO `maintenance` VALUES (70, 65, 70, '2025-09-23 12:30:00', 'Tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (71, 67, 71, '2025-09-23 13:00:00', 'Brake lever tightened.', 3000.00);
INSERT INTO `maintenance` VALUES (72, 68, 72, '2025-09-23 13:30:00', 'Chain tension adjusted.', 4000.00);
INSERT INTO `maintenance` VALUES (73, 70, 73, '2025-09-23 14:00:00', 'Full service and inspection.', 20000.00);
INSERT INTO `maintenance` VALUES (74, 71, 74, '2025-09-23 14:30:00', 'Tire pressure check.', 500.00);
INSERT INTO `maintenance` VALUES (75, 72, 75, '2025-09-23 15:00:00', 'Gears tuned.', 7000.00);
INSERT INTO `maintenance` VALUES (76, 73, 76, '2025-09-23 15:30:00', 'Minor repair on bike frame.', 10000.00);
INSERT INTO `maintenance` VALUES (77, 74, 77, '2025-09-23 16:00:00', 'Tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (78, 75, 78, '2025-09-23 16:30:00', 'Brake caliper replacement.', 20000.00);
INSERT INTO `maintenance` VALUES (79, 76, 79, '2025-09-23 17:00:00', 'General check-up.', 2000.00);
INSERT INTO `maintenance` VALUES (80, 77, 80, '2025-09-23 17:30:00', 'Tire pressure check.', 500.00);
INSERT INTO `maintenance` VALUES (81, 78, 81, '2025-09-23 18:00:00', 'Chain lubricated.', 3000.00);
INSERT INTO `maintenance` VALUES (82, 80, 82, '2025-09-23 18:30:00', 'Brake adjustment.', 5000.00);
INSERT INTO `maintenance` VALUES (83, 81, 83, '2025-09-23 19:00:00', 'Full service and inspection.', 20000.00);
INSERT INTO `maintenance` VALUES (84, 82, 84, '2025-09-23 19:30:00', 'Minor repair to frame.', 10000.00);
INSERT INTO `maintenance` VALUES (85, 83, 85, '2025-09-23 20:00:00', 'Tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (86, 84, 86, '2025-09-23 20:30:00', 'Chain lubricated.', 3000.00);
INSERT INTO `maintenance` VALUES (87, 85, 87, '2025-09-23 21:00:00', 'Brake cables replaced.', 15000.00);
INSERT INTO `maintenance` VALUES (88, 86, 88, '2025-09-23 21:30:00', 'General check-up.', 2000.00);
INSERT INTO `maintenance` VALUES (89, 87, 89, '2025-09-23 22:00:00', 'Gears tuned.', 7000.00);
INSERT INTO `maintenance` VALUES (90, 88, 90, '2025-09-23 22:30:00', 'Full service.', 20000.00);
INSERT INTO `maintenance` VALUES (91, 90, 91, '2025-09-23 23:00:00', 'Tire pressure check.', 500.00);
INSERT INTO `maintenance` VALUES (92, 91, 92, '2025-09-23 23:30:00', 'Brake pad replacement.', 15000.00);
INSERT INTO `maintenance` VALUES (93, 92, 93, '2025-09-24 00:00:00', 'General cleaning and lubrication.', 6000.00);
INSERT INTO `maintenance` VALUES (94, 93, 94, '2025-09-24 00:30:00', 'Tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (95, 94, 95, '2025-09-24 01:00:00', 'Brake lever tightened.', 3000.00);
INSERT INTO `maintenance` VALUES (96, 95, 96, '2025-09-24 01:30:00', 'Chain tension adjusted.', 4000.00);
INSERT INTO `maintenance` VALUES (97, 97, 97, '2025-09-24 02:00:00', 'Full service and inspection.', 20000.00);
INSERT INTO `maintenance` VALUES (98, 98, 98, '2025-09-24 02:30:00', 'Tire pressure check.', 500.00);
INSERT INTO `maintenance` VALUES (99, 99, 99, '2025-09-24 03:00:00', 'Gears tuned.', 7000.00);
INSERT INTO `maintenance` VALUES (100, 100, 100, '2025-09-24 03:30:00', 'Minor repair to frame.', 10000.00);

-- ----------------------------
-- Table structure for payment
-- ----------------------------
DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment`  (
  `PaymentID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `RentalID` int(10) UNSIGNED NOT NULL,
  `PaymentDate` datetime NOT NULL,
  `Amount` decimal(8, 2) NOT NULL,
  `PaymentMethod` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `TransactionID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`PaymentID`) USING BTREE,
  UNIQUE INDEX `TransactionID`(`TransactionID`) USING BTREE,
  INDEX `RentalID`(`RentalID`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of payment
-- ----------------------------
INSERT INTO `payment` VALUES (1, 1, '2025-09-22 08:31:00', 3000.00, 'Mobile Money', 'TXN-001-2025-09-22');
INSERT INTO `payment` VALUES (2, 2, '2025-09-22 08:46:00', 4000.00, 'Credit Card', 'TXN-002-2025-09-22');
INSERT INTO `payment` VALUES (3, 3, '2025-09-22 08:26:00', 1500.00, 'Cash', 'TXN-003-2025-09-22');
INSERT INTO `payment` VALUES (4, 4, '2025-09-22 08:51:00', 5250.00, 'Mobile Money', 'TXN-004-2025-09-22');
INSERT INTO `payment` VALUES (5, 5, '2025-09-22 09:11:00', 5000.00, 'Credit Card', 'TXN-005-2025-09-22');
INSERT INTO `payment` VALUES (6, 6, '2025-09-22 08:56:00', 3600.00, 'Cash', 'TXN-006-2025-09-22');
INSERT INTO `payment` VALUES (7, 7, '2025-09-22 09:16:00', 4500.00, 'Mobile Money', 'TXN-007-2025-09-22');
INSERT INTO `payment` VALUES (8, 8, '2025-09-22 09:06:00', 6000.00, 'Credit Card', 'TXN-008-2025-09-22');
INSERT INTO `payment` VALUES (9, 9, '2025-09-22 09:11:00', 4500.00, 'Mobile Money', 'TXN-009-2025-09-22');
INSERT INTO `payment` VALUES (10, 10, '2025-09-22 09:31:00', 6750.00, 'Credit Card', 'TXN-010-2025-09-22');
INSERT INTO `payment` VALUES (11, 11, '2025-09-22 09:21:00', 3000.00, 'Mobile Money', 'TXN-011-2025-09-22');
INSERT INTO `payment` VALUES (12, 12, '2025-09-22 09:41:00', 6750.00, 'Cash', 'TXN-012-2025-09-22');
INSERT INTO `payment` VALUES (13, 13, '2025-09-22 09:31:00', 4500.00, 'Credit Card', 'TXN-013-2025-09-22');
INSERT INTO `payment` VALUES (14, 14, '2025-09-22 09:56:00', 7500.00, 'Mobile Money', 'TXN-014-2025-09-22');
INSERT INTO `payment` VALUES (15, 15, '2025-09-22 09:31:00', 2000.00, 'Cash', 'TXN-015-2025-09-22');
INSERT INTO `payment` VALUES (16, 16, '2025-09-22 10:01:00', 9000.00, 'Mobile Money', 'TXN-016-2025-09-22');
INSERT INTO `payment` VALUES (17, 17, '2025-09-22 09:51:00', 4500.00, 'Credit Card', 'TXN-017-2025-09-22');
INSERT INTO `payment` VALUES (18, 18, '2025-09-22 10:06:00', 6000.00, 'Cash', 'TXN-018-2025-09-22');
INSERT INTO `payment` VALUES (19, 19, '2025-09-22 09:46:00', 2250.00, 'Mobile Money', 'TXN-019-2025-09-22');
INSERT INTO `payment` VALUES (20, 20, '2025-09-22 10:21:00', 6750.00, 'Credit Card', 'TXN-020-2025-09-22');
INSERT INTO `payment` VALUES (21, 21, '2025-09-22 10:31:00', 7200.00, 'Cash', 'TXN-021-2025-09-22');
INSERT INTO `payment` VALUES (22, 22, '2025-09-22 10:16:00', 4500.00, 'Mobile Money', 'TXN-022-2025-09-22');
INSERT INTO `payment` VALUES (23, 23, '2025-09-22 10:21:00', 4500.00, 'Credit Card', 'TXN-023-2025-09-22');
INSERT INTO `payment` VALUES (24, 24, '2025-09-22 10:41:00', 4500.00, 'Cash', 'TXN-024-2025-09-22');
INSERT INTO `payment` VALUES (25, 25, '2025-09-22 10:31:00', 3600.00, 'Mobile Money', 'TXN-025-2025-09-22');
INSERT INTO `payment` VALUES (26, 26, '2025-09-22 10:46:00', 4000.00, 'Credit Card', 'TXN-026-2025-09-22');
INSERT INTO `payment` VALUES (27, 27, '2025-09-22 11:01:00', 7500.00, 'Cash', 'TXN-027-2025-09-22');
INSERT INTO `payment` VALUES (28, 28, '2025-09-22 10:31:00', 1500.00, 'Mobile Money', 'TXN-028-2025-09-22');
INSERT INTO `payment` VALUES (29, 29, '2025-09-22 11:11:00', 5000.00, 'Credit Card', 'TXN-029-2025-09-22');
INSERT INTO `payment` VALUES (30, 30, '2025-09-22 11:06:00', 4800.00, 'Cash', 'TXN-030-2025-09-22');
INSERT INTO `payment` VALUES (31, 31, '2025-09-22 11:11:00', 6000.00, 'Mobile Money', 'TXN-031-2025-09-22');
INSERT INTO `payment` VALUES (32, 32, '2025-09-22 11:26:00', 7500.00, 'Credit Card', 'TXN-032-2025-09-22');
INSERT INTO `payment` VALUES (33, 33, '2025-09-22 11:16:00', 5250.00, 'Cash', 'TXN-033-2025-09-22');
INSERT INTO `payment` VALUES (34, 34, '2025-09-22 11:31:00', 6750.00, 'Mobile Money', 'TXN-034-2025-09-22');
INSERT INTO `payment` VALUES (35, 35, '2025-09-22 11:16:00', 2500.00, 'Credit Card', 'TXN-035-2025-09-22');
INSERT INTO `payment` VALUES (36, 36, '2025-09-22 11:41:00', 6750.00, 'Cash', 'TXN-036-2025-09-22');
INSERT INTO `payment` VALUES (37, 37, '2025-09-22 11:31:00', 4500.00, 'Mobile Money', 'TXN-037-2025-09-22');
INSERT INTO `payment` VALUES (38, 38, '2025-09-22 11:46:00', 4000.00, 'Credit Card', 'TXN-038-2025-09-22');
INSERT INTO `payment` VALUES (39, 39, '2025-09-22 12:01:00', 10000.00, 'Cash', 'TXN-039-2025-09-22');
INSERT INTO `payment` VALUES (40, 40, '2025-09-22 11:46:00', 4500.00, 'Mobile Money', 'TXN-040-2025-09-22');
INSERT INTO `payment` VALUES (41, 41, '2025-09-22 12:01:00', 6000.00, 'Credit Card', 'TXN-041-2025-09-22');
INSERT INTO `payment` VALUES (42, 42, '2025-09-22 12:16:00', 7500.00, 'Cash', 'TXN-042-2025-09-22');
INSERT INTO `payment` VALUES (43, 43, '2025-09-22 12:01:00', 4500.00, 'Mobile Money', 'TXN-043-2025-09-22');
INSERT INTO `payment` VALUES (44, 44, '2025-09-22 12:21:00', 8100.00, 'Credit Card', 'TXN-044-2025-09-22');
INSERT INTO `payment` VALUES (45, 45, '2025-09-22 12:11:00', 4500.00, 'Mobile Money', 'TXN-045-2025-09-22');
INSERT INTO `payment` VALUES (46, 46, '2025-09-22 12:26:00', 6000.00, 'Cash', 'TXN-046-2025-09-22');
INSERT INTO `payment` VALUES (47, 47, '2025-09-22 12:36:00', 6750.00, 'Mobile Money', 'TXN-047-2025-09-22');
INSERT INTO `payment` VALUES (48, 48, '2025-09-22 12:31:00', 4200.00, 'Credit Card', 'TXN-048-2025-09-22');
INSERT INTO `payment` VALUES (49, 49, '2025-09-22 12:41:00', 6000.00, 'Cash', 'TXN-049-2025-09-22');
INSERT INTO `payment` VALUES (50, 50, '2025-09-22 12:51:00', 6750.00, 'Mobile Money', 'TXN-050-2025-09-22');
INSERT INTO `payment` VALUES (51, 51, '2025-09-22 12:41:00', 3000.00, 'Credit Card', 'TXN-051-2025-09-22');
INSERT INTO `payment` VALUES (52, 52, '2025-09-22 13:06:00', 9000.00, 'Cash', 'TXN-052-2025-09-22');
INSERT INTO `payment` VALUES (53, 53, '2025-09-22 12:56:00', 4200.00, 'Mobile Money', 'TXN-053-2025-09-22');
INSERT INTO `payment` VALUES (54, 54, '2025-09-22 13:11:00', 5400.00, 'Credit Card', 'TXN-054-2025-09-22');
INSERT INTO `payment` VALUES (55, 55, '2025-09-22 13:16:00', 6750.00, 'Cash', 'TXN-055-2025-09-22');
INSERT INTO `payment` VALUES (56, 56, '2025-09-22 13:01:00', 3750.00, 'Mobile Money', 'TXN-056-2025-09-22');
INSERT INTO `payment` VALUES (57, 57, '2025-09-22 13:21:00', 6000.00, 'Credit Card', 'TXN-057-2025-09-22');
INSERT INTO `payment` VALUES (58, 58, '2025-09-22 13:31:00', 4500.00, 'Cash', 'TXN-058-2025-09-22');
INSERT INTO `payment` VALUES (59, 59, '2025-09-22 13:26:00', 3500.00, 'Mobile Money', 'TXN-059-2025-09-22');
INSERT INTO `payment` VALUES (60, 60, '2025-09-22 13:41:00', 6750.00, 'Credit Card', 'TXN-060-2025-09-22');
INSERT INTO `payment` VALUES (61, 61, '2025-09-22 13:46:00', 6750.00, 'Cash', 'TXN-061-2025-09-22');
INSERT INTO `payment` VALUES (62, 62, '2025-09-22 13:31:00', 2500.00, 'Mobile Money', 'TXN-062-2025-09-22');
INSERT INTO `payment` VALUES (63, 63, '2025-09-22 13:56:00', 9000.00, 'Credit Card', 'TXN-063-2025-09-22');
INSERT INTO `payment` VALUES (64, 64, '2025-09-22 14:01:00', 6750.00, 'Cash', 'TXN-064-2025-09-22');
INSERT INTO `payment` VALUES (65, 65, '2025-09-22 14:06:00', 9000.00, 'Mobile Money', 'TXN-065-2025-09-22');
INSERT INTO `payment` VALUES (66, 66, '2025-09-22 13:56:00', 6000.00, 'Credit Card', 'TXN-066-2025-09-22');
INSERT INTO `payment` VALUES (67, 67, '2025-09-22 14:16:00', 6750.00, 'Cash', 'TXN-067-2025-09-22');
INSERT INTO `payment` VALUES (68, 68, '2025-09-22 14:06:00', 3000.00, 'Mobile Money', 'TXN-068-2025-09-22');
INSERT INTO `payment` VALUES (69, 69, '2025-09-22 14:31:00', 10000.00, 'Credit Card', 'TXN-069-2025-09-22');
INSERT INTO `payment` VALUES (70, 70, '2025-09-22 14:16:00', 3600.00, 'Cash', 'TXN-070-2025-09-22');
INSERT INTO `payment` VALUES (71, 71, '2025-09-22 14:41:00', 5000.00, 'Mobile Money', 'TXN-071-2025-09-22');
INSERT INTO `payment` VALUES (72, 72, '2025-09-22 14:36:00', 4000.00, 'Credit Card', 'TXN-072-2025-09-22');
INSERT INTO `payment` VALUES (73, 73, '2025-09-22 14:46:00', 5400.00, 'Cash', 'TXN-073-2025-09-22');
INSERT INTO `payment` VALUES (74, 74, '2025-09-22 14:51:00', 4500.00, 'Mobile Money', 'TXN-074-2025-09-22');
INSERT INTO `payment` VALUES (75, 75, '2025-09-22 14:41:00', 4500.00, 'Credit Card', 'TXN-075-2025-09-22');
INSERT INTO `payment` VALUES (76, 76, '2025-09-22 14:56:00', 4000.00, 'Cash', 'TXN-076-2025-09-22');
INSERT INTO `payment` VALUES (77, 77, '2025-09-22 15:01:00', 4000.00, 'Mobile Money', 'TXN-077-2025-09-22');
INSERT INTO `payment` VALUES (78, 78, '2025-09-22 15:16:00', 10000.00, 'Credit Card', 'TXN-078-2025-09-22');
INSERT INTO `payment` VALUES (79, 79, '2025-09-22 15:11:00', 6000.00, 'Cash', 'TXN-079-2025-09-22');
INSERT INTO `payment` VALUES (80, 80, '2025-09-22 15:06:00', 4500.00, 'Mobile Money', 'TXN-080-2025-09-22');
INSERT INTO `payment` VALUES (81, 81, '2025-09-22 15:21:00', 4000.00, 'Credit Card', 'TXN-081-2025-09-22');
INSERT INTO `payment` VALUES (82, 82, '2025-09-22 15:31:00', 6750.00, 'Cash', 'TXN-082-2025-09-22');
INSERT INTO `payment` VALUES (83, 83, '2025-09-22 15:21:00', 3000.00, 'Mobile Money', 'TXN-083-2025-09-22');
INSERT INTO `payment` VALUES (84, 84, '2025-09-22 15:46:00', 7500.00, 'Credit Card', 'TXN-084-2025-09-22');
INSERT INTO `payment` VALUES (85, 85, '2025-09-22 15:31:00', 3000.00, 'Mobile Money', 'TXN-085-2025-09-22');
INSERT INTO `payment` VALUES (86, 86, '2025-09-22 15:46:00', 4800.00, 'Cash', 'TXN-086-2025-09-22');
INSERT INTO `payment` VALUES (87, 87, '2025-09-22 15:56:00', 4500.00, 'Mobile Money', 'TXN-087-2025-09-22');
INSERT INTO `payment` VALUES (88, 88, '2025-09-22 15:46:00', 4500.00, 'Credit Card', 'TXN-088-2025-09-22');
INSERT INTO `payment` VALUES (89, 89, '2025-09-22 16:01:00', 6000.00, 'Cash', 'TXN-089-2025-09-22');
INSERT INTO `payment` VALUES (90, 90, '2025-09-22 16:11:00', 4500.00, 'Mobile Money', 'TXN-090-2025-09-22');
INSERT INTO `payment` VALUES (91, 91, '2025-09-22 16:01:00', 4500.00, 'Credit Card', 'TXN-091-2025-09-22');
INSERT INTO `payment` VALUES (92, 92, '2025-09-22 16:21:00', 4500.00, 'Cash', 'TXN-092-2025-09-22');
INSERT INTO `payment` VALUES (93, 93, '2025-09-22 16:31:00', 5000.00, 'Mobile Money', 'TXN-093-2025-09-22');
INSERT INTO `payment` VALUES (94, 94, '2025-09-22 16:16:00', 3000.00, 'Credit Card', 'TXN-094-2025-09-22');
INSERT INTO `payment` VALUES (95, 95, '2025-09-22 16:26:00', 5250.00, 'Mobile Money', 'TXN-095-2025-09-22');
INSERT INTO `payment` VALUES (96, 96, '2025-09-22 16:36:00', 4000.00, 'Cash', 'TXN-096-2025-09-22');
INSERT INTO `payment` VALUES (97, 97, '2025-09-22 16:41:00', 4000.00, 'Mobile Money', 'TXN-097-2025-09-22');
INSERT INTO `payment` VALUES (98, 98, '2025-09-22 16:51:00', 6750.00, 'Credit Card', 'TXN-098-2025-09-22');
INSERT INTO `payment` VALUES (99, 99, '2025-09-22 17:01:00', 5000.00, 'Cash', 'TXN-099-2025-09-22');
INSERT INTO `payment` VALUES (100, 100, '2025-09-22 16:56:00', 4800.00, 'Mobile Money', 'TXN-100-2025-09-22');

-- ----------------------------
-- Table structure for rental
-- ----------------------------
DROP TABLE IF EXISTS `rental`;
CREATE TABLE `rental`  (
  `RentalID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `CustomerID` int(10) UNSIGNED NOT NULL,
  `BikeID` int(10) UNSIGNED NOT NULL,
  `RentalStart` datetime NOT NULL,
  `RentalEnd` datetime NOT NULL,
  `TotalCost` decimal(8, 2) NOT NULL,
  `PaymentStatus` enum('Pending','Paid','Cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`RentalID`) USING BTREE,
  INDEX `CustomerID`(`CustomerID`) USING BTREE,
  INDEX `BikeID`(`BikeID`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of rental
-- ----------------------------
INSERT INTO `rental` VALUES (1, 1, 1, '2025-09-22 08:00:00', '2025-09-22 08:30:00', 3000.00, 'Pending');
INSERT INTO `rental` VALUES (2, 2, 2, '2025-09-22 08:05:00', '2025-09-22 08:45:00', 4000.00, 'Pending');
INSERT INTO `rental` VALUES (3, 3, 3, '2025-09-22 08:10:00', '2025-09-22 08:25:00', 1500.00, 'Paid');
INSERT INTO `rental` VALUES (4, 4, 5, '2025-09-22 08:15:00', '2025-09-22 08:50:00', 5250.00, 'Paid');
INSERT INTO `rental` VALUES (5, 5, 6, '2025-09-22 08:20:00', '2025-09-22 09:10:00', 5000.00, 'Paid');
INSERT INTO `rental` VALUES (6, 6, 7, '2025-09-22 08:25:00', '2025-09-22 08:55:00', 3600.00, 'Paid');
INSERT INTO `rental` VALUES (7, 7, 8, '2025-09-22 08:30:00', '2025-09-22 09:15:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (8, 8, 9, '2025-09-22 08:35:00', '2025-09-22 09:05:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (9, 9, 11, '2025-09-22 08:40:00', '2025-09-22 09:10:00', 4500.00, 'Pending');
INSERT INTO `rental` VALUES (10, 10, 12, '2025-09-22 08:45:00', '2025-09-22 09:30:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (11, 11, 13, '2025-09-22 08:50:00', '2025-09-22 09:20:00', 3000.00, 'Paid');
INSERT INTO `rental` VALUES (12, 12, 14, '2025-09-22 08:55:00', '2025-09-22 09:40:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (13, 13, 16, '2025-09-22 09:00:00', '2025-09-22 09:30:00', 4500.00, 'Pending');
INSERT INTO `rental` VALUES (14, 14, 17, '2025-09-22 09:05:00', '2025-09-22 09:55:00', 7500.00, 'Pending');
INSERT INTO `rental` VALUES (15, 15, 18, '2025-09-22 09:10:00', '2025-09-22 09:30:00', 2000.00, 'Pending');
INSERT INTO `rental` VALUES (16, 16, 19, '2025-09-22 09:15:00', '2025-09-22 10:00:00', 9000.00, 'Pending');
INSERT INTO `rental` VALUES (17, 17, 20, '2025-09-22 09:20:00', '2025-09-22 09:50:00', 4500.00, 'Pending');
INSERT INTO `rental` VALUES (18, 18, 21, '2025-09-22 09:25:00', '2025-09-22 10:05:00', 6000.00, 'Cancelled');
INSERT INTO `rental` VALUES (19, 19, 23, '2025-09-22 09:30:00', '2025-09-22 09:45:00', 2250.00, 'Cancelled');
INSERT INTO `rental` VALUES (20, 20, 24, '2025-09-22 09:35:00', '2025-09-22 10:20:00', 6750.00, 'Cancelled');
INSERT INTO `rental` VALUES (21, 21, 25, '2025-09-22 09:40:00', '2025-09-22 10:30:00', 7200.00, 'Cancelled');
INSERT INTO `rental` VALUES (22, 22, 26, '2025-09-22 09:45:00', '2025-09-22 10:15:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (23, 23, 27, '2025-09-22 09:50:00', '2025-09-22 10:20:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (24, 24, 28, '2025-09-22 09:55:00', '2025-09-22 10:40:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (25, 25, 30, '2025-09-22 10:00:00', '2025-09-22 10:30:00', 3600.00, 'Paid');
INSERT INTO `rental` VALUES (26, 26, 31, '2025-09-22 10:05:00', '2025-09-22 10:45:00', 4000.00, 'Paid');
INSERT INTO `rental` VALUES (27, 27, 32, '2025-09-22 10:10:00', '2025-09-22 11:00:00', 7500.00, 'Paid');
INSERT INTO `rental` VALUES (28, 28, 33, '2025-09-22 10:15:00', '2025-09-22 10:30:00', 1500.00, 'Paid');
INSERT INTO `rental` VALUES (29, 29, 34, '2025-09-22 10:20:00', '2025-09-22 11:10:00', 5000.00, 'Paid');
INSERT INTO `rental` VALUES (30, 30, 35, '2025-09-22 10:25:00', '2025-09-22 11:05:00', 4800.00, 'Paid');
INSERT INTO `rental` VALUES (31, 31, 37, '2025-09-22 10:30:00', '2025-09-22 11:10:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (32, 32, 38, '2025-09-22 10:35:00', '2025-09-22 11:25:00', 7500.00, 'Paid');
INSERT INTO `rental` VALUES (33, 33, 39, '2025-09-22 10:40:00', '2025-09-22 11:15:00', 5250.00, 'Paid');
INSERT INTO `rental` VALUES (34, 34, 41, '2025-09-22 10:45:00', '2025-09-22 11:30:00', 6750.00, 'Cancelled');
INSERT INTO `rental` VALUES (35, 35, 42, '2025-09-22 10:50:00', '2025-09-22 11:15:00', 2500.00, 'Cancelled');
INSERT INTO `rental` VALUES (36, 36, 43, '2025-09-22 10:55:00', '2025-09-22 11:40:00', 6750.00, 'Pending');
INSERT INTO `rental` VALUES (37, 37, 44, '2025-09-22 11:00:00', '2025-09-22 11:30:00', 4500.00, 'Cancelled');
INSERT INTO `rental` VALUES (38, 38, 45, '2025-09-22 11:05:00', '2025-09-22 11:45:00', 4000.00, 'Pending');
INSERT INTO `rental` VALUES (39, 39, 46, '2025-09-22 11:10:00', '2025-09-22 12:00:00', 10000.00, 'Cancelled');
INSERT INTO `rental` VALUES (40, 40, 47, '2025-09-22 11:15:00', '2025-09-22 11:45:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (41, 41, 48, '2025-09-22 11:20:00', '2025-09-22 12:00:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (42, 42, 50, '2025-09-22 11:25:00', '2025-09-22 12:15:00', 7500.00, 'Paid');
INSERT INTO `rental` VALUES (43, 43, 51, '2025-09-22 11:30:00', '2025-09-22 12:00:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (44, 44, 52, '2025-09-22 11:35:00', '2025-09-22 12:20:00', 8100.00, 'Paid');
INSERT INTO `rental` VALUES (45, 45, 53, '2025-09-22 11:40:00', '2025-09-22 12:10:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (46, 46, 54, '2025-09-22 11:45:00', '2025-09-22 12:25:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (47, 47, 55, '2025-09-22 11:50:00', '2025-09-22 12:35:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (48, 48, 56, '2025-09-22 11:55:00', '2025-09-22 12:30:00', 4200.00, 'Paid');
INSERT INTO `rental` VALUES (49, 49, 57, '2025-09-22 12:00:00', '2025-09-22 12:40:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (50, 50, 59, '2025-09-22 12:05:00', '2025-09-22 12:50:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (51, 51, 60, '2025-09-22 12:10:00', '2025-09-22 12:40:00', 3000.00, 'Cancelled');
INSERT INTO `rental` VALUES (52, 52, 61, '2025-09-22 12:15:00', '2025-09-22 13:05:00', 9000.00, 'Cancelled');
INSERT INTO `rental` VALUES (53, 53, 62, '2025-09-22 12:20:00', '2025-09-22 12:55:00', 4200.00, 'Cancelled');
INSERT INTO `rental` VALUES (54, 54, 63, '2025-09-22 12:25:00', '2025-09-22 13:10:00', 5400.00, 'Cancelled');
INSERT INTO `rental` VALUES (55, 55, 64, '2025-09-22 12:30:00', '2025-09-22 13:15:00', 6750.00, 'Cancelled');
INSERT INTO `rental` VALUES (56, 56, 65, '2025-09-22 12:35:00', '2025-09-22 13:00:00', 3750.00, 'Cancelled');
INSERT INTO `rental` VALUES (57, 57, 67, '2025-09-22 12:40:00', '2025-09-22 13:20:00', 6000.00, 'Cancelled');
INSERT INTO `rental` VALUES (58, 58, 68, '2025-09-22 12:45:00', '2025-09-22 13:30:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (59, 59, 70, '2025-09-22 12:50:00', '2025-09-22 13:25:00', 3500.00, 'Paid');
INSERT INTO `rental` VALUES (60, 60, 71, '2025-09-22 12:55:00', '2025-09-22 13:40:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (61, 61, 72, '2025-09-22 13:00:00', '2025-09-22 13:45:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (62, 62, 73, '2025-09-22 13:05:00', '2025-09-22 13:30:00', 2500.00, 'Paid');
INSERT INTO `rental` VALUES (63, 63, 74, '2025-09-22 13:10:00', '2025-09-22 13:55:00', 9000.00, 'Paid');
INSERT INTO `rental` VALUES (64, 64, 75, '2025-09-22 13:15:00', '2025-09-22 14:00:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (65, 65, 76, '2025-09-22 13:20:00', '2025-09-22 14:05:00', 9000.00, 'Paid');
INSERT INTO `rental` VALUES (66, 66, 77, '2025-09-22 13:25:00', '2025-09-22 13:55:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (67, 67, 78, '2025-09-22 13:30:00', '2025-09-22 14:15:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (68, 68, 80, '2025-09-22 13:35:00', '2025-09-22 14:05:00', 3000.00, 'Paid');
INSERT INTO `rental` VALUES (69, 69, 81, '2025-09-22 13:40:00', '2025-09-22 14:30:00', 10000.00, 'Paid');
INSERT INTO `rental` VALUES (70, 70, 82, '2025-09-22 13:45:00', '2025-09-22 14:15:00', 3600.00, 'Paid');
INSERT INTO `rental` VALUES (71, 71, 83, '2025-09-22 13:50:00', '2025-09-22 14:40:00', 5000.00, 'Paid');
INSERT INTO `rental` VALUES (72, 72, 84, '2025-09-22 13:55:00', '2025-09-22 14:35:00', 4000.00, 'Paid');
INSERT INTO `rental` VALUES (73, 73, 85, '2025-09-22 14:00:00', '2025-09-22 14:45:00', 5400.00, 'Paid');
INSERT INTO `rental` VALUES (74, 74, 86, '2025-09-22 14:05:00', '2025-09-22 14:50:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (75, 75, 87, '2025-09-22 14:10:00', '2025-09-22 14:40:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (76, 76, 88, '2025-09-22 14:15:00', '2025-09-22 14:55:00', 4000.00, 'Paid');
INSERT INTO `rental` VALUES (77, 77, 90, '2025-09-22 14:20:00', '2025-09-22 15:00:00', 4000.00, 'Paid');
INSERT INTO `rental` VALUES (78, 78, 91, '2025-09-22 14:25:00', '2025-09-22 15:15:00', 10000.00, 'Paid');
INSERT INTO `rental` VALUES (79, 79, 92, '2025-09-22 14:30:00', '2025-09-22 15:10:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (80, 80, 93, '2025-09-22 14:35:00', '2025-09-22 15:05:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (81, 81, 94, '2025-09-22 14:40:00', '2025-09-22 15:20:00', 4000.00, 'Paid');
INSERT INTO `rental` VALUES (82, 82, 95, '2025-09-22 14:45:00', '2025-09-22 15:30:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (83, 83, 96, '2025-09-22 14:50:00', '2025-09-22 15:20:00', 3000.00, 'Paid');
INSERT INTO `rental` VALUES (84, 84, 97, '2025-09-22 14:55:00', '2025-09-22 15:45:00', 7500.00, 'Paid');
INSERT INTO `rental` VALUES (85, 85, 98, '2025-09-22 15:00:00', '2025-09-22 15:30:00', 3000.00, 'Paid');
INSERT INTO `rental` VALUES (86, 86, 99, '2025-09-22 15:05:00', '2025-09-22 15:45:00', 4800.00, 'Paid');
INSERT INTO `rental` VALUES (87, 87, 100, '2025-09-22 15:10:00', '2025-09-22 15:55:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (88, 88, 4, '2025-09-22 15:15:00', '2025-09-22 15:45:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (89, 89, 10, '2025-09-22 15:20:00', '2025-09-22 16:00:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (90, 90, 15, '2025-09-22 15:25:00', '2025-09-22 16:10:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (91, 91, 22, '2025-09-22 15:30:00', '2025-09-22 16:00:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (92, 92, 29, '2025-09-22 15:35:00', '2025-09-22 16:20:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (93, 93, 36, '2025-09-22 15:40:00', '2025-09-22 16:30:00', 5000.00, 'Paid');
INSERT INTO `rental` VALUES (94, 94, 40, '2025-09-22 15:45:00', '2025-09-22 16:15:00', 3000.00, 'Paid');
INSERT INTO `rental` VALUES (95, 95, 49, '2025-09-22 15:50:00', '2025-09-22 16:25:00', 5250.00, 'Paid');
INSERT INTO `rental` VALUES (96, 96, 58, '2025-09-22 15:55:00', '2025-09-22 16:35:00', 4000.00, 'Paid');
INSERT INTO `rental` VALUES (97, 97, 66, '2025-09-22 16:00:00', '2025-09-22 16:40:00', 4000.00, 'Paid');
INSERT INTO `rental` VALUES (98, 98, 69, '2025-09-22 16:05:00', '2025-09-22 16:50:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (99, 99, 79, '2025-09-22 16:10:00', '2025-09-22 17:00:00', 5000.00, 'Paid');
INSERT INTO `rental` VALUES (100, 100, 89, '2025-09-22 16:15:00', '2025-09-22 16:55:00', 4800.00, 'Paid');

SET FOREIGN_KEY_CHECKS = 1;
=======
/*
 Navicat Premium Dump SQL

 Source Server         : WAMP CONNECTION INSTANCE
 Source Server Type    : MySQL
 Source Server Version : 50714 (5.7.14)
 Source Host           : localhost:3306
 Source Schema         : bike-rental

 Target Server Type    : MySQL
 Target Server Version : 50714 (5.7.14)
 File Encoding         : 65001

 Date: 23/09/2025 14:06:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bike
-- ----------------------------
DROP TABLE IF EXISTS `bike`;
CREATE TABLE `bike`  (
  `BikeID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `BikeSerialNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `Model` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `BikeType` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `CurrentStatus` enum('Available','Rented','In Maintenance') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `LastMaintenanceDate` date NULL DEFAULT NULL,
  `RentalRatePerMinute` decimal(5, 2) NOT NULL,
  `LocationID` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`BikeID`) USING BTREE,
  UNIQUE INDEX `BikeSerialNumber`(`BikeSerialNumber`) USING BTREE,
  INDEX `LocationID`(`LocationID`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bike
-- ----------------------------
INSERT INTO `bike` VALUES (1, 'BIK-001-KMP', 'Trek FX 3 Disc', 'Hybrid', 'Available', '2025-09-20', 100.00, 1);
INSERT INTO `bike` VALUES (2, 'BIK-002-KMP', 'Giant Escape 2', 'City', 'Available', '2025-09-21', 100.00, 2);
INSERT INTO `bike` VALUES (3, 'BIK-003-KMP', 'Specialized Sirrus', 'Hybrid', 'Available', '2025-09-18', 100.00, 3);
INSERT INTO `bike` VALUES (4, 'BIK-004-KMP', 'Cannondale Quick 4', 'Road', 'In Maintenance', '2025-09-15', 150.00, 4);
INSERT INTO `bike` VALUES (5, 'BIK-005-KMP', 'GT Aggressor Pro', 'Mountain', 'Available', '2025-09-19', 150.00, 5);
INSERT INTO `bike` VALUES (6, 'BIK-006-KMP', 'Raleigh Cadent 2', 'Hybrid', 'Available', '2025-09-21', 100.00, 6);
INSERT INTO `bike` VALUES (7, 'BIK-007-KMP', 'Fuji Feather', 'Fixed Gear', 'Available', '2025-09-20', 120.00, 7);
INSERT INTO `bike` VALUES (8, 'BIK-008-KMP', 'Kona Dew', 'City', 'Available', '2025-09-17', 100.00, 8);
INSERT INTO `bike` VALUES (9, 'BIK-009-KMP', 'Schwinn Airdyne', 'Exercise', 'Available', '2025-09-15', 200.00, 9);
INSERT INTO `bike` VALUES (10, 'BIK-010-KMP', 'Trek Marlin 5', 'Mountain', 'In Maintenance', '2025-09-12', 150.00, 10);
INSERT INTO `bike` VALUES (11, 'BIK-011-KMP', 'Giant Contend', 'Road', 'Available', '2025-09-21', 150.00, 11);
INSERT INTO `bike` VALUES (12, 'BIK-012-KMP', 'Specialized Rockhopper', 'Mountain', 'Available', '2025-09-20', 150.00, 12);
INSERT INTO `bike` VALUES (13, 'BIK-013-KMP', 'Cannondale Treadwell', 'Hybrid', 'Available', '2025-09-19', 100.00, 13);
INSERT INTO `bike` VALUES (14, 'BIK-014-KMP', 'GT Avalanche', 'Mountain', 'Available', '2025-09-17', 150.00, 14);
INSERT INTO `bike` VALUES (15, 'BIK-015-KMP', 'Raleigh Redux', 'City', 'In Maintenance', '2025-09-15', 100.00, 15);
INSERT INTO `bike` VALUES (16, 'BIK-016-KMP', 'Fuji Nevada', 'Mountain', 'Available', '2025-09-21', 150.00, 16);
INSERT INTO `bike` VALUES (17, 'BIK-017-KMP', 'Kona Lana\'i', 'Mountain', 'Available', '2025-09-20', 150.00, 17);
INSERT INTO `bike` VALUES (18, 'BIK-018-KMP', 'Hero Hunter', 'Hybrid', 'Available', '2025-09-18', 100.00, 18);
INSERT INTO `bike` VALUES (19, 'BIK-019-KMP', 'Trek Fuel EX 5', 'Mountain', 'Available', '2025-09-16', 200.00, 19);
INSERT INTO `bike` VALUES (20, 'BIK-020-KMP', 'Giant Talon 3', 'Mountain', 'Rented', '2025-09-21', 150.00, 20);
INSERT INTO `bike` VALUES (21, 'BIK-021-KMP', 'Specialized Fuse', 'Mountain', 'Available', '2025-09-20', 150.00, 21);
INSERT INTO `bike` VALUES (22, 'BIK-022-KMP', 'Cannondale Trail 8', 'Mountain', 'In Maintenance', '2025-09-19', 150.00, 22);
INSERT INTO `bike` VALUES (23, 'BIK-023-KMP', 'GT Verb', 'Mountain', 'Available', '2025-09-17', 150.00, 23);
INSERT INTO `bike` VALUES (24, 'BIK-024-KMP', 'Raleigh Carlton', 'Road', 'Available', '2025-09-15', 150.00, 24);
INSERT INTO `bike` VALUES (25, 'BIK-025-KMP', 'Fuji Jari', 'Gravel', 'Available', '2025-09-13', 180.00, 25);
INSERT INTO `bike` VALUES (26, 'BIK-026-KMP', 'Kona Unit', 'Mountain', 'Available', '2025-09-21', 150.00, 26);
INSERT INTO `bike` VALUES (27, 'BIK-027-KMP', 'Schwinn Phocus', 'Road', 'Available', '2025-09-20', 150.00, 27);
INSERT INTO `bike` VALUES (28, 'BIK-028-KMP', 'Trek FX 1 Disc', 'Hybrid', 'Available', '2025-09-18', 100.00, 28);
INSERT INTO `bike` VALUES (29, 'BIK-029-KMP', 'Giant Escape 3 Disc', 'City', 'In Maintenance', '2025-09-16', 100.00, 29);
INSERT INTO `bike` VALUES (30, 'BIK-030-KMP', 'Specialized Sirrus X', 'Hybrid', 'Available', '2025-09-14', 120.00, 30);
INSERT INTO `bike` VALUES (31, 'BIK-031-KMP', 'Cannondale Quick 6', 'Hybrid', 'Available', '2025-09-21', 100.00, 31);
INSERT INTO `bike` VALUES (32, 'BIK-032-KMP', 'GT Aggressor Expert', 'Mountain', 'Available', '2025-09-20', 150.00, 32);
INSERT INTO `bike` VALUES (33, 'BIK-033-KMP', 'Raleigh Cadent 3', 'Hybrid', 'Available', '2025-09-18', 100.00, 33);
INSERT INTO `bike` VALUES (34, 'BIK-034-KMP', 'Fuji Feather CX+', 'Cyclocross', 'Available', '2025-09-16', 180.00, 34);
INSERT INTO `bike` VALUES (35, 'BIK-035-KMP', 'Kona Dew Deluxe', 'City', 'Available', '2025-09-14', 120.00, 35);
INSERT INTO `bike` VALUES (36, 'BIK-036-KMP', 'Schwinn Hybrid', 'Hybrid', 'Rented', '2025-09-21', 100.00, 36);
INSERT INTO `bike` VALUES (37, 'BIK-037-KMP', 'Trek Marlin 6', 'Mountain', 'Available', '2025-09-20', 150.00, 37);
INSERT INTO `bike` VALUES (38, 'BIK-038-KMP', 'Giant Contend AR', 'Road', 'Available', '2025-09-18', 150.00, 38);
INSERT INTO `bike` VALUES (39, 'BIK-039-KMP', 'Specialized Rockhopper Sport', 'Mountain', 'Available', '2025-09-16', 150.00, 39);
INSERT INTO `bike` VALUES (40, 'BIK-040-KMP', 'Cannondale Treadwell 2', 'Hybrid', 'Rented', '2025-09-14', 100.00, 40);
INSERT INTO `bike` VALUES (41, 'BIK-041-KMP', 'GT Avalanche Comp', 'Mountain', 'Available', '2025-09-21', 150.00, 41);
INSERT INTO `bike` VALUES (42, 'BIK-042-KMP', 'Raleigh Redux 2', 'City', 'Available', '2025-09-20', 100.00, 42);
INSERT INTO `bike` VALUES (43, 'BIK-043-KMP', 'Fuji Nevada 1.9', 'Mountain', 'Available', '2025-09-18', 150.00, 43);
INSERT INTO `bike` VALUES (44, 'BIK-044-KMP', 'Kona Lana\'i', 'Mountain', 'Available', '2025-09-16', 150.00, 44);
INSERT INTO `bike` VALUES (45, 'BIK-045-KMP', 'Hero Octane 26T', 'Hybrid', 'Available', '2025-09-14', 100.00, 45);
INSERT INTO `bike` VALUES (46, 'BIK-046-KMP', 'Trek Fuel EX 8', 'Mountain', 'Available', '2025-09-21', 200.00, 46);
INSERT INTO `bike` VALUES (47, 'BIK-047-KMP', 'Giant Talon 4', 'Mountain', 'Available', '2025-09-20', 150.00, 47);
INSERT INTO `bike` VALUES (48, 'BIK-048-KMP', 'Specialized Fuse Comp', 'Mountain', 'Available', '2025-09-18', 150.00, 48);
INSERT INTO `bike` VALUES (49, 'BIK-049-KMP', 'Cannondale Trail 7', 'Mountain', 'Rented', '2025-09-16', 150.00, 49);
INSERT INTO `bike` VALUES (50, 'BIK-050-KMP', 'GT Verb Elite', 'Mountain', 'Available', '2025-09-14', 150.00, 50);
INSERT INTO `bike` VALUES (51, 'BIK-051-KMP', 'Raleigh Carlton 2', 'Road', 'Available', '2025-09-21', 150.00, 51);
INSERT INTO `bike` VALUES (52, 'BIK-052-KMP', 'Fuji Jari 1.3', 'Gravel', 'Available', '2025-09-20', 180.00, 52);
INSERT INTO `bike` VALUES (53, 'BIK-053-KMP', 'Kona Unit X', 'Mountain', 'Available', '2025-09-18', 150.00, 53);
INSERT INTO `bike` VALUES (54, 'BIK-054-KMP', 'Schwinn Phocus 1500', 'Road', 'Available', '2025-09-16', 150.00, 54);
INSERT INTO `bike` VALUES (55, 'BIK-055-KMP', 'Trek Domane AL 2', 'Road', 'Available', '2025-09-14', 150.00, 55);
INSERT INTO `bike` VALUES (56, 'BIK-056-KMP', 'Giant Escape 1', 'City', 'Available', '2025-09-21', 120.00, 56);
INSERT INTO `bike` VALUES (57, 'BIK-057-KMP', 'Specialized Sirrus 2.0', 'Hybrid', 'Available', '2025-09-20', 100.00, 57);
INSERT INTO `bike` VALUES (58, 'BIK-058-KMP', 'Cannondale Quick 5', 'Hybrid', 'Rented', '2025-09-18', 100.00, 58);
INSERT INTO `bike` VALUES (59, 'BIK-059-KMP', 'GT Aggressor Sport', 'Mountain', 'Available', '2025-09-16', 150.00, 59);
INSERT INTO `bike` VALUES (60, 'BIK-060-KMP', 'Raleigh Cadent 4', 'Hybrid', 'Available', '2025-09-14', 100.00, 60);
INSERT INTO `bike` VALUES (61, 'BIK-061-KMP', 'Fuji Feather CX', 'Cyclocross', 'Available', '2025-09-21', 180.00, 61);
INSERT INTO `bike` VALUES (62, 'BIK-062-KMP', 'Kona Dew Plus', 'City', 'Available', '2025-09-20', 120.00, 62);
INSERT INTO `bike` VALUES (63, 'BIK-063-KMP', 'Schwinn Hybrid Elite', 'Hybrid', 'Available', '2025-09-18', 120.00, 63);
INSERT INTO `bike` VALUES (64, 'BIK-064-KMP', 'Trek Marlin 7', 'Mountain', 'Available', '2025-09-16', 150.00, 64);
INSERT INTO `bike` VALUES (65, 'BIK-065-KMP', 'Giant Contend 1', 'Road', 'Available', '2025-09-14', 150.00, 65);
INSERT INTO `bike` VALUES (66, 'BIK-066-KMP', 'Hero Roadstar', 'Hybrid', 'In Maintenance', '2025-09-21', 100.00, 66);
INSERT INTO `bike` VALUES (67, 'BIK-067-KMP', 'Specialized Rockhopper Comp', 'Mountain', 'Available', '2025-09-20', 150.00, 67);
INSERT INTO `bike` VALUES (68, 'BIK-068-KMP', 'Cannondale Treadwell 3', 'Hybrid', 'Available', '2025-09-18', 100.00, 68);
INSERT INTO `bike` VALUES (69, 'BIK-069-KMP', 'GT Avalanche Elite', 'Mountain', 'Rented', '2025-09-16', 150.00, 69);
INSERT INTO `bike` VALUES (70, 'BIK-070-KMP', 'Raleigh Redux 3', 'City', 'Available', '2025-09-14', 100.00, 70);
INSERT INTO `bike` VALUES (71, 'BIK-071-KMP', 'Fuji Nevada 1.7', 'Mountain', 'Available', '2025-09-21', 150.00, 71);
INSERT INTO `bike` VALUES (72, 'BIK-072-KMP', 'Kona Mahuna', 'Mountain', 'Available', '2025-09-20', 150.00, 72);
INSERT INTO `bike` VALUES (73, 'BIK-073-KMP', 'Hero Stark', 'City', 'Available', '2025-09-18', 100.00, 73);
INSERT INTO `bike` VALUES (74, 'BIK-074-KMP', 'Trek Roscoe 6', 'Mountain', 'Available', '2025-09-16', 200.00, 74);
INSERT INTO `bike` VALUES (75, 'BIK-075-KMP', 'Giant ATX 2', 'Mountain', 'Available', '2025-09-14', 150.00, 75);
INSERT INTO `bike` VALUES (76, 'BIK-076-KMP', 'Specialized Stumpjumper', 'Mountain', 'Available', '2025-09-21', 200.00, 76);
INSERT INTO `bike` VALUES (77, 'BIK-077-KMP', 'Cannondale Scalpel HT', 'Mountain', 'Available', '2025-09-20', 200.00, 77);
INSERT INTO `bike` VALUES (78, 'BIK-078-KMP', 'GT Aggressor Pro', 'Mountain', 'Available', '2025-09-18', 150.00, 78);
INSERT INTO `bike` VALUES (79, 'BIK-079-KMP', 'Raleigh Talus', 'Hybrid', 'Rented', '2025-09-16', 100.00, 79);
INSERT INTO `bike` VALUES (80, 'BIK-080-KMP', 'Fuji Absolute', 'City', 'Available', '2025-09-14', 100.00, 80);
INSERT INTO `bike` VALUES (81, 'BIK-081-KMP', 'Kona Honzo', 'Mountain', 'Available', '2025-09-21', 200.00, 81);
INSERT INTO `bike` VALUES (82, 'BIK-082-KMP', 'Schwinn Slick', 'Fixed Gear', 'Available', '2025-09-20', 120.00, 82);
INSERT INTO `bike` VALUES (83, 'BIK-083-KMP', 'Trek Verve 1', 'Hybrid', 'Available', '2025-09-18', 100.00, 83);
INSERT INTO `bike` VALUES (84, 'BIK-084-KMP', 'Giant Escape 2', 'City', 'Available', '2025-09-16', 100.00, 84);
INSERT INTO `bike` VALUES (85, 'BIK-085-KMP', 'Specialized Sirrus X 3.0', 'Hybrid', 'Available', '2025-09-14', 120.00, 85);
INSERT INTO `bike` VALUES (86, 'BIK-086-KMP', 'Cannondale Quick 7', 'Hybrid', 'Available', '2025-09-21', 100.00, 86);
INSERT INTO `bike` VALUES (87, 'BIK-087-KMP', 'GT Aggressor Pro', 'Mountain', 'Available', '2025-09-20', 150.00, 87);
INSERT INTO `bike` VALUES (88, 'BIK-088-KMP', 'Raleigh Cadent 1', 'Hybrid', 'Available', '2025-09-18', 100.00, 88);
INSERT INTO `bike` VALUES (89, 'BIK-089-KMP', 'Fuji Feather', 'Fixed Gear', 'Rented', '2025-09-16', 120.00, 89);
INSERT INTO `bike` VALUES (90, 'BIK-090-KMP', 'Kona Dew', 'City', 'Available', '2025-09-14', 100.00, 90);
INSERT INTO `bike` VALUES (91, 'BIK-091-KMP', 'Schwinn Airdyne Pro', 'Exercise', 'Available', '2025-09-21', 200.00, 91);
INSERT INTO `bike` VALUES (92, 'BIK-092-KMP', 'Trek Marlin 8', 'Mountain', 'Available', '2025-09-20', 150.00, 92);
INSERT INTO `bike` VALUES (93, 'BIK-093-KMP', 'Giant Contend 3', 'Road', 'Available', '2025-09-18', 150.00, 93);
INSERT INTO `bike` VALUES (94, 'BIK-094-KMP', 'Hero Sprint Pro', 'Hybrid', 'Available', '2025-09-16', 100.00, 94);
INSERT INTO `bike` VALUES (95, 'BIK-095-KMP', 'Specialized Rockhopper Elite', 'Mountain', 'Available', '2025-09-14', 150.00, 95);
INSERT INTO `bike` VALUES (96, 'BIK-096-KMP', 'Cannondale Treadwell 4', 'Hybrid', 'Available', '2025-09-21', 100.00, 96);
INSERT INTO `bike` VALUES (97, 'BIK-097-KMP', 'GT Aggressor Pro', 'Mountain', 'Available', '2025-09-20', 150.00, 97);
INSERT INTO `bike` VALUES (98, 'BIK-098-KMP', 'Raleigh Cadent 1', 'Hybrid', 'Available', '2025-09-18', 100.00, 98);
INSERT INTO `bike` VALUES (99, 'BIK-099-KMP', 'Fuji Feather', 'Fixed Gear', 'Available', '2025-09-16', 120.00, 99);
INSERT INTO `bike` VALUES (100, 'BIK-100-KMP', 'Kona Dew', 'City', 'Available', '2025-09-14', 100.00, 100);

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `CustomerID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `NationalID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `FirstName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `LastName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `PhoneNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `DateOfBirth` date NULL DEFAULT NULL,
  `RegistrationDate` datetime NOT NULL,
  `Password` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`CustomerID`) USING BTREE,
  UNIQUE INDEX `NationalID`(`NationalID`) USING BTREE,
  UNIQUE INDEX `Email`(`Email`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES (1, 'CM90000101E09', 'Lwanga', 'Peter', 'lwanga.p@example.com', '256-772-101001', '1995-03-10', '2025-08-01 09:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (2, 'CM90000102E09', 'Nantume', 'Sarah', 'nantume.s@example.com', '256-772-101002', '1998-07-25', '2025-08-01 09:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (3, 'CM90000103E09', 'Ssekandi', 'Andrew', 'ssekandi.a@example.com', '256-772-101003', '1992-11-15', '2025-08-01 09:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (4, 'CM90000104E09', 'Nakalema', 'Mary', 'nakalema.m@example.com', '256-772-101004', '2000-01-05', '2025-08-01 09:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (5, 'CM90000105E09', 'Mukasa', 'Joseph', 'mukasa.j@example.com', '256-772-101005', '1990-08-20', '2025-08-01 09:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (6, 'CM90000106E09', 'Akello', 'Grace', 'akello.g@example.com', '256-772-101006', '1996-04-30', '2025-08-01 09:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (7, 'CM90000107E09', 'Ochola', 'Dennis', 'ochola.d@example.com', '256-772-101007', '1993-02-18', '2025-08-01 09:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (8, 'CM90000108E09', 'Atim', 'Brenda', 'atim.b@example.com', '256-772-101008', '1999-09-01', '2025-08-01 09:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (9, 'CM90000109E09', 'Wasswa', 'Hassan', 'wasswa.h@example.com', '256-772-101009', '1994-06-12', '2025-08-01 09:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (10, 'CM90000110E09', 'Nabatanzi', 'Esther', 'nabatanzi.e@example.com', '256-772-101010', '1997-12-28', '2025-08-01 09:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (11, 'CM90000111E09', 'Kato', 'Ronald', 'kato.r@example.com', '256-772-101011', '1991-03-03', '2025-08-02 10:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (12, 'CM90000112E09', 'Nansubuga', 'Ritah', 'nansubuga.r@example.com', '256-772-101012', '1999-05-22', '2025-08-02 10:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (13, 'CM90000113E09', 'Ssenyonga', 'Fred', 'ssenyonga.f@example.com', '256-772-101013', '1995-09-19', '2025-08-02 10:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (14, 'CM90000114E09', 'Auma', 'Joan', 'auma.j@example.com', '256-772-101014', '1998-04-11', '2025-08-02 10:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (15, 'CM90000115E09', 'Lukwago', 'David', 'lukwago.d@example.com', '256-772-101015', '1990-10-08', '2025-08-02 10:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (16, 'CM90000116E09', 'Nakato', 'Janet', 'nakato.j@example.com', '256-772-101016', '1996-01-28', '2025-08-02 10:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (17, 'CM90000117E09', 'Onyango', 'Paul', 'onyango.p@example.com', '256-772-101017', '1993-08-05', '2025-08-02 10:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (18, 'CM90000118E09', 'Nabisere', 'Catherine', 'nabisere.c@example.com', '256-772-101018', '2000-11-10', '2025-08-02 10:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (19, 'CM90000119E09', 'Ssekitoleko', 'Robert', 'ssekitoleko.r@example.com', '256-772-101019', '1994-07-20', '2025-08-02 10:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (20, 'CM90000120E09', 'Namulindwa', 'Phiona', 'namulindwa.p@example.com', '256-772-101020', '1997-02-14', '2025-08-02 10:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (21, 'CM90000121E09', 'Kyeyune', 'Mike', 'kyeyune.m@example.com', '256-772-101021', '1992-05-01', '2025-08-03 11:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (22, 'CM90000122E09', 'Nakibuuka', 'Esther', 'nakibuuka.e@example.com', '256-772-101022', '1998-03-25', '2025-08-03 11:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (23, 'CM90000123E09', 'Mugisha', 'John', 'mugisha.j@example.com', '256-772-101023', '1995-12-10', '2025-08-03 11:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (24, 'CM90000124E09', 'Nakafeero', 'Grace', 'nakafeero.g@example.com', '256-772-101024', '1999-07-07', '2025-08-03 11:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (25, 'CM90000125E09', 'Lwanga', 'Ronald', 'lwanga.r@example.com', '256-772-101025', '1991-09-02', '2025-08-03 11:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (26, 'CM90000126E09', 'Namaganda', 'Patricia', 'namaganda.p@example.com', '256-772-101026', '1996-06-18', '2025-08-03 11:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (27, 'CM90000127E09', 'Odongo', 'James', 'odongo.j@example.com', '256-772-101027', '1993-01-01', '2025-08-03 11:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (28, 'CM90000128E09', 'Nankunda', 'Annet', 'nankunda.a@example.com', '256-772-101028', '2000-08-28', '2025-08-03 11:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (29, 'CM90000129E09', 'Kalanzi', 'Edward', 'kalanzi.jj@example.com', '256-772-101029', '1994-04-14', '2025-08-03 11:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (30, 'CM90000130E09', 'Nakaggwa', 'Lydia', 'nakaggwa.l@example.com', '256-772-101030', '1997-11-20', '2025-08-03 11:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (31, 'CM90000131E09', 'Semakula', 'Peter', 'semakula.p@example.com', '256-772-101031', '1992-02-09', '2025-08-04 12:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (32, 'CM90000132E09', 'Nakanwagi', 'Judith', 'nakanwagi.j@example.com', '256-772-101032', '1998-05-08', '2025-08-04 12:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (33, 'CM90000133E09', 'Mwesigye', 'Ivan', 'mwesigye.i@example.com', '256-772-101033', '1995-09-29', '2025-08-04 12:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (34, 'CM90000134E09', 'Nagawa', 'Stella', 'nagawa.s@example.com', '256-772-101034', '1999-03-17', '2025-08-04 12:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (35, 'CM90000135E09', 'Musoke', 'Fredrick', 'musoke.f@example.com', '256-772-101035', '1991-08-11', '2025-08-04 12:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (36, 'CM90000136E09', 'Namatovu', 'Brenda', 'namatovu.b@example.com', '256-772-101036', '1996-05-05', '2025-08-04 12:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (37, 'CM90000137E09', 'Sserunjogi', 'Mike', 'sserunjogi.m@example.com', '256-772-101037', '1993-09-30', '2025-08-04 12:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (38, 'CM90000138E09', 'Nabulya', 'Justine', 'nabulya.j@example.com', '256-772-101038', '2000-02-28', '2025-08-04 12:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (39, 'CM90000139E09', 'Kasozi', 'Samuel', 'kasozi.s@example.com', '256-772-101039', '1994-07-07', '2025-08-04 12:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (40, 'CM90000140E09', 'Namusoke', 'Doreen', 'namusoke.d@example.com', '256-772-101040', '1997-12-19', '2025-08-04 12:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (41, 'CM90000141E09', 'Wanyama', 'Eric', 'wanyama.e@example.com', '256-772-101041', '1992-05-09', '2025-08-05 13:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (42, 'CM90000142E09', 'Nabwire', 'Sarah', 'nabwire.s@example.com', '256-772-101042', '1998-03-01', '2025-08-05 13:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (43, 'CM90000143E09', 'Kisitu', 'Henry', 'kisitu.h@example.com', '256-772-101043', '1995-10-23', '2025-08-05 13:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (44, 'CM90000144E09', 'Namatovu', 'Gloria', 'namatovu.g@example.com', '256-772-101044', '1999-04-16', '2025-08-05 13:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (45, 'CM90000145E09', 'Sentongo', 'Geoffrey', 'sentongo.g@example.com', '256-772-101045', '1991-09-08', '2025-08-05 13:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (46, 'CM90000146E09', 'Nakayiza', 'Irene', 'nakayiza.i@example.com', '256-772-101046', '1996-06-25', '2025-08-05 13:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (47, 'CM90000147E09', 'Ssali', 'Joseph', 'ssali.j@example.com', '256-772-101047', '1993-01-13', '2025-08-05 13:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (48, 'CM90000148E09', 'Nakyeyune', 'Cynthia', 'nakyeyune.c@example.com', '256-772-101048', '2000-08-05', '2025-08-05 13:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (49, 'CM90000149E09', 'Mugisha', 'Peter', 'mugisha.p@example.com', '256-772-101049', '1994-04-29', '2025-08-05 13:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (50, 'CM90000150E09', 'Nalubega', 'Diana', 'nalubega.d@example.com', '256-772-101050', '1997-11-04', '2025-08-05 13:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (51, 'CM90000151E09', 'Kasule', 'Godfrey', 'kasule.g@example.com', '256-772-101051', '1992-03-22', '2025-08-06 14:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (52, 'CM90000152E09', 'Namatovu', 'Juliet', 'namatovu.j@example.com', '256-772-101052', '1998-06-19', '2025-08-06 14:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (53, 'CM90000153E09', 'Tumusiime', 'Ronald', 'tumusiime.r@example.com', '256-772-101053', '1995-09-12', '2025-08-06 14:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (54, 'CM90000154E09', 'Nankya', 'Sarah', 'nankya.s@example.com', '256-772-101054', '1999-01-30', '2025-08-06 14:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (55, 'CM90000155E09', 'Katende', 'Paul', 'katende.p@example.com', '256-772-101055', '1991-07-27', '2025-08-06 14:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (56, 'CM90000156E09', 'Namuyomba', 'Jane', 'namuyomba.j@example.com', '256-772-101056', '1996-04-14', '2025-08-06 14:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (57, 'CM90000157E09', 'Odoi', 'Sam', 'odoi.s@example.com', '256-772-101057', '1993-02-12', '2025-08-06 14:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (58, 'CM90000158E09', 'Nakayima', 'Brenda', 'nakayima.b@example.com', '256-772-101058', '2000-09-09', '2025-08-06 14:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (59, 'CM90000159E09', 'Bwambale', 'Peter', 'bwambale.p@example.com', '256-772-101059', '1994-05-18', '2025-08-06 14:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (60, 'CM90000160E09', 'Nassuna', 'Phiona', 'nassuna.p@example.com', '256-772-101060', '1997-12-07', '2025-08-06 14:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (61, 'CM90000161E09', 'Sserwadda', 'John', 'sserwadda.j@example.com', '256-772-101061', '1992-06-25', '2025-08-07 15:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (62, 'CM90000162E09', 'Nalubwama', 'Monica', 'nalubwama.m@example.com', '256-772-101062', '1998-04-20', '2025-08-07 15:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (63, 'CM90000163E09', 'Tumwesigye', 'Joseph', 'tumwesigye.j@example.com', '256-772-101063', '1995-11-13', '2025-08-07 15:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (64, 'CM90000164E09', 'Nakiyingi', 'Lillian', 'nakiyingi.l@example.com', '256-772-101064', '1999-08-08', '2025-08-07 15:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (65, 'CM90000165E09', 'Musisi', 'Peter', 'musisi.p@example.com', '256-772-101065', '1991-03-05', '2025-08-07 15:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (66, 'CM90000166E09', 'Nalukwago', 'Miriam', 'nalukwago.m@example.com', '256-772-101066', '1996-07-23', '2025-08-07 15:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (67, 'CM90000167E09', 'Lubega', 'Hassan', 'lubega.hassan@example.com', '256-772-101067', '1993-04-10', '2025-08-07 15:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (68, 'CM90000168E09', 'Nakabugo', 'Mary', 'nakabugo.m@example.com', '256-772-101068', '2000-01-08', '2025-08-07 15:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (69, 'CM90000169E09', 'Wassajja', 'Patrick', 'wassajja.p@example.com', '256-772-101069', '1994-09-02', '2025-08-07 15:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (70, 'CM90000170E09', 'Namaganda', 'Betty', 'namaganda.b@example.com', '256-772-101070', '1997-03-21', '2025-08-07 15:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (71, 'CM90000171E09', 'Sekadde', 'John', 'sekadde.j@example.com', '256-772-101071', '1992-04-17', '2025-08-08 16:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (72, 'CM90000172E09', 'Nakyeyune', 'Maria', 'nakyeyune.m@example.com', '256-772-101072', '1998-05-15', '2025-08-08 16:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (73, 'CM90000173E09', 'Kyagulanyi', 'Ivan', 'kyagulanyi.i@example.com', '256-772-101073', '1995-12-08', '2025-08-08 16:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (74, 'CM90000174E09', 'Nakitto', 'Joan', 'nakitto.j@example.com', '256-772-101074', '1999-07-29', '2025-08-08 16:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (75, 'CM90000175E09', 'Lubwama', 'Hassan', 'lubwama.h@example.com', '256-772-101075', '1991-09-04', '2025-08-08 16:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (76, 'CM90000176E09', 'Namubiru', 'Brenda', 'namubiru.b@example.com', '256-772-101076', '1996-06-20', '2025-08-08 16:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (77, 'CM90000177E09', 'Okello', 'Patrick', 'okello.p@example.com', '256-772-101077', '1993-01-25', '2025-08-08 16:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (78, 'CM90000178E09', 'Nakyobe', 'Sylvia', 'nakyobe.easter@example.com', '256-772-101078', '2000-08-15', '2025-08-08 16:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (79, 'CM90000179E09', 'Mugambe', 'Fred', 'mugambe.f@example.com', '256-772-101079', '1994-04-03', '2025-08-08 16:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (80, 'CM90000180E09', 'Nansereko', 'Jane', 'nansereko.oo@example.com', '256-772-101080', '1997-11-12', '2025-08-08 16:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (81, 'CM90000181E09', 'Kayanja', 'George', 'kayanja.g@example.com', '256-772-101081', '1992-03-01', '2025-08-09 17:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (82, 'CM90000182E09', 'Nalule', 'Stella', 'nalule.s@example.com', '256-772-101082', '1998-06-05', '2025-08-09 17:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (83, 'CM90000183E09', 'Kavuma', 'Richard', 'kavuma.r@example.com', '256-772-101083', '1995-09-21', '2025-08-09 17:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (84, 'CM90000184E09', 'Nakabuye', 'Christine', 'nakabuye.c@example.com', '256-772-101084', '1999-02-18', '2025-08-09 17:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (85, 'CM90000185E09', 'Mugabo', 'Steven', 'mugabo.s@example.com', '256-772-101085', '1991-07-16', '2025-08-09 17:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (86, 'CM90000186E09', 'Nakimera', 'Rose', 'nakimera.r@example.com', '256-772-101086', '1996-04-09', '2025-08-09 17:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (87, 'CM90000187E09', 'Okeny', 'Simon', 'okeny.sam@example.com', '256-772-101087', '1993-02-04', '2025-08-09 17:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (88, 'CM90000188E09', 'Nabbanja', 'Grace', 'nabbanja.g@example.com', '256-772-101088', '2000-09-19', '2025-08-09 17:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (89, 'CM90000189E09', 'Ssemanda', 'Alex', 'ssemanda.a@example.com', '256-772-101089', '1994-05-11', '2025-08-09 17:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (90, 'CM90000190E09', 'Nansamba', 'Deborah', 'nansamba.diina@example.com', '256-772-101090', '1997-12-01', '2025-08-09 17:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (91, 'CM90000191E09', 'Wasswa', 'Hassan', 'wasswa.h2@example.com', '256-772-101091', '1992-06-08', '2025-08-10 18:00:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (92, 'CM90000192E09', 'Nabukenya', 'Florence', 'nabukenya.f@example.com', '256-772-101092', '1998-04-15', '2025-08-10 18:05:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (93, 'CM90000193E09', 'Kayongo', 'Samuel', 'kayongo.s@example.com', '256-772-101093', '1995-11-09', '2025-08-10 18:10:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (94, 'CM90000194E09', 'Nambooze', 'Sarah', 'nambooze.io@example.com', '256-772-101094', '1999-08-02', '2025-08-10 18:15:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (95, 'CM90000195E09', 'Mutebi', 'Denis', 'mutebi.dan@example.com', '256-772-101095', '1991-03-09', '2025-08-10 18:20:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (96, 'CM90000196E09', 'Nakakawa', 'Monica', 'nakakawa.xx@example.com', '256-772-101096', '1996-07-16', '2025-08-10 18:25:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (97, 'CM90000197E09', 'Kisekka', 'Henry', 'kisekka@example.com', '256-772-101097', '1993-04-05', '2025-08-10 18:30:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (98, 'CM90000198E09', 'Nakaayi', 'Ruth', 'nakaayi.r@example.com', '256-772-101098', '2000-01-01', '2025-08-10 18:35:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (99, 'CM90000199E09', 'Mwanje', 'Joseph', 'mwanje.j@example.com', '256-772-101099', '1994-09-28', '2025-08-10 18:40:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');
INSERT INTO `customer` VALUES (100, 'CM90000200E09', 'Nalumansi', 'Grace', 'nalumansi.g@example.com', '256-772-101100', '1997-03-16', '2025-08-10 18:45:00', '$2a$10$w0uU/y1gN0r2w/y3p4.iO.m5aV7j2u4g5e6l8h9o2sP0w/A1T2t.f.');

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback`  (
  `FeedbackID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `RentalID` int(10) UNSIGNED NOT NULL,
  `Rating` tinyint(4) NOT NULL,
  `Comments` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL,
  `FeedbackDate` datetime NOT NULL,
  PRIMARY KEY (`FeedbackID`) USING BTREE,
  UNIQUE INDEX `RentalID`(`RentalID`) USING BTREE,
  INDEX `Rating`(`Rating`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of feedback
-- ----------------------------
INSERT INTO `feedback` VALUES (1, 1, 5, 'Great bike, very smooth ride.', '2025-09-22 08:35:00');
INSERT INTO `feedback` VALUES (2, 2, 4, 'Bike was a bit old, but service was good.', '2025-09-22 08:50:00');
INSERT INTO `feedback` VALUES (3, 3, 5, 'The staff was very helpful and quick!', '2025-09-22 08:30:00');
INSERT INTO `feedback` VALUES (4, 4, 3, 'Gears were a bit hard to change.', '2025-09-22 08:55:00');
INSERT INTO `feedback` VALUES (5, 5, 5, 'Excellent experience. Will rent again.', '2025-09-22 09:15:00');
INSERT INTO `feedback` VALUES (6, 6, 2, 'The bike had a wobbly pedal.', '2025-09-22 09:00:00');
INSERT INTO `feedback` VALUES (7, 7, 4, 'Good value for money.', '2025-09-22 09:20:00');
INSERT INTO `feedback` VALUES (8, 8, 5, 'Very clean and well-maintained bike.', '2025-09-22 09:10:00');
INSERT INTO `feedback` VALUES (9, 9, 3, 'Seat was a bit uncomfortable for me.', '2025-09-22 09:15:00');
INSERT INTO `feedback` VALUES (10, 10, 4, 'Enjoyed the ride, easy process.', '2025-09-22 09:35:00');
INSERT INTO `feedback` VALUES (11, 11, 5, 'Quick service, staff was friendly.', '2025-09-22 09:25:00');
INSERT INTO `feedback` VALUES (12, 12, 4, 'No issues. The bike was in good condition.', '2025-09-22 09:45:00');
INSERT INTO `feedback` VALUES (13, 13, 3, 'Brakes were squeaky, but worked.', '2025-09-22 09:35:00');
INSERT INTO `feedback` VALUES (14, 14, 5, 'Amazing experience!', '2025-09-22 10:00:00');
INSERT INTO `feedback` VALUES (15, 15, 4, 'Could use more bikes at this location.', '2025-09-22 09:35:00');
INSERT INTO `feedback` VALUES (16, 16, 2, 'Front light was not working.', '2025-09-22 10:05:00');
INSERT INTO `feedback` VALUES (17, 17, 5, 'Perfect!', '2025-09-22 09:55:00');
INSERT INTO `feedback` VALUES (18, 18, 4, 'The bike was a little dirty.', '2025-09-22 10:10:00');
INSERT INTO `feedback` VALUES (19, 19, 5, 'Smooth and easy rental.', '2025-09-22 09:50:00');
INSERT INTO `feedback` VALUES (20, 20, 3, 'Flat tire during the ride.', '2025-09-22 10:25:00');
INSERT INTO `feedback` VALUES (21, 21, 5, 'Very quick check-out process.', '2025-09-22 10:35:00');
INSERT INTO `feedback` VALUES (22, 22, 4, 'Bike was fine, app could be better.', '2025-09-22 10:20:00');
INSERT INTO `feedback` VALUES (23, 23, 5, 'No complaints, a great ride.', '2025-09-22 10:25:00');
INSERT INTO `feedback` VALUES (24, 24, 3, 'Chain made some noise.', '2025-09-22 10:45:00');
INSERT INTO `feedback` VALUES (25, 25, 5, 'Everything worked as expected.', '2025-09-22 10:35:00');
INSERT INTO `feedback` VALUES (26, 26, 4, 'Good condition.', '2025-09-22 10:50:00');
INSERT INTO `feedback` VALUES (27, 27, 5, 'Pleasant staff and smooth process.', '2025-09-22 11:05:00');
INSERT INTO `feedback` VALUES (28, 28, 3, 'The seat was loose.', '2025-09-22 10:35:00');
INSERT INTO `feedback` VALUES (29, 29, 5, 'Perfect ride, thank you.', '2025-09-22 11:15:00');
INSERT INTO `feedback` VALUES (30, 30, 4, 'Bike was fine, but a little scratched.', '2025-09-22 11:10:00');
INSERT INTO `feedback` VALUES (31, 31, 5, 'Excellent.', '2025-09-22 11:15:00');
INSERT INTO `feedback` VALUES (32, 32, 4, 'Smooth ride.', '2025-09-22 11:30:00');
INSERT INTO `feedback` VALUES (33, 33, 3, 'Gears were sticky.', '2025-09-22 11:20:00');
INSERT INTO `feedback` VALUES (34, 34, 5, 'Great.', '2025-09-22 11:35:00');
INSERT INTO `feedback` VALUES (35, 35, 4, 'Good service.', '2025-09-22 11:20:00');
INSERT INTO `feedback` VALUES (36, 36, 2, 'Wobbly handlebar.', '2025-09-22 11:45:00');
INSERT INTO `feedback` VALUES (37, 37, 5, 'No issues at all.', '2025-09-22 11:35:00');
INSERT INTO `feedback` VALUES (38, 38, 4, 'Good condition.', '2025-09-22 11:50:00');
INSERT INTO `feedback` VALUES (39, 39, 5, 'Easy to use.', '2025-09-22 12:05:00');
INSERT INTO `feedback` VALUES (40, 40, 3, 'Felt heavy to pedal.', '2025-09-22 11:50:00');
INSERT INTO `feedback` VALUES (41, 41, 5, 'Wonderful ride.', '2025-09-22 12:05:00');
INSERT INTO `feedback` VALUES (42, 42, 4, 'Bike was slightly worn.', '2025-09-22 12:20:00');
INSERT INTO `feedback` VALUES (43, 43, 5, 'Fast check-in.', '2025-09-22 12:05:00');
INSERT INTO `feedback` VALUES (44, 44, 3, 'Brakes were soft.', '2025-09-22 12:25:00');
INSERT INTO `feedback` VALUES (45, 45, 5, 'Great!', '2025-09-22 12:15:00');
INSERT INTO `feedback` VALUES (46, 46, 4, 'Smooth ride.', '2025-09-22 12:30:00');
INSERT INTO `feedback` VALUES (47, 47, 5, 'Love the service.', '2025-09-22 12:40:00');
INSERT INTO `feedback` VALUES (48, 48, 3, 'Bell was broken.', '2025-09-22 12:35:00');
INSERT INTO `feedback` VALUES (49, 49, 5, 'Excellent!', '2025-09-22 12:45:00');
INSERT INTO `feedback` VALUES (50, 50, 4, 'No complaints, easy.', '2025-09-22 12:55:00');
INSERT INTO `feedback` VALUES (51, 51, 5, 'The bike was in top shape.', '2025-09-22 12:45:00');
INSERT INTO `feedback` VALUES (52, 52, 4, 'Quick and efficient.', '2025-09-22 13:10:00');
INSERT INTO `feedback` VALUES (53, 53, 5, 'Good.', '2025-09-22 13:00:00');
INSERT INTO `feedback` VALUES (54, 54, 3, 'Seat was wobbly.', '2025-09-22 13:15:00');
INSERT INTO `feedback` VALUES (55, 55, 5, 'Staff was very friendly.', '2025-09-22 13:20:00');
INSERT INTO `feedback` VALUES (56, 56, 4, 'No issues.', '2025-09-22 13:05:00');
INSERT INTO `feedback` VALUES (57, 57, 5, 'Great ride.', '2025-09-22 13:25:00');
INSERT INTO `feedback` VALUES (58, 58, 3, 'Brakes were soft.', '2025-09-22 13:35:00');
INSERT INTO `feedback` VALUES (59, 59, 5, 'Smooth process.', '2025-09-22 13:30:00');
INSERT INTO `feedback` VALUES (60, 60, 4, 'Good condition.', '2025-09-22 13:45:00');
INSERT INTO `feedback` VALUES (61, 61, 5, 'Perfect!', '2025-09-22 13:50:00');
INSERT INTO `feedback` VALUES (62, 62, 4, 'Good.', '2025-09-22 13:35:00');
INSERT INTO `feedback` VALUES (63, 63, 5, 'Easy to use.', '2025-09-22 14:00:00');
INSERT INTO `feedback` VALUES (64, 64, 3, 'Chain fell off once.', '2025-09-22 14:05:00');
INSERT INTO `feedback` VALUES (65, 65, 5, 'Great ride.', '2025-09-22 14:10:00');
INSERT INTO `feedback` VALUES (66, 66, 4, 'Bike was fine.', '2025-09-22 14:00:00');
INSERT INTO `feedback` VALUES (67, 67, 5, 'Love it!', '2025-09-22 14:20:00');
INSERT INTO `feedback` VALUES (68, 68, 4, 'Good bike.', '2025-09-22 14:10:00');
INSERT INTO `feedback` VALUES (69, 69, 5, 'No problems.', '2025-09-22 14:35:00');
INSERT INTO `feedback` VALUES (70, 70, 3, 'Gears were hard to shift.', '2025-09-22 14:20:00');
INSERT INTO `feedback` VALUES (71, 71, 5, 'Everything was great.', '2025-09-22 14:45:00');
INSERT INTO `feedback` VALUES (72, 72, 4, 'Brakes were a little soft.', '2025-09-22 14:40:00');
INSERT INTO `feedback` VALUES (73, 73, 5, 'Smooth rental process.', '2025-09-22 14:50:00');
INSERT INTO `feedback` VALUES (74, 74, 3, 'The bike was a bit squeaky.', '2025-09-22 14:55:00');
INSERT INTO `feedback` VALUES (75, 75, 5, 'Great!', '2025-09-22 14:45:00');
INSERT INTO `feedback` VALUES (76, 76, 4, 'Good.', '2025-09-22 15:00:00');
INSERT INTO `feedback` VALUES (77, 77, 5, 'Staff was very helpful.', '2025-09-22 15:05:00');
INSERT INTO `feedback` VALUES (78, 78, 4, 'No complaints.', '2025-09-22 15:20:00');
INSERT INTO `feedback` VALUES (79, 79, 5, 'Perfect.', '2025-09-22 15:15:00');
INSERT INTO `feedback` VALUES (80, 80, 3, 'Seat was wobbly.', '2025-09-22 15:10:00');
INSERT INTO `feedback` VALUES (81, 81, 5, 'Bike was in good condition.', '2025-09-22 15:25:00');
INSERT INTO `feedback` VALUES (82, 82, 4, 'Smooth ride.', '2025-09-22 15:35:00');
INSERT INTO `feedback` VALUES (83, 83, 5, 'Awesome!', '2025-09-22 15:25:00');
INSERT INTO `feedback` VALUES (84, 84, 4, 'Easy to use.', '2025-09-22 15:50:00');
INSERT INTO `feedback` VALUES (85, 85, 5, 'Great service.', '2025-09-22 15:35:00');
INSERT INTO `feedback` VALUES (86, 86, 4, 'No issues.', '2025-09-22 15:50:00');
INSERT INTO `feedback` VALUES (87, 87, 5, 'Perfect.', '2025-09-22 16:00:00');
INSERT INTO `feedback` VALUES (88, 88, 4, 'Bike was well-maintained.', '2025-09-22 15:50:00');
INSERT INTO `feedback` VALUES (89, 89, 5, 'Loved the ride!', '2025-09-22 16:05:00');
INSERT INTO `feedback` VALUES (90, 90, 4, 'Good condition.', '2025-09-22 16:15:00');
INSERT INTO `feedback` VALUES (91, 91, 5, 'Quick process.', '2025-09-22 16:05:00');
INSERT INTO `feedback` VALUES (92, 92, 3, 'Brakes were soft.', '2025-09-22 16:25:00');
INSERT INTO `feedback` VALUES (93, 93, 5, 'Great!', '2025-09-22 16:35:00');
INSERT INTO `feedback` VALUES (94, 94, 4, 'No complaints.', '2025-09-22 16:20:00');
INSERT INTO `feedback` VALUES (95, 95, 5, 'Excellent service.', '2025-09-22 16:30:00');
INSERT INTO `feedback` VALUES (96, 96, 4, 'Bike was fine.', '2025-09-22 16:40:00');
INSERT INTO `feedback` VALUES (97, 97, 5, 'Wonderful.', '2025-09-22 16:45:00');
INSERT INTO `feedback` VALUES (98, 98, 4, 'Smooth ride.', '2025-09-22 16:55:00');
INSERT INTO `feedback` VALUES (99, 99, 5, 'Highly recommend.', '2025-09-22 17:05:00');
INSERT INTO `feedback` VALUES (100, 100, 3, 'Gears were a bit hard to shift.', '2025-09-22 17:00:00');

-- ----------------------------
-- Table structure for location
-- ----------------------------
DROP TABLE IF EXISTS `location`;
CREATE TABLE `location`  (
  `LocationID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `LocationName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `Address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `City` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `PhoneNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `Capacity` int(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`LocationID`) USING BTREE,
  UNIQUE INDEX `LocationName`(`LocationName`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of location
-- ----------------------------
INSERT INTO `location` VALUES (1, 'Makerere Hill Road', '123 Makerere Hill Rd', 'Kampala', '256-772-111221', 50);
INSERT INTO `location` VALUES (2, 'Wandegeya Market', '45 Wandegeya Rd', 'Kampala', '256-772-111222', 40);
INSERT INTO `location` VALUES (3, 'Kiwatule Recreation Centre', '78 Kiwatule Rd', 'Kampala', '256-772-111223', 60);
INSERT INTO `location` VALUES (4, 'Ntinda Junction', '101 Ntinda St', 'Kampala', '256-772-111224', 55);
INSERT INTO `location` VALUES (5, 'Bugolobi Village Mall', '20 Kyadondo Rd', 'Kampala', '256-772-111225', 50);
INSERT INTO `location` VALUES (6, 'Acacia Mall', '16-20 Cooper Rd', 'Kampala', '256-772-111226', 45);
INSERT INTO `location` VALUES (7, 'Nakasero Market', '34 Nakasero Rd', 'Kampala', '256-772-111227', 30);
INSERT INTO `location` VALUES (8, 'Kasubi Tombs', '50 Kasubi Hill Rd', 'Kampala', '256-772-111228', 25);
INSERT INTO `location` VALUES (9, 'Entebbe International Airport', 'Entebbe Rd', 'Entebbe', '256-772-111229', 70);
INSERT INTO `location` VALUES (10, 'Jinja Main Street', '15 Main St', 'Jinja', '256-772-111230', 50);
INSERT INTO `location` VALUES (11, 'Kireka Stone Depot', '88 Kireka Rd', 'Kampala', '256-772-111231', 40);
INSERT INTO `location` VALUES (12, 'Muyenga Tank Hill', '75 Muyenga Rd', 'Kampala', '256-772-111232', 30);
INSERT INTO `location` VALUES (13, 'Busega Taxi Park', '22 Busega Rd', 'Kampala', '256-772-111233', 50);
INSERT INTO `location` VALUES (14, 'Kawempe Main Stage', '19 Kawempe Rd', 'Kampala', '256-772-111234', 60);
INSERT INTO `location` VALUES (15, 'Ggaba Landing Site', '33 Ggaba Rd', 'Kampala', '256-772-111235', 45);
INSERT INTO `location` VALUES (16, 'Wobulenzi Town Centre', '10 Wobulenzi Rd', 'Wobulenzi', '256-772-111236', 35);
INSERT INTO `location` VALUES (17, 'Bombo Barracks', '65 Bombo Rd', 'Bombo', '256-772-111237', 20);
INSERT INTO `location` VALUES (18, 'Nansana Town Council', '90 Nansana Rd', 'Nansana', '256-772-111238', 50);
INSERT INTO `location` VALUES (19, 'Kitgum Central', '55 Kitgum Rd', 'Kitgum', '256-772-111239', 40);
INSERT INTO `location` VALUES (20, 'Lira City Centre', '8 Lira Rd', 'Lira', '256-772-111240', 30);
INSERT INTO `location` VALUES (21, 'Mbarara Town Square', '12 Mbarara Rd', 'Mbarara', '256-772-111241', 55);
INSERT INTO `location` VALUES (22, 'Fort Portal', '44 Fort Portal Rd', 'Fort Portal', '256-772-111242', 45);
INSERT INTO `location` VALUES (23, 'Kasese Town', '11 Kasese Rd', 'Kasese', '256-772-111243', 25);
INSERT INTO `location` VALUES (24, 'Masaka Main', '76 Masaka Rd', 'Masaka', '256-772-111244', 50);
INSERT INTO `location` VALUES (25, 'Hoima City', '99 Hoima Rd', 'Hoima', '256-772-111245', 40);
INSERT INTO `location` VALUES (26, 'Gulu Town', '22 Gulu Rd', 'Gulu', '256-772-111246', 60);
INSERT INTO `location` VALUES (27, 'Arua Hill', '31 Arua Rd', 'Arua', '256-772-111247', 50);
INSERT INTO `location` VALUES (28, 'Kabale Town', '67 Kabale Rd', 'Kabale', '256-772-111248', 30);
INSERT INTO `location` VALUES (29, 'Soroti Central', '88 Soroti Rd', 'Soroti', '256-772-111249', 45);
INSERT INTO `location` VALUES (30, 'Mbale City', '5 Mbale Rd', 'Mbale', '256-772-111250', 50);
INSERT INTO `location` VALUES (31, 'Iganga Market', '44 Iganga Rd', 'Iganga', '256-772-111251', 40);
INSERT INTO `location` VALUES (32, 'Tororo Town', '7 Tororo Rd', 'Tororo', '256-772-111252', 30);
INSERT INTO `location` VALUES (33, 'Entebbe Wildlife Education Centre', '33 Entebbe Rd', 'Entebbe', '256-772-111253', 55);
INSERT INTO `location` VALUES (34, 'Kololo Hill', '11 Kololo Rd', 'Kampala', '256-772-111254', 60);
INSERT INTO `location` VALUES (35, 'Bweyogerere', '56 Bweyogerere Rd', 'Kampala', '256-772-111255', 45);
INSERT INTO `location` VALUES (36, 'Ndejje University', '7 Ndejje Rd', 'Ndejje', '256-772-111256', 20);
INSERT INTO `location` VALUES (37, 'Masindi Town', '18 Masindi Rd', 'Masindi', '256-772-111257', 30);
INSERT INTO `location` VALUES (38, 'Mubende Main', '62 Mubende Rd', 'Mubende', '256-772-111258', 50);
INSERT INTO `location` VALUES (39, 'Jinja Source of the Nile', '2 Jinja Rd', 'Jinja', '256-772-111259', 70);
INSERT INTO `location` VALUES (40, 'Kajjansi Town', '44 Kajjansi Rd', 'Kajjansi', '256-772-111260', 40);
INSERT INTO `location` VALUES (41, 'Kawuku Trading Centre', '57 Kawuku Rd', 'Kawuku', '256-772-111261', 25);
INSERT INTO `location` VALUES (42, 'Busia Border Point', '83 Busia Rd', 'Busia', '256-772-111262', 35);
INSERT INTO `location` VALUES (43, 'Mityana Town', '91 Mityana Rd', 'Mityana', '256-772-111263', 50);
INSERT INTO `location` VALUES (44, 'Wakiso Main', '13 Wakiso Rd', 'Wakiso', '256-772-111264', 60);
INSERT INTO `location` VALUES (45, 'Mpigi Town', '30 Mpigi Rd', 'Mpigi', '256-772-111265', 45);
INSERT INTO `location` VALUES (46, 'Kiryandongo', '67 Kiryandongo Rd', 'Kiryandongo', '256-772-111266', 20);
INSERT INTO `location` VALUES (47, 'Kotido Town', '12 Kotido Rd', 'Kotido', '256-772-111267', 30);
INSERT INTO `location` VALUES (48, 'Moroto City', '88 Moroto Rd', 'Moroto', '256-772-111268', 50);
INSERT INTO `location` VALUES (49, 'Kasese National Park', '4 Kasese Park Rd', 'Kasese', '256-772-111269', 70);
INSERT INTO `location` VALUES (50, 'Jinja Railway Station', '10 Jinja Station Rd', 'Jinja', '256-772-111270', 40);
INSERT INTO `location` VALUES (51, 'Namugongo Martyrs Shrine', '55 Namugongo Rd', 'Kampala', '256-772-111271', 60);
INSERT INTO `location` VALUES (52, 'Kyambogo University', '75 Kyambogo Rd', 'Kampala', '256-772-111272', 50);
INSERT INTO `location` VALUES (53, 'Lugogo Forest Mall', '1 Forest Mall Rd', 'Kampala', '256-772-111273', 45);
INSERT INTO `location` VALUES (54, 'Kansanga Trading Centre', '23 Kansanga Rd', 'Kampala', '256-772-111274', 35);
INSERT INTO `location` VALUES (55, 'Banda Trading Centre', '45 Banda Rd', 'Kampala', '256-772-111275', 50);
INSERT INTO `location` VALUES (56, 'Kisaasi', '66 Kisaasi Rd', 'Kampala', '256-772-111276', 40);
INSERT INTO `location` VALUES (57, 'Naalya Housing Estate', '12 Naalya Rd', 'Kampala', '256-772-111277', 60);
INSERT INTO `location` VALUES (58, 'Mbuya Hill', '89 Mbuya Hill Rd', 'Kampala', '256-772-111278', 30);
INSERT INTO `location` VALUES (59, 'Kitintale Market', '33 Kitintale Rd', 'Kampala', '256-772-111279', 55);
INSERT INTO `location` VALUES (60, 'Kajjansi Airfield', '1 Kajjansi Airfield Rd', 'Kajjansi', '256-772-111280', 25);
INSERT INTO `location` VALUES (61, 'Gayaza Town', '70 Gayaza Rd', 'Gayaza', '256-772-111281', 40);
INSERT INTO `location` VALUES (62, 'Mukono City', '21 Mukono Rd', 'Mukono', '256-772-111282', 50);
INSERT INTO `location` VALUES (63, 'Kayunga Town', '84 Kayunga Rd', 'Kayunga', '256-772-111283', 30);
INSERT INTO `location` VALUES (64, 'Luwero Town', '1 Luwero Rd', 'Luwero', '256-772-111284', 45);
INSERT INTO `location` VALUES (65, 'Bwindi Impenetrable Forest', '1 Bwindi Rd', 'Kanungu', '256-772-111285', 20);
INSERT INTO `location` VALUES (66, 'Murchison Falls National Park', '1 Murchison Rd', 'Masindi', '256-772-111286', 30);
INSERT INTO `location` VALUES (67, 'Queen Elizabeth National Park', '1 Queen Elizabeth Rd', 'Kasese', '256-772-111287', 50);
INSERT INTO `location` VALUES (68, 'Lake Mburo National Park', '1 Lake Mburo Rd', 'Kiruhura', '256-772-111288', 40);
INSERT INTO `location` VALUES (69, 'Sipi Falls', '1 Sipi Falls Rd', 'Kapchorwa', '256-772-111289', 30);
INSERT INTO `location` VALUES (70, 'Lake Bunyonyi', '1 Lake Bunyonyi Rd', 'Kabale', '256-772-111290', 50);
INSERT INTO `location` VALUES (71, 'Ggaba Road Market', '110 Ggaba Rd', 'Kampala', '256-772-111291', 60);
INSERT INTO `location` VALUES (72, 'Kabalagala', '200 Kabalagala Rd', 'Kampala', '256-772-111292', 50);
INSERT INTO `location` VALUES (73, 'Lubaga Road', '55 Lubaga Rd', 'Kampala', '256-772-111293', 40);
INSERT INTO `location` VALUES (74, 'Busega', '1 Busega Trading Centre', 'Kampala', '256-772-111294', 30);
INSERT INTO `location` VALUES (75, 'Ntinda Industrial Area', '10 Ntinda Rd', 'Kampala', '256-772-111295', 55);
INSERT INTO `location` VALUES (76, 'Kireka Trading Centre', '7 Kireka Rd', 'Kampala', '256-772-111296', 45);
INSERT INTO `location` VALUES (77, 'Kyaliwajjala', '35 Kyaliwajjala Rd', 'Kampala', '256-772-111297', 25);
INSERT INTO `location` VALUES (78, 'Bwaise', '2 Bwaise Rd', 'Kampala', '256-772-111298', 50);
INSERT INTO `location` VALUES (79, 'Namirembe Cathedral', '1 Namirembe Rd', 'Kampala', '256-772-111299', 40);
INSERT INTO `location` VALUES (80, 'Kawempe T-Junction', '40 Kawempe Rd', 'Kampala', '256-772-111300', 30);
INSERT INTO `location` VALUES (81, 'Kamwokya', '1 Kamwokya Rd', 'Kampala', '256-772-111301', 50);
INSERT INTO `location` VALUES (82, 'Kitgum Central Market', '88 Kitgum Market Rd', 'Kitgum', '256-772-111302', 60);
INSERT INTO `location` VALUES (83, 'Lira Main Street', '12 Lira St', 'Lira', '256-772-111303', 45);
INSERT INTO `location` VALUES (84, 'Mbarara University', '20 Mbarara University Rd', 'Mbarara', '256-772-111304', 20);
INSERT INTO `location` VALUES (85, 'Fort Portal City', '77 Fort Portal City Rd', 'Fort Portal', '256-772-111305', 30);
INSERT INTO `location` VALUES (86, 'Kasese Main', '3 Kasese Main Rd', 'Kasese', '256-772-111306', 50);
INSERT INTO `location` VALUES (87, 'Masaka Town Square', '45 Masaka Square Rd', 'Masaka', '256-772-111307', 40);
INSERT INTO `location` VALUES (88, 'Hoima Oil City', '9 Hoima Oil Rd', 'Hoima', '256-772-111308', 30);
INSERT INTO `location` VALUES (89, 'Gulu University', '6 Gulu University Rd', 'Gulu', '256-772-111309', 50);
INSERT INTO `location` VALUES (90, 'Arua Main Market', '15 Arua Market Rd', 'Arua', '256-772-111310', 60);
INSERT INTO `location` VALUES (91, 'Kabale Main Road', '50 Kabale Main Rd', 'Kabale', '256-772-111311', 45);
INSERT INTO `location` VALUES (92, 'Soroti Town Centre', '2 Soroti Centre Rd', 'Soroti', '256-772-111312', 20);
INSERT INTO `location` VALUES (93, 'Mbale Industrial Park', '10 Mbale Park Rd', 'Mbale', '256-772-111313', 30);
INSERT INTO `location` VALUES (94, 'Iganga Central Market', '5 Iganga Central Rd', 'Iganga', '256-772-111314', 50);
INSERT INTO `location` VALUES (95, 'Tororo Cement', '1 Tororo Cement Rd', 'Tororo', '256-772-111315', 40);
INSERT INTO `location` VALUES (96, 'Wobulenzi Main Market', '20 Wobulenzi Market Rd', 'Wobulenzi', '256-772-111316', 30);
INSERT INTO `location` VALUES (97, 'Entebbe Old Town', '6 Entebbe Old Town Rd', 'Entebbe', '256-772-111317', 50);
INSERT INTO `location` VALUES (98, 'Bweyogerere Industrial Park', '3 Bweyogerere Park Rd', 'Kampala', '256-772-111318', 60);
INSERT INTO `location` VALUES (99, 'Nansana Market', '15 Nansana Market Rd', 'Nansana', '256-772-111319', 45);
INSERT INTO `location` VALUES (100, 'Kireka Business Centre', '4 Kireka Business Rd', 'Kampala', '256-772-111320', 25);

-- ----------------------------
-- Table structure for maintenance
-- ----------------------------
DROP TABLE IF EXISTS `maintenance`;
CREATE TABLE `maintenance`  (
  `MaintenanceID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `BikeID` int(10) UNSIGNED NOT NULL,
  `StaffID` int(10) UNSIGNED NOT NULL,
  `MaintenanceDate` datetime NOT NULL,
  `Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `Cost` decimal(8, 2) NOT NULL,
  PRIMARY KEY (`MaintenanceID`) USING BTREE,
  INDEX `BikeID`(`BikeID`) USING BTREE,
  INDEX `StaffID`(`StaffID`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of maintenance
-- ----------------------------
INSERT INTO `maintenance` VALUES (1, 4, 1, '2025-09-16 10:00:00', 'Flat tire on front wheel, replaced inner tube.', 15000.00);
INSERT INTO `maintenance` VALUES (2, 10, 2, '2025-09-13 11:30:00', 'Brake pads replaced and adjusted.', 20000.00);
INSERT INTO `maintenance` VALUES (3, 15, 3, '2025-09-16 14:00:00', 'Gears were not shifting smoothly, full tune-up performed.', 35000.00);
INSERT INTO `maintenance` VALUES (4, 22, 4, '2025-09-20 09:15:00', 'Handlebars loose, tightened and checked for security.', 5000.00);
INSERT INTO `maintenance` VALUES (5, 29, 5, '2025-09-17 12:00:00', 'Chain fell off, re-installed and lubricated.', 10000.00);
INSERT INTO `maintenance` VALUES (6, 36, 6, '2025-09-22 08:30:00', 'Wobbly pedal, replaced axle.', 18000.00);
INSERT INTO `maintenance` VALUES (7, 40, 7, '2025-09-22 09:00:00', 'Brakes felt spongy, bled fluid and replaced pads.', 25000.00);
INSERT INTO `maintenance` VALUES (8, 49, 8, '2025-09-17 15:45:00', 'Seat post clamp broken, replaced with a new one.', 12000.00);
INSERT INTO `maintenance` VALUES (9, 58, 9, '2025-09-19 10:00:00', 'Headlight not working, replaced bulb and checked wiring.', 8000.00);
INSERT INTO `maintenance` VALUES (10, 66, 10, '2025-09-22 10:30:00', 'Chain is rusty and making noise, cleaned and lubricated.', 7500.00);
INSERT INTO `maintenance` VALUES (11, 69, 11, '2025-09-17 11:00:00', 'Spokes are bent on the rear wheel, trued the wheel.', 22000.00);
INSERT INTO `maintenance` VALUES (12, 79, 12, '2025-09-17 14:00:00', 'Frame has minor scratches, polished and buffed.', 5000.00);
INSERT INTO `maintenance` VALUES (13, 89, 13, '2025-09-17 16:30:00', 'Flat tire, inner tube replaced.', 15000.00);
INSERT INTO `maintenance` VALUES (14, 96, 14, '2025-09-22 11:00:00', 'Brakes are weak, adjusted tension and inspected cables.', 12000.00);
INSERT INTO `maintenance` VALUES (15, 1, 15, '2025-09-22 09:00:00', 'General check-up and tire pressure adjustment.', 2000.00);
INSERT INTO `maintenance` VALUES (16, 2, 16, '2025-09-22 09:30:00', 'Brake cable lubricated.', 3000.00);
INSERT INTO `maintenance` VALUES (17, 3, 17, '2025-09-22 10:00:00', 'Chain cleaned and tensioned.', 5000.00);
INSERT INTO `maintenance` VALUES (18, 5, 18, '2025-09-22 10:30:00', 'Gears tuned for smoother shifting.', 7000.00);
INSERT INTO `maintenance` VALUES (19, 6, 19, '2025-09-22 11:00:00', 'Quick safety check.', 1000.00);
INSERT INTO `maintenance` VALUES (20, 7, 20, '2025-09-22 11:30:00', 'Rear tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (21, 8, 21, '2025-09-22 12:00:00', 'Brake lever tightened.', 3000.00);
INSERT INTO `maintenance` VALUES (22, 9, 22, '2025-09-22 12:30:00', 'Seat post height adjusted.', 2000.00);
INSERT INTO `maintenance` VALUES (23, 11, 23, '2025-09-22 13:00:00', 'Full service, including chain and gear check.', 15000.00);
INSERT INTO `maintenance` VALUES (24, 12, 24, '2025-09-22 13:30:00', 'Brake caliper inspection.', 4000.00);
INSERT INTO `maintenance` VALUES (25, 13, 25, '2025-09-22 14:00:00', 'Tire pressure check and inflation.', 500.00);
INSERT INTO `maintenance` VALUES (26, 14, 26, '2025-09-22 14:30:00', 'Handlebar grips replaced.', 8000.00);
INSERT INTO `maintenance` VALUES (27, 16, 27, '2025-09-22 15:00:00', 'General cleaning and lubrication.', 6000.00);
INSERT INTO `maintenance` VALUES (28, 17, 28, '2025-09-22 15:30:00', 'Chain tension adjusted.', 4000.00);
INSERT INTO `maintenance` VALUES (29, 18, 29, '2025-09-22 16:00:00', 'Pedal check, replaced one.', 10000.00);
INSERT INTO `maintenance` VALUES (30, 19, 30, '2025-09-22 16:30:00', 'Brake pad inspection, replaced worn pads.', 15000.00);
INSERT INTO `maintenance` VALUES (31, 20, 31, '2025-09-22 17:00:00', 'Tire puncture repair.', 10000.00);
INSERT INTO `maintenance` VALUES (32, 21, 32, '2025-09-22 17:30:00', 'Quick safety check.', 1000.00);
INSERT INTO `maintenance` VALUES (33, 23, 33, '2025-09-22 18:00:00', 'Gears tuned.', 7000.00);
INSERT INTO `maintenance` VALUES (34, 24, 34, '2025-09-22 18:30:00', 'Tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (35, 25, 35, '2025-09-22 19:00:00', 'Brake lever adjusted.', 3000.00);
INSERT INTO `maintenance` VALUES (36, 26, 36, '2025-09-22 19:30:00', 'Chain lubed.', 3000.00);
INSERT INTO `maintenance` VALUES (37, 27, 37, '2025-09-22 20:00:00', 'Full service and check-up.', 20000.00);
INSERT INTO `maintenance` VALUES (38, 28, 38, '2025-09-22 20:30:00', 'Tire pressure check.', 500.00);
INSERT INTO `maintenance` VALUES (39, 30, 39, '2025-09-22 21:00:00', 'Brake pads replaced.', 15000.00);
INSERT INTO `maintenance` VALUES (40, 31, 40, '2025-09-22 21:30:00', 'Minor repair on bike frame.', 10000.00);
INSERT INTO `maintenance` VALUES (41, 32, 41, '2025-09-22 22:00:00', 'Chain replaced.', 25000.00);
INSERT INTO `maintenance` VALUES (42, 33, 42, '2025-09-22 22:30:00', 'General check-up.', 2000.00);
INSERT INTO `maintenance` VALUES (43, 34, 43, '2025-09-22 23:00:00', 'Tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (44, 35, 44, '2025-09-22 23:30:00', 'Brake lever tightened.', 3000.00);
INSERT INTO `maintenance` VALUES (45, 37, 45, '2025-09-23 00:00:00', 'Gears tuned.', 7000.00);
INSERT INTO `maintenance` VALUES (46, 38, 46, '2025-09-23 00:30:00', 'Full service.', 20000.00);
INSERT INTO `maintenance` VALUES (47, 39, 47, '2025-09-23 01:00:00', 'Tire pressure check and inflation.', 500.00);
INSERT INTO `maintenance` VALUES (48, 41, 48, '2025-09-23 01:30:00', 'Chain lubricated.', 3000.00);
INSERT INTO `maintenance` VALUES (49, 42, 49, '2025-09-23 02:00:00', 'Brake system inspection.', 10000.00);
INSERT INTO `maintenance` VALUES (50, 43, 50, '2025-09-23 02:30:00', 'Seat post tightened.', 2000.00);
INSERT INTO `maintenance` VALUES (51, 44, 51, '2025-09-23 03:00:00', 'General check-up.', 2000.00);
INSERT INTO `maintenance` VALUES (52, 45, 52, '2025-09-23 03:30:00', 'Tire pressure adjustment.', 500.00);
INSERT INTO `maintenance` VALUES (53, 46, 53, '2025-09-23 04:00:00', 'Brake pad replacement.', 15000.00);
INSERT INTO `maintenance` VALUES (54, 47, 54, '2025-09-23 04:30:00', 'Gears tuned.', 7000.00);
INSERT INTO `maintenance` VALUES (55, 48, 55, '2025-09-23 05:00:00', 'Chain cleaned and lubed.', 5000.00);
INSERT INTO `maintenance` VALUES (56, 50, 56, '2025-09-23 05:30:00', 'Full safety check.', 10000.00);
INSERT INTO `maintenance` VALUES (57, 51, 57, '2025-09-23 06:00:00', 'Tire pressure check.', 500.00);
INSERT INTO `maintenance` VALUES (58, 52, 58, '2025-09-23 06:30:00', 'Brake adjustment.', 5000.00);
INSERT INTO `maintenance` VALUES (59, 53, 59, '2025-09-23 07:00:00', 'General maintenance.', 8000.00);
INSERT INTO `maintenance` VALUES (60, 54, 60, '2025-09-23 07:30:00', 'Minor repair to frame.', 10000.00);
INSERT INTO `maintenance` VALUES (61, 55, 61, '2025-09-23 08:00:00', 'Tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (62, 56, 62, '2025-09-23 08:30:00', 'Chain lubricated.', 3000.00);
INSERT INTO `maintenance` VALUES (63, 57, 63, '2025-09-23 09:00:00', 'Brake cables replaced.', 15000.00);
INSERT INTO `maintenance` VALUES (64, 59, 64, '2025-09-23 09:30:00', 'General check-up.', 2000.00);
INSERT INTO `maintenance` VALUES (65, 60, 65, '2025-09-23 10:00:00', 'Gears tuned.', 7000.00);
INSERT INTO `maintenance` VALUES (66, 61, 66, '2025-09-23 10:30:00', 'Full service.', 20000.00);
INSERT INTO `maintenance` VALUES (67, 62, 67, '2025-09-23 11:00:00', 'Tire pressure check.', 500.00);
INSERT INTO `maintenance` VALUES (68, 63, 68, '2025-09-23 11:30:00', 'Brake pad replacement.', 15000.00);
INSERT INTO `maintenance` VALUES (69, 64, 69, '2025-09-23 12:00:00', 'General cleaning and lubrication.', 6000.00);
INSERT INTO `maintenance` VALUES (70, 65, 70, '2025-09-23 12:30:00', 'Tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (71, 67, 71, '2025-09-23 13:00:00', 'Brake lever tightened.', 3000.00);
INSERT INTO `maintenance` VALUES (72, 68, 72, '2025-09-23 13:30:00', 'Chain tension adjusted.', 4000.00);
INSERT INTO `maintenance` VALUES (73, 70, 73, '2025-09-23 14:00:00', 'Full service and inspection.', 20000.00);
INSERT INTO `maintenance` VALUES (74, 71, 74, '2025-09-23 14:30:00', 'Tire pressure check.', 500.00);
INSERT INTO `maintenance` VALUES (75, 72, 75, '2025-09-23 15:00:00', 'Gears tuned.', 7000.00);
INSERT INTO `maintenance` VALUES (76, 73, 76, '2025-09-23 15:30:00', 'Minor repair on bike frame.', 10000.00);
INSERT INTO `maintenance` VALUES (77, 74, 77, '2025-09-23 16:00:00', 'Tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (78, 75, 78, '2025-09-23 16:30:00', 'Brake caliper replacement.', 20000.00);
INSERT INTO `maintenance` VALUES (79, 76, 79, '2025-09-23 17:00:00', 'General check-up.', 2000.00);
INSERT INTO `maintenance` VALUES (80, 77, 80, '2025-09-23 17:30:00', 'Tire pressure check.', 500.00);
INSERT INTO `maintenance` VALUES (81, 78, 81, '2025-09-23 18:00:00', 'Chain lubricated.', 3000.00);
INSERT INTO `maintenance` VALUES (82, 80, 82, '2025-09-23 18:30:00', 'Brake adjustment.', 5000.00);
INSERT INTO `maintenance` VALUES (83, 81, 83, '2025-09-23 19:00:00', 'Full service and inspection.', 20000.00);
INSERT INTO `maintenance` VALUES (84, 82, 84, '2025-09-23 19:30:00', 'Minor repair to frame.', 10000.00);
INSERT INTO `maintenance` VALUES (85, 83, 85, '2025-09-23 20:00:00', 'Tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (86, 84, 86, '2025-09-23 20:30:00', 'Chain lubricated.', 3000.00);
INSERT INTO `maintenance` VALUES (87, 85, 87, '2025-09-23 21:00:00', 'Brake cables replaced.', 15000.00);
INSERT INTO `maintenance` VALUES (88, 86, 88, '2025-09-23 21:30:00', 'General check-up.', 2000.00);
INSERT INTO `maintenance` VALUES (89, 87, 89, '2025-09-23 22:00:00', 'Gears tuned.', 7000.00);
INSERT INTO `maintenance` VALUES (90, 88, 90, '2025-09-23 22:30:00', 'Full service.', 20000.00);
INSERT INTO `maintenance` VALUES (91, 90, 91, '2025-09-23 23:00:00', 'Tire pressure check.', 500.00);
INSERT INTO `maintenance` VALUES (92, 91, 92, '2025-09-23 23:30:00', 'Brake pad replacement.', 15000.00);
INSERT INTO `maintenance` VALUES (93, 92, 93, '2025-09-24 00:00:00', 'General cleaning and lubrication.', 6000.00);
INSERT INTO `maintenance` VALUES (94, 93, 94, '2025-09-24 00:30:00', 'Tire inflated.', 500.00);
INSERT INTO `maintenance` VALUES (95, 94, 95, '2025-09-24 01:00:00', 'Brake lever tightened.', 3000.00);
INSERT INTO `maintenance` VALUES (96, 95, 96, '2025-09-24 01:30:00', 'Chain tension adjusted.', 4000.00);
INSERT INTO `maintenance` VALUES (97, 97, 97, '2025-09-24 02:00:00', 'Full service and inspection.', 20000.00);
INSERT INTO `maintenance` VALUES (98, 98, 98, '2025-09-24 02:30:00', 'Tire pressure check.', 500.00);
INSERT INTO `maintenance` VALUES (99, 99, 99, '2025-09-24 03:00:00', 'Gears tuned.', 7000.00);
INSERT INTO `maintenance` VALUES (100, 100, 100, '2025-09-24 03:30:00', 'Minor repair to frame.', 10000.00);

-- ----------------------------
-- Table structure for payment
-- ----------------------------
DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment`  (
  `PaymentID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `RentalID` int(10) UNSIGNED NOT NULL,
  `PaymentDate` datetime NOT NULL,
  `Amount` decimal(8, 2) NOT NULL,
  `PaymentMethod` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `TransactionID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`PaymentID`) USING BTREE,
  UNIQUE INDEX `TransactionID`(`TransactionID`) USING BTREE,
  INDEX `RentalID`(`RentalID`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of payment
-- ----------------------------
INSERT INTO `payment` VALUES (1, 1, '2025-09-22 08:31:00', 3000.00, 'Mobile Money', 'TXN-001-2025-09-22');
INSERT INTO `payment` VALUES (2, 2, '2025-09-22 08:46:00', 4000.00, 'Credit Card', 'TXN-002-2025-09-22');
INSERT INTO `payment` VALUES (3, 3, '2025-09-22 08:26:00', 1500.00, 'Cash', 'TXN-003-2025-09-22');
INSERT INTO `payment` VALUES (4, 4, '2025-09-22 08:51:00', 5250.00, 'Mobile Money', 'TXN-004-2025-09-22');
INSERT INTO `payment` VALUES (5, 5, '2025-09-22 09:11:00', 5000.00, 'Credit Card', 'TXN-005-2025-09-22');
INSERT INTO `payment` VALUES (6, 6, '2025-09-22 08:56:00', 3600.00, 'Cash', 'TXN-006-2025-09-22');
INSERT INTO `payment` VALUES (7, 7, '2025-09-22 09:16:00', 4500.00, 'Mobile Money', 'TXN-007-2025-09-22');
INSERT INTO `payment` VALUES (8, 8, '2025-09-22 09:06:00', 6000.00, 'Credit Card', 'TXN-008-2025-09-22');
INSERT INTO `payment` VALUES (9, 9, '2025-09-22 09:11:00', 4500.00, 'Mobile Money', 'TXN-009-2025-09-22');
INSERT INTO `payment` VALUES (10, 10, '2025-09-22 09:31:00', 6750.00, 'Credit Card', 'TXN-010-2025-09-22');
INSERT INTO `payment` VALUES (11, 11, '2025-09-22 09:21:00', 3000.00, 'Mobile Money', 'TXN-011-2025-09-22');
INSERT INTO `payment` VALUES (12, 12, '2025-09-22 09:41:00', 6750.00, 'Cash', 'TXN-012-2025-09-22');
INSERT INTO `payment` VALUES (13, 13, '2025-09-22 09:31:00', 4500.00, 'Credit Card', 'TXN-013-2025-09-22');
INSERT INTO `payment` VALUES (14, 14, '2025-09-22 09:56:00', 7500.00, 'Mobile Money', 'TXN-014-2025-09-22');
INSERT INTO `payment` VALUES (15, 15, '2025-09-22 09:31:00', 2000.00, 'Cash', 'TXN-015-2025-09-22');
INSERT INTO `payment` VALUES (16, 16, '2025-09-22 10:01:00', 9000.00, 'Mobile Money', 'TXN-016-2025-09-22');
INSERT INTO `payment` VALUES (17, 17, '2025-09-22 09:51:00', 4500.00, 'Credit Card', 'TXN-017-2025-09-22');
INSERT INTO `payment` VALUES (18, 18, '2025-09-22 10:06:00', 6000.00, 'Cash', 'TXN-018-2025-09-22');
INSERT INTO `payment` VALUES (19, 19, '2025-09-22 09:46:00', 2250.00, 'Mobile Money', 'TXN-019-2025-09-22');
INSERT INTO `payment` VALUES (20, 20, '2025-09-22 10:21:00', 6750.00, 'Credit Card', 'TXN-020-2025-09-22');
INSERT INTO `payment` VALUES (21, 21, '2025-09-22 10:31:00', 7200.00, 'Cash', 'TXN-021-2025-09-22');
INSERT INTO `payment` VALUES (22, 22, '2025-09-22 10:16:00', 4500.00, 'Mobile Money', 'TXN-022-2025-09-22');
INSERT INTO `payment` VALUES (23, 23, '2025-09-22 10:21:00', 4500.00, 'Credit Card', 'TXN-023-2025-09-22');
INSERT INTO `payment` VALUES (24, 24, '2025-09-22 10:41:00', 4500.00, 'Cash', 'TXN-024-2025-09-22');
INSERT INTO `payment` VALUES (25, 25, '2025-09-22 10:31:00', 3600.00, 'Mobile Money', 'TXN-025-2025-09-22');
INSERT INTO `payment` VALUES (26, 26, '2025-09-22 10:46:00', 4000.00, 'Credit Card', 'TXN-026-2025-09-22');
INSERT INTO `payment` VALUES (27, 27, '2025-09-22 11:01:00', 7500.00, 'Cash', 'TXN-027-2025-09-22');
INSERT INTO `payment` VALUES (28, 28, '2025-09-22 10:31:00', 1500.00, 'Mobile Money', 'TXN-028-2025-09-22');
INSERT INTO `payment` VALUES (29, 29, '2025-09-22 11:11:00', 5000.00, 'Credit Card', 'TXN-029-2025-09-22');
INSERT INTO `payment` VALUES (30, 30, '2025-09-22 11:06:00', 4800.00, 'Cash', 'TXN-030-2025-09-22');
INSERT INTO `payment` VALUES (31, 31, '2025-09-22 11:11:00', 6000.00, 'Mobile Money', 'TXN-031-2025-09-22');
INSERT INTO `payment` VALUES (32, 32, '2025-09-22 11:26:00', 7500.00, 'Credit Card', 'TXN-032-2025-09-22');
INSERT INTO `payment` VALUES (33, 33, '2025-09-22 11:16:00', 5250.00, 'Cash', 'TXN-033-2025-09-22');
INSERT INTO `payment` VALUES (34, 34, '2025-09-22 11:31:00', 6750.00, 'Mobile Money', 'TXN-034-2025-09-22');
INSERT INTO `payment` VALUES (35, 35, '2025-09-22 11:16:00', 2500.00, 'Credit Card', 'TXN-035-2025-09-22');
INSERT INTO `payment` VALUES (36, 36, '2025-09-22 11:41:00', 6750.00, 'Cash', 'TXN-036-2025-09-22');
INSERT INTO `payment` VALUES (37, 37, '2025-09-22 11:31:00', 4500.00, 'Mobile Money', 'TXN-037-2025-09-22');
INSERT INTO `payment` VALUES (38, 38, '2025-09-22 11:46:00', 4000.00, 'Credit Card', 'TXN-038-2025-09-22');
INSERT INTO `payment` VALUES (39, 39, '2025-09-22 12:01:00', 10000.00, 'Cash', 'TXN-039-2025-09-22');
INSERT INTO `payment` VALUES (40, 40, '2025-09-22 11:46:00', 4500.00, 'Mobile Money', 'TXN-040-2025-09-22');
INSERT INTO `payment` VALUES (41, 41, '2025-09-22 12:01:00', 6000.00, 'Credit Card', 'TXN-041-2025-09-22');
INSERT INTO `payment` VALUES (42, 42, '2025-09-22 12:16:00', 7500.00, 'Cash', 'TXN-042-2025-09-22');
INSERT INTO `payment` VALUES (43, 43, '2025-09-22 12:01:00', 4500.00, 'Mobile Money', 'TXN-043-2025-09-22');
INSERT INTO `payment` VALUES (44, 44, '2025-09-22 12:21:00', 8100.00, 'Credit Card', 'TXN-044-2025-09-22');
INSERT INTO `payment` VALUES (45, 45, '2025-09-22 12:11:00', 4500.00, 'Mobile Money', 'TXN-045-2025-09-22');
INSERT INTO `payment` VALUES (46, 46, '2025-09-22 12:26:00', 6000.00, 'Cash', 'TXN-046-2025-09-22');
INSERT INTO `payment` VALUES (47, 47, '2025-09-22 12:36:00', 6750.00, 'Mobile Money', 'TXN-047-2025-09-22');
INSERT INTO `payment` VALUES (48, 48, '2025-09-22 12:31:00', 4200.00, 'Credit Card', 'TXN-048-2025-09-22');
INSERT INTO `payment` VALUES (49, 49, '2025-09-22 12:41:00', 6000.00, 'Cash', 'TXN-049-2025-09-22');
INSERT INTO `payment` VALUES (50, 50, '2025-09-22 12:51:00', 6750.00, 'Mobile Money', 'TXN-050-2025-09-22');
INSERT INTO `payment` VALUES (51, 51, '2025-09-22 12:41:00', 3000.00, 'Credit Card', 'TXN-051-2025-09-22');
INSERT INTO `payment` VALUES (52, 52, '2025-09-22 13:06:00', 9000.00, 'Cash', 'TXN-052-2025-09-22');
INSERT INTO `payment` VALUES (53, 53, '2025-09-22 12:56:00', 4200.00, 'Mobile Money', 'TXN-053-2025-09-22');
INSERT INTO `payment` VALUES (54, 54, '2025-09-22 13:11:00', 5400.00, 'Credit Card', 'TXN-054-2025-09-22');
INSERT INTO `payment` VALUES (55, 55, '2025-09-22 13:16:00', 6750.00, 'Cash', 'TXN-055-2025-09-22');
INSERT INTO `payment` VALUES (56, 56, '2025-09-22 13:01:00', 3750.00, 'Mobile Money', 'TXN-056-2025-09-22');
INSERT INTO `payment` VALUES (57, 57, '2025-09-22 13:21:00', 6000.00, 'Credit Card', 'TXN-057-2025-09-22');
INSERT INTO `payment` VALUES (58, 58, '2025-09-22 13:31:00', 4500.00, 'Cash', 'TXN-058-2025-09-22');
INSERT INTO `payment` VALUES (59, 59, '2025-09-22 13:26:00', 3500.00, 'Mobile Money', 'TXN-059-2025-09-22');
INSERT INTO `payment` VALUES (60, 60, '2025-09-22 13:41:00', 6750.00, 'Credit Card', 'TXN-060-2025-09-22');
INSERT INTO `payment` VALUES (61, 61, '2025-09-22 13:46:00', 6750.00, 'Cash', 'TXN-061-2025-09-22');
INSERT INTO `payment` VALUES (62, 62, '2025-09-22 13:31:00', 2500.00, 'Mobile Money', 'TXN-062-2025-09-22');
INSERT INTO `payment` VALUES (63, 63, '2025-09-22 13:56:00', 9000.00, 'Credit Card', 'TXN-063-2025-09-22');
INSERT INTO `payment` VALUES (64, 64, '2025-09-22 14:01:00', 6750.00, 'Cash', 'TXN-064-2025-09-22');
INSERT INTO `payment` VALUES (65, 65, '2025-09-22 14:06:00', 9000.00, 'Mobile Money', 'TXN-065-2025-09-22');
INSERT INTO `payment` VALUES (66, 66, '2025-09-22 13:56:00', 6000.00, 'Credit Card', 'TXN-066-2025-09-22');
INSERT INTO `payment` VALUES (67, 67, '2025-09-22 14:16:00', 6750.00, 'Cash', 'TXN-067-2025-09-22');
INSERT INTO `payment` VALUES (68, 68, '2025-09-22 14:06:00', 3000.00, 'Mobile Money', 'TXN-068-2025-09-22');
INSERT INTO `payment` VALUES (69, 69, '2025-09-22 14:31:00', 10000.00, 'Credit Card', 'TXN-069-2025-09-22');
INSERT INTO `payment` VALUES (70, 70, '2025-09-22 14:16:00', 3600.00, 'Cash', 'TXN-070-2025-09-22');
INSERT INTO `payment` VALUES (71, 71, '2025-09-22 14:41:00', 5000.00, 'Mobile Money', 'TXN-071-2025-09-22');
INSERT INTO `payment` VALUES (72, 72, '2025-09-22 14:36:00', 4000.00, 'Credit Card', 'TXN-072-2025-09-22');
INSERT INTO `payment` VALUES (73, 73, '2025-09-22 14:46:00', 5400.00, 'Cash', 'TXN-073-2025-09-22');
INSERT INTO `payment` VALUES (74, 74, '2025-09-22 14:51:00', 4500.00, 'Mobile Money', 'TXN-074-2025-09-22');
INSERT INTO `payment` VALUES (75, 75, '2025-09-22 14:41:00', 4500.00, 'Credit Card', 'TXN-075-2025-09-22');
INSERT INTO `payment` VALUES (76, 76, '2025-09-22 14:56:00', 4000.00, 'Cash', 'TXN-076-2025-09-22');
INSERT INTO `payment` VALUES (77, 77, '2025-09-22 15:01:00', 4000.00, 'Mobile Money', 'TXN-077-2025-09-22');
INSERT INTO `payment` VALUES (78, 78, '2025-09-22 15:16:00', 10000.00, 'Credit Card', 'TXN-078-2025-09-22');
INSERT INTO `payment` VALUES (79, 79, '2025-09-22 15:11:00', 6000.00, 'Cash', 'TXN-079-2025-09-22');
INSERT INTO `payment` VALUES (80, 80, '2025-09-22 15:06:00', 4500.00, 'Mobile Money', 'TXN-080-2025-09-22');
INSERT INTO `payment` VALUES (81, 81, '2025-09-22 15:21:00', 4000.00, 'Credit Card', 'TXN-081-2025-09-22');
INSERT INTO `payment` VALUES (82, 82, '2025-09-22 15:31:00', 6750.00, 'Cash', 'TXN-082-2025-09-22');
INSERT INTO `payment` VALUES (83, 83, '2025-09-22 15:21:00', 3000.00, 'Mobile Money', 'TXN-083-2025-09-22');
INSERT INTO `payment` VALUES (84, 84, '2025-09-22 15:46:00', 7500.00, 'Credit Card', 'TXN-084-2025-09-22');
INSERT INTO `payment` VALUES (85, 85, '2025-09-22 15:31:00', 3000.00, 'Mobile Money', 'TXN-085-2025-09-22');
INSERT INTO `payment` VALUES (86, 86, '2025-09-22 15:46:00', 4800.00, 'Cash', 'TXN-086-2025-09-22');
INSERT INTO `payment` VALUES (87, 87, '2025-09-22 15:56:00', 4500.00, 'Mobile Money', 'TXN-087-2025-09-22');
INSERT INTO `payment` VALUES (88, 88, '2025-09-22 15:46:00', 4500.00, 'Credit Card', 'TXN-088-2025-09-22');
INSERT INTO `payment` VALUES (89, 89, '2025-09-22 16:01:00', 6000.00, 'Cash', 'TXN-089-2025-09-22');
INSERT INTO `payment` VALUES (90, 90, '2025-09-22 16:11:00', 4500.00, 'Mobile Money', 'TXN-090-2025-09-22');
INSERT INTO `payment` VALUES (91, 91, '2025-09-22 16:01:00', 4500.00, 'Credit Card', 'TXN-091-2025-09-22');
INSERT INTO `payment` VALUES (92, 92, '2025-09-22 16:21:00', 4500.00, 'Cash', 'TXN-092-2025-09-22');
INSERT INTO `payment` VALUES (93, 93, '2025-09-22 16:31:00', 5000.00, 'Mobile Money', 'TXN-093-2025-09-22');
INSERT INTO `payment` VALUES (94, 94, '2025-09-22 16:16:00', 3000.00, 'Credit Card', 'TXN-094-2025-09-22');
INSERT INTO `payment` VALUES (95, 95, '2025-09-22 16:26:00', 5250.00, 'Mobile Money', 'TXN-095-2025-09-22');
INSERT INTO `payment` VALUES (96, 96, '2025-09-22 16:36:00', 4000.00, 'Cash', 'TXN-096-2025-09-22');
INSERT INTO `payment` VALUES (97, 97, '2025-09-22 16:41:00', 4000.00, 'Mobile Money', 'TXN-097-2025-09-22');
INSERT INTO `payment` VALUES (98, 98, '2025-09-22 16:51:00', 6750.00, 'Credit Card', 'TXN-098-2025-09-22');
INSERT INTO `payment` VALUES (99, 99, '2025-09-22 17:01:00', 5000.00, 'Cash', 'TXN-099-2025-09-22');
INSERT INTO `payment` VALUES (100, 100, '2025-09-22 16:56:00', 4800.00, 'Mobile Money', 'TXN-100-2025-09-22');

-- ----------------------------
-- Table structure for rental
-- ----------------------------
DROP TABLE IF EXISTS `rental`;
CREATE TABLE `rental`  (
  `RentalID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `CustomerID` int(10) UNSIGNED NOT NULL,
  `BikeID` int(10) UNSIGNED NOT NULL,
  `RentalStart` datetime NOT NULL,
  `RentalEnd` datetime NOT NULL,
  `TotalCost` decimal(8, 2) NOT NULL,
  `PaymentStatus` enum('Pending','Paid','Cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`RentalID`) USING BTREE,
  INDEX `CustomerID`(`CustomerID`) USING BTREE,
  INDEX `BikeID`(`BikeID`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of rental
-- ----------------------------
INSERT INTO `rental` VALUES (1, 1, 1, '2025-09-22 08:00:00', '2025-09-22 08:30:00', 3000.00, 'Pending');
INSERT INTO `rental` VALUES (2, 2, 2, '2025-09-22 08:05:00', '2025-09-22 08:45:00', 4000.00, 'Pending');
INSERT INTO `rental` VALUES (3, 3, 3, '2025-09-22 08:10:00', '2025-09-22 08:25:00', 1500.00, 'Paid');
INSERT INTO `rental` VALUES (4, 4, 5, '2025-09-22 08:15:00', '2025-09-22 08:50:00', 5250.00, 'Paid');
INSERT INTO `rental` VALUES (5, 5, 6, '2025-09-22 08:20:00', '2025-09-22 09:10:00', 5000.00, 'Paid');
INSERT INTO `rental` VALUES (6, 6, 7, '2025-09-22 08:25:00', '2025-09-22 08:55:00', 3600.00, 'Paid');
INSERT INTO `rental` VALUES (7, 7, 8, '2025-09-22 08:30:00', '2025-09-22 09:15:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (8, 8, 9, '2025-09-22 08:35:00', '2025-09-22 09:05:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (9, 9, 11, '2025-09-22 08:40:00', '2025-09-22 09:10:00', 4500.00, 'Pending');
INSERT INTO `rental` VALUES (10, 10, 12, '2025-09-22 08:45:00', '2025-09-22 09:30:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (11, 11, 13, '2025-09-22 08:50:00', '2025-09-22 09:20:00', 3000.00, 'Paid');
INSERT INTO `rental` VALUES (12, 12, 14, '2025-09-22 08:55:00', '2025-09-22 09:40:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (13, 13, 16, '2025-09-22 09:00:00', '2025-09-22 09:30:00', 4500.00, 'Pending');
INSERT INTO `rental` VALUES (14, 14, 17, '2025-09-22 09:05:00', '2025-09-22 09:55:00', 7500.00, 'Pending');
INSERT INTO `rental` VALUES (15, 15, 18, '2025-09-22 09:10:00', '2025-09-22 09:30:00', 2000.00, 'Pending');
INSERT INTO `rental` VALUES (16, 16, 19, '2025-09-22 09:15:00', '2025-09-22 10:00:00', 9000.00, 'Pending');
INSERT INTO `rental` VALUES (17, 17, 20, '2025-09-22 09:20:00', '2025-09-22 09:50:00', 4500.00, 'Pending');
INSERT INTO `rental` VALUES (18, 18, 21, '2025-09-22 09:25:00', '2025-09-22 10:05:00', 6000.00, 'Cancelled');
INSERT INTO `rental` VALUES (19, 19, 23, '2025-09-22 09:30:00', '2025-09-22 09:45:00', 2250.00, 'Cancelled');
INSERT INTO `rental` VALUES (20, 20, 24, '2025-09-22 09:35:00', '2025-09-22 10:20:00', 6750.00, 'Cancelled');
INSERT INTO `rental` VALUES (21, 21, 25, '2025-09-22 09:40:00', '2025-09-22 10:30:00', 7200.00, 'Cancelled');
INSERT INTO `rental` VALUES (22, 22, 26, '2025-09-22 09:45:00', '2025-09-22 10:15:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (23, 23, 27, '2025-09-22 09:50:00', '2025-09-22 10:20:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (24, 24, 28, '2025-09-22 09:55:00', '2025-09-22 10:40:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (25, 25, 30, '2025-09-22 10:00:00', '2025-09-22 10:30:00', 3600.00, 'Paid');
INSERT INTO `rental` VALUES (26, 26, 31, '2025-09-22 10:05:00', '2025-09-22 10:45:00', 4000.00, 'Paid');
INSERT INTO `rental` VALUES (27, 27, 32, '2025-09-22 10:10:00', '2025-09-22 11:00:00', 7500.00, 'Paid');
INSERT INTO `rental` VALUES (28, 28, 33, '2025-09-22 10:15:00', '2025-09-22 10:30:00', 1500.00, 'Paid');
INSERT INTO `rental` VALUES (29, 29, 34, '2025-09-22 10:20:00', '2025-09-22 11:10:00', 5000.00, 'Paid');
INSERT INTO `rental` VALUES (30, 30, 35, '2025-09-22 10:25:00', '2025-09-22 11:05:00', 4800.00, 'Paid');
INSERT INTO `rental` VALUES (31, 31, 37, '2025-09-22 10:30:00', '2025-09-22 11:10:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (32, 32, 38, '2025-09-22 10:35:00', '2025-09-22 11:25:00', 7500.00, 'Paid');
INSERT INTO `rental` VALUES (33, 33, 39, '2025-09-22 10:40:00', '2025-09-22 11:15:00', 5250.00, 'Paid');
INSERT INTO `rental` VALUES (34, 34, 41, '2025-09-22 10:45:00', '2025-09-22 11:30:00', 6750.00, 'Cancelled');
INSERT INTO `rental` VALUES (35, 35, 42, '2025-09-22 10:50:00', '2025-09-22 11:15:00', 2500.00, 'Cancelled');
INSERT INTO `rental` VALUES (36, 36, 43, '2025-09-22 10:55:00', '2025-09-22 11:40:00', 6750.00, 'Pending');
INSERT INTO `rental` VALUES (37, 37, 44, '2025-09-22 11:00:00', '2025-09-22 11:30:00', 4500.00, 'Cancelled');
INSERT INTO `rental` VALUES (38, 38, 45, '2025-09-22 11:05:00', '2025-09-22 11:45:00', 4000.00, 'Pending');
INSERT INTO `rental` VALUES (39, 39, 46, '2025-09-22 11:10:00', '2025-09-22 12:00:00', 10000.00, 'Cancelled');
INSERT INTO `rental` VALUES (40, 40, 47, '2025-09-22 11:15:00', '2025-09-22 11:45:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (41, 41, 48, '2025-09-22 11:20:00', '2025-09-22 12:00:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (42, 42, 50, '2025-09-22 11:25:00', '2025-09-22 12:15:00', 7500.00, 'Paid');
INSERT INTO `rental` VALUES (43, 43, 51, '2025-09-22 11:30:00', '2025-09-22 12:00:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (44, 44, 52, '2025-09-22 11:35:00', '2025-09-22 12:20:00', 8100.00, 'Paid');
INSERT INTO `rental` VALUES (45, 45, 53, '2025-09-22 11:40:00', '2025-09-22 12:10:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (46, 46, 54, '2025-09-22 11:45:00', '2025-09-22 12:25:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (47, 47, 55, '2025-09-22 11:50:00', '2025-09-22 12:35:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (48, 48, 56, '2025-09-22 11:55:00', '2025-09-22 12:30:00', 4200.00, 'Paid');
INSERT INTO `rental` VALUES (49, 49, 57, '2025-09-22 12:00:00', '2025-09-22 12:40:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (50, 50, 59, '2025-09-22 12:05:00', '2025-09-22 12:50:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (51, 51, 60, '2025-09-22 12:10:00', '2025-09-22 12:40:00', 3000.00, 'Cancelled');
INSERT INTO `rental` VALUES (52, 52, 61, '2025-09-22 12:15:00', '2025-09-22 13:05:00', 9000.00, 'Cancelled');
INSERT INTO `rental` VALUES (53, 53, 62, '2025-09-22 12:20:00', '2025-09-22 12:55:00', 4200.00, 'Cancelled');
INSERT INTO `rental` VALUES (54, 54, 63, '2025-09-22 12:25:00', '2025-09-22 13:10:00', 5400.00, 'Cancelled');
INSERT INTO `rental` VALUES (55, 55, 64, '2025-09-22 12:30:00', '2025-09-22 13:15:00', 6750.00, 'Cancelled');
INSERT INTO `rental` VALUES (56, 56, 65, '2025-09-22 12:35:00', '2025-09-22 13:00:00', 3750.00, 'Cancelled');
INSERT INTO `rental` VALUES (57, 57, 67, '2025-09-22 12:40:00', '2025-09-22 13:20:00', 6000.00, 'Cancelled');
INSERT INTO `rental` VALUES (58, 58, 68, '2025-09-22 12:45:00', '2025-09-22 13:30:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (59, 59, 70, '2025-09-22 12:50:00', '2025-09-22 13:25:00', 3500.00, 'Paid');
INSERT INTO `rental` VALUES (60, 60, 71, '2025-09-22 12:55:00', '2025-09-22 13:40:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (61, 61, 72, '2025-09-22 13:00:00', '2025-09-22 13:45:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (62, 62, 73, '2025-09-22 13:05:00', '2025-09-22 13:30:00', 2500.00, 'Paid');
INSERT INTO `rental` VALUES (63, 63, 74, '2025-09-22 13:10:00', '2025-09-22 13:55:00', 9000.00, 'Paid');
INSERT INTO `rental` VALUES (64, 64, 75, '2025-09-22 13:15:00', '2025-09-22 14:00:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (65, 65, 76, '2025-09-22 13:20:00', '2025-09-22 14:05:00', 9000.00, 'Paid');
INSERT INTO `rental` VALUES (66, 66, 77, '2025-09-22 13:25:00', '2025-09-22 13:55:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (67, 67, 78, '2025-09-22 13:30:00', '2025-09-22 14:15:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (68, 68, 80, '2025-09-22 13:35:00', '2025-09-22 14:05:00', 3000.00, 'Paid');
INSERT INTO `rental` VALUES (69, 69, 81, '2025-09-22 13:40:00', '2025-09-22 14:30:00', 10000.00, 'Paid');
INSERT INTO `rental` VALUES (70, 70, 82, '2025-09-22 13:45:00', '2025-09-22 14:15:00', 3600.00, 'Paid');
INSERT INTO `rental` VALUES (71, 71, 83, '2025-09-22 13:50:00', '2025-09-22 14:40:00', 5000.00, 'Paid');
INSERT INTO `rental` VALUES (72, 72, 84, '2025-09-22 13:55:00', '2025-09-22 14:35:00', 4000.00, 'Paid');
INSERT INTO `rental` VALUES (73, 73, 85, '2025-09-22 14:00:00', '2025-09-22 14:45:00', 5400.00, 'Paid');
INSERT INTO `rental` VALUES (74, 74, 86, '2025-09-22 14:05:00', '2025-09-22 14:50:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (75, 75, 87, '2025-09-22 14:10:00', '2025-09-22 14:40:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (76, 76, 88, '2025-09-22 14:15:00', '2025-09-22 14:55:00', 4000.00, 'Paid');
INSERT INTO `rental` VALUES (77, 77, 90, '2025-09-22 14:20:00', '2025-09-22 15:00:00', 4000.00, 'Paid');
INSERT INTO `rental` VALUES (78, 78, 91, '2025-09-22 14:25:00', '2025-09-22 15:15:00', 10000.00, 'Paid');
INSERT INTO `rental` VALUES (79, 79, 92, '2025-09-22 14:30:00', '2025-09-22 15:10:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (80, 80, 93, '2025-09-22 14:35:00', '2025-09-22 15:05:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (81, 81, 94, '2025-09-22 14:40:00', '2025-09-22 15:20:00', 4000.00, 'Paid');
INSERT INTO `rental` VALUES (82, 82, 95, '2025-09-22 14:45:00', '2025-09-22 15:30:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (83, 83, 96, '2025-09-22 14:50:00', '2025-09-22 15:20:00', 3000.00, 'Paid');
INSERT INTO `rental` VALUES (84, 84, 97, '2025-09-22 14:55:00', '2025-09-22 15:45:00', 7500.00, 'Paid');
INSERT INTO `rental` VALUES (85, 85, 98, '2025-09-22 15:00:00', '2025-09-22 15:30:00', 3000.00, 'Paid');
INSERT INTO `rental` VALUES (86, 86, 99, '2025-09-22 15:05:00', '2025-09-22 15:45:00', 4800.00, 'Paid');
INSERT INTO `rental` VALUES (87, 87, 100, '2025-09-22 15:10:00', '2025-09-22 15:55:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (88, 88, 4, '2025-09-22 15:15:00', '2025-09-22 15:45:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (89, 89, 10, '2025-09-22 15:20:00', '2025-09-22 16:00:00', 6000.00, 'Paid');
INSERT INTO `rental` VALUES (90, 90, 15, '2025-09-22 15:25:00', '2025-09-22 16:10:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (91, 91, 22, '2025-09-22 15:30:00', '2025-09-22 16:00:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (92, 92, 29, '2025-09-22 15:35:00', '2025-09-22 16:20:00', 4500.00, 'Paid');
INSERT INTO `rental` VALUES (93, 93, 36, '2025-09-22 15:40:00', '2025-09-22 16:30:00', 5000.00, 'Paid');
INSERT INTO `rental` VALUES (94, 94, 40, '2025-09-22 15:45:00', '2025-09-22 16:15:00', 3000.00, 'Paid');
INSERT INTO `rental` VALUES (95, 95, 49, '2025-09-22 15:50:00', '2025-09-22 16:25:00', 5250.00, 'Paid');
INSERT INTO `rental` VALUES (96, 96, 58, '2025-09-22 15:55:00', '2025-09-22 16:35:00', 4000.00, 'Paid');
INSERT INTO `rental` VALUES (97, 97, 66, '2025-09-22 16:00:00', '2025-09-22 16:40:00', 4000.00, 'Paid');
INSERT INTO `rental` VALUES (98, 98, 69, '2025-09-22 16:05:00', '2025-09-22 16:50:00', 6750.00, 'Paid');
INSERT INTO `rental` VALUES (99, 99, 79, '2025-09-22 16:10:00', '2025-09-22 17:00:00', 5000.00, 'Paid');
INSERT INTO `rental` VALUES (100, 100, 89, '2025-09-22 16:15:00', '2025-09-22 16:55:00', 4800.00, 'Paid');

SET FOREIGN_KEY_CHECKS = 1;
>>>>>>> 3c66385 (the frontend)
