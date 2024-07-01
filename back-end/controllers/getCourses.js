import Course from "../model/courseModel.js";
export const getCourses = async(req, res)=>{
    try{
        const courses = await Course.find(); 
        res.status(200).send(courses); 
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal error"); 
    }
}