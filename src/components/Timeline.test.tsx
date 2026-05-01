import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Timeline } from '../components/Timeline';
import { ELECTION_STEPS } from '../data/electionData';
import '@testing-library/jest-dom';

describe('Timeline Component', () => {
  const mockOnStepSelect = vi.fn();

  it('renders all election steps', () => {
    render(
      <Timeline 
        steps={ELECTION_STEPS} 
        activeStepId={ELECTION_STEPS[0].id} 
        onStepSelect={mockOnStepSelect} 
      />
    );

    ELECTION_STEPS.forEach(step => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
    });
  });

  it('calls onStepSelect when a step is clicked', () => {
    render(
      <Timeline 
        steps={ELECTION_STEPS} 
        activeStepId={ELECTION_STEPS[0].id} 
        onStepSelect={mockOnStepSelect} 
      />
    );

    const secondStep = screen.getByText(ELECTION_STEPS[1].title);
    fireEvent.click(secondStep);

    expect(mockOnStepSelect).toHaveBeenCalledWith(ELECTION_STEPS[1].id);
  });

  it('highlights the active step', () => {
    const activeStepId = ELECTION_STEPS[2].id;
    render(
      <Timeline 
        steps={ELECTION_STEPS} 
        activeStepId={activeStepId} 
        onStepSelect={mockOnStepSelect} 
      />
    );

    const activeButton = screen.getByRole('button', { name: new RegExp(`Step: ${ELECTION_STEPS[2].title}`, 'i') });
    expect(activeButton).toHaveClass('active');
  });
});
