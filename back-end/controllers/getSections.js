import Course from "../model/courseModel.js";
import Section from "../model/sectionModel.js";
import mongoose from "mongoose";
export const getSections = async (req, res) => {
    
    const { courseID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        return res.status(400).json({message : "Invalid course ID format"});
    }
    console.log("getting sections");
    try {
        // console.log(courseID);
        const course = await Course.findById(courseID); 
        console.log(course);
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

        console.log(sections);
        // const sectionsCodes = sections.map(section => section.sectionCode); 
        // returns the section codes of course 

        res.status(200).json({message : "course name : "+course.courseName , sections : sections}); 
    } catch (error) {
        console.error("Error fetching sections:", error);
        res.status(500).json({message : "Internal server error"});
    }
};


// !  Its for taking data of particular section. 
export const getSectionByID = async(req , res)=>{
    const {id} = req.params; 
    console.log(req.params);
    try {
        if(!id ){
            return res.status(400).json({ message: "Section ID is required." });
        }
        const sectionExists = await Section.findById(id ); 
        if(!sectionExists){
            return res.status(400).json({message : "Section doesnt exists"}); 
        }  
        console.log(sectionExists);
        return res.status(200).json({section : sectionExists.sectionCode, semester : sectionExists.semester, teachers: sectionExists.teachers, course : sectionExists.course}); 
    } catch (error) {
        console.error('Error fetching section:', error);
        return res.status(500).json({ message: "Internal server error." });
    } 
}