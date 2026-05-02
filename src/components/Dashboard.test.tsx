import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dashboard } from '../components/Dashboard';
import '@testing-library/jest-dom';

const mockNavigate = vi.fn();

const mockProfile = {
  isFirstTimeVoter: true,
  ageGroup: '18-24',
  location: 'Delhi',
};

describe('Dashboard Component', () => {
  it('renders welcome message with user location', () => {
    render(<Dashboard userProfile={mockProfile} onNavigate={mockNavigate} />);
    expect(screen.getByText(/Welcome Back, Delhi!/i)).toBeInTheDocument();
  });

  it('renders with default Citizen greeting when no profile is provided', () => {
    render(<Dashboard userProfile={undefined} onNavigate={mockNavigate} />);
    expect(screen.getByText(/Welcome Back, Citizen!/i)).toBeInTheDocument();
  });

  it('renders all three progress stat cards', () => {
    render(<Dashboard userProfile={mockProfile} onNavigate={mockNavigate} />);
    expect(screen.getByLabelText(/Process Mastery: 45%/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quiz Score: 0\/10/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Simulations: 0 Completed/i)).toBeInTheDocument();
  });

  it('calls onNavigate with "timeline" when Registration Guide is clicked', () => {
    render(<Dashboard userProfile={mockProfile} onNavigate={mockNavigate} />);
    fireEvent.click(screen.getByLabelText(/Continue to Voter Registration Guide/i));
    expect(mockNavigate).toHaveBeenCalledWith('timeline');
  });

  it('calls onNavigate with "simulation" when EVM Simulator is clicked', () => {
    render(<Dashboard userProfile={mockProfile} onNavigate={mockNavigate} />);
    fireEvent.click(screen.getByLabelText(/Launch EVM Simulator/i));
    expect(mockNavigate).toHaveBeenCalledWith('simulation');
  });

  it('calls onNavigate with "settings" when Manage Profile is clicked', () => {
    render(<Dashboard userProfile={mockProfile} onNavigate={mockNavigate} />);
    fireEvent.click(screen.getByLabelText(/Manage your profile settings/i));
    expect(mockNavigate).toHaveBeenCalledWith('settings');
  });

  it('displays locked achievement badges', () => {
    render(<Dashboard userProfile={mockProfile} onNavigate={mockNavigate} />);
    expect(screen.getByLabelText(/Achievement Locked: First Quiz Ace/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Achievement Locked: Master Voter/i)).toBeInTheDocument();
  });

  it('has accessible heading hierarchy', () => {
    render(<Dashboard userProfile={mockProfile} onNavigate={mockNavigate} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    const h2s = screen.getAllByRole('heading', { level: 2 });
    expect(h2s.length).toBeGreaterThan(0);
  });
});
