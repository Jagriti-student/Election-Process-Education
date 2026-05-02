import React, { useState } from 'react';
import { Fingerprint, CheckSquare, Building, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import '../styles/components.css';

interface SimStep {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export const VotingSimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [stepDone, setStepDone] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const steps: SimStep[] = [
    { id: 'entry', title: 'Enter Polling Station', desc: 'Join the queue and wait for your turn. Do not carry phones or campaign materials inside.', icon: <Building size={32} /> },
    { id: 'id', title: 'ID Verification', desc: 'Show your Voter ID card or other approved government ID to the First Polling Officer.', icon: <FileText size={32} /> },
    { id: 'ink', title: 'Marking & Register', desc: 'The Second Polling Officer will mark your left forefinger with indelible ink and you will sign the register.', icon: <Fingerprint size={32} /> },
    { id: 'vote', title: 'Cast Your Vote', desc: 'Proceed to the voting compartment. Press the blue button next to your chosen candidate on the Electronic Voting Machine (EVM).', icon: <CheckSquare size={32} /> },
    { id: 'confirm', title: 'Verify VVPAT', desc: 'Check the printed slip behind the glass window (VVPAT) for 7 seconds to ensure your vote was recorded correctly.', icon: <CheckCircle2 size={32} /> }
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setStepDone(false); // Reset for next step
    }
  };

  const handleVote = (candidateId: string) => {
    setSelectedCandidate(candidateId);
    setTimeout(() => {
      setHasVoted(true);
      handleNextStep();
    }, 1500);
  };

  return (
    <div className="simulator-container max-w-4xl mx-auto h-full flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-indigo-400">
          Interactive Polling Booth
        </h2>
        <p className="text-slate-400 mt-2">Experience exactly what to do on election day.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-12 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 z-0"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-500 z-0 transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((step, index) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
              index < currentStep ? 'bg-indigo-500 border-indigo-500 text-white' :
              index === currentStep ? 'bg-slate-900 border-indigo-400 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]' :
              'bg-slate-900 border-slate-700 text-slate-500'
            }`}>
              {index < currentStep ? <CheckCircle2 size={20} /> : index + 1}
            </div>
            <span className={`absolute top-12 text-xs font-medium whitespace-nowrap ${
              index <= currentStep ? 'text-slate-200' : 'text-slate-500'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 glass-panel p-8 mt-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
        
        {/* Animated Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full"></div>

        <div className="relative z-10 w-full max-w-lg">
          <div className="mb-6 inline-flex p-4 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            {steps[currentStep].icon}
          </div>
          
          <h3 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h3>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            {steps[currentStep].desc}
          </p>

          {/* Step 0: Registration Check */}
          {currentStep === 0 && (
            <div className="registration-interactive mb-8 bg-slate-800/50 p-6 rounded-xl border border-white/10 w-full">
              <h4 className="text-sm font-medium text-slate-400 mb-4">SEARCH ELECTORAL ROLL</h4>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter your name..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-indigo-500 outline-none"
                />
                <button 
                  onClick={() => { if(searchQuery.length > 2) setStepDone(true); }}
                  className="px-4 py-2 bg-indigo-500 rounded-lg text-sm font-bold hover:bg-indigo-600 transition-colors"
                >
                  Search
                </button>
              </div>
              {stepDone && (
                <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                  <CheckCircle2 size={14} /> Name found at Serial No. 442, Part No. 12
                </div>
              )}
            </div>
          )}

          {/* Step 1: ID Verification */}
          {currentStep === 1 && (
            <div className="id-interactive mb-8 w-full max-w-sm mx-auto">
              <div 
                className={`voter-id-card bg-gradient-to-br from-slate-100 to-slate-300 p-4 rounded-xl shadow-2xl text-slate-900 text-left relative overflow-hidden transition-all duration-500 cursor-pointer ${stepDone ? 'scale-105 ring-4 ring-indigo-500' : ''}`}
                onClick={() => setStepDone(true)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-slate-400 rounded"></div>
                  <div className="text-[8px] font-bold text-slate-500 uppercase">Election Commission of India</div>
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-24 bg-slate-400 rounded"></div>
                  <div className="h-2 w-32 bg-slate-400 rounded"></div>
                  <div className="h-2 w-16 bg-slate-400 rounded"></div>
                </div>
                <div className="mt-4 flex justify-between items-end">
                  <div className="w-10 h-10 border-2 border-slate-400 border-dashed rounded flex items-center justify-center text-[10px] text-slate-400">SIGN</div>
                  <div className="w-16 h-4 bg-slate-400 rounded"></div>
                </div>
              </div>
              <p className="mt-4 text-xs text-indigo-400 font-medium animate-pulse">
                {stepDone ? 'Verification Successful!' : 'Click your ID to verify'}
              </p>
            </div>
          )}

          {/* Step 2: Inking Interaction */}
          {currentStep === 2 && (
            <div className="ink-interactive mb-8 relative group cursor-pointer" onClick={() => {
              const ink = document.getElementById('ink-mark');
              if (ink) {
                ink.style.opacity = '1';
                setStepDone(true);
              }
            }}>
              <div className="hand-mockup w-32 h-48 bg-amber-100/20 rounded-full mx-auto border-4 border-amber-100/10 relative overflow-hidden">
                <div id="ink-mark" className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-6 bg-purple-900 rounded-full opacity-0 transition-opacity duration-500 shadow-[0_0_10px_rgba(88,28,135,0.5)]"></div>
              </div>
              <p className="mt-4 text-sm text-slate-400">
                {stepDone ? 'Ink Applied Successfully' : 'Click the finger to apply indelible ink'}
              </p>
            </div>
          )}

          {/* Special EVM interaction for step 3 (Vote) */}
          {currentStep === 3 && !hasVoted && (
            <div className="evm-machine bg-slate-200 text-slate-900 p-6 rounded-xl text-left border-4 border-slate-400 mx-auto w-full max-w-sm mb-8 shadow-2xl">
              <div className="flex justify-between items-center mb-4 border-b-2 border-slate-300 pb-2">
                <span className="font-bold text-slate-600">BALLOT UNIT</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 opacity-50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center gap-4 bg-white p-2 rounded border border-slate-300 hover:bg-blue-50 transition-colors">
                    <div className="w-8 h-8 flex items-center justify-center bg-slate-100 border border-slate-300 font-bold">{num}</div>
                    <div className="flex-1 font-semibold">Candidate {String.fromCharCode(64 + num)}</div>
                    <button 
                      onClick={() => handleVote(num.toString())}
                      className={`w-12 h-8 rounded-full shadow-inner border-2 border-blue-800 transition-all ${
                        selectedCandidate === num.toString() ? 'bg-blue-300 ring-4 ring-blue-500/50' : 'bg-blue-600 hover:bg-blue-500'
                      }`}
                      aria-label={`Vote for Candidate ${String.fromCharCode(64 + num)}`}
                    ></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VVPAT display for step 4 (Confirm) */}
          {currentStep === 4 && hasVoted && (
            <div className="vvpat-machine bg-slate-800 p-6 rounded-xl border border-slate-600 mx-auto w-64 mb-8">
              <div className="glass-window bg-slate-900 h-32 border-4 border-slate-700 rounded relative overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-green-500/10 animate-pulse"></div>
                <div className="slip bg-white w-4/5 h-24 absolute top-4 shadow text-slate-900 p-2 text-xs flex flex-col justify-center items-center font-mono animate-bounce-slow">
                  <span className="font-bold border-b border-black w-full text-center mb-1">VVPAT SLIP</span>
                  <span className="text-sm font-bold">Candidate {String.fromCharCode(64 + parseInt(selectedCandidate || '1'))}</span>
                  <span className="mt-2 text-[8px] text-slate-500">Vote recorded at {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          )}

          {currentStep !== 3 && (
            <button 
              onClick={handleNextStep}
              className="action-btn px-8 py-3 w-full justify-center text-lg"
              disabled={(currentStep !== 4 && !stepDone) || (currentStep === 4 && !hasVoted)}
            >
              {currentStep === steps.length - 1 ? 'Simulation Complete' : 'Proceed to Next Step'} 
              {currentStep !== steps.length - 1 && <ArrowRight size={20} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
