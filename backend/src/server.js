import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { checkConnection } from "./database/config.js"; 
import { createUserTable } from "./models/userModel.js";
import { createContactTable } from "./models/contactModel.js";
import bcrypt from "bcrypt";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const server = http.createServer(app);


// async function generateHash(password) {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     console.log("Hashed Password:", hashedPassword);
//     return hashedPassword; // Return the hash for potential use
//   } catch (error) {
//     console.error("Error generating hash:", error);
//     throw error; // Re-throw if you want calling code to handle it
//   }
// }

// // Modify your startServer to include this
const startServer = async () => {
    try {
        await checkConnection(); 
        await createUserTable();
        await createContactTable();
        
        // Await the hash generation
        // await generateHash("Pan@Server@2025");
        
        server.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("❌ Server startup failed:", error);
        process.exit(1); 
    }
};

startServer();
