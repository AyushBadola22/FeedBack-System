import Course from "../model/courseModel.js";
export const getCourses = async(req, res)=>{
    try{
        const courses = await Course.find(); 
        if(!courses){
            res.status(400).send("There are no course. Add a course"); 
        }
        let allCourses = courses.map(course =>
            course.courseName
        ) ; 
        res.status(200).send(allCourses); 

    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal error"); 
    }
}