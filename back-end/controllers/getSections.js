import Course from "../model/courseModel.js";
import Section from "../model/sectionModel.js";
import mongoose from "mongoose";
export const getSections = async (req, res) => {
    
    const { courseID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        return res.status(400).send("Invalid course ID format");
    }
    
    try {
        const course = await Course.findById(courseID); 
        if (!course) {
            return res.status(404).send("Course doesn't exist");
        }

        if (!course.sections || course.sections.length === 0) {
            return res.status(200).send("No sections are created for this course yet.");
        }

        const sections = await Section.find({_id : { $in : course.sections}}); 
        
        if(sections.length === 0){
            return  res.status(200).send("No sections exists yet"); 
        }

        const sectionsCodes = sections.map(section => section.sectionCode); 
        res.status(200).send("course name : "+course.courseName+"  sections : "+sectionsCodes); 
    } catch (error) {
        console.error("Error fetching sections:", error);
        res.status(500).send("Internal server error");
    }
};