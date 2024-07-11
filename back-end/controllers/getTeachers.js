import mongoose from "mongoose";
import Teacher from "../model/teacherModel.js";

export const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find(); 
        if(!teachers.sections){
            teachers.sections = []
        }

        let teachersData = teachers
        .sort((a,b)=> a.uid.localeCompare(b.uid))
        .map(teacher => ({
            uid : teacher.uid, 
            name : teacher.name,
            email : teacher.email,
            subject : teacher.subject,
            section : teacher.section,            
            _id : teacher._id
        }));

        

        res.status(200).json({ teachers: teachersData }); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal error" }); 
    }
}

export const getTeacherByID = async (req, res) => {
    console.log('finding the teacher here ');
    const {id} = req.params; 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message : "Invalid teacher id "}); 
    }
    try {
        const teacher = await Teacher.findById(id); 
        if(!teacher){
            return res.status(400).json({message : "No such teacher exists"}); 
        }    
        res.status(200).json(teacher); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "Internal error : "+error.message}); 
    }
}

export const getTeacherByCourse = async(req , res)=>{
    const { courseID } = req.params ; 
    try {
        console.log(courseID);
        const teachers = await Teacher.find({course : courseID}); 
        if(!teachers) 
            return res.status(400).json({message : "No teachers of this course"}); 
        console.log(teachers);
        res.status(200).json(teachers); 
    } catch (error) {
        console.log(error.message);
    } 
}