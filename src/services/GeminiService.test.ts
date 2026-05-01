import { describe, it, expect, vi } from 'vitest';
import { getGeminiResponse } from '../services/GeminiService';

// Mock the GoogleGenerativeAI SDK
vi.mock('@google/generative-ai', () => {
  class MockGoogleGenerativeAI {
    getGenerativeModel = vi.fn().mockImplementation(() => ({
      startChat: vi.fn().mockImplementation(() => ({
        sendMessage: vi.fn().mockResolvedValue({
          response: { text: () => 'Mocked Gemini response' }
        })
      }))
    }));
  }

  return {
    GoogleGenerativeAI: MockGoogleGenerativeAI,
    HarmCategory: {
      HARM_CATEGORY_HARASSMENT: 'HARM_CATEGORY_HARASSMENT',
      HARM_CATEGORY_HATE_SPEECH: 'HARM_CATEGORY_HATE_SPEECH'
    },
    HarmBlockThreshold: {
      BLOCK_MEDIUM_AND_ABOVE: 'BLOCK_MEDIUM_AND_ABOVE'
    }
  };
});

describe('GeminiService', () => {
  it('should be callable', async () => {
    // The service is initialized at the module level, so we just check if the function works
    const response = await getGeminiResponse('Hello', []);
    expect(response).toBeDefined();
  });
});
