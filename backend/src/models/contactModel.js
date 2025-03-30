import { database } from "../database/config.js";

const createContactTable = async () =>{
    const query = `
    CREATE TABLE IF NOT EXISTS contacts(
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    fullname VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    message VARCHAR(255) NOT NULL,
    option1 VARCHAR(255) ,
    option2 VARCHAR(255) ,
    domain VARCHAR(255) NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `

    try {
        await database.query(query);
        console.log("Contact table created successfully");
    } catch (error) {
        console.error("Error creating contact table:", error);
        throw error;
    }
}

export { createContactTable };