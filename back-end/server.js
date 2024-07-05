import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './router/auth-router.js'; 
import createUser from './router/createUser.js';
import courseRouter from './router/coursesRouter.js';
import cookieParser from 'cookie-parser';
import isLoggedIn from './middlewares/isLoggedIn.js';
import hasRole from './middlewares/hasRole.js';
import cors from 'cors'



const app = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT ;

const corsOptions = {
    origin : "http://localhost:5173", 
    method : 'GET, POST, PUT, PATCH, HEAD', 
    credentials : true  
}

app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/create', isLoggedIn, hasRole(["admin", "superadmin"]), createUser); 
app.use('/courses', courseRouter); 
app.use('/', authRouter);

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server running");
    })
}); 
