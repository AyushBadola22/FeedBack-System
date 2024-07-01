import mongoose from 'mongoose'
import bcrypt, { hash } from 'bcrypt'
const adminSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true, 
    }, 
    uid : {
        type : Number , 
        unique : true, 
    },
    email : {
        type : String , 
        unique : true 
    },
    password : {
        type : String, 
        required : true
    }, 

    role : {
        type : String, 
        enum : ['admin', 'superadmin'], 
        required : true, 
        default : 'admin'
    }
});

adminSchema.pre('save', async function (next){
    const user = this; 
    if(!user.isModified("password")){
        next(); 
    }
    try {
        const saltRound = await bcrypt.genSalt(10); 
        const hashPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashPassword;   
    } catch (error) {
        next(error)
    }
});

const Admin = mongoose.model('Admin', adminSchema); 
export default Admin; 
