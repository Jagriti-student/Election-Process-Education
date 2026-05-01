import { useState, useEffect, Suspense, lazy } from 'react';
import { AssistantHeader } from './components/AssistantHeader';
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

function App() {
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile | undefined>('civicProfile', undefined);
  const [showOnboarding, setShowOnboarding] = useState(!userProfile);
  const [activeMode, setActiveMode] = useState<ViewMode>('timeline');
  const [activeStepId, setActiveStepId] = useState(ELECTION_STEPS[0].id);

  useEffect(() => {
    if (userProfile) {
      setShowOnboarding(false);
    }
  }, [userProfile]);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowOnboarding(false);
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
                <StepCard step={activeStep} />
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
      case 'settings':
        return (
          <div className="glass-panel p-8 max-w-2xl mx-auto mt-12 text-center" role="region" aria-label="Settings">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-slate-400 mb-8">Manage your profile and preferences.</p>
            <button 
              className="action-btn"
              aria-label="Reset Profile and Restart Onboarding"
              onClick={() => {
                localStorage.removeItem('civicProfile');
                setUserProfile(undefined);
                setShowOnboarding(true);
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
      {showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} />}
      
      <div className="app-layout" aria-hidden={showOnboarding}>
        <Sidebar 
          activeMode={activeMode} 
          onModeSelect={setActiveMode} 
          userProfile={userProfile} 
        />
        
        <div className="content-area">
          <main className="content-inner fade-in" id="main-content">
            {renderContent()}
          </main>
        </div>

        <div className="assistant-panel" aria-label="AI Assistant Panel">
          <ChatAssistant 
            onNavigate={(mode) => setActiveMode(mode as ViewMode)} 
            userProfile={userProfile}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
