import Student from '../model/studentModel.js'
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
            if (uid >= 20000000) {
                uid = 10000000+(uid % 20000000);
            }
        }
    }
    return uid; 
}

export const createStudent = async(req , res) =>{
    console.log("creating student");
    const {name , email, password , course, section, semester} = req.body; 
    try{
        const existingStudent = await Student.findOne({email}); 
        if(existingStudent){
            res.status(403).json({message : "This email already exists."}); 
            return ; 
        } 

        const uid = await generateUID();
        
        const newStudent = new Student ({name, uid , email, password , section, course, semester});
        await newStudent.save(); 
        res.status(201).send(`Admin created ${uid, password}`);
    }
    catch(error){
        res.status(501).send('Error creating user : '+error.message)
    }
};