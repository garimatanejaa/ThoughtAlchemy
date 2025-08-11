import express from "express";
import Idea from "../models/Idea.js"; // your Idea mongoose model
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/ideas", protect, async (req, res) => {
    try {
      const userId = req.user._id;
  
      const ideas = await Idea.find({ user: userId }).sort({ createdAt: -1 });
  
      res.json(ideas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch user ideas" });
    }
  });
  
export default router;
