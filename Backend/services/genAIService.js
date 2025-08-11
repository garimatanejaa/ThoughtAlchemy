import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const transformIdea = async (originalText, form) => {
  try {
    // Build prompt
    const prompt = `Transform the following idea into a ${form}:\n"${originalText}"`;

    console.log("🔹 Sending prompt to Gemini:", prompt);

    // Call Gemini
    const result = await model.generateContent(prompt);

    // Extract text safely
    if (result?.response?.text) {
      return result.response.text();
    } else if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
      // Fallback in case API returns candidates array
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Unexpected Gemini API response format");
    }

  } catch (err) {
    console.error(" Gemini API Error:", err.message);
    throw new Error("Idea transformation failed due to API error.");
  }
};
export const blendIdeas = async (idea1, idea2) => {
  try {
    // Build prompt for blending
    const prompt = `Blend the following two ideas into one novel, creative concept:\n1. ${idea1}\n2. ${idea2}`;

    console.log("🔹 Sending blending prompt to Gemini:", prompt);

    // Call Gemini
    const result = await model.generateContent(prompt);

    // Extract text safely
    if (result?.response?.text) {
      return result.response.text();
    } else if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
      // Fallback
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Unexpected Gemini API response format for blending");
    }

  } catch (err) {
    console.error(" Gemini API Blend Error:", err.message);
    throw new Error("Idea blending failed due to API error.");
  }
};

