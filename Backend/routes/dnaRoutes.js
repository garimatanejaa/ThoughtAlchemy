import express from 'express';
import { dnaHandler } from '../controllers/dnaController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route so only logged-in users see their DNA history
router.get('/', protect, dnaHandler);

export default router;
