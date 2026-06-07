import React, { useState, useEffect } from 'react';
import { voteStorage, CANDIDATES } from '../services/voteStorage';
import { CheckCircle2, User, Landmark, ShieldCheck } from 'lucide-react';
import '../styles/components.css';

export const VotePanel: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  useEffect(() => {
    // Initial load
    setHasVoted(voteStorage.hasUserVoted());

    // Listen to status changes (e.g. if reset from dashboard)
    const unsubscribeStatus = voteStorage.subscribeUserStatus(() => {
      const voted = voteStorage.hasUserVoted();
      setHasVoted(voted);
      if (!voted) {
        setSelectedId(null);
      }
    });

    return () => {
      unsubscribeStatus();
    };
  }, []);

  const handleVoteSubmit = () => {
    if (!selectedId) return;

    // Cast vote in storage
    voteStorage.castVote(selectedId);
    // Mark user as voted
    voteStorage.setUserVoted();
    
    setHasVoted(true);
  };

  const handleResetVote = () => {
    voteStorage.resetUserVoted();
  };

  if (hasVoted) {
    return (
      <div 
        className="glass-panel p-6 border-emerald-500/20 bg-emerald-500/5 text-center flex flex-col items-center justify-center min-h-[300px] animate-in fade-in duration-300"
        role="region"
        aria-label="Voting Status Confirmation"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
          <CheckCircle2 size={36} className="animate-bounce-slow" />
        </div>
        <h3 className="text-xl font-bold mb-2">Vote Cast Successfully!</h3>
        <p className="text-slate-400 text-sm max-w-sm mb-6">
          Thank you for exercising your civic duty. Your vote has been recorded securely in localStorage and updated in the live tallies above.
        </p>
        <button 
          onClick={handleResetVote}
          className="px-4 py-2 border border-white/10 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          aria-label="Reset My Vote (Demo Mode)"
        >
          Reset My Vote (Demo Mode)
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 flex flex-col h-full" role="region" aria-labelledby="voting-panel-title">
      <div className="mb-4">
        <h2 id="voting-panel-title" className="text-xl font-bold flex items-center gap-2">
          <Landmark size={20} className="text-indigo-400" />
          Cast Your Mock Vote
        </h2>
        <p className="text-xs text-slate-400 mt-1">Select a candidate below to participate in our live community poll.</p>
      </div>

      <div 
        className="space-y-3 flex-1 mb-6" 
        role="radiogroup" 
        aria-label="Choose a Candidate"
      >
        {CANDIDATES.map((candidate) => {
          const isSelected = selectedId === candidate.id;
          return (
            <button
              key={candidate.id}
              onClick={() => setSelectedId(candidate.id)}
              className={`w-full p-4 rounded-xl flex items-center justify-between text-left transition-all border ${
                isSelected 
                  ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${candidate.name} representing ${candidate.party}`}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: candidate.color }}
                  aria-hidden="true"
                ></div>
                <div>
                  <h4 className="font-semibold text-sm flex items-center gap-1.5">
                    {candidate.name}
                    {candidate.id !== '4' && <User size={12} className="text-slate-500" />}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{candidate.party}</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                isSelected 
                  ? 'border-indigo-400 bg-indigo-500 text-white' 
                  : 'border-slate-600'
              }`}>
                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleVoteSubmit}
        disabled={!selectedId}
        className="action-btn w-full justify-center text-sm py-3 flex items-center gap-2"
        aria-label="Submit Secure Ballot"
      >
        <ShieldCheck size={16} />
        Submit Secure Ballot
      </button>
    </div>
  );
};
