// services/ideaEvolutionService.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Analyze idea evolution using Gemini API
 */
export const analyzeIdeaEvolution = async (transformed, originalA, originalB = null) => {
  const comparisonBase = originalB
    ? `Compare the BLENDED IDEA with both ORIGINAL IDEAS.`
    : `Compare the TRANSFORMED IDEA with the ORIGINAL IDEA.`;

  const prompt = `
You are an AI assistant. ${comparisonBase}
Highlight the main changes, retained elements, and reasoning in concise JSON.

${originalB 
  ? `ORIGINAL IDEA A:\n${originalA}\n\nORIGINAL IDEA B:\n${originalB}` 
  : `ORIGINAL IDEA:\n${originalA}`
}

TRANSFORMED/BLENDED IDEA:
${transformed}

Output JSON exactly in this structure, no extra text before or after:
{
  "core_elements_retained": ["..."],
  "changes_made": ["..."],
  "new_elements_added": ["..."],
  "overall_direction": "..."
}
`;

  try {
    const result = await model.generateContent(prompt);

    let text;
    if (result?.response?.text) {
      text = result.response.text();
    } else if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
      text = result.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Unexpected API response when analyzing idea evolution");
    }

    // Try to extract JSON safely
    try {
      // Match the first JSON object in the string
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON found in Gemini output");
      }
    } catch (parseErr) {
      console.warn("⚠ Evolution Map was not valid JSON:", parseErr.message);
      return { raw_analysis: text };
    }

  } catch (err) {
    console.error("❌ Gemini API Evolution Analysis Error:", err.message);
    throw new Error("Idea evolution analysis failed due to API error.");
  }
};
