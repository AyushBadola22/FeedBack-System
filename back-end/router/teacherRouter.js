import express from 'express';
import { getFeedbacks } from '../controllers/getFeedbacks.js';
const router = express.Router();

router.route('/getFeedbacks').get(getFeedbacks);

export default router;
