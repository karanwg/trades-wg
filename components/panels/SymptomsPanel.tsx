'use client';

import { useState } from 'react';

interface SymptomsPanelProps {
  symptoms: string[];
  compact?: boolean;
}

export function SymptomsPanel({ symptoms, compact }: SymptomsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
        >
          <span>📋</span>
          <span>Symptoms</span>
          <span className="text-xs text-slate-500">({symptoms.length})</span>
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute top-full right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-4">
              <h3 className="text-sm font-medium text-amber-400 mb-3 flex items-center gap-2">
                <span>📋</span>
                Customer Complaint
              </h3>
              <ul className="space-y-2">
                {symptoms.map((symptom, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 border-b border-slate-800/50 shrink-0">
      <h2 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="text-amber-400">📋</span>
        Customer Complaint
      </h2>
      <ul className="space-y-2">
        {symptoms.map((symptom, i) => (
          <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
            <span className="text-amber-500 mt-0.5 shrink-0">•</span>
            <span>{symptom}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
