export interface Candidate {
  id: string;
  name: string;
  party: string;
  color: string;
}

export const CANDIDATES: Candidate[] = [
  { id: '1', name: 'Dr. Anita Roy', party: 'Progressive Alliance (PA)', color: '#6366F1' }, // Indigo
  { id: '2', name: 'Rajesh Kumar', party: 'National Unity Party (NUP)', color: '#10B981' }, // Emerald
  { id: '3', name: 'Sarah Fernandez', party: 'Green Democracy Party (GDP)', color: '#F59E0B' }, // Amber
  { id: '4', name: 'NOTA', party: 'None of the Above', color: '#64748B' } // Slate
];

const VOTES_KEY = 'election_live_votes';
const USER_VOTED_KEY = 'election_user_has_voted';

// Mock initial votes for demo purposes
const DEFAULT_VOTES: Record<string, number> = {
  '1': 142,
  '2': 98,
  '3': 73,
  '4': 19
};

export const voteStorage = {
  /**
   * Retrieves the current vote tallies from localStorage.
   * If empty, initializes with default mock values.
   */
  getVotes(): Record<string, number> {
    const data = localStorage.getItem(VOTES_KEY);
    if (!data) {
      localStorage.setItem(VOTES_KEY, JSON.stringify(DEFAULT_VOTES));
      return { ...DEFAULT_VOTES };
    }
    try {
      return JSON.parse(data);
    } catch {
      return { ...DEFAULT_VOTES };
    }
  },

  /**
   * Casts a vote for a candidate.
   * Increments the count, saves to localStorage, and dispatches a custom event.
   */
  castVote(candidateId: string): void {
    const votes = this.getVotes();
    if (votes[candidateId] !== undefined) {
      votes[candidateId] += 1;
    } else {
      votes[candidateId] = 1;
    }
    localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
    
    // Dispatch custom event for real-time updates across components
    window.dispatchEvent(new CustomEvent('votes-updated', { detail: votes }));
  },

  /**
   * Resets all candidate vote counts to zero.
   */
  resetVotes(): void {
    const zeroVotes: Record<string, number> = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0
    };
    localStorage.setItem(VOTES_KEY, JSON.stringify(zeroVotes));
    window.dispatchEvent(new CustomEvent('votes-updated', { detail: zeroVotes }));
  },

  /**
   * Resets all candidate votes back to the initial default mock values.
   */
  resetToDefaultVotes(): void {
    localStorage.setItem(VOTES_KEY, JSON.stringify(DEFAULT_VOTES));
    window.dispatchEvent(new CustomEvent('votes-updated', { detail: DEFAULT_VOTES }));
  },

  /**
   * Checks if the user has voted in the main poll.
   */
  hasUserVoted(): boolean {
    return localStorage.getItem(USER_VOTED_KEY) === 'true';
  },

  /**
   * Marks the current user as having voted in the main poll.
   */
  setUserVoted(): void {
    localStorage.setItem(USER_VOTED_KEY, 'true');
    window.dispatchEvent(new CustomEvent('user-vote-status-changed'));
  },

  /**
   * Resets the user's voting status (so they can vote again).
   */
  resetUserVoted(): void {
    localStorage.removeItem(USER_VOTED_KEY);
    window.dispatchEvent(new CustomEvent('user-vote-status-changed'));
  },

  /**
   * Subscribes to vote changes.
   * Returns an unsubscribe function.
   */
  subscribe(callback: (votes: Record<string, number>) => void): () => void {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<Record<string, number>>;
      callback(customEvent.detail);
    };
    
    window.addEventListener('votes-updated', handler);
    return () => {
      window.removeEventListener('votes-updated', handler);
    };
  },

  /**
   * Subscribes to changes in the user's vote status.
   * Returns an unsubscribe function.
   */
  subscribeUserStatus(callback: () => void): () => void {
    window.addEventListener('user-vote-status-changed', callback);
    return () => {
      window.removeEventListener('user-vote-status-changed', callback);
    };
  }
};
