-- Drop Tables
DROP TABLE IF EXISTS pic_table;

-- Create Tables
CREATE TABLE pic_table (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    url VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);
