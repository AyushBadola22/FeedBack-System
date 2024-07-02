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
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Section' 
    }], 
    subject : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Course'
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


const Teacher = mongoose.model('teacher',teacherSchema); 
export default Teacher;