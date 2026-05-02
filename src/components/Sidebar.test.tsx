import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from '../components/Sidebar';
import '@testing-library/jest-dom';

describe('Sidebar Component', () => {
  const mockOnModeSelect = vi.fn();
  const mockProfile = { isFirstTimeVoter: true, ageGroup: '18-24', location: 'Delhi' };

  it('renders all navigation items', () => {
    render(
      <Sidebar 
        activeMode="timeline" 
        onModeSelect={mockOnModeSelect} 
        userProfile={mockProfile} 
      />
    );

    expect(screen.getByText(/Election Process/i)).toBeInTheDocument();
    expect(screen.getByText(/Voting Simulator/i)).toBeInTheDocument();
    expect(screen.getByText(/Knowledge Quiz/i)).toBeInTheDocument();
  });

  it('calls onModeSelect when a nav item is clicked', () => {
    render(
      <Sidebar 
        activeMode="timeline" 
        onModeSelect={mockOnModeSelect} 
        userProfile={mockProfile} 
      />
    );

    fireEvent.click(screen.getByText(/Knowledge Quiz/i));
    expect(mockOnModeSelect).toHaveBeenCalledWith('quiz');
  });

  it('displays user badge if profile is present', () => {
    render(
      <Sidebar 
        activeMode="timeline" 
        onModeSelect={mockOnModeSelect} 
        userProfile={mockProfile} 
      />
    );

    expect(screen.getByText(/First-Time Voter/i)).toBeInTheDocument();
  });
});
