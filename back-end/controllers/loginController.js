import bcrypt from 'bcrypt';
import Admin from "../model/adminModel.js";
import Teacher from "../model/teacherModel.js";
import Student from "../model/studentModel.js";


export const loginController = async (req, res) => {
    const { uid, password } = req.body;
    try {
        let user;
        let prefix = String(uid);
        if (prefix.length > 2) {
            prefix = prefix.substring(0, 2);
        }
        
        if (prefix === '10') {
            user = await Admin.findOne({ uid });
        }else if(prefix === '30'){
            user = await Teacher.findOne({uid});
        }
        else if(prefix === '20'){
            user = await Student.findOne({uid});
        }
        else {
            return res.status(401).json({message : "Invalid Credentials"}); 
        }

        if (!user) {
            return res.status(404).json({message : "User not found"});
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(403).json({message : "    Invalid Password"});
        }else {
            let token = await user.generateToken(); 
            res.cookie("token", token); 
            res.status(200).json({
                message : "Login Successful", 
                token : token, 
                uid : user.uid , 
                id : user._id
            });
        }
    } catch (error) {
        console.error(error.message);
        if (!res.headersSent) {
            res.status(500).send("Internal server error");
        }
    }
};
