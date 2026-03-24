
`User` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Pass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `UUID` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `FullName` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `PhoneNumber` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `CreatedBy` int NOT NULL DEFAULT '1',
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int NOT NULL DEFAULT '1',
  `UpdatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UserId`) USING BTREE
)
