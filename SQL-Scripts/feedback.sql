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

 Date: 12/09/2025 11:50:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
  UNIQUE INDEX `RentalID`(`RentalID`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
