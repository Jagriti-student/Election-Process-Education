import React, { useState } from 'react';
import { Lightbulb, ArrowRight, Info, Users as UsersIcon } from 'lucide-react';
import type { ElectionStep } from '../types';
import '../styles/components.css';

interface StepCardProps {
  step: ElectionStep;
}

/**
 * StepCard Component
 * @description Displays detailed information about a specific election step, 
 * including pro-tips, pro-importance details, and integrated Google services.
 * @param {Object} props - Component props.
 * @param {ElectionStep} props.step - The election step data to display.
 */
export const StepCard: React.FC<StepCardProps> = ({ step }) => {
  const [showMore, setShowMore] = useState(false);

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
        
        {showMore && step.id === 'voting' && (
          <div className="google-services-integration mt-6 mb-6 fade-in">
            <h4 className="flex items-center gap-2 text-indigo-400 mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] font-bold">G</span>
              Locate Your Polling Station (Google Maps)
            </h4>
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-slate-800/50 flex items-center justify-center relative">
              {import.meta.env.VITE_GOOGLE_MAPS_API_KEY && import.meta.env.VITE_GOOGLE_MAPS_API_KEY !== 'YOUR_API_KEY' ? (
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy" 
                  allowFullScreen 
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/search?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=polling+station+near+me`}
                  title="Google Maps - Polling Station Locator"
                ></iframe>
              ) : (
                <div className="text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                    <span className="text-slate-500 text-xl font-bold">!</span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium">Maps Integration Pending</p>
                  <p className="text-xs text-slate-500 mt-1">Please provide a VITE_GOOGLE_MAPS_API_KEY to enable this service.</p>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-2 italic">Note: Powered by Google Maps Platform.</p>
          </div>
        )}

        {showMore && step.id === 'campaign' && (
          <div className="google-services-integration mt-6 mb-6 fade-in">
            <h4 className="flex items-center gap-2 text-rose-400 mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/20 text-[10px] font-bold">Y</span>
              Learn about Campaigning (YouTube)
            </h4>
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Election Campaign Guide" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        <button 
          className="action-btn" 
          onClick={() => setShowMore(!showMore)}
          style={{ transition: 'all 0.3s' }}
          aria-expanded={showMore}
        >
          {showMore ? 'Show Less' : 'Learn More'} 
          <ArrowRight 
            size={18} 
            style={{ 
              transform: showMore ? 'rotate(-90deg)' : 'none', 
              transition: 'transform 0.3s' 
            }} 
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};
