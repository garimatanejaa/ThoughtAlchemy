import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { protect } from '../middleware/authMiddleware.js';
import Idea from "../models/Idea.js";

const router = express.Router();

router.get("/recent", protect, asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 3;

  const ideas = await Idea.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  res.status(200).json(ideas); 
}));

export default router;
