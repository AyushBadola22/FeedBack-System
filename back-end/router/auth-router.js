import express from 'express';
import { loginController } from '../controllers/loginController.js';
const router = express.Router();

router.route('/login').post(loginController);
router.route('/logout').get( async (req , res)=>{
    try {
        res.clearCookie('token' , {path:'/'}); 
        console.log(res.cookie);
        res.status(200).json("logged out"); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "Internal error : "+error.message})
    }
}); 

export default router;
