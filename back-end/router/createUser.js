import express from 'express';
import {createAdmin} from '../controllers/createAdmin.js'
import { createStudent } from '../controllers/createStudent.js';
const router = express.Router();

router.route('/admin').post(createAdmin);
router.route('/student').post(createStudent);
export default router;
