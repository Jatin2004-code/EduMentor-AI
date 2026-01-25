
import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI client using the exclusive environment variable API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPersonalizedLearningPath = async (studentProfile: string, interests: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this student profile: "${studentProfile}" and interests: ${interests.join(', ')}, generate a structured 4-week learning path.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            weeks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  week: { type: Type.NUMBER },
                  topic: { type: Type.STRING },
                  objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
                  suggestedResources: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["week", "topic", "objectives"]
              }
            }
          }
        }
      }
    });
    
    const text = response.text;
    if (!text) return { weeks: [] };
    
    return JSON.parse(text);
  } catch (e) {
    console.error("[EduMentor AI PathGen Error]", e);
    return { weeks: [] };
  }
};

export const getAITutorResponse = async (question: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${context}\n\nStudent Question: ${question}\n\nProvide a concise, helpful explanation as an AI tutor for EduMentor AI.`,
    });
    return response.text || "I'm sorry, I encountered an issue generating a response. Please try again.";
  } catch (e) {
    console.error("[EduMentor AI Chat Error]", e);
    return "I'm having trouble connecting to the AI brain right now.";
  }
};

export const autoGradeEssay = async (essay: string, rubric: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Grade this essay based on the rubric.\nRubric: ${rubric}\nEssay: ${essay}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            feedback: { type: Type.STRING },
            improvementAreas: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });
    
    const text = response.text;
    if (!text) return { score: 0, feedback: "Error processing content." };
    
    return JSON.parse(text);
  } catch (e) {
    console.error("[EduMentor AI Grading Error]", e);
    return { score: 0, feedback: "Error parsing grading result." };
  }
};
