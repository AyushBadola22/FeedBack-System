import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const DB_URI = process.env.DB_URI;
const DB_URI_ONLINE = process.env.DB_URI_ONLINE;
const connectDB = async ()=>{
    try {
        await mongoose.connect(DB_URI_ONLINE);
        console.log("Database connected"); 
    } catch (error) {
        console.error("Failed to connect \n\n "+error.message);
        process.exit(0); 
    }
}; 
export default connectDB;