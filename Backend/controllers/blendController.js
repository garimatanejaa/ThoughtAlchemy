import asyncHandler from '../middleware/asyncHandler.js';
import { blendIdeas, saveIdeaWithEvolution } from '../services/genAIService.js';

export const blendHandler = asyncHandler(async (req, res) => {
  const { idea1, idea2 } = req.body;

  if (!idea1 || !idea2) {
    return res.status(400).json({ message: 'Both ideas are required' });
  }

  const blendedText = await blendIdeas(idea1, idea2);

  // Save to DB with Idea Evolution Map instead of old DNA mapping
  const newIdea = await saveIdeaWithEvolution(
    req.user._id,  // current user
    idea1,         // primary idea
    blendedText,   // final output
    "blend",       // transformation type
    idea2          // secondary idea for blending
  );

  res.status(201).json(newIdea);
});

