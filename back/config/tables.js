import { database } from "./database.js";

const usersTable = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    domain VARCHAR(255) NOT NULL UNIQUE,
    nameSplit BOOLEAN DEFAULT FALSE,
    phoneRequired BOOLEAN DEFAULT FALSE,
    emailNotification BOOLEAN DEFAULT FALSE,
    option1 VARCHAR(255) DEFAULT NULL,
    option2 VARCHAR(255) DEFAULT NULL,
    option3 VARCHAR(255) DEFAULT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`


const contactsTable = `CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    message VARCHAR(500) DEFAULT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    
    domain VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`





const createTables = async () => {
    try {
        
    } catch (error) {
        
    }
}