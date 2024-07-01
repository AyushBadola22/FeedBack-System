import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import LoginRouter from './router/loginRouter.js'; 
import adminRouter from './router/createUserRouter.js';
import courseRouter from './router/coursesRouter.js';


const app = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT ;


app.use('/create', adminRouter); 
app.use('/courses', courseRouter); 
app.use('/', LoginRouter);

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server running");
    })
}); 
