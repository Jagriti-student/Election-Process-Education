import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StepCard } from '../components/StepCard';
import { ELECTION_STEPS } from '../data/electionData';
import '@testing-library/jest-dom';

describe('StepCard Component', () => {
  it('renders step information', () => {
    const step = ELECTION_STEPS[0];
    render(<StepCard step={step} />);
    expect(screen.getByText(step.title)).toBeInTheDocument();
    expect(screen.getByText(step.detailedDescription)).toBeInTheDocument();
  });

  it('shows extra details and Google Services when clicking Learn More', () => {
    const votingStep = ELECTION_STEPS.find(s => s.id === 'voting')!;
    render(<StepCard step={votingStep} />);
    
    const learnMoreBtn = screen.getByText(/Learn More/i);
    fireEvent.click(learnMoreBtn);
    
    // Check for Google Maps fallback or iframe
    const fallbackText = screen.queryByText(/Maps Integration Pending/i);
    if (fallbackText) {
      expect(fallbackText).toBeInTheDocument();
    } else {
      const iframe = screen.getByTitle(/Google Maps/i);
      expect(iframe).toBeInTheDocument();
    }
  });

  it('shows YouTube video for campaign step', () => {
    const campaignStep = ELECTION_STEPS.find(s => s.id === 'campaign')!;
    render(<StepCard step={campaignStep} />);
    
    fireEvent.click(screen.getByText(/Learn More/i));
    
    const iframe = screen.getByTitle(/Campaign Guide/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com/embed'));
  });
});
