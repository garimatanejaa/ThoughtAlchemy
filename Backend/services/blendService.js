import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const blendIdeas = async (idea1, idea2) => {
  try {
    const prompt = `Blend the following two ideas into something creative and novel:
1. ${idea1}
2. ${idea2}

Format: Return ONLY the new blended idea, no intro text.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Gemini Blend Error:", err.message);
    throw new Error("Idea blending failed.");
  }
};
