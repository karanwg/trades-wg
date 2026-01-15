'use client';

import { ComponentId } from '@/lib/engine';

interface SchematicViewProps {
  onSelectComponent: (id: ComponentId) => void;
  energizedComponents: Set<ComponentId>;
}

export function SchematicView({ onSelectComponent, energizedComponents }: SchematicViewProps) {
  const isEnergized = (id: ComponentId) => energizedComponents.has(id);

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="relative w-full max-w-4xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-slate-300 mb-2">Split AC System Overview</h2>
          <p className="text-sm text-slate-500">Click a component to inspect and take measurements</p>
        </div>

        {/* Schematic Container */}
        <div className="relative bg-slate-900/50 rounded-2xl border border-slate-700/50 p-8">
          {/* Power Flow Lines - SVG Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
            {/* Main power lines */}
            <path d="M 100 100 L 200 100" stroke="#475569" strokeWidth="3" strokeDasharray="8 4" />
            <path d="M 280 100 L 350 100 L 350 200" stroke="#475569" strokeWidth="3" strokeDasharray="8 4" />
            <path d="M 350 280 L 350 350 L 500 350" stroke="#475569" strokeWidth="3" strokeDasharray="8 4" />
            <path d="M 580 350 L 650 350" stroke="#475569" strokeWidth="3" strokeDasharray="8 4" />
            
            {/* Control circuit (24V) */}
            <path d="M 100 150 L 150 150 L 150 250 L 200 250" stroke="#06b6d4" strokeWidth="2" opacity="0.4" />
            <path d="M 280 250 L 320 250 L 320 230 L 350 230" stroke="#06b6d4" strokeWidth="2" opacity="0.4" />
            
            {/* To outdoor components */}
            <path d="M 350 350 L 350 420 L 500 420" stroke="#475569" strokeWidth="3" strokeDasharray="8 4" />
            
            {/* Labels */}
            <text x="100" y="80" fill="#64748b" fontSize="12" fontFamily="system-ui">240V AC</text>
            <text x="100" y="180" fill="#06b6d4" fontSize="10" fontFamily="system-ui">24V Control</text>
          </svg>

          {/* Component Grid */}
          <div className="relative grid grid-cols-4 gap-6" style={{ minHeight: '400px' }}>
            
            {/* Row 1: Power & Thermostat */}
            <div className="col-span-1">
              <ComponentCard
                id="power_supply"
                name="Power Supply"
                icon="⚡"
                description="240V Main"
                isEnergized={isEnergized('power_supply')}
                onClick={() => onSelectComponent('power_supply')}
                color="amber"
              />
            </div>
            
            <div className="col-span-1">
              <ComponentCard
                id="thermostat"
                name="Thermostat"
                icon="🌡️"
                description="Control Signal"
                isEnergized={isEnergized('thermostat')}
                onClick={() => onSelectComponent('thermostat')}
                color="cyan"
              />
            </div>

            <div className="col-span-1">
              <ComponentCard
                id="contactor"
                name="Contactor"
                icon="🔌"
                description="Power Relay"
                isEnergized={isEnergized('contactor')}
                onClick={() => onSelectComponent('contactor')}
                color="purple"
              />
            </div>

            <div className="col-span-1">
              <ComponentCard
                id="indoor_fan"
                name="Blower"
                icon="🌀"
                description="Indoor Fan"
                isEnergized={isEnergized('indoor_fan')}
                onClick={() => onSelectComponent('indoor_fan')}
                color="emerald"
              />
            </div>

            {/* Row 2: Outdoor Unit Components */}
            <div className="col-start-2 col-span-1 mt-8">
              <ComponentCard
                id="capacitor"
                name="Capacitor"
                icon="⚡"
                description="Run/Start Cap"
                isEnergized={isEnergized('capacitor')}
                onClick={() => onSelectComponent('capacitor')}
                color="amber"
                highlight
              />
            </div>

            <div className="col-span-1 mt-8">
              <ComponentCard
                id="compressor"
                name="Compressor"
                icon="❄️"
                description="Hermetic"
                isEnergized={isEnergized('compressor')}
                onClick={() => onSelectComponent('compressor')}
                color="blue"
              />
            </div>

            <div className="col-span-1 mt-8">
              <ComponentCard
                id="outdoor_fan"
                name="Condenser Fan"
                icon="🌀"
                description="Outdoor"
                isEnergized={isEnergized('outdoor_fan')}
                onClick={() => onSelectComponent('outdoor_fan')}
                color="emerald"
              />
            </div>
          </div>

          {/* Zone Labels */}
          <div className="absolute left-4 top-1/4 -translate-y-1/2">
            <div className="writing-mode-vertical text-xs text-slate-600 tracking-widest uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Indoor Unit
            </div>
          </div>
          <div className="absolute left-4 bottom-1/4 translate-y-1/2">
            <div className="writing-mode-vertical text-xs text-slate-600 tracking-widest uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Outdoor Unit
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
            <span>Energized</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-600" />
            <span>De-energized</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-slate-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #475569 0, #475569 8px, transparent 8px, transparent 12px)' }} />
            <span>Power (240V)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-cyan-500 opacity-50" />
            <span>Control (24V)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ComponentCardProps {
  id: ComponentId;
  name: string;
  icon: string;
  description: string;
  isEnergized: boolean;
  onClick: () => void;
  color: 'amber' | 'cyan' | 'purple' | 'emerald' | 'blue' | 'rose';
  highlight?: boolean;
}

function ComponentCard({ name, icon, description, isEnergized, onClick, color, highlight }: ComponentCardProps) {
  const colorClasses = {
    amber: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 hover:border-amber-400/50',
    cyan: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 hover:border-cyan-400/50',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 hover:border-purple-400/50',
    emerald: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 hover:border-emerald-400/50',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 hover:border-blue-400/50',
    rose: 'from-rose-500/20 to-rose-600/10 border-rose-500/30 hover:border-rose-400/50',
  };

  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full p-4 rounded-xl border transition-all duration-300
        bg-gradient-to-br ${colorClasses[color]}
        hover:scale-105 hover:shadow-lg hover:shadow-${color}-500/20
        ${highlight ? 'ring-2 ring-amber-400/50 ring-offset-2 ring-offset-slate-900' : ''}
      `}
    >
      {/* Status indicator */}
      <div className={`
        absolute top-2 right-2 w-2 h-2 rounded-full transition-all
        ${isEnergized ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse' : 'bg-slate-600'}
      `} />

      {/* Icon */}
      <div className="text-3xl mb-2">{icon}</div>

      {/* Name */}
      <div className="text-sm font-medium text-white mb-1">{name}</div>

      {/* Description */}
      <div className="text-xs text-slate-400">{description}</div>

      {/* Hover hint */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs font-medium text-white">Click to inspect →</span>
      </div>
    </button>
  );
}
