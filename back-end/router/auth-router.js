import express from 'express';
import { loginController } from '../controllers/loginController.js';
const router = express.Router();

router.route('/login').post(loginController);
router.route('/logout').get( async (req , res)=>{
    res.cookie("token" , "");
    console.log("user logged out"); 
    res.redirect('/login'); 
})
export default router;
