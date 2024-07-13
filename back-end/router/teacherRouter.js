import express from 'express';
import { getFeedbacks, getFeedbacksOfSection } from '../controllers/getFeedbacks.js';
import { getTeacherByUID } from '../controllers/getTeachers.js';
import { reportFeedback } from '../controllers/submitFeedback.js';
const router = express.Router();

router.route('/getFeedbacks/:teacherID').get(getFeedbacks);
router.route('/getFeedbacksBySection').post(getFeedbacksOfSection); 
router.route('/getTeacherByUID/:uid').get(getTeacherByUID); 
router.route('/report').post(reportFeedback);
export default router;
