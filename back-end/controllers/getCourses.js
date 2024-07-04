import Course from "../model/courseModel.js";

export const getCourses = async (req, res) => {
    try {
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
            totalSections: course.sections ? course.sections.length : 0,
            totalSubjects: course.subjects ? course.subjects.length : 0
        }));
        res.status(200).json({ courses: coursesData }); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal error" }); 
    }
}
