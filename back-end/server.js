import express from 'express';
import LoginRouter from './router/loginRouter.js'; 
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import adminRouter from './router/createUserRouter.js';
import { addCourse } from './controllers/addCourseController.js';

const app = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT ;


app.use('/create', adminRouter); 
app.use('/add', addCourse); 
app.use('/', LoginRouter);

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server running");
    })
}); 
