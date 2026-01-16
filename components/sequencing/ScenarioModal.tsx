'use client';

import { useState, useEffect } from 'react';

interface ScenarioModalProps {
  title: string;
  startingPoint: string;
  endingPoint: string;
  onContinue: () => void;
  isAutoTriggered?: boolean; // True when modal opens automatically on page load
}

const LOCK_DURATION = 3000; // 3 seconds

export function ScenarioModal({
  title,
  startingPoint,
  endingPoint,
  onContinue,
  isAutoTriggered = false,
}: ScenarioModalProps) {
  const [isLocked, setIsLocked] = useState(isAutoTriggered);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isAutoTriggered) {
      setIsLocked(false);
      setProgress(100);
      return;
    }

    // Animate progress from 0 to 100 over LOCK_DURATION
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / LOCK_DURATION) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= LOCK_DURATION) {
        setIsLocked(false);
        clearInterval(interval);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isAutoTriggered]);

  const handleContinue = () => {
    if (!isLocked) {
      onContinue();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - stronger blur and darker overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal - solid dark background for better contrast */}
      <div className="relative w-full max-w-md bg-[#1a0a12] border border-white/20 rounded-[20px] p-6 wg-animate-bounce-in shadow-2xl">
        {/* Header Label */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">📍</span>
          <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">
            Scenario
          </span>
        </div>

        {/* Question Title - Prominent */}
        <h1 className="text-2xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>

        {/* Starting Point */}
        <div className="mb-5 p-4 rounded-xl bg-[var(--wg-accent-orange)]/10 border border-[var(--wg-accent-orange)]/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-[var(--wg-accent-orange)] shadow-[0_0_8px_var(--wg-accent-orange)]" />
            <span className="text-[var(--wg-accent-orange)] text-xs font-bold uppercase tracking-wide">
              Starting Point
            </span>
          </div>
          <p className="text-white text-base leading-relaxed">
            {startingPoint}
          </p>
        </div>

        {/* Ending Point / Goal */}
        <div className="mb-8 p-4 rounded-xl bg-[var(--wg-success)]/10 border border-[var(--wg-success)]/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-[var(--wg-success)] shadow-[0_0_8px_var(--wg-success)]" />
            <span className="text-[var(--wg-success)] text-xs font-bold uppercase tracking-wide">
              Goal
            </span>
          </div>
          <p className="text-white text-base leading-relaxed">
            {endingPoint}
          </p>
        </div>

        {/* Continue Button with Progress Overlay */}
        <button
          onClick={handleContinue}
          disabled={isLocked}
          className={`relative w-full py-4 rounded-xl font-bold text-base transition-all overflow-hidden
            ${isLocked 
              ? 'bg-white/20 text-white/40 cursor-not-allowed' 
              : 'bg-white text-[var(--wg-bg-mid)] hover:bg-white/90 active:scale-[0.98]'
            }`}
        >
          {/* Progress gradient overlay - only visible when locked */}
          {isLocked && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, 
                  rgba(255,255,255,0.9) 0%, 
                  rgba(255,255,255,0.9) ${progress}%, 
                  rgba(255,255,255,0.15) ${progress}%, 
                  rgba(255,255,255,0.15) 100%
                )`,
                transition: 'background 0.05s linear',
              }}
            />
          )}
          <span className={`relative z-10 ${isLocked ? 'text-[#1a0a12]/60' : ''}`}>
            {isLocked ? 'Read the scenario...' : 'Continue'}
          </span>
        </button>
      </div>
    </div>
  );
}
