import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName : { type : String , required : true}, 
    duration : { type : Number , required : true}, 
    subjects : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Subject'
        
    }], 
    sections : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Section'
    }]
}); 

const Course = mongoose.model('Course',courseSchema); 
export default Course;