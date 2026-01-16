'use client';

import { FeedbackReading, FeedbackType } from '@/lib/sequencing/types';

interface FeedbackPanelProps {
  type: FeedbackType;
  reading: FeedbackReading;
  questionTitle: string;
  questionDescription: string;
}

export function FeedbackPanel({
  type,
  reading,
  questionTitle,
  questionDescription,
}: FeedbackPanelProps) {
  return (
    <div className="h-full flex flex-col rounded-2xl bg-[var(--wg-card-dark)] border border-white/10 overflow-hidden">
      {/* Question prompt area */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">❓</span>
          <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider">
            {type === 'multimeter' ? 'Multimeter Reading' : 'Tuner Reading'}
          </h3>
        </div>
        <p className="text-white/60 text-sm">{questionDescription}</p>
      </div>

      {/* Display area */}
      <div className="flex-1 flex items-center justify-center p-6">
        {type === 'multimeter' ? (
          <MultimeterDisplay reading={reading} />
        ) : (
          <TunerDisplay reading={reading} />
        )}
      </div>

      {/* Reading description */}
      <div className={`
        p-4 border-t
        ${reading.status === 'danger' 
          ? 'bg-[var(--wg-error)]/10 border-[var(--wg-error)]/30' 
          : reading.status === 'warning' 
            ? 'bg-[var(--wg-accent-gold)]/10 border-[var(--wg-accent-gold)]/30'
            : 'bg-[var(--wg-success)]/10 border-[var(--wg-success)]/30'
        }
      `}>
        <p className={`
          text-sm font-medium text-center
          ${reading.status === 'danger' 
            ? 'text-[var(--wg-error)]' 
            : reading.status === 'warning' 
              ? 'text-[var(--wg-accent-gold)]'
              : 'text-[var(--wg-success)]'
          }
        `}>
          {reading.description}
        </p>
      </div>
    </div>
  );
}

// Multimeter Display Component
function MultimeterDisplay({ reading }: { reading: FeedbackReading }) {
  const statusColor = reading.status === 'danger' 
    ? '#ff4757' 
    : reading.status === 'warning' 
      ? '#f5a623' 
      : '#00d4aa';

  return (
    <div className="w-full max-w-[240px]">
      {/* Multimeter body */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-4 border-2 border-gray-700 shadow-xl">
        {/* LCD Display */}
        <div className="bg-[#1a2a1a] rounded-lg p-4 mb-4 border border-gray-600">
          <div className="flex items-end justify-center gap-1">
            <span 
              className="text-4xl font-mono font-bold tracking-wider"
              style={{ 
                color: statusColor,
                textShadow: `0 0 10px ${statusColor}40`
              }}
            >
              {reading.display}
            </span>
            <span className="text-lg text-gray-400 mb-1 ml-2">
              {reading.unit}
            </span>
          </div>
        </div>

        {/* Dial */}
        <div className="relative w-32 h-32 mx-auto">
          {/* Dial background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-4 border-gray-600" />
          
          {/* Dial markings */}
          <div className="absolute inset-2 rounded-full border border-gray-500">
            {['V~', 'V⎓', 'Ω', 'µF', 'A'].map((label, i) => {
              const angle = (i * 60) - 120;
              const x = 50 + 35 * Math.cos((angle * Math.PI) / 180);
              const y = 50 + 35 * Math.sin((angle * Math.PI) / 180);
              return (
                <span
                  key={label}
                  className="absolute text-[10px] text-gray-400 font-bold transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {label}
                </span>
              );
            })}
          </div>

          {/* Center knob */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-gray-500 shadow-lg">
            {/* Pointer */}
            <div className="absolute top-1/2 left-1/2 w-1 h-8 bg-red-500 -translate-x-1/2 -translate-y-full origin-bottom transform -rotate-30 rounded-t-full" />
          </div>
        </div>

        {/* Probe indicators */}
        <div className="flex justify-center gap-8 mt-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
            <span className="text-xs text-gray-400">+</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-900 border border-gray-600" />
            <span className="text-xs text-gray-400">COM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tuner Display Component
function TunerDisplay({ reading }: { reading: FeedbackReading }) {
  // Calculate how far off from perfect (261.63 Hz for C4)
  const targetHz = 261.63;
  const deviation = reading.value > 0 ? ((reading.value - targetHz) / targetHz) * 100 : 0;
  const clampedDeviation = Math.max(-50, Math.min(50, deviation * 10));
  
  const statusColor = reading.status === 'danger' 
    ? '#ff4757' 
    : reading.status === 'warning' 
      ? '#f5a623' 
      : '#00d4aa';

  return (
    <div className="w-full max-w-[280px]">
      {/* Tuner body */}
      <div className="bg-gradient-to-b from-amber-900/80 to-amber-950 rounded-2xl p-4 border-2 border-amber-800/50 shadow-xl">
        {/* Note display */}
        <div className="text-center mb-4">
          <span className="text-5xl font-bold text-white">C4</span>
          <span className="text-white/40 text-sm ml-2">Middle C</span>
        </div>

        {/* Frequency display */}
        <div className="bg-black/40 rounded-lg p-3 mb-4 text-center">
          <div className="flex items-end justify-center gap-1">
            <span 
              className="text-3xl font-mono font-bold"
              style={{ 
                color: statusColor,
                textShadow: `0 0 10px ${statusColor}40`
              }}
            >
              {reading.display}
            </span>
            <span className="text-sm text-gray-400 mb-1 ml-1">
              {reading.unit}
            </span>
          </div>
        </div>

        {/* Tuning meter */}
        <div className="relative h-8 bg-black/40 rounded-full overflow-hidden mb-4">
          {/* Scale markings */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <span className="text-xs text-red-400 font-bold">♭</span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-green-400 font-bold">●</span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-red-400 font-bold">♯</span>
          </div>

          {/* Indicator needle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg shadow-white/50 transition-all duration-300"
            style={{ 
              left: `calc(50% + ${clampedDeviation}%)`,
              transform: 'translateX(-50%)'
            }}
          />

          {/* Center mark */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-green-400/50 -translate-x-1/2" />
        </div>

        {/* Status text */}
        <div className="text-center">
          <span className={`
            text-sm font-medium
            ${reading.status === 'normal' ? 'text-green-400' : 'text-amber-400'}
          `}>
            {reading.value > 0 && reading.value < targetHz ? '↑ Tune Up' : 
             reading.value > targetHz ? '↓ Tune Down' : 
             reading.status === 'normal' ? '✓ In Tune' : 'Strike key to begin'}
          </span>
        </div>
      </div>
    </div>
  );
}
