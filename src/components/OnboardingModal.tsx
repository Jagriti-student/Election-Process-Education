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
    <div className="modal-overlay">
      <div className="glass-panel onboarding-modal fade-in-up">
        <div className="onboarding-header">
          <h2>Welcome to Your Election Guide 👋</h2>
          <p>Let's personalize your experience to give you the most relevant information.</p>
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
