import Teacher from '../model/teacherModel.js'
import Section from '../model/sectionModel.js'
import Subject from '../model/subjectSchema.js';

const generateUID = async()=>{
    const now = new Date(); 
    
    const prefix = '30'; 
    const day = String(now.getDate()).padStart(2,'0'); 
    const year = String(now.getFullYear()).slice(2); 
    const hour = String(now.getHours()).padStart(2,'0'); 
    let uid = Number( prefix+year+day+hour);
    
    let isUnique = false;

    while (!isUnique) {
        const existingDoc = await Teacher.findOne({ uid });
        if (!existingDoc) {
            isUnique = true;
        } else {
            uid += 7;
            if (uid >= 20000000) {
                uid = 10000000+(uid % 20000000);
            }
        }
    }
    return uid; 
}

export const createTeacher = async(req , res) =>{
    console.log("creating teacher user");
    const {name , email, password , subjectCode , sectionCode} = req.body;
      
    try{
        const existingTeacher = await Teacher.findOne({email}); 
        if(existingTeacher){
            res.status(200).json({message : "This email already exists."}); 
            return ; 
        } 

        const subject = await Subject.findOne({code : subjectCode});
        const section = await Section.findOne({sectionCode}); 

        if(!section || !subject){
            return res.status(200).send("Subject or section doesnt  exist.");    
        }

        const uid = await generateUID();
        const newTeacher = new Teacher ({name, uid , email, password , subjectCode, sectionCode});
        await newTeacher.save(); 
        res.status(201).send(`Teacher created ${uid, password}`);
    }
    catch(error){
        res.status(501).send('Error creating user : '+error.message)
    }
};
