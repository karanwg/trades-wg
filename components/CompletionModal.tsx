'use client';

import { Scenario, SimulationState } from '@/lib/engine';

interface CompletionModalProps {
  scenario: Scenario;
  state: SimulationState;
  onExit: () => void;
  onRestart: () => void;
}

export function CompletionModal({
  scenario,
  state,
  onExit,
  onRestart,
}: CompletionModalProps) {
  const duration = state.startTime && state.endTime
    ? Math.round((state.endTime - state.startTime) / 1000)
    : 0;

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <span className="text-4xl">🎉</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Diagnosis Correct!
        </h2>
        <p className="text-slate-400 text-center mb-6">
          You successfully identified the fault in &quot;{scenario.title}&quot;
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-cyan-400">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
              Time Elapsed
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-cyan-400">
              {state.measurements.length}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
              Measurements
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="bg-slate-800/30 rounded-xl p-4 mb-6">
          <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
            <span className="text-amber-400">💡</span>
            What You Learned
          </h3>
          <ul className="space-y-2">
            {scenario.learningObjectives.map((objective, i) => (
              <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fault Description */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
          <h3 className="text-sm font-medium text-emerald-300 mb-2">
            The Fault
          </h3>
          <p className="text-sm text-emerald-200/80">
            {scenario.faults[0]?.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className="flex-1 py-3 rounded-xl font-semibold bg-slate-800 text-white hover:bg-slate-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={onExit}
            className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            More Scenarios
          </button>
        </div>
      </div>
    </div>
  );
}
