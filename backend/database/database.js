import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const database = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});


const checkConnection = async ()=>{
    let connection ;
    try {
         connection = await database.getConnection();

        console.log("connection successfully");

        connection.commit()
    } catch (error) {
     console.log(error.message);
         connection.release()
    }
}

export {database,checkConnection}