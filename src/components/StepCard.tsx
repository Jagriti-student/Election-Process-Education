import React, { useState, useEffect } from 'react';
import { Lightbulb, ArrowRight, Info, Users as UsersIcon } from 'lucide-react';
import type { ElectionStep } from './Timeline';
import '../styles/components.css';

interface StepCardProps {
  step: ElectionStep;
}

export const StepCard: React.FC<StepCardProps> = ({ step }) => {
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setShowMore(false);
  }, [step.id]);

  return (
    <div className="glass-panel step-card">
      <div className="step-card-header">
        <div className="step-card-icon">
          {step.icon}
        </div>
        <div className="step-card-title">
          <h2>{step.title}</h2>
          <span className="duration">Estimated Time: {step.duration}</span>
        </div>
      </div>
      
      <div className="step-card-body">
        <p>{step.detailedDescription}</p>
        
        {step.tips && step.tips.length > 0 && (
          <div className="tips-section">
            <h4><Lightbulb size={18} /> Pro Tips</h4>
            <ul>
              {step.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        {showMore && step.extraDetails && (
          <div className="extra-details fadeIn" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--primary-color)' }}>
            <h4 style={{ color: 'var(--primary-light)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={18} /> Why is this important?
            </h4>
            <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>{step.extraDetails.importance}</p>
            
            <h4 style={{ color: 'var(--primary-light)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UsersIcon size={18} /> Who is involved?
            </h4>
            <p style={{ fontSize: '0.95rem', marginBottom: '0' }}>{step.extraDetails.whoIsInvolved}</p>
          </div>
        )}
        
        <button 
          className="action-btn" 
          onClick={() => setShowMore(!showMore)}
          style={{ transition: 'all 0.3s' }}
        >
          {showMore ? 'Show Less' : 'Learn More'} 
          <ArrowRight 
            size={18} 
            style={{ 
              transform: showMore ? 'rotate(-90deg)' : 'none', 
              transition: 'transform 0.3s' 
            }} 
          />
        </button>
      </div>
    </div>
  );
};
