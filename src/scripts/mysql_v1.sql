CREATE DATABASE my_db1;
USE my_db1;

-- Bước 1: Thiết kế Database (Schema Design)
CREATE TABLE User (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE UserAdvance (
    userId INT PRIMARY KEY,
    fullName VARCHAR(100),
    dob DATE,
    address VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES User(userId) ON DELETE CASCADE
);

-- insert user
DELIMITER //

CREATE PROCEDURE InsertUser(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_fullName VARCHAR(100),
    IN p_dob DATE,
    IN p_address VARCHAR(255)
)
BEGIN
    DECLARE newUserId INT;

    -- Error handler
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Insert failed' AS message;
    END;

    -- Validate
    IF p_username IS NULL OR p_username = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Username is required';
    END IF;

    START TRANSACTION;

    INSERT INTO User(username, password)
    VALUES (p_username, p_password);

    SET newUserId = LAST_INSERT_ID();

    INSERT INTO UserAdvance(userId, fullName, dob, address)
    VALUES (newUserId, p_fullName, p_dob, p_address);

    COMMIT;

    SELECT 'Insert success' AS message;

END //

DELIMITER ;

-- get list
DELIMITER //

CREATE PROCEDURE GetUsers(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT 
        u.userId,
        u.username,
        ua.fullName,
        ua.dob,
        ua.address
    FROM User u
    JOIN UserAdvance ua ON u.userId = ua.userId
    ORDER BY u.userId
    LIMIT p_limit OFFSET p_offset;
END //

DELIMITER ;

-- get detail
DELIMITER //

CREATE PROCEDURE GetUserById(IN p_userId INT)
BEGIN
    SELECT *
    FROM User u
    JOIN UserAdvance ua ON u.userId = ua.userId
    WHERE u.userId = p_userId;
END //

DELIMITER ;

-- update user
DELIMITER //

CREATE PROCEDURE UpdateUser(
    IN p_userId INT,
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_fullName VARCHAR(100),
    IN p_dob DATE,
    IN p_address VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Update failed' AS message;
    END;

    START TRANSACTION;

    UPDATE User
    SET username = p_username,
        password = p_password
    WHERE userId = p_userId;

    UPDATE UserAdvance
    SET fullName = p_fullName,
        dob = p_dob,
        address = p_address
    WHERE userId = p_userId;

    COMMIT;

    SELECT 'Update success' AS message;

END //

DELIMITER ;

-- delete user
DELIMITER //

CREATE PROCEDURE DeleteUser(IN p_userId INT)
BEGIN
    DELETE FROM User WHERE userId = p_userId;
    SELECT 'Delete success' AS message;
END //

DELIMITER ;

-- create table log
CREATE TABLE UserLog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    action VARCHAR(20),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- trigger insert
DELIMITER //

CREATE TRIGGER trg_after_insert_user
AFTER INSERT ON User
FOR EACH ROW
BEGIN
    INSERT INTO UserLog(userId, action)
    VALUES (NEW.userId, 'INSERT');
END //

DELIMITER ;

-- trigger delete
DELIMITER //

CREATE TRIGGER trg_after_delete_user
AFTER DELETE ON User
FOR EACH ROW
BEGIN
    INSERT INTO UserLog(userId, action)
    VALUES (OLD.userId, 'DELETE');
END //

DELIMITER ;

-- test
CALL InsertUser('user1', '123', 'Nguyen Van A', '2000-01-01', 'HCM');
CALL InsertUser('user2', '123', 'Nguyen Van B', '2000-02-01', 'HN');
CALL InsertUser('user3', '123', 'Tran Thi C', '1999-05-12', 'HCM');
CALL InsertUser('user4', '123', 'Le Van D', '2001-08-20', 'DN');
CALL InsertUser('user5', '123', 'Pham Minh E', '2000-11-30', 'CT');
CALL InsertUser('user6', '123', 'Hoang Lan F', '2002-03-15', 'HP');
CALL InsertUser('user7', '123', 'Do Hoang G', '1998-12-25', 'QN');
CALL InsertUser('user8', '123', 'Vu Bich H', '2001-01-10', 'LD');
CALL InsertUser('user9', '123', 'Bui Quang I', '1997-07-07', 'BD');
CALL InsertUser('user10', '123', 'Nguyen Thao K', '2003-09-05', 'VT');

CALL GetUsers(5, 0);
CALL GetUsers(5, 5);

CALL GetUserById(1);

CALL UpdateUser(1, 'user_new', '456', 'New Name', '1999-01-01', 'Da Nang');

CALL DeleteUser(1);

-- check trigger
SELECT * FROM UserLog;



