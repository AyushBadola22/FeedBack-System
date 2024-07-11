import express from 'express';
import { getStudentByID } from '../controllers/getStudents.js';
import { getSectionByID } from '../controllers/getSections.js';
import { getTeacherByCourse, getTeacherByID } from '../controllers/getTeachers.js';
import { feedbackGiven, submitFeedback } from '../controllers/submitFeedback.js';
const router = express.Router();

router.route('/getStudentByID/:uid').get(getStudentByID);
router.route('/getSectionByID/:id').get(getSectionByID); 
router.route('/getTeacherByID/:id').get(getTeacherByID);
router.route('/getTeacherByCourse/:courseID').get(getTeacherByCourse);
router.route('/submitFeedback').post(submitFeedback); 
router.route('/feedbackGiven/:studentID').get(feedbackGiven);  
export default router;
