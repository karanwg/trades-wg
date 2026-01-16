'use client';

interface CompletionModalProps {
  score: number;
  onPlayAgain: () => void;
  onBack: () => void;
}

export function CompletionModal({
  score,
  onPlayAgain,
  onBack,
}: CompletionModalProps) {
  // Determine message based on score
  const getMessage = () => {
    if (score >= 100) return { title: 'Perfect!', emoji: '🏆', subtitle: 'Flawless execution!' };
    if (score >= 80) return { title: 'Excellent!', emoji: '🌟', subtitle: 'Great work!' };
    if (score >= 60) return { title: 'Good Job!', emoji: '👍', subtitle: 'You got there!' };
    return { title: 'Completed!', emoji: '✅', subtitle: 'Practice makes perfect!' };
  };

  const message = getMessage();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 wg-animate-fade-in">
      <div className="wg-completion-card wg-animate-bounce-in max-w-md mx-4">
        {/* Success emoji */}
        <div className="text-7xl mb-4">{message.emoji}</div>

        {/* Title */}
        <h2 className="text-4xl font-bold text-white mb-2">{message.title}</h2>
        <p className="text-white/60 text-lg mb-6">{message.subtitle}</p>

        {/* Score display */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--wg-accent-gold)] to-[var(--wg-accent-orange)]">
            {score}
          </span>
          <span className="text-white/40 text-2xl font-medium">/ 100</span>
        </div>

        {/* Score breakdown */}
        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-white/60">Starting Score</span>
            <span className="text-white font-medium">100</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-white/60">Mistakes</span>
            <span className="text-[var(--wg-error)] font-medium">-{100 - score}</span>
          </div>
          <div className="h-px bg-white/10 my-2" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/80 font-semibold">Final Score</span>
            <span className="text-[var(--wg-success)] font-bold">{score}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="wg-button wg-button-reset flex-1"
          >
            Back to Questions
          </button>
          <button
            onClick={onPlayAgain}
            className="wg-button wg-button-submit flex-1"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
