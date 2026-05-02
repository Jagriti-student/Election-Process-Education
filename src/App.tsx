import { useState, useEffect, Suspense, lazy } from 'react';
import { AssistantHeader } from './components/AssistantHeader';
import { googleLogger, logSecurityAuditEvent, trackAnalyticsEvent } from './services/GoogleCloudService';
import { ErrorBoundary } from './components/ErrorBoundary';
import { OverviewCards } from './components/OverviewCards';
import { Timeline } from './components/Timeline';
import { StepCard } from './components/StepCard';
import { Sidebar } from './components/Sidebar';
import { OnboardingModal } from './components/OnboardingModal';
import { ChatAssistant } from './components/ChatAssistant';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ELECTION_STEPS } from './data/electionData';
import type { UserProfile, ViewMode } from './types';
import './styles/components.css';

// Lazy load heavy components for efficiency
const VotingSimulator = lazy(() => import('./components/VotingSimulator').then(m => ({ default: m.VotingSimulator })));
const QuizMode = lazy(() => import('./components/QuizMode').then(m => ({ default: m.QuizMode })));
const MisinformationGuide = lazy(() => import('./components/MisinformationGuide').then(m => ({ default: m.MisinformationGuide })));

import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';

/**
 * App Component
 * @description The root component of the Election Education Assistant.
 * Manages the main application state, including user profile, navigation mode, 
 * and orchestration of the landing, onboarding, and dashboard flows.
 */
function App() {
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile | undefined>('civicProfile', undefined);
  const [showLanding, setShowLanding] = useState(!userProfile);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeMode, setActiveMode] = useState<ViewMode>('dashboard');
  const [activeStepId, setActiveStepId] = useState(ELECTION_STEPS[0].id);

  useEffect(() => {
    if (userProfile) {
      googleLogger.info('User session active', { location: userProfile.location });
    } else {
      googleLogger.info('New user session started');
    }
  }, [userProfile]);

  /**
   * Handles the mock Google Login flow.
   */
  const handleGoogleLogin = () => {
    const profile: UserProfile = {
      isFirstTimeVoter: true,
      ageGroup: '18-24',
      location: 'Delhi'
    };
    setUserProfile(profile);
    setShowLanding(false);
    setActiveMode('dashboard');
    googleLogger.info('User logged in with Google Identity');
    logSecurityAuditEvent('GOOGLE_LOGIN', 'citizen@gmail.com', { method: 'OAuth2', location: profile.location });
    trackAnalyticsEvent('login', { method: 'google' });
  };

  const handleManualStart = () => {
    setShowLanding(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowOnboarding(false);
    setActiveMode('dashboard');
  };

  const activeStep = ELECTION_STEPS.find(step => step.id === activeStepId) || ELECTION_STEPS[0];

  const renderContent = () => {
    switch (activeMode) {
      case 'timeline':
        return (
          <div role="region" aria-label="Election Process Timeline">
            <AssistantHeader />
            <OverviewCards />
            <div className="main-content">
              <section>
                <Timeline 
                  steps={ELECTION_STEPS} 
                  activeStepId={activeStepId} 
                  onStepSelect={setActiveStepId} 
                />
              </section>
              <section>
                <StepCard key={activeStepId} step={activeStep} />
              </section>
            </div>
          </div>
        );
      case 'simulation':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div></div>}>
            <VotingSimulator />
          </Suspense>
        );
      case 'quiz':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full text-indigo-400">Loading Quiz...</div>}>
            <QuizMode />
          </Suspense>
        );
      case 'misinformation':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full text-indigo-400">Loading Guide...</div>}>
            <MisinformationGuide />
          </Suspense>
        );
      case 'dashboard':
        return (
          <Dashboard 
            userProfile={userProfile} 
            onNavigate={(mode) => setActiveMode(mode as ViewMode)} 
          />
        );
      case 'settings':
        return (
          <div className="glass-panel p-8 max-w-2xl mx-auto mt-12 text-center" role="region" aria-label="Settings">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-slate-400 mb-8">Manage your profile and preferences.</p>
            <button 
              className="action-btn mb-4 w-full justify-center"
              onClick={() => {
                const roadmap = `ELECTION ROADMAP FOR ${userProfile?.ageGroup || 'Citizen'}\nLocation: ${userProfile?.location || 'General'}\n\n1. Registration\n2. Verification\n3. Polling Booth\n4. Casting Vote\n\nGenerated by AI Election Assistant.`;
                const blob = new Blob([roadmap], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'voter-roadmap.txt';
                a.click();
              }}
            >
              Export Personalized Roadmap (TXT)
            </button>
            <br />
            <button 
              className="px-6 py-2 text-slate-500 hover:text-white transition-colors text-sm"
              aria-label="Reset Profile and Restart Onboarding"
              onClick={() => {
                localStorage.removeItem('civicProfile');
                setUserProfile(undefined);
                setShowLanding(true);
                setShowOnboarding(false);
                setActiveMode('timeline');
              }}
            >
              Reset Profile & Restart Onboarding
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-root" role="application">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-lg z-[100]">
        Skip to main content
      </a>

      {showLanding && <LandingPage onGoogleLogin={handleGoogleLogin} onManualStart={handleManualStart} />}
      {showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} />}
      
      <div className="app-layout" aria-hidden={showOnboarding}>
        <Sidebar 
          activeMode={activeMode} 
          onModeSelect={setActiveMode} 
          userProfile={userProfile} 
        />
        
        <div className="content-area">
          <main className="content-inner fade-in" id="main-content">
            <ErrorBoundary>
              {renderContent()}
            </ErrorBoundary>
          </main>
          
          <footer className="mt-auto py-6 px-8 border-t border-white/5 text-center text-xs text-slate-500">
            <p>© 2026 Election Education Assistant. Powered by Google Gemini & Google Cloud.</p>
          </footer>
        </div>

        <aside className="assistant-panel" aria-label="AI Assistant Panel">
          <ChatAssistant 
            onNavigate={(mode) => setActiveMode(mode as ViewMode)} 
            userProfile={userProfile}
          />
        </aside>
      </div>
    </div>
  );
}

export default App;
