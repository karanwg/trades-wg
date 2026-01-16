'use client';

interface ScenarioModalProps {
  title: string;
  startingPoint: string;
  endingPoint: string;
  onContinue: () => void;
}

export function ScenarioModal({
  title,
  startingPoint,
  endingPoint,
  onContinue,
}: ScenarioModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - stronger blur and darker overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal - solid dark background for better contrast */}
      <div className="relative w-full max-w-md bg-[#1a0a12] border border-white/20 rounded-[20px] p-6 wg-animate-bounce-in shadow-2xl">
        {/* Title */}
        <h2 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-6">
          Scenario
        </h2>

        {/* Starting Point */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--wg-accent-orange)]" />
            <span className="text-white/50 text-xs font-semibold uppercase tracking-wide">
              Start
            </span>
          </div>
          <p className="text-white/80 text-sm leading-relaxed pl-4 border-l-2 border-white/10">
            {startingPoint}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-5" />

        {/* Ending Point / Goal */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--wg-success)]" />
            <span className="text-white/50 text-xs font-semibold uppercase tracking-wide">
              Goal
            </span>
          </div>
          <p className="text-white/80 text-sm leading-relaxed pl-4 border-l-2 border-white/10">
            {endingPoint}
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full py-4 rounded-xl bg-white text-[var(--wg-bg-mid)] font-bold text-base transition-all hover:bg-white/90 active:scale-[0.98]"
        >
          Continue
        </button>

        {/* Subtle hint about the question */}
        <p className="text-white/30 text-xs text-center mt-4">
          {title}
        </p>
      </div>
    </div>
  );
}
