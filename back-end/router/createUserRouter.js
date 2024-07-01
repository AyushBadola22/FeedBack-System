import express from 'express';
import {createAdmin} from '../controllers/createAdminController.js'
import { createStudent } from '../controllers/createStudentController.js';
const router = express.Router();

router.route('/admin').post(createAdmin);
router.route('/student').post(createStudent);
export default router;
