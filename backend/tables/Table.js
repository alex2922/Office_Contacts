import { database } from "../database/database.js"


const userTable = `CREATE TABLE IF NOT EXISTS users(
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
domain VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

const payloadTable = `CREATE TABLE IF NOT EXISTS paylaods (
id INT AUTO_INCREMENT PRIMARY KEY,
userId INT NOT NULL,
NameInput BOOLEAN NOT NULL DEFAULT false,
PhoneInput BOOLEAN NOT NULL DEFAULT false,
EmailInput BOOLEAN NOT NULL DEFAULT false,
emailNotification BOOLEAN NOT NULL DEFAULT false,
option1 VARCHAR(255) DEFAULT 'option1',
option2 VARCHAR(255) DEFAULT 'option2',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE 
)`



const createTable = async (table,query)=>{
try {
    await database.query(query);
  console.log(`${table} table created successfully`)
} catch (error) {
    console.log(error)
}
}

const createtables = async ()=>{
    await createTable("users", userTable);
    await createTable("paylaods", payloadTable);
    console.log("table created successfully")
}

export {createtables}