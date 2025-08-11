// routes/transformRoutes.js
import express from "express";
import { transformHandler } from "../controllers/transformController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, transformHandler);

export default router;
