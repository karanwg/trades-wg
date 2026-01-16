// Wayground Sequencing Question Types

export type ThemeId = 'cooking' | 'hvac' | 'piano';
export type FeedbackType = 'multimeter' | 'tuner';

export interface Theme {
  id: ThemeId;
  name: string;
  icon: string;
  bgGradient: string;
  bgEmoji: string;
  hasFeedbackPanel: boolean;
  feedbackType?: FeedbackType;
}

export interface ActionStep {
  id: string;
  label: string;
  icon: string;
  category?: string;
}

export interface FeedbackReading {
  display: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'danger';
  description?: string;
}

export interface FeedbackConfig {
  type: FeedbackType;
  readings: Record<number, FeedbackReading>;
  initialReading: FeedbackReading;
}

export interface SequencingQuestion {
  id: string;
  theme: ThemeId;
  title: string;
  description: string;
  correctSequence: ActionStep[];
  distractors: ActionStep[];
  feedbackConfig?: FeedbackConfig;
}

// Game State Types
export interface LogEntry {
  id: string;
  timestamp: Date;
  action: string;
  status: 'success' | 'error' | 'info';
  icon?: string;
}

export interface GameState {
  score: number;
  chain: ActionStep[];
  currentStep: number;
  isCompleted: boolean;
  log: LogEntry[];
  showRedFlash: boolean;
  shakingActionId: string | null;
  isDragOver: boolean;
  draggingId: string | null;
  newChainItemId: string | null;
}

export interface PlacedAction {
  step: number;
  action: ActionStep;
  timestamp: Date;
}
