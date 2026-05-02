import React from 'react';
import { BookOpen, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import '../styles/components.css';

interface LandingPageProps {
  onGoogleLogin: () => void;
  onManualStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGoogleLogin, onManualStart }) => {
  return (
    <div className="landing-page fixed inset-0 z-[200] bg-[#0f172a] flex items-center justify-center overflow-y-auto py-12 px-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
            <Zap size={14} /> Powered by Google Gemini AI
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Become an <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">Informed Voter</span> Today.
          </h1>
          
          <p className="text-slate-400 text-lg leading-relaxed">
            The all-in-one AI-powered platform to master the election process, simulate your vote, and identify misinformation.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="text-emerald-400" size={20} />
              <span>Interactive 5-step election guide</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="text-emerald-400" size={20} />
              <span>Virtual EVM & VVPAT simulator</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="text-emerald-400" size={20} />
              <span>AI-powered Fact-Checking assistant</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-8 md:p-10 text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <div className="w-16 h-16 bg-indigo-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BookOpen size={32} className="text-white" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-slate-400">Sign in to access your personalized roadmap.</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={onGoogleLogin}
              className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all transform hover:scale-[1.02] shadow-xl border border-slate-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            
            <button 
              onClick={onManualStart}
              className="w-full py-4 px-6 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-xl font-semibold transition-all border border-white/5"
            >
              Start without Signing In
            </button>
          </div>

          <div className="pt-4 border-t border-white/5 space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Cloud Infrastructure</p>
            <div className="flex flex-wrap justify-center gap-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-xs flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Google Cloud Platform
              </span>
              <span className="text-xs flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Google Gemini AI
              </span>
              <span className="text-xs flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Google Identity Service
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center justify-center gap-2 mt-4">
              <ShieldCheck size={14} /> Secured by Google Cloud Enterprise Security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
