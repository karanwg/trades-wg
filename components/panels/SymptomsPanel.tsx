'use client';

interface SymptomsPanelProps {
  symptoms: string[];
}

export function SymptomsPanel({ symptoms }: SymptomsPanelProps) {
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
