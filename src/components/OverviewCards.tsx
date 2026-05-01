import React from 'react';
import { ShieldCheck, Settings } from 'lucide-react';
import '../styles/components.css';

export const OverviewCards: React.FC = () => {
  return (
    <div className="overview-container">
      <div className="glass-panel overview-card">
        <div className="overview-icon-wrapper help-icon">
          <ShieldCheck size={28} />
        </div>
        <div className="overview-content">
          <h3>How It Helps</h3>
          <p>
            Understanding the election process empowers citizens to make informed decisions. 
            It ensures transparency, holds elected officials accountable, and strengthens the foundation of our democracy by promoting active civic engagement.
          </p>
        </div>
      </div>
      
      <div className="glass-panel overview-card">
        <div className="overview-icon-wrapper work-icon">
          <Settings size={28} />
        </div>
        <div className="overview-content">
          <h3>How It Works</h3>
          <p>
            The system operates through a series of structured phases—from initial voter registration to the final declaration of results. 
            Independent electoral commissions oversee each step to guarantee fairness, security, and equal opportunity for all participants.
          </p>
        </div>
      </div>
    </div>
  );
};
