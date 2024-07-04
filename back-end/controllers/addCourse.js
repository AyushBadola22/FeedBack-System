import Course from '../model/courseModel.js';

export const addCourse = async (req, res)=>{
    const {courseName, duration } = req.body;
    try {
        if(await Course.findOne({courseName})){
            return res.status(400).json({message : "Course already exists"}); 
        }
        const course = new Course({courseName, duration }); 
        await course.save(); 
        console.log("Course created");  
        res.status(200).json({message : "Course Created "});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "Failed to add course"});
    }
}
