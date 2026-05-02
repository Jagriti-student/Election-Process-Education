import React from 'react';

/** Represents a civic user's profile for personalized election education. */
export interface UserProfile {
  /** Whether the user is a first-time voter. Null means unanswered. */
  isFirstTimeVoter: boolean | null;
  /** The user's age group bracket (e.g., '18-24'). */
  ageGroup: string;
  /** The user's geographic region for localized information. */
  location: string;
}

/** The set of available view modes for the main application layout. */
export type ViewMode = 'dashboard' | 'timeline' | 'simulation' | 'quiz' | 'misinformation' | 'settings';

/** Represents a single step in the election process timeline. */
export interface ElectionStep {
  /** Unique slug identifier for the step (e.g., 'voting'). */
  id: string;
  /** Human-readable title of the step. */
  title: string;
  /** Brief description shown in the timeline sidebar. */
  shortDescription: string;
  /** Estimated duration label for the step. */
  duration: string;
  /** Full educational description shown in the step detail card. */
  detailedDescription: string;
  /** An array of actionable pro tips for the user. */
  tips: string[];
  /** Optional deep-dive details about importance and stakeholders. */
  extraDetails: {
    /** Why this step matters in the democratic process. */
    importance: string;
    /** The key actors involved in this step. */
    whoIsInvolved: string;
  };
  /** React icon node displayed alongside the step. */
  icon: React.ReactNode;
}

/** Represents a single quiz question with options and the correct answer. */
export interface QuizQuestion {
  /** Unique numeric identifier. */
  id: number;
  /** The question text shown to the user. */
  text: string;
  /** Array of answer choices. */
  options: string[];
  /** Zero-based index of the correct answer in the options array. */
  correctAnswer: number;
  /** Educational explanation shown after answering. */
  explanation: string;
}

/** Represents a single message in the AI chat conversation. */
export interface ChatMessage {
  /** Unique string identifier for the message. */
  id: string;
  /** The sender of the message — 'ai' or 'user'. */
  sender: 'ai' | 'user';
  /** The text content of the message. */
  text: string;
  /** Optional quick-action options for the user to select. */
  options?: { id: string; text: string; action: () => void }[];
}


