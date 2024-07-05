import Course from "../model/courseModel.js";
import Section from "../model/sectionModel.js";
import mongoose from "mongoose";
export const getSections = async (req, res) => {
    
    const { courseID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        return res.status(400).json({message : "Invalid course ID format"});
    }
    
    try {
        const course = await Course.findById(courseID); 
        if (!course) {
            return res.status(404).json({message : "Course doesn't exist"});
        }

        if (!course.sections || course.sections.length === 0) {
            return res.status(200).json({message : "No sections are created for this course yet."});
        }

        const sections = await Section.find({_id : { $in : course.sections}}); 
        
        if(sections.length === 0){
            return  res.status(200).json({message : "No sections exists yet"}); 
        }

        // const sectionsCodes = sections.map(section => section.sectionCode); 
        // returns the section codes of course 

        res.status(200).json({message : "course name : "+course.courseName , sections : sections}); 
    } catch (error) {
        console.error("Error fetching sections:", error);
        res.status(500).json({message : "Internal server error"});
    }
};