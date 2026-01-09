import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getRationalAdvice = async (role: string, industry: string, lang: Language): Promise<string> => {
  const langInstruction = lang === 'zh' ? "Respond in Chinese." : "Respond in English.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User is an impulsive employee in the ${industry} industry, working as a ${role}. 
      They are about to rage quit. 
      Provide a short, calm, data-backed 50-word paragraph on why they should wait 24 hours. 
      Mention specific market difficulties for their role.
      Tone: Objective, Cold, Analytical (Cyberpunk style).
      ${langInstruction}`,
    });
    return response.text || "Market analysis unavailable. Rational protocol suggests: Maintain income stream until alternative secured.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return lang === 'zh' 
      ? "逻辑扇区网络错误。默认协议：存款未够6个月前请勿离职。"
      : "Network error in logic sector. Default protocol: Do not resign without 6 months of savings.";
  }
};

export const analyzeVent = async (text: string): Promise<{ sentiment: string; riskLevel: number }> => {
   return { sentiment: 'negative', riskLevel: 5 };
}