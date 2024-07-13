import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const DB_URI = process.env.DB_URI
const connectDB = async ()=>{
    try {
        await mongoose.connect(DB_URI);
        console.log("Database connected"); 
    } catch (error) {
        console.error("Failed to connect \n\n ");
        process.exit(0); 
    }
}; 
export default connectDB;