import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuizMode } from '../components/QuizMode';
import '@testing-library/jest-dom';

describe('QuizMode Component', () => {
  it('renders the first question immediately', () => {
    render(<QuizMode />);
    expect(screen.getByText(/Knowledge Check/i)).toBeInTheDocument();
    // Check if a question is displayed
    const questionText = screen.queryByText(/\?/);
    expect(questionText).toBeInTheDocument();
  });

  it('allows selecting an answer', () => {
    render(<QuizMode />);
    
    // Find options (buttons that are not 'Check Answer')
    const options = screen.getAllByRole('button').filter(btn => !btn.textContent?.includes('Check'));
    
    if (options.length > 0) {
      fireEvent.click(options[0]);
      
      const checkBtn = screen.getByText(/Check Answer/i);
      expect(checkBtn).not.toBeDisabled();
      
      fireEvent.click(checkBtn);
      
      // After selecting an answer, we should see feedback
      expect(screen.getByText(/Next Question|See Results/i)).toBeInTheDocument();
    }
  });
});
