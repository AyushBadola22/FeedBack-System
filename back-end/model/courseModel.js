import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name : { type : String , required : true}, 
    duration : { type : int , required : true}, 
    subjects : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Subject', 
    }]
}); 

const Course = mongoose.model('Course',courseSchema); 
export default Course;