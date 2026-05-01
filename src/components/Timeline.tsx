import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import '../styles/components.css';

export interface ElectionStep {
  id: string;
  title: string;
  shortDescription: string;
  duration: string;
  detailedDescription: string;
  tips: string[];
  extraDetails?: {
    importance: string;
    whoIsInvolved: string;
  };
  icon: React.ReactNode;
}

interface TimelineProps {
  steps: ElectionStep[];
  activeStepId: string;
  onStepSelect: (id: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ steps, activeStepId, onStepSelect }) => {
  return (
    <div className="timeline-container">
      {steps.map((step) => {
        const isActive = step.id === activeStepId;
        return (
          <button 
            key={step.id} 
            className={`timeline-item ${isActive ? 'active' : ''}`}
            onClick={() => onStepSelect(step.id)}
            aria-current={isActive ? 'step' : undefined}
            aria-label={`Step: ${step.title}`}
          >
            <div className="timeline-icon-wrapper" aria-hidden="true">
              {isActive ? <CheckCircle2 size={16} color="white" /> : <Circle size={12} color="var(--glass-border)" />}
            </div>
            <div className="timeline-content">
              <h3 className="flex items-center gap-2">{step.icon} {step.title}</h3>
              <p>{step.shortDescription}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
