require('dotenv').config();
const express = require('express');
const connectDB = require('./database/db.js'); 

const app = express();



app.use(express.json());



const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('MongoDB Connection Failed:', error.message);
    }
}
startServer();