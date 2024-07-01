import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true
    }, 
    password : {
        type : String , 
        required : true
    }, 
    role : "Student", 
    section : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Section', 
        required : true 
    }, 
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course', 
        required : true
    }, 
    subjects : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Subject'
    }], 
    attendance : {
        totalClasses : {
            type : int , default : 0
        }, 
        classAttended : {
            type : int , default : 0
        }
    }, 
    feedback : {
        feedbackGiven : {
            type : Boolean, 
            default : false
        }, 
        feedbackComment : {
            type : String 
        }
    }
}); 

const Student = mongoose.model('Student',studentSchema); 
export default Student;