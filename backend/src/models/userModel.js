import { database } from "../database/config.js";

const createUserTable = async () =>{
    const query = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        domain VARCHAR(255) NOT NULL UNIQUE,
        role VARCHAR(255) NOT NULL DEFAULT 'user',
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        option1 VARCHAR(255) ,
        option2 VARCHAR(255) ,
        splitName BOOLEAN DEFAULT FALSE,
        phoneInput BOOLEAN DEFAULT FALSE,
        emailNotify BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `
    try {
        await database.query(query);
        console.log("User table created successfully");
    } catch (error) {
        console.error("Error creating user table:", error);
        throw error;
    }
}

export { createUserTable };