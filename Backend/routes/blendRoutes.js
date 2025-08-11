import express from 'express';
import { blendHandler } from '../controllers/blendController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, blendHandler);

export default router;
