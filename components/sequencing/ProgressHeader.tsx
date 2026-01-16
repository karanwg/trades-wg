'use client';

import Link from 'next/link';
import { Theme } from '@/lib/sequencing/types';

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  score: number;
  theme: Theme;
  questionTitle: string;
  questionDescription: string;
  onReset: () => void;
}

export function ProgressHeader({
  currentStep,
  totalSteps,
  score,
  theme,
  questionTitle,
  questionDescription,
  onReset,
}: ProgressHeaderProps) {
  return (
    <div className="px-6 py-4">
      {/* Top bar: Back button, theme badge, score, reset */}
      <div className="flex items-center justify-between mb-4">
        {/* Left: Back button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </Link>

        {/* Right: Theme indicator, score, menu */}
        <div className="flex items-center gap-4">
          {/* Theme badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
            <span className="text-lg">{theme.icon}</span>
            <span className="text-sm text-white/70 font-medium hidden sm:inline">{theme.name}</span>
          </div>

          {/* Score */}
          <div className="wg-score-badge wg-animate-float">
            ⭐ {score}
          </div>

          {/* Menu button */}
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
          <div className="text-3xl">{theme.icon}</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-1">{questionTitle}</h2>
            <p className="text-white/60 text-sm leading-relaxed">{questionDescription}</p>
          </div>
          <div className="text-white/40 text-sm font-medium">
            {currentStep} / {totalSteps}
          </div>
        </div>
      </div>

      {/* Progress dots - COMMENTED OUT
      <div className="flex items-center justify-center gap-3 mt-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${index < currentStep 
                ? 'bg-[var(--wg-success)] shadow-lg shadow-[var(--wg-success)]/40' 
                : index === currentStep 
                  ? 'bg-white ring-2 ring-white/30 ring-offset-2 ring-offset-transparent' 
                  : 'bg-white/20'
              }
            `}
          />
        ))}
      </div>
      */}
    </div>
  );
}
