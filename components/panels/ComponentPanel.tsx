'use client';

import { Component, ComponentId, MeasurementPoint } from '@/lib/engine';

interface ComponentPanelProps {
  components: Component[];
  selectedPoints: MeasurementPoint[];
  onTerminalSelect: (componentId: ComponentId, terminalId: string) => void;
}

export function ComponentPanel({
  components,
  selectedPoints,
  onTerminalSelect,
}: ComponentPanelProps) {
  const isTerminalSelected = (componentId: ComponentId, terminalId: string) => {
    return selectedPoints.some(
      (p) => p.componentId === componentId && p.terminalId === terminalId
    );
  };

  const getSelectionOrder = (componentId: ComponentId, terminalId: string) => {
    const index = selectedPoints.findIndex(
      (p) => p.componentId === componentId && p.terminalId === terminalId
    );
    return index >= 0 ? index + 1 : null;
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h2 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="text-cyan-400">🔧</span>
        Components
      </h2>
      <p className="text-xs text-slate-500 mb-4">
        Click terminals to select measurement points
      </p>

      <div className="space-y-3">
        {components.map((component) => (
          <div
            key={component.id}
            className="bg-slate-800/30 rounded-xl p-3 border border-slate-700/30"
          >
            {/* Component Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">
                  {component.name}
                </span>
                {component.hasDangerousVoltage && (
                  <span className="text-xs px-1.5 py-0.5 bg-rose-500/20 text-rose-400 rounded border border-rose-500/30">
                    ⚡ LIVE
                  </span>
                )}
                {component.hasStoredCharge && (
                  <span className="text-xs px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded border border-amber-500/30">
                    ⚠️ CHARGED
                  </span>
                )}
              </div>
              <StatusIndicator status={component.isEnergized ? 'on' : 'off'} />
            </div>

            {/* Terminals */}
            <div className="flex flex-wrap gap-1.5">
              {component.terminals.map((terminal) => {
                const isSelected = isTerminalSelected(component.id, terminal.id);
                const order = getSelectionOrder(component.id, terminal.id);

                return (
                  <button
                    key={terminal.id}
                    onClick={() => onTerminalSelect(component.id, terminal.id)}
                    className={`
                      relative px-2 py-1 text-xs rounded-md transition-all
                      ${
                        isSelected
                          ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                      }
                    `}
                    title={terminal.label}
                  >
                    {terminal.id}
                    {order && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                        {order}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusIndicator({ status }: { status: 'on' | 'off' }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`w-2 h-2 rounded-full ${
          status === 'on'
            ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50'
            : 'bg-slate-600'
        }`}
      />
      <span className={`text-xs ${status === 'on' ? 'text-emerald-400' : 'text-slate-500'}`}>
        {status === 'on' ? 'ON' : 'OFF'}
      </span>
    </div>
  );
}
