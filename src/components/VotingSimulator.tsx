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

          {/* Special EVM interaction for step 3 (Vote) */}
          {currentStep === 3 && !hasVoted && (
            <div className="evm-machine bg-slate-200 text-slate-900 p-6 rounded-xl text-left border-4 border-slate-400 mx-auto w-full max-w-sm mb-8 shadow-2xl">
              <div className="flex justify-between items-center mb-4 border-b-2 border-slate-300 pb-2">
                <span className="font-bold text-slate-600">BALLOT UNIT</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 opacity-50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center gap-4 bg-white p-2 rounded border border-slate-300">
                    <div className="w-8 h-8 flex items-center justify-center bg-slate-100 border border-slate-300 font-bold">{num}</div>
                    <div className="flex-1 font-semibold">Candidate {String.fromCharCode(64 + num)}</div>
                    <button 
                      onClick={() => handleVote(num.toString())}
                      className={`w-12 h-8 rounded-full shadow-inner border-2 border-blue-800 transition-colors ${
                        selectedCandidate === num.toString() ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-500'
                      }`}
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
                <div className="slip bg-white w-4/5 h-24 absolute top-4 shadow text-slate-900 p-2 text-xs flex flex-col justify-center items-center font-mono">
                  <span className="font-bold border-b border-black w-full text-center mb-1">VVPAT SLIP</span>
                  <span>Candidate {String.fromCharCode(64 + parseInt(selectedCandidate || '1'))}</span>
                  <span className="mt-2 text-[8px] text-slate-500">Recorded correctly</span>
                </div>
              </div>
            </div>
          )}

          {currentStep !== 3 && (
            <button 
              onClick={handleNextStep}
              className="action-btn px-8 py-3 w-full justify-center text-lg"
              disabled={currentStep === steps.length - 1}
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
