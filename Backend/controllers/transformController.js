import asyncHandler from '../middleware/asyncHandler.js';
import { transformIdea } from '../services/genAIService.js';
import Idea from '../models/Idea.js';

// POST /api/transform
export const transformHandler = asyncHandler(async (req, res) => {
  const { originalText, transformationType } = req.body;

  if (!originalText || !transformationType) {
    res.status(400);
    throw new Error('Please provide both originalText and transformationType');
  }

  // Call Gemini/OpenAI service to transform the idea
  const transformedText = await transformIdea(originalText, transformationType);

  // Save to DB for DNA Viewer
  const savedIdea = await Idea.create({
    user: req.user._id,
    originalText,
    transformedText,
    transformationType,
    dnaMapping: { source: 'Gemini', method: 'Transformation' }
  });

  res.status(201).json(savedIdea);
});

