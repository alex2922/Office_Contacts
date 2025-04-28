import  express from 'express';
import  cors from 'cors';
import { methods } from "express/lib/utils.js";

import authRouter from "./src/routes/authRoute.js";
import contactRouter from './src/routes/contactRoute.js';


const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/' , (req, res) =>{
  res.send("working...!")
})

app.get('/api/auth/test', (req, res) => {
  res.json({ message: 'Auth router test endpoint' });
});


app.use('/api/auth', authRouter)
app.use('/api/contact', contactRouter)




app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});






app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

export default app;