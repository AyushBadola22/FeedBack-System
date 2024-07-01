import express from 'express';
import { LoginController } from './../controllers/loginController.js';

const LoginRouter = express.Router();

LoginRouter.route('/login').post(LoginController);

export default LoginRouter;
