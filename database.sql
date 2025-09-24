CREATE DATABASE IF NOT EXISTS internship_portal;

-- Use the newly created database
USE internship_portal;

-- Create the 'users' table to store registration details
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    dob DATE,
    streetAddress TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    board10 VARCHAR(50),
    marks10 DECIMAL(5, 2),
    board12 VARCHAR(50),
    marks12 DECIMAL(5, 2),
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
