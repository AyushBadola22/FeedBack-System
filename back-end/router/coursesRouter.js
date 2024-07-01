import express from 'express';
import { addCourse } from '../controllers/addCourseController.js';
import { addSubject } from '../controllers/addSubjectController.js';
import { getCourses } from '../controllers/getCourses.js';




const router = express.Router();

router.route('/allCourses').get(getCourses);
router.route('/addCourse').post(addCourse);
router.route('/:courseID/addSubject').post(addSubject);

export default router;

