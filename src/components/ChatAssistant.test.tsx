import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatAssistant } from '../components/ChatAssistant';
import '@testing-library/jest-dom';

// Mock scrollIntoView which is not supported in JSDOM
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock the Gemini service
vi.mock('../services/GeminiService', () => ({
  getGeminiResponse: vi.fn().mockResolvedValue('AI Response')
}));

describe('ChatAssistant Component', () => {
  const mockOnNavigate = vi.fn();
  const mockProfile = { isFirstTimeVoter: true, ageGroup: '18-24', location: 'Delhi' };

  it('renders correctly', () => {
    render(<ChatAssistant onNavigate={mockOnNavigate} userProfile={mockProfile} />);
    expect(screen.getByText(/Election Assistant/i)).toBeInTheDocument();
  });
});
