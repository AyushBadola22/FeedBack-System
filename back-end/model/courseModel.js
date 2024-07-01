import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    semester: { type: Number , required: true},
});


const courseSchema = new mongoose.Schema({
    courseName : { type : String , required : true}, 
    duration : { type : Number , required : true}, 
    subjects : [subjectSchema]
}); 

const Course = mongoose.model('Course',courseSchema); 
export default Course;