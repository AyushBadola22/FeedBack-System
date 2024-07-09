import Course from "../model/courseModel.js";

export const getCourses = async (req, res) => {
    try {
        res.cookie('test', 'ayush'); 
        const courses = await Course.find(); 
        if(!courses.sections){
            courses.sections = []
        }
        
        if(!courses.subjects){
            courses.subjects = []
        }

        let coursesData = courses.map(course => ({
            courseName: course.courseName, 
            semester: course.duration,
            sections: course.sections ? course.sections : [],
            subjects: course.subjects ? course.subjects : [], 
            _id : course._id 
        }));

        res.status(200).json({ courses: coursesData }); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal error" }); 
    }
}
