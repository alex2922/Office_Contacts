import { database } from "../database/database.js"


const userTable = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  domain VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

const payloadTable = `CREATE TABLE IF NOT EXISTS paylaods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userid VARCHAR(255) NOT NULL,
  NameInput BOOLEAN NOT NULL DEFAULT false,
  PhoneInput BOOLEAN NOT NULL DEFAULT false,
  EmailInput BOOLEAN NOT NULL DEFAULT false,
  emailNotification BOOLEAN NOT NULL DEFAULT false,
  option1 VARCHAR(255) DEFAULT 'option1',
  option2 VARCHAR(255) DEFAULT 'option2',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userid) REFERENCES users(userId) ON DELETE CASCADE
)`

const contactsData = `CREATE TABLE IF NOT EXISTS contactsData (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userid VARCHAR(255) NOT NULL,
  name VARCHAR(255) DEFAULT NULL,
  fname VARCHAR(255) DEFAULT NULL,
  lname VARCHAR(255) DEFAULT NULL,
  number VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL,
  message VARCHAR(255) DEFAULT NULL,
  option1 VARCHAR(255) DEFAULT NULL,
  option2 VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userid) REFERENCES users(userId) ON DELETE CASCADE
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
    await createTable("contactsData", contactsData);
    console.log("table created successfully")
}

export {createtables}