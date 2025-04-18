import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { checkConnection } from "./database/database.js";
import { createtables } from "./tables/Table.js";
import { userRouter } from "./api/User.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

app.get("/", (req,res)=>{
    res.send("hi hello i am contact")
})

app.use("/api/user", userRouter)

try {

    await checkConnection();
    await createtables()
    app.listen(port, ()=>{
        console.log(`server running on port ${port}`)
    })
} catch (error) {
    
}