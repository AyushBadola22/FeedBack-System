import mongoose from "mongoose";
import Course from "../model/courseModel.js";
import Section from "../model/sectionModel.js";


export const addSection = async (req , res) =>{
    const {sectionCode, semester} = req.body; 
    const {courseID} = req.params; 
    if(!mongoose.Types.ObjectId.isValid(courseID)){
        return res.status(400).send("Invalid Course ID format. "); 
    }
    
    try {
        const course = await Course.findById(courseID); 
        if(!course){
            return res.status(404).send("Course not found"); 
        }

        const sectionExists = await Section.findOne({ sectionCode });
        if(sectionExists){
            return res.status(400).send("Section already exists"); 
        }
        const newSection = new Section({sectionCode , semester , course : courseID});
        await newSection.save();


        if(!course.sections){
            course.sections = []; 
        }
        
        course.sections.push(newSection._id); 
        await course.save(); 
        
        res.status(200).send("Section added successfully. "); 
        console.log("Section added ");
    } catch (error) {
        console.error("Error adding subject:", error);
        res.status(500).send("Internal server error");
    }
}; 