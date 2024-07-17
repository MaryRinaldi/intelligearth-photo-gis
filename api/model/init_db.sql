-- Drop Tables
SET foreign_key_checks = 0;
DROP TABLE if EXISTS users;
DROP TABLE IF EXISTS pic_table;
SET foreign_key_checks = 1;

-- Create Tables
CREATE TABLE pic_table (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    url VARCHAR(250),
    file BLOB,
    PRIMARY KEY (id)
);

-- Create Tables
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    userEmail VARCHAR(255) NOT NULL,
    userLocation VARCHAR(255) NULL,
    INDEX (userName),
    UNIQUE (userName)
);

