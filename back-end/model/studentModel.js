import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true
    },
    uid : {
        type : String, 
        required : true
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
    section : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Section', 
        default : "Not assigned"
    }, 
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course', 
        required : true
    }, 
    semester : {
        type : Number, 
        default : 1
    },
    subjects : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Subject'
    }], 
    attendance : {
        totalClasses : {
            type : Number , default : 0
        }, 
        classAttended : {
            type : Number , default : 0
        }
    }, 
}); 

const Student = mongoose.model('Student',studentSchema); 
export default Student;