'use client';

import { Theme } from '@/lib/sequencing/types';
import { getAllThemes } from '@/lib/sequencing/themes';
import Link from 'next/link';

interface ThemeSelectorProps {
  onSelectTheme: (theme: Theme) => void;
}

export function ThemeSelector({ onSelectTheme }: ThemeSelectorProps) {
  const themes = getAllThemes();

  return (
    <div className="min-h-screen flex flex-col wg-background relative">
      {/* Background Effects */}
      <div className="wg-bg-pattern" />
      <div className="wg-bg-shapes" />

      {/* Header */}
      <div className="relative z-10 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              W
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">Wayground</h1>
              <p className="text-white/50 text-sm">Sequence Challenge</p>
            </div>
          </div>
          <Link
            href="/simulator"
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/20 transition-colors"
          >
            AC Simulator →
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Challenge
          </h2>
          <p className="text-white/60 text-lg max-w-md">
            Select a theme and arrange the steps in the correct order to complete the sequence.
          </p>
        </div>

        {/* Theme Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onSelectTheme(theme)}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ background: theme.bgGradient }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Content */}
              <div className="relative z-10 p-8 text-left min-h-[280px] flex flex-col">
                {/* Icon */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {theme.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {theme.name}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm mb-4 flex-1">
                  {theme.id === 'cooking' && 'Learn to cook step by step. No equipment needed!'}
                  {theme.id === 'hvac' && 'Practice HVAC maintenance with multimeter readings.'}
                  {theme.id === 'piano' && 'Master piano tuning with frequency feedback.'}
                </p>

                {/* Feedback indicator */}
                {theme.hasFeedbackPanel && (
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <span className="w-2 h-2 rounded-full bg-[var(--wg-accent-teal)]" />
                    <span>Interactive {theme.feedbackType === 'multimeter' ? 'Multimeter' : 'Tuner'}</span>
                  </div>
                )}

                {/* Play button overlay */}
                <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Instruction */}
        <p className="mt-12 text-white/40 text-sm">
          Drag actions to the drop zone in the correct order • Score starts at 100 • -10 for each mistake
        </p>
      </div>
    </div>
  );
}
