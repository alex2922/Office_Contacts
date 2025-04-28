import dotenv from "dotenv";
import  http from "http";
import app from "./app.js"

import {connectDB} from "./src/config/dbConfig.js";

dotenv.config();

const startServer = async () => {
  try {
    await  connectDB();
    const port = process.env.PORT || 4001
    const server = http.createServer(app);
    server.listen(port, () =>{
      console.log(`Server is running on port ${port}`);
    })
  }
  catch (e) {
    console.log("Error",e)
  }
}


startServer();