import React, { useState } from 'react';
import { User, MapPin, Calendar, ArrowRight } from 'lucide-react';
import '../styles/components.css';

interface UserProfile {
  isFirstTimeVoter: boolean | null;
  ageGroup: string;
  location: string;
}

interface OnboardingModalProps {
  onComplete: (profile: UserProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    isFirstTimeVoter: null,
    ageGroup: '',
    location: ''
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  const isStepValid = () => {
    if (step === 1) return profile.isFirstTimeVoter !== null;
    if (step === 2) return profile.ageGroup !== '';
    if (step === 3) return profile.location !== '';
    return false;
  };

  return (
    <div className="modal-overlay" role="presentation">
      <div
        className="glass-panel onboarding-modal fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
      >
        <div className="onboarding-header">
          <h2 id="onboarding-title">Welcome to Your Election Guide 👋</h2>
          <p>Let's personalize your experience to give you the most relevant information.</p>
          
          <button 
            className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-white text-slate-900 rounded-xl font-semibold mb-6 hover:bg-slate-100 transition-colors shadow-sm"
            onClick={() => {
              // Mock Google Sign In - Real logic would involve Google SDK
              const googleProfile = { isFirstTimeVoter: true, ageGroup: '18-24', location: 'Delhi' };
              setProfile(googleProfile);
              onComplete(googleProfile);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-white/10"></div>
            <span className="text-xs text-slate-500 font-medium">OR PERSONALIZE MANUALLY</span>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>

          <div className="progress-bar">
            <div className={`progress-fill step-${step}`}></div>
          </div>
        </div>

        <div className="onboarding-body">
          {step === 1 && (
            <div className="onboarding-step fade-in">
              <h3>Are you a first-time voter?</h3>
              <div className="options-grid">
                <button 
                  className={`option-btn ${profile.isFirstTimeVoter === true ? 'selected' : ''}`}
                  onClick={() => setProfile({ ...profile, isFirstTimeVoter: true })}
                >
                  <User className="icon" />
                  Yes, it's my first time!
                </button>
                <button 
                  className={`option-btn ${profile.isFirstTimeVoter === false ? 'selected' : ''}`}
                  onClick={() => setProfile({ ...profile, isFirstTimeVoter: false })}
                >
                  <User className="icon" />
                  No, I've voted before
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="onboarding-step fade-in">
              <h3>What is your age group?</h3>
              <div className="options-grid">
                {['18-24', '25-34', '35-50', '50+'].map((age) => (
                  <button 
                    key={age}
                    className={`option-btn ${profile.ageGroup === age ? 'selected' : ''}`}
                    onClick={() => setProfile({ ...profile, ageGroup: age })}
                  >
                    <Calendar className="icon" />
                    {age}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="onboarding-step fade-in">
              <h3>Which state are you from?</h3>
              <div className="input-container">
                <MapPin className="input-icon" />
                <select 
                  className="premium-select"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                >
                  <option value="" disabled>Select your state</option>
                  <optgroup label="Popular States">
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                  </optgroup>
                  <optgroup label="Other States/UTs">
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="Other">Other</option>
                  </optgroup>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="onboarding-footer">
          <button 
            className="action-btn next-btn" 
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            {step === 3 ? 'Get Started' : 'Next'} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
