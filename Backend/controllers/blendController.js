import Idea from '../models/Idea.js';
import { blendIdeas } from '../services/genAIService.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const blendHandler = asyncHandler(async (req, res) => {
  const { idea1, idea2 } = req.body;

  if (!idea1 || !idea2) {
    return res.status(400).json({ message: 'Both ideas are required' });
  }

  const blendedText = await blendIdeas(idea1, idea2);

  // Save to DB
  const newIdea = await Idea.create({
    user: req.user._id,
    originalText: `${idea1} + ${idea2}`,
    transformedText: blendedText,
    transformationType: 'blend',
    blendedWith: idea2,
    dnaMapping: {
      parts: [
        { source: 'idea1', text: idea1 },
        { source: 'idea2', text: idea2 }
      ]
    }
  });

  res.status(201).json(newIdea);
});

