import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { checkConnection } from "./database/config.js"; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const server = http.createServer(app);



const startServer = async () => {
    try {
        await checkConnection(); 
        
        server.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("❌ Server startup failed:", error);
        process.exit(1); 
    }
};

startServer();
