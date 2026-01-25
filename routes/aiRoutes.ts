
import { Router, Request, Response, NextFunction } from 'express';
import { GoogleGenAI } from "@google/genai";
import { authenticate, authorize, AuthRequest } from '../middleware/authMiddleware';
import { UserRole } from '../types';

const router = Router();

/**
 * POST /api/ai/chat
 * Secure endpoint for the Student AI Tutor.
 * Requires STUDENT role.
 * Uses Gemini API to provide educational assistance.
 */
// Fix: Use standard Request/Response types in handlers and cast to AuthRequest where needed
router.post('/chat', authenticate, authorize(UserRole.STUDENT), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      // Fix: Cast res to any for status method
      return (res as any).status(400).json({
        success: false,
        error: { message: 'The student message is required.', code: 'BAD_REQUEST' }
      });
    }

    // Initialize the AI client using the system-provided API key
    // The key is obtained exclusively from the environment variable process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // System instruction defines the tutor's personality and boundaries
    const systemInstruction = `You are an AI tutor for an EdTech platform.
Explain concepts clearly in simple language.
Use examples when helpful.
Stay educational and focused.`;

    // Constructing the prompt with context as requested
    const prompt = `Course: ${context?.courseTitle || 'General Education'}
Lesson: ${context?.lessonTitle || 'N/A'}

Student Question:
${message}`;

    console.log('[EduMentor AI] Generating response for prompt:', prompt);

    // Generate content using the recommended model for text tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    // Logging for debug purposes
    console.log('[EduMentor AI Raw Response]:', JSON.stringify(response, null, 2));

    // Using the text property to safely extract the text part
    const aiReply = response.text?.trim() || "I'm sorry, I'm having trouble formulating an explanation right now. Could you please rephrase your question?";

    // Fix: Cast res to any for status method
    (res as any).status(200).json({
      success: true,
      data: {
        reply: aiReply
      }
    });

  } catch (error: any) {
    console.error('[EduMentor AI Service Error]:', error.message);
    
    // Return a user-friendly fallback message
    // Fix: Cast res to any for status method
    (res as any).status(500).json({
      success: false,
      error: {
        message: "The AI tutor is currently refreshing its knowledge base. Please try again in a moment.",
        code: 'AI_SERVICE_ERROR'
      }
    });
  }
});

/**
 * Legacy POST /api/ai/tutor for backward compatibility
 */
router.post('/tutor', authenticate, authorize(UserRole.STUDENT), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userQuestion, courseTitle, lessonTitle } = req.body;
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Course: ${courseTitle}\nLesson: ${lessonTitle}\nQuestion: ${userQuestion}`,
      config: {
        systemInstruction: "You are an AI tutor for EduMentor AI. Be concise and helpful.",
      }
    });

    // Fix: Cast res to any for status method
    (res as any).status(200).json({
      success: true,
      data: {
        answer: response.text || "No response generated.",
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;