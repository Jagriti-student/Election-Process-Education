import React from 'react';
import { LayoutDashboard, Award, Zap, Activity, ChevronRight, User, MapPin, Calendar } from 'lucide-react';
import type { UserProfile, ViewMode } from '../types';
import '../styles/components.css';

/**
 * @interface DashboardProps
 * @description Properties for the Dashboard component.
 * @property {UserProfile | undefined} userProfile - The current user's profile information.
 * @property {(mode: ViewMode) => void} onNavigate - Callback function to handle navigation between different view modes.
 */
interface DashboardProps {
  userProfile: UserProfile | undefined;
  onNavigate: (mode: ViewMode) => void;
}

/**
 * Dashboard Component
 * @description The main hub for the authenticated user, providing a personalized overview
 * of their civic education journey, including progress stats and recommended next steps.
 * @param {DashboardProps} props - The component props.
 * @returns {JSX.Element} The rendered dashboard view.
 */
export const Dashboard: React.FC<DashboardProps> = ({ userProfile, onNavigate }) => {
  const stats = [
    { label: 'Process Mastery', value: '45%', icon: <Award className="text-yellow-400" />, color: 'bg-yellow-400/10' },
    { label: 'Quiz Score', value: '0/10', icon: <Zap className="text-indigo-400" />, color: 'bg-indigo-400/10' },
    { label: 'Simulations', value: '0 Completed', icon: <Activity className="text-emerald-400" />, color: 'bg-emerald-400/10' },
  ];

  return (
    <div className="dashboard-view animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back, {userProfile?.location || 'Citizen'}!</h1>
          <p className="text-slate-400">Your personalized civic education journey is waiting.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <User size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold">{userProfile?.ageGroup || '18-24'} Years</p>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin size={10} /> {userProfile?.location || 'India'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" role="list" aria-label="Progress Statistics">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="glass-panel p-6 flex items-center gap-4 group hover:border-white/20 transition-all"
            role="listitem"
            aria-label={`${stat.label}: ${stat.value}`}
          >
            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`} aria-hidden="true">
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="glass-panel overflow-hidden" aria-labelledby="steps-title">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h2 id="steps-title" className="text-xl font-bold flex items-center gap-2">
                <LayoutDashboard size={20} className="text-indigo-400" aria-hidden="true" />
                Recommended Next Steps
              </h2>
            </div>
            <div className="divide-y divide-white/5" role="list">
              <button 
                onClick={() => onNavigate('timeline')}
                className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors text-left group"
                role="listitem"
                aria-label="Continue to Voter Registration Guide"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" aria-hidden="true"></div>
                  <div>
                    <h3 className="font-semibold group-hover:text-indigo-400 transition-colors">Complete Voter Registration Guide</h3>
                    <p className="text-sm text-slate-400">Step 1 of the Election Process</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-600 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
              
              <button 
                onClick={() => onNavigate('simulation')}
                className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors text-left group"
                role="listitem"
                aria-label="Launch EVM Simulator"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true"></div>
                  <div>
                    <h3 className="font-semibold group-hover:text-emerald-400 transition-colors">Try the EVM Simulator</h3>
                    <p className="text-sm text-slate-400">Practice casting your vote</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-600 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Electoral Insights and Verification">
            <div className="glass-panel p-6 bg-gradient-to-br from-indigo-500/10 to-transparent">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Calendar size={18} className="text-indigo-400" aria-hidden="true" />
                Electoral Insight
              </h3>
              <p className="text-sm text-slate-300 mb-4">
                Did you know? In India, the Model Code of Conduct comes into force immediately after the election schedule is announced.
              </p>
              <a href="#" className="text-xs font-bold text-indigo-400 hover:underline" aria-label="Learn more about Model Code of Conduct">Learn more about MCC</a>
            </div>
            
            <div className="glass-panel p-6 bg-gradient-to-br from-emerald-500/10 to-transparent">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-400" aria-hidden="true" />
                Verification Status
              </h3>
              <p className="text-sm text-slate-300 mb-4">
                Your profile is set up for {userProfile?.location || 'General'} region. Ensure your voter ID details match.
              </p>
              <button 
                onClick={() => onNavigate('settings')} 
                className="text-xs font-bold text-emerald-400 hover:underline"
                aria-label="Manage your profile settings"
              >
                Manage Profile
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="glass-panel p-6" aria-labelledby="achievements-title">
            <h2 id="achievements-title" className="text-lg font-bold mb-4">Recent Achievements</h2>
            <div className="space-y-4" role="list">
              <div className="flex items-center gap-3 grayscale opacity-50" role="listitem" aria-label="Achievement Locked: First Quiz Ace">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center" aria-hidden="true">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold">First Quiz Ace</p>
                  <p className="text-xs text-slate-500">Score 100% in any quiz</p>
                </div>
              </div>
              <div className="flex items-center gap-3 grayscale opacity-50" role="listitem" aria-label="Achievement Locked: Master Voter">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center" aria-hidden="true">
                  <Activity size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Master Voter</p>
                  <p className="text-xs text-slate-500">Complete 3 simulations</p>
                </div>
              </div>
            </div>
          </section>

          <section className="glass-panel p-6 bg-indigo-600/10 border-indigo-500/20" aria-labelledby="help-title">
            <h2 id="help-title" className="text-lg font-bold mb-2">Need Help?</h2>
            <p className="text-sm text-slate-400 mb-4">Ask our AI Assistant anything about the election process.</p>
            <button 
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-colors"
              aria-label="Open AI Assistant for help"
              onClick={() => {
                const chatInput = document.querySelector('input[type="text"]') as HTMLInputElement;
                if (chatInput) chatInput.focus();
              }}
            >
              Open Assistant
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

const ShieldCheck = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
