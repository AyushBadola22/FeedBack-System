import express from 'express';
import { getStudentByID } from '../controllers/getStudents.js';
import { getSectionByID } from '../controllers/getSections.js';
const router = express.Router();

router.route('/getStudentByID/:uid').get(getStudentByID);
router.route('/getSectionByID/:id').get(getSectionByID); 
export default router;
