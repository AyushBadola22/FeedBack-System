import Course from './../model/courseModel.js';

export const addCourse = async (req, res)=>{
    const {courseName, duration, subjects } = req.body;
    try {
        if(await Course.findOne({courseName})){
            return res.status(403).send("Course already exists"); 
        }
        const course = new Course({courseName, duration , subjects}); 
        await course.save(); 
        console.log("Course created");  
        res.status(200).send("Course created : "+course); 
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message); 
    }
}
