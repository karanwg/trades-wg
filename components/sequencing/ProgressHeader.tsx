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
      {/* Top bar: Back button, score, reset */}
      <div className="flex items-center justify-between mb-4">
        {/* Left: Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Right: Score, reset */}
        <div className="flex items-center gap-4">
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

      {/* Question / Problem Statement */}
      <div className="wg-card-dark px-6 py-4">
        <div className="flex items-start gap-4">
          <div className="text-3xl">📋</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-1">{questionTitle}</h2>
            <p className="text-white/60 text-sm leading-relaxed">{questionDescription}</p>
          </div>
          <div className="text-white/40 text-sm font-medium whitespace-nowrap">
            {currentStep} / {totalSteps}
          </div>
        </div>
      </div>
    </div>
  );
}
