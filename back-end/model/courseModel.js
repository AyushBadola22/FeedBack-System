import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName : { type : String , required : true}, 
    duration : { type : Number , required : true}, 
    subjects : [
        {
            name : { type : String , required : true , unique : true}, 
            code : { type : String , required : true , unique : true}, 
            semester : { type : Number , required : true }
        }
    ], 
    sections : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Course'
    }]
}); 

const Course = mongoose.model('Course',courseSchema); 
export default Course;