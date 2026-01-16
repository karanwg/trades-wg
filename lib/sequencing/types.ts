// Wayground Sequencing Question Types
// Simplified - no themes, generic feedback

export interface ActionStep {
  id: string;
  label: string;
  icon: string;
  feedback?: string;      // Optional text feedback when this action is dropped
  isCorrect: boolean;     // True if this is part of the correct sequence
  correctOrder?: number;  // Position in correct sequence (0-indexed), only if isCorrect
}

export interface SequencingQuestion {
  id: string;
  title: string;
  description: string;      // The question/problem statement
  startingPoint: string;    // Text description of initial state
  endingPoint: string;      // Text description of goal state
  maxSteps: number;         // Maximum steps allowed
  actions: ActionStep[];    // All actions (correct + distractors)
  isBuiltIn?: boolean;      // True for sample questions (not deletable)
  hidden?: boolean;         // True to hide from student view and randomizer
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
  currentFeedback: string | null;  // Current feedback text to display
}

// Context Types
export interface QuestionContextType {
  questions: SequencingQuestion[];           // All questions (samples + custom)
  customQuestions: SequencingQuestion[];     // Only user-created
  sampleQuestions: SequencingQuestion[];     // Built-in samples
  addQuestion: (q: SequencingQuestion) => void;
  deleteQuestion: (id: string) => void;      // Only works for custom questions
  getQuestion: (id: string) => SequencingQuestion | undefined;
  isLoaded: boolean;                         // True after hydrating from localStorage
}
