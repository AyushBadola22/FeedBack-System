import express from 'express';
import {createAdmin} from '../controllers/createAdmin.js'
import { createStudent } from '../controllers/createStudent.js';
import { createTeacher } from '../controllers/createTeacher.js';

const router = express.Router();

router.route('/admin').post(createAdmin);
router.route('/student').post(createStudent);
router.route('/teacher').post(createTeacher);
export default router;
