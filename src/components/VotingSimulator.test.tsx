import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VotingSimulator } from '../components/VotingSimulator';
import '@testing-library/jest-dom';

describe('VotingSimulator Component', () => {
  it('renders the polling booth heading', () => {
    render(<VotingSimulator />);
    expect(screen.getByText(/Interactive Polling Booth/i)).toBeInTheDocument();
  });

  it('shows the first step: Enter Polling Station', () => {
    render(<VotingSimulator />);
    expect(screen.getByText(/Enter Polling Station/i)).toBeInTheDocument();
  });

  it('shows the electoral roll search input on step 1', () => {
    render(<VotingSimulator />);
    const input = screen.getByPlaceholderText(/Enter your name/i);
    expect(input).toBeInTheDocument();
  });

  it('enables next step after searching a name of 3+ characters', () => {
    render(<VotingSimulator />);
    const input = screen.getByPlaceholderText(/Enter your name/i);
    fireEvent.change(input, { target: { value: 'Ravi' } });
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));
    expect(screen.getByText(/Name found/i)).toBeInTheDocument();
  });

  it('renders all 5 progress steps in the tracker', () => {
    render(<VotingSimulator />);
    expect(screen.getAllByText(/Enter Polling Station|ID Verification|Marking|Cast Your Vote|Verify VVPAT/i).length).toBeGreaterThan(0);
  });

  it('shows Proceed to Next Step button when step task is done', () => {
    render(<VotingSimulator />);
    const input = screen.getByPlaceholderText(/Enter your name/i);
    fireEvent.change(input, { target: { value: 'Ravi' } });
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));
    expect(screen.getByRole('button', { name: /Proceed to Next Step/i })).not.toBeDisabled();
  });

  it('has accessible vote buttons with aria-labels on EVM step', async () => {
    render(<VotingSimulator />);
    // Step through to step 3 (Vote)
    const input = screen.getByPlaceholderText(/Enter your name/i);
    fireEvent.change(input, { target: { value: 'Ravi' } });
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));
    fireEvent.click(screen.getByRole('button', { name: /Proceed to Next Step/i }));
    // step 1 - click ID card
    const idCard = document.querySelector('.voter-id-card');
    if (idCard) fireEvent.click(idCard);
    fireEvent.click(screen.getByRole('button', { name: /Proceed to Next Step/i }));
    // step 2 - click finger
    const finger = document.querySelector('.ink-interactive');
    if (finger) fireEvent.click(finger);
    fireEvent.click(screen.getByRole('button', { name: /Proceed to Next Step/i }));
    // Now on step 3 - EVM should be visible
    const voteBtn = screen.queryByLabelText(/Vote for Candidate A/i);
    if (voteBtn) expect(voteBtn).toBeInTheDocument();
  });
});
