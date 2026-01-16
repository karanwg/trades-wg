'use client';

interface FeedbackPanelProps {
  feedback: string | null;
  questionDescription: string;
  startingPoint: string;
  endingPoint: string;
  currentStep: number;
  totalSteps: number;
}

export function FeedbackPanel({
  feedback,
  questionDescription: _questionDescription,
  startingPoint,
  endingPoint,
  currentStep,
  totalSteps,
}: FeedbackPanelProps) {
  void _questionDescription; // Reserved for future use
  const isComplete = currentStep === totalSteps;

  return (
    <div className="h-full flex flex-col rounded-2xl bg-[var(--wg-card-dark)] border border-white/10 overflow-hidden">
      {/* Scenario Section */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📍</span>
          <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider">
            Scenario
          </h3>
        </div>
        
        {/* Starting Point */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[var(--wg-accent-orange)]" />
            <span className="text-white/50 text-xs font-medium uppercase">Start</span>
          </div>
          <p className="text-white/70 text-sm pl-4">{startingPoint}</p>
        </div>

        {/* Ending Point */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[var(--wg-success)]" />
            <span className="text-white/50 text-xs font-medium uppercase">Goal</span>
          </div>
          <p className="text-white/70 text-sm pl-4">{endingPoint}</p>
        </div>
      </div>

      {/* Feedback Display Area */}
      <div className="flex-1 flex items-center justify-center p-6">
        {isComplete ? (
          <div className="text-center wg-animate-bounce-in">
            <div className="text-5xl mb-3">🎉</div>
            <p className="text-[var(--wg-success)] text-lg font-bold">Sequence Complete!</p>
            <p className="text-white/50 text-sm mt-1">All steps completed correctly</p>
          </div>
        ) : feedback ? (
          <div className="w-full max-w-sm">
            <div className="bg-[var(--wg-success)]/10 border-2 border-[var(--wg-success)]/30 rounded-xl p-6 text-center wg-animate-fade-in">
              <div className="text-3xl mb-3">💬</div>
              <p className="text-[var(--wg-success)] text-lg font-semibold leading-relaxed">
                {feedback}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-white/40 text-sm font-medium">
              Drop an action to see feedback
            </p>
          </div>
        )}
      </div>

      {/* Progress Footer */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/50">Progress</span>
          <span className="text-white/80 font-semibold">{currentStep} / {totalSteps} steps</span>
        </div>
        <div className="mt-2 h-2 bg-black/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[var(--wg-accent-teal)] to-[var(--wg-accent-purple)] transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
