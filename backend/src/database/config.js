import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Create a connection pool
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Function to check database connection
const checkConnection = async () => {
    let client;
    try {
        client = await pool.connect(); 
        console.log("✅ Database connected successfully");
        return true;
    } catch (error) {
        console.error("❌ Database connection error:", error);
        throw error;
    } finally {
        if (client) client.release();
    }
};

export { pool as database, checkConnection };
