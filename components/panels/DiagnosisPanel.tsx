'use client';

import { useState } from 'react';
import { Component, ComponentId, FaultType } from '@/lib/engine';

interface DiagnosisPanelProps {
  components: Component[];
  faultTypes: FaultType[];
  onDiagnose: (componentId: ComponentId, faultType: FaultType) => void;
  isComplete: boolean;
}

const faultTypeLabels: Record<FaultType, string> = {
  open_circuit: 'Open Circuit',
  short_circuit: 'Short Circuit',
  high_resistance: 'High Resistance',
  failed_capacitor: 'Failed Capacitor',
  stuck_contactor: 'Stuck/Welded Contactor',
  bad_thermostat: 'Bad Thermostat',
  grounded_winding: 'Grounded Winding',
  no_fault: 'No Fault',
};

export function DiagnosisPanel({
  components,
  faultTypes,
  onDiagnose,
  isComplete,
}: DiagnosisPanelProps) {
  const [selectedComponent, setSelectedComponent] = useState<ComponentId | null>(null);
  const [selectedFault, setSelectedFault] = useState<FaultType | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (selectedComponent && selectedFault) {
      onDiagnose(selectedComponent, selectedFault);
    }
  };

  if (isComplete) {
    return null;
  }

  return (
    <div className="border-t border-slate-800/50 shrink-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-800/30 transition-colors"
      >
        <h2 className="text-sm font-medium text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <span className="text-rose-400">🔍</span>
          Submit Diagnosis
        </h2>
        <span className="text-slate-500">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          <p className="text-sm text-slate-400">
            Once you&apos;ve gathered enough evidence, select the faulty component and fault type.
          </p>

          {/* Component Selection */}
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider block mb-2">
              Faulty Component
            </label>
            <div className="grid grid-cols-4 gap-2">
              {components.map((component) => (
                <button
                  key={component.id}
                  onClick={() => setSelectedComponent(component.id)}
                  className={`
                    px-3 py-2 rounded-lg text-xs transition-all border
                    ${
                      selectedComponent === component.id
                        ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50'
                    }
                  `}
                >
                  {component.name}
                </button>
              ))}
            </div>
          </div>

          {/* Fault Type Selection */}
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider block mb-2">
              Fault Type
            </label>
            <div className="grid grid-cols-4 gap-2">
              {faultTypes.map((fault) => (
                <button
                  key={fault}
                  onClick={() => setSelectedFault(fault)}
                  className={`
                    px-3 py-2 rounded-lg text-xs transition-all border
                    ${
                      selectedFault === fault
                        ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50'
                    }
                  `}
                >
                  {faultTypeLabels[fault]}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!selectedComponent || !selectedFault}
            className={`
              w-full py-3 rounded-xl font-semibold transition-all
              ${
                selectedComponent && selectedFault
                  ? 'bg-gradient-to-r from-rose-500 to-orange-600 text-white hover:shadow-lg hover:shadow-rose-500/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }
            `}
          >
            Submit Diagnosis
          </button>

          <p className="text-xs text-slate-500 text-center">
            ⚠️ Think carefully before submitting - make sure you have evidence!
          </p>
        </div>
      )}
    </div>
  );
}
