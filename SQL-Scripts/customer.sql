<<<<<<< HEAD
/*
 Navicat Premium Dump SQL

 Source Server         : Bike-Rental Connection
 Source Server Type    : MySQL
 Source Server Version : 50714 (5.7.14)
 Source Host           : localhost:3306
 Source Schema         : bike-rental

 Target Server Type    : MySQL
 Target Server Version : 50714 (5.7.14)
 File Encoding         : 65001

 Date: 12/09/2025 11:42:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
  `PasswordHash` char(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`CustomerID`) USING BTREE,
  UNIQUE INDEX `NationalID`(`NationalID`) USING BTREE,
  UNIQUE INDEX `Email`(`Email`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
=======
/*
 Navicat Premium Dump SQL

 Source Server         : Bike-Rental Connection
 Source Server Type    : MySQL
 Source Server Version : 50714 (5.7.14)
 Source Host           : localhost:3306
 Source Schema         : bike-rental

 Target Server Type    : MySQL
 Target Server Version : 50714 (5.7.14)
 File Encoding         : 65001

 Date: 12/09/2025 11:42:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
  `PasswordHash` char(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`CustomerID`) USING BTREE,
  UNIQUE INDEX `NationalID`(`NationalID`) USING BTREE,
  UNIQUE INDEX `Email`(`Email`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
>>>>>>> 3c66385 (the frontend)
