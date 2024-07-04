import express from 'express';
// add imports 
import { addCourse } from '../controllers/addCourse.js';
import { addSubjectToCourse } from '../controllers/addSubject.js';
import { addSection } from '../controllers/addSection.js';
// get imports 
import { getCourses } from '../controllers/getCourses.js';
import { getSections } from '../controllers/getSections.js';
import { getSubjects } from '../controllers/getSubjects.js';
 

const router = express.Router();


// GET requests 
router.route('/allCourses').get(getCourses);
router.route('/:courseID/getSections').get(getSections);
router.route('/:courseID/getSubjects').get(getSubjects)


//POST Requests
router.route('/addCourse').post(addCourse);

// PATCH Requests 
router.route('/:courseID/addSubject').post(addSubjectToCourse);
router.route('/:courseID/addSection').post(addSection);
export default router;
