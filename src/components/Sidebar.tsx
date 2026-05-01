import React from 'react';
import { BookOpen, CheckSquare, Clock, ShieldAlert, PlayCircle, Settings } from 'lucide-react';
import '../styles/components.css';

export type ViewMode = 'timeline' | 'simulation' | 'quiz' | 'misinformation' | 'settings';

interface SidebarProps {
  activeMode: ViewMode;
  onModeSelect: (mode: ViewMode) => void;
  userProfile?: { isFirstTimeVoter: boolean | null; ageGroup: string };
}

export const Sidebar: React.FC<SidebarProps> = ({ activeMode, onModeSelect, userProfile }) => {
  const menuItems = [
    { id: 'timeline', label: 'Election Process', icon: <Clock size={20} />, color: 'var(--primary-light)' },
    { id: 'simulation', label: 'Voting Simulator', icon: <PlayCircle size={20} />, color: 'var(--secondary-color)' },
    { id: 'quiz', label: 'Knowledge Quiz', icon: <CheckSquare size={20} />, color: 'var(--accent-color)' },
    { id: 'misinformation', label: 'Fact Check', icon: <ShieldAlert size={20} />, color: '#F59E0B' }, // Amber
  ] as const;

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo-icon">
          <BookOpen size={24} color="var(--primary-color)" />
        </div>
        <h2>CivicEdu</h2>
      </div>

      {userProfile && (
        <div className="user-badge">
          {userProfile.isFirstTimeVoter ? (
            <span className="badge new-voter">First-Time Voter</span>
          ) : (
            <span className="badge experienced-voter">Experienced Voter</span>
          )}
        </div>
      )}

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-btn ${activeMode === item.id ? 'active' : ''}`}
                onClick={() => onModeSelect(item.id)}
              >
                <div 
                  className="nav-icon" 
                  style={{ color: activeMode === item.id ? 'white' : item.color }}
                >
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button 
          className={`nav-btn ${activeMode === 'settings' ? 'active' : ''}`}
          onClick={() => onModeSelect('settings')}
        >
          <div className="nav-icon"><Settings size={20} /></div>
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};
