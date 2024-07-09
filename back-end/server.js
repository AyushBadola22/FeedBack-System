import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './router/auth-router.js'; 
import createUser from './router/createUser.js';
import adminRouter from './router/adminRouter.js';
import cookieParser from 'cookie-parser';
import isLoggedIn from './middlewares/isLoggedIn.js';
import hasRole from './middlewares/hasRole.js';
import studentRouter from './router/studentRouter.js'
import cors from 'cors'



const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT ;

const corsOptions = {
    origin : "http://localhost:5173", 
    method : 'GET, POST, PUT, PATCH, HEAD', 
    credentials : true  
}

app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/create',  createUser); 
app.use('/admin', isLoggedIn, adminRouter);
app.use('/student', isLoggedIn, studentRouter) 
app.use('/', authRouter);

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server running");
    })
}); 
