import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { googleLogger } from "./GoogleCloudService";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  systemInstruction: "You are an AI-powered Election Education Assistant. Your goal is to make the election process simple, interactive, and engaging for all users, especially first-time voters. \n\nMaintain a neutral, non-partisan, and educational tone. \n\nWhen asked about specific processes (Registration, Nomination, Campaigning, Voting, Counting), explain them clearly based on general democratic principles. \n\nIf the user provides their profile details (age, location, first-time status), personalize your advice for them. \n\nKeep responses concise and use bullet points where appropriate.",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 1000,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

/**
 * Sends a prompt to the Google Gemini AI and returns the response.
 * @param prompt The user's input string.
 * @param history Conversation history for context-aware responses.
 * @returns A promise resolving to the AI-generated text response.
 */
export async function getGeminiResponse(prompt: string, history: { role: string, parts: { text: string }[] }[]) {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    googleLogger.warn('Gemini API key is missing or set to placeholder.');
    return "I'm in 'Guide Mode' because my Gemini API key hasn't been set up yet. \n\nTo enable my full AI brain, please add your API key to the .env file in the project folder! \n\nFor now, I can still help you navigate using keywords like 'quiz', 'vote', or 'timeline'.";
  }

  try {
    googleLogger.info('Sending prompt to Gemini AI', { promptLength: prompt.length });
    
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: history,
    });

    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();
    
    googleLogger.info('Successfully received response from Gemini', { responseLength: responseText.length });
    return responseText;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    googleLogger.error('Gemini API Error occurred', { 
      error: errorMessage,
    });
    return "I encountered an error while thinking. Let's try again or use the quick navigation options.";
  }
}
