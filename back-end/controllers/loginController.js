import Admin from "../model/adminModel.js";
import bcrypt from 'bcrypt';

export const LoginController = async (req, res) => {
    const { uid, password } = req.body;
    
    try {
        let user;
        let prefix = String(uid);
        if (prefix.length > 2) {
            prefix = prefix.substring(0, 2);
        }
        
        if (prefix === '10') {
            user = await Admin.findOne({ uid });
        }

        if (!user) {
            return res.status(403).send("User not found");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(403).send("Invalid Password");
        }

        res.status(200).send(`Welcome ${user.name}`);
    } catch (error) {
        console.error(error.message);
        if (!res.headersSent) {
            res.status(500).send("Internal server error");
        }
    }
};
