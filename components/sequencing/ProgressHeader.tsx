'use client';

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  score: number;
  questionTitle: string;
  questionDescription: string;
  onReset: () => void;
  onBack: () => void;
}

export function ProgressHeader({
  currentStep,
  totalSteps,
  score,
  questionTitle,
  questionDescription,
  onReset,
  onBack,
}: ProgressHeaderProps) {
  return (
    <div className="px-6 py-4">
      {/* Top bar: Back button, question, score, reset */}
      <div className="flex items-center gap-4">
        {/* Left: Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors shrink-0"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Center: Question (takes remaining space) */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-xl shrink-0">📋</span>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-white truncate">{questionTitle}</h2>
              <p className="text-white/50 text-xs truncate">{questionDescription}</p>
            </div>
          </div>
        </div>

        {/* Right: Step counter, Score, reset */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Step counter */}
          <div className="text-white/40 text-sm font-medium">
            {currentStep} / {totalSteps}
          </div>

          {/* Score */}
          <div className="wg-score-badge wg-animate-float">
            ⭐ {score}
          </div>

          {/* Reset button */}
          <button
            onClick={onReset}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title="Reset"
          >
            <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
