import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt"; 

const teacherSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true
    },
    uid : {
        type : String, 
        required : true,
        unique : true
    } ,
    email : {
        type : String , 
        required : true, 
        unique : true 
    },
    password : {
        type : String , 
        required : true
    }, 
    section : [{
        type : String, 
    }], 
    subjectCode : {
        type : String , 
        required : true 
    },  
    role : {
        type : String , 
        default : "teacher"
    }
}); 

teacherSchema.pre('save', async function (next){
    const user = this; 
    if(!user.isModified("password")){
        next(); 
    }
    try {
        const saltRound = await bcrypt.genSalt(10); 
        const hashPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashPassword;   
    } catch (error) {
        next(error);
    }
});


const Teacher = mongoose.model('Teacher',teacherSchema); 
export default Teacher;