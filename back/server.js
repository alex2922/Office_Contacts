import express from 'express';
import dotenv from  'dotenv';
import cors from 'cors';
import http from 'http';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());



const StartServer = async () => {
    try {
        const server = http.createServer(app);
        const port = process.env.PORT;
        server.listen(port ,()=> {
            console.log("server is running at :" ,port)
        })
    } catch (error) {
        console.log("Error: ", error)
    }
    
}

StartServer();