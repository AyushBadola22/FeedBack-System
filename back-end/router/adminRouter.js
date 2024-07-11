import express from 'express';
// add imports 
import { addCourse } from '../controllers/addCourse.js';
import { addSubjectToCourse } from '../controllers/addSubject.js';
import { addSection } from '../controllers/addSection.js';
// get imports 
import { getCourses } from '../controllers/getCourses.js';
import { getSections , getSectionByID} from '../controllers/getSections.js';
import { getSubjects } from '../controllers/getSubjects.js';
import { getTeacherByCourse, getTeachers } from '../controllers/getTeachers.js';
import { getStudents } from '../controllers/getStudents.js';
import { getReportedFeedback } from '../controllers/getFeedbacks.js';

const router = express.Router();


// GET requests 
router.route('/allCourses').get(getCourses);
router.route('/:courseID/getSections').get(getSections);
router.route('/:courseID/getSubjects').get(getSubjects)
router.route('/getTeachers').get(getTeachers); 
router.route('/getTeachersByCourse/:courseID').get(getTeacherByCourse); 
router.route('/sections/:id').get(getSectionByID)
router.route('/getStudents/:courseID/:yearOfJoining').get(getStudents); 
router.route('/getReportedFeedbacks').get(getReportedFeedback)
//POST Requests
router.route('/addCourse').post(addCourse);

// PATCH Requests 
router.route('/:courseID/addSubject').post(addSubjectToCourse);
router.route('/:courseID/addSection').post(addSection);
export default router;
