`UserAdvance` (
  `UserId` int NOT NULL,
  `Address` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `ProfileUrl` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `CreatedBy` int NOT NULL DEFAULT '1',
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int NOT NULL DEFAULT '1',
  `UpdatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UserId`) USING BTREE
)
