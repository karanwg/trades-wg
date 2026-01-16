'use client';

import { Scenario } from '@/lib/engine';
import { getAllScenarios } from '@/lib/engine/scenarios';
import Link from 'next/link';

interface ScenarioSelectionProps {
  onSelectScenario: (scenario: Scenario) => void;
}

const difficultyColors = {
  beginner: 'bg-emerald-500/15 text-emerald-700 border-emerald-400/30',
  intermediate: 'bg-amber-500/15 text-amber-700 border-amber-400/30',
  advanced: 'bg-rose-500/15 text-rose-700 border-rose-400/30',
};

const difficultyIcons = {
  beginner: '●',
  intermediate: '●●',
  advanced: '●●●',
};

export function ScenarioSelection({ onSelectScenario }: ScenarioSelectionProps) {
  const scenarios = getAllScenarios();

  return (
    <div className="min-h-screen light-bg flex flex-col">
      {/* Background Effects */}
      <div className="light-bg-pattern" />
      <div className="light-bg-shapes" />
      
      {/* Header */}
      <header className="light-header relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg">
                <span className="text-3xl">⚡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text tracking-tight">
                  Trades Training Hub
                </h1>
                <p className="text-gray-600 text-sm">
                  Master electrical troubleshooting & procedural skills
                </p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center gap-3">
              <Link
                href="/create"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 text-purple-700 hover:bg-purple-500/20 transition-all font-medium"
              >
                <span>✏️</span>
                <span>Create Question</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-8 py-12 w-full relative z-10">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">AC Fault Diagnosis Scenarios</h2>
          <p className="text-gray-600 text-lg">
            Each scenario presents a realistic fault condition. Use your diagnostic tools to identify the problem.
          </p>
        </div>

        {/* Scenario Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => onSelectScenario(scenario)}
              className="group relative light-card p-8 text-left"
            >
              {/* Difficulty Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${difficultyColors[scenario.difficulty]}`}
                >
                  {difficultyIcons[scenario.difficulty]} {scenario.difficulty}
                </span>
                <span className="text-purple-400 group-hover:text-purple-600 transition-colors text-2xl transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                {scenario.title}
              </h3>
              <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
                {scenario.description}
              </p>

              {/* Symptoms Preview */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                  Symptoms
                </p>
                <ul className="space-y-2">
                  {scenario.symptoms.slice(0, 3).map((symptom, i) => (
                    <li key={i} className="text-gray-700 text-sm flex items-start gap-3">
                      <span className="text-purple-500 mt-0.5 font-bold">•</span>
                      <span className="line-clamp-1">{symptom}</span>
                    </li>
                  ))}
                  {scenario.symptoms.length > 3 && (
                    <li className="text-gray-500 text-sm pl-6">
                      +{scenario.symptoms.length - 3} more...
                    </li>
                  )}
                </ul>
              </div>

              {/* Learning Objectives */}
              <div className="mt-5 pt-5 border-t border-purple-100">
                <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">
                  You will learn
                </p>
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                  {scenario.learningObjectives[0]}
                </p>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 light-card p-8">
          <h3 className="text-gray-900 font-bold text-lg mb-4 flex items-center gap-3">
            <span className="text-3xl">💡</span>
            <span className="gradient-text">Training Tips</span>
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold text-lg">•</span>
              <span>Always check power and control voltages before component testing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold text-lg">•</span>
              <span>Discharge capacitors before taking resistance or capacitance readings</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold text-lg">•</span>
              <span>Follow a systematic approach - don&apos;t skip steps</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold text-lg">•</span>
              <span>Pay attention to safety warnings - they reflect real-world hazards</span>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-100 py-6 relative z-10 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 text-center text-gray-500 text-sm">
          Trades Training Hub • For educational purposes
        </div>
      </footer>
    </div>
  );
}
