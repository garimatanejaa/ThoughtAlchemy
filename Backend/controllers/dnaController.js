import asyncHandler from '../middleware/asyncHandler.js';
import Idea from '../models/Idea.js';

// GET /api/dna - Get all ideas for the logged-in user
export const dnaHandler = asyncHandler(async (req, res) => {
  const ideas = await Idea.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .select('-__v'); // removes internal version field from response

  res.json({
    count: ideas.length,
    dnaHistory: ideas
  });
});
