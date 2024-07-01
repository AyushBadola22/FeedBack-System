import Course from "../model/courseModel.js";

export const addSubject = async (req, res)=>{
    const { name, code , semester } = req.body; 
    const {courseID} = req.params;
    try {
        const course = Course.findById(courseID);
        if(!course){
            return res.status(400).send("Course doesnt exist. There is some error"); 
        } 

        const newSubject = {
            name , code ,semester
        }; 

        course.subjects.push(newSubject); 
        await course.save(); 
        console.log("Subject added");
        res.send(200).send("Subjects added : "+course.subjects); 
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }   
};