import Admin from '../model/adminModel.js'

const generateUID = async()=>{
    const now = new Date(); 
    
    const prefix = '10'; 
    const day = String(now.getDate()).padStart(2,'0'); 
    const year = String(now.getFullYear()).slice(2); 
    const hour = String(now.getHours()).padStart(2,'0'); 
    let uid = Number( prefix+year+day+hour);
    
    let isUnique = false;

    while (!isUnique) {
        const existingDoc = await Admin.findOne({ uid });
        if (!existingDoc) {
            isUnique = true;
        } else {
            uid += 7;
            if (uid >= 20000000) {
                uid = 10000000;
            }
        }
    }
    return uid; 
}

export const createAdmin = async(req , res) =>{
    console.log("creating admin");
    const {name , email, password , role} = req.body; 
    try{
        const existingAdmin = await Admin.findOne({email}); 
        if(existingAdmin){
            res.status(403).json({message : "This email already exists."}); 
            return ; 
        } 

        const uid = await generateUID();
        
        const newAdmin = new Admin ({name, uid , email, password , role});
        await newAdmin.save(); 
        res.status(201).send(`Admin created ${uid, password}`);
    }
    catch(error){
        res.status(501).send('Error creating user : '+error.message)
    }
};