import Course from "../model/courseModel.js";
export const getSubjects = async(req, res)=>{
    try{
        const {courseID} = req.params;  
        const course = await Course.findById(courseID);  
        if(!course){
            return res.status(404).send("Course doesnt exist"); 
        } 

        const subjects = course.subjects.map(subject => subject.name);
        res.status(200).send(subjects); 
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal error"); 
    }
}