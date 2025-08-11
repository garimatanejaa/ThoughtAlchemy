import asyncHandler from '../middleware/asyncHandler.js';
import { transformIdea, saveIdeaWithEvolution } from '../services/genAIService.js';

export const transformHandler = asyncHandler(async (req, res) => {
  const { originalText, transformationType } = req.body;

  if (!originalText || !transformationType) {
    res.status(400);
    throw new Error('Please provide both originalText and transformationType');
  }

  const transformedText = await transformIdea(originalText, transformationType);

  const savedIdea = await saveIdeaWithEvolution(
    req.user._id,
    originalText,
    transformedText,
    transformationType
  );

  res.status(201).json(savedIdea);
});

