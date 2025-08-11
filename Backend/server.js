import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transformRoutes from "./routes/transformRoutes.js";
import blendRoutes from './routes/blendRoutes.js';
import dnaRoutes from './routes/dnaRoutes.js';
import userIdeasRoutes from "./routes/userIdeasRoutes.js";
import cors from 'cors';

  
dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // frontend origin
    credentials: true,               // if you use cookies/auth
  }));
app.use(express.json());

app.use("/api/auth", authRoutes); 
app.use("/api/transform", transformRoutes);
app.use('/api/blend', blendRoutes);
app.use('/api/dna', dnaRoutes);
app.use("/api/user", userIdeasRoutes);  
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
