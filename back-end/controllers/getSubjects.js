import Course from "../model/courseModel.js";
import Subject from "../model/subjectSchema.js";

export const getSubjects = async(req, res)=>{
    try{
        const {courseID} = req.params;  
        const course = await Course.findById(courseID);  
        if(!course){
            return res.status(200).json({message : "Course doesnt exist"}); 
        } 
        if(!course.subjects || course.subjects.length === 0){
            res.status(200).json({message : "No Subject is added."}); 
        }

        const subjects = await Subject.find({_id : { $in : course.subjects}}); 
        
        if(subjects.length === 0){
            return  res.status(200).json({message : "No subject is added"}); 
        }

        const subjectData = subjects.map(subject =>({
            name : subject.subjectName, 
            code : subject.code, 
            semester : subject.semester
        })); 
        res.status(200).json({subjects : subjectData}); 
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal error"); 
    }
}