'use client';

import { Scenario } from '@/lib/engine';
import { getAllScenarios } from '@/lib/engine/scenarios';

interface ScenarioSelectionProps {
  onSelectScenario: (scenario: Scenario) => void;
}

const difficultyColors = {
  beginner: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  intermediate: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  advanced: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
};

const difficultyIcons = {
  beginner: '●',
  intermediate: '●●',
  advanced: '●●●',
};

export function ScenarioSelection({ onSelectScenario }: ScenarioSelectionProps) {
  const scenarios = getAllScenarios();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                AC Fault Diagnosis Trainer
              </h1>
              <p className="text-slate-400 text-sm">
                Master electrical troubleshooting for split AC systems
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-8 py-12 w-full">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2">Select a Scenario</h2>
          <p className="text-slate-400">
            Each scenario presents a realistic fault condition. Use your diagnostic tools to identify the problem.
          </p>
        </div>

        {/* Scenario Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => onSelectScenario(scenario)}
              className="group relative bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 text-left hover:bg-slate-800/50 hover:border-slate-700/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5"
            >
              {/* Difficulty Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors[scenario.difficulty]}`}
                >
                  {difficultyIcons[scenario.difficulty]} {scenario.difficulty}
                </span>
                <span className="text-slate-600 group-hover:text-cyan-500 transition-colors text-xl">
                  →
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {scenario.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                {scenario.description}
              </p>

              {/* Symptoms Preview */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Symptoms
                </p>
                <ul className="space-y-1">
                  {scenario.symptoms.slice(0, 3).map((symptom, i) => (
                    <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                      <span className="text-cyan-500 mt-0.5">•</span>
                      <span className="line-clamp-1">{symptom}</span>
                    </li>
                  ))}
                  {scenario.symptoms.length > 3 && (
                    <li className="text-slate-500 text-sm pl-4">
                      +{scenario.symptoms.length - 3} more...
                    </li>
                  )}
                </ul>
              </div>

              {/* Learning Objectives (hover reveal) */}
              <div className="mt-4 pt-4 border-t border-slate-800/50">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  You will learn
                </p>
                <p className="text-slate-400 text-sm line-clamp-2">
                  {scenario.learningObjectives[0]}
                </p>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-slate-900/30 border border-slate-800/50 rounded-xl p-6">
          <h3 className="text-white font-medium mb-3 flex items-center gap-2">
            <span className="text-amber-400">💡</span>
            Training Tips
          </h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-cyan-500">•</span>
              Always check power and control voltages before component testing
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500">•</span>
              Discharge capacitors before taking resistance or capacitance readings
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500">•</span>
              Follow a systematic approach - don&apos;t skip steps
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500">•</span>
              Pay attention to safety warnings - they reflect real-world hazards
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-4">
        <div className="max-w-6xl mx-auto px-8 text-center text-slate-500 text-sm">
          AC Fault Diagnosis Trainer • For educational purposes
        </div>
      </footer>
    </div>
  );
}
