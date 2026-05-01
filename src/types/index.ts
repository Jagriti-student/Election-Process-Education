export interface UserProfile {
  isFirstTimeVoter: boolean | null;
  ageGroup: string;
  location: string;
}

export type ViewMode = 'timeline' | 'simulation' | 'quiz' | 'misinformation' | 'settings';

export interface ElectionStep {
  id: string;
  title: string;
  shortDescription: string;
  duration: string;
  detailedDescription: string;
  tips: string[];
  extraDetails: {
    importance: string;
    whoIsInvolved: string;
  };
  icon: React.ReactNode;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  options?: { id: string; text: string; action: () => void }[];
}
