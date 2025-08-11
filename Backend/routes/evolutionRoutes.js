// routes/evolutionRoutes.js
import express from "express";
import { analyzeIdeaEvolution } from "../services/ideaEvolutionService.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/evolution
router.post("/", protect, async (req, res) => {
  try {
    const { transformed, originalA, originalB } = req.body;

    if (!transformed || !originalA) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const analysis = await analyzeIdeaEvolution(
      transformed,
      originalA,
      originalB
    );
    res.json(analysis);
  } catch (error) {
    console.error("Evolution API Error:", error.message);
    res.status(500).json({ error: "Failed to analyze idea evolution" });
  }
});

export default router;
