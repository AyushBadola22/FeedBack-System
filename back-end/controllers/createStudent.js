import Student from '../model/studentModel.js'
import Course from '../model/courseModel.js'
import Section from '../model/sectionModel.js'
import dotenv from 'dotenv'; 
import jwt from 'jsonwebtoken'; 


dotenv.config(); 

const generateUID = async()=>{
    const now = new Date(); 
    
    const prefix = '20'; 
    const day = String(now.getDate()).padStart(2,'0'); 
    const year = String(now.getFullYear()).slice(2); 
    const hour = String(now.getHours()).padStart(2,'0'); 
    let uid = Number( prefix+year+day+hour);
    
    let isUnique = false;

    while (!isUnique) {
        const existingDoc = await Student.findOne({ uid });
        if (!existingDoc) {
            isUnique = true;
        } else {
            uid += 7;
            if (uid >= 30000000) {
                uid = 20000000+(uid % 30000000);
            }
        }
    }
    return uid; 
}

export const createStudent = async(req , res) =>{
    console.log("creating student");

    let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
    // console.log(JSON.stringify(data));  prints my token details

    if(!data || data.role !== 'superadmin'){
        return res.status(400).json({message : "You are not authorized to add another admin."}); 
    }

    const {name , email, password , course, section, semester} = req.body; 
    try{
        const existingStudent = await Student.findOne({email}); 
        if(existingStudent){
           return res.status(400).json({message : "This email already exists."}); 
        } 
        const courseExists = await Course.findOne({courseName : course}); 
        const sectionExists = await Section.findOne({sectionCode : section}); 
        
        if(!courseExists || !sectionExists){
            return res.status(400).json({message : "Course or section does not exist"}); 
        }

        const uid = await generateUID();

        console.log(course);
        console.log(section);

        const newStudent = new Student ({name, uid , email, password , section : sectionExists._id, course : courseExists._id, semester});
        await newStudent.save(); 
        res.status(201).json({message : 'Student created'}); 
    }
    catch(error){
        res.status(501).json({message : 'Error creating user : '+error.message}); 
    }
};