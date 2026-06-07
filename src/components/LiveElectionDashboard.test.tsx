import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LiveElectionDashboard } from '../components/LiveElectionDashboard';
import { voteStorage } from '../services/voteStorage';
import '@testing-library/jest-dom';

// Mock react-chartjs-2 to prevent canvas/jsdom issues
vi.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="mock-bar-chart">Mocked Bar Chart</div>
}));

describe('LiveElectionDashboard Component', () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset status flags and default votes before each test
    voteStorage.resetUserVoted();
    voteStorage.resetToDefaultVotes();
  });

  it('renders the dashboard title and description', () => {
    render(<LiveElectionDashboard />);
    expect(screen.getByRole('heading', { name: /Live Election Dashboard/i })).toBeInTheDocument();
    expect(screen.getByText(/Real-time simulation results and educational voting analytics/i)).toBeInTheDocument();
  });

  it('renders initial mock vote totals and percentages', () => {
    render(<LiveElectionDashboard />);
    // Default votes total: 142 + 98 + 73 + 19 = 332
    expect(screen.getByText('332')).toBeInTheDocument(); // Total votes count card
    expect(screen.getAllByText(/Dr. Anita Roy/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Rajesh Kumar/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Sarah Fernandez/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/None of the Above/i).length).toBeGreaterThan(0);
  });

  it('renders the mock chart component', () => {
    render(<LiveElectionDashboard />);
    expect(screen.getByTestId('mock-bar-chart')).toBeInTheDocument();
  });

  it('allows casting a vote and updates the results instantly', () => {
    render(<LiveElectionDashboard />);
    
    // Select Rajesh Kumar (Candidate 2)
    const rajeshRadio = screen.getByRole('radio', { name: /Rajesh Kumar/i });
    fireEvent.click(rajeshRadio);

    // Submit secure ballot
    const submitBtn = screen.getByRole('button', { name: /Submit Secure Ballot/i });
    fireEvent.click(submitBtn);

    // Success message should appear
    expect(screen.getByText(/Vote Cast Successfully!/i)).toBeInTheDocument();
    
    // Total votes should increment from 332 to 333
    expect(screen.getByText('333')).toBeInTheDocument();
  });

  it('allows resetting the user vote to vote again in demo mode', () => {
    render(<LiveElectionDashboard />);
    
    // Select Dr. Anita Roy (Candidate 1) and vote
    const anitaRadio = screen.getByRole('radio', { name: /Dr. Anita Roy/i });
    fireEvent.click(anitaRadio);
    fireEvent.click(screen.getByRole('button', { name: /Submit Secure Ballot/i }));
    
    expect(screen.getByText(/Vote Cast Successfully!/i)).toBeInTheDocument();

    // Reset vote
    const resetVoteBtn = screen.getByRole('button', { name: /Reset My Vote/i });
    fireEvent.click(resetVoteBtn);

    // Should return to the voting panel
    expect(screen.getByRole('button', { name: /Submit Secure Ballot/i })).toBeInTheDocument();
  });

  it('allows clearing all votes to zero via developer controls', () => {
    // Mock window.confirm to return true
    const confirmSpy = vi.spyOn(window, 'confirm');
    confirmSpy.mockReturnValue(true);

    render(<LiveElectionDashboard />);
    
    const clearAllBtn = screen.getByRole('button', { name: /Clear All Votes/i });
    fireEvent.click(clearAllBtn);

    expect(confirmSpy).toHaveBeenCalled();
    // Total votes should now be 0
    expect(screen.getByText('0')).toBeInTheDocument();

    confirmSpy.mockRestore();
  });
});
