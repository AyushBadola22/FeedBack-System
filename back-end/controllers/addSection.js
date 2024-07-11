import mongoose from "mongoose";
import Course from "../model/courseModel.js";
import Section from "../model/sectionModel.js";


export const addSection = async (req , res) =>{
    const {sectionCode, semester} = req.body; 
    const {courseID} = req.params; 
    if(!mongoose.Types.ObjectId.isValid(courseID)){
        return res.status(400).json({message : "Invalid Course ID format. "}); 
    }
    
    try {
        const course = await Course.findById(courseID); 
        if(!course){
            return res.status(404).json({message : "Course not found"}); 
        }
        if(semester > course.duration){
            return res.status(400).json({ message: `Semester cannot exceed the course duration.` });
        }
        if(semester === 0 ){
            return res.status(400).json({ message: `Semester 0 is not allowed` });
        }

        const sectionExists = await Section.findOne({ sectionCode, semester, course : courseID });
        if(sectionExists){
            return res.status(400).json({message : "Section already exists"}); 
        }

        const newSection = new Section({sectionCode , semester , course : courseID, teachers : []});
        await newSection.save();


        if(!course.sections){
            course.sections = []; 
        }
        
        course.sections.push(newSection._id); 
        await course.save(); 
        
        res.status(200).json({message : "Section added successfully. " , sectiondata : newSection}); 
        console.log("Section added ");
    } catch (error) {
        console.error("Error adding subject:", error);
        res.status(500).json({message : "Internal server error"});
    }
}; 