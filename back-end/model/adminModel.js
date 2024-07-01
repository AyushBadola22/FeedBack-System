import mongoose, { Mongoose } from 'mongoose'

const adminSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true, 
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

const Admin = mongoose.model('Admin', adminSchema); 
export default Admin; 
