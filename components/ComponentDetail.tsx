'use client';

import { useState } from 'react';
import { Component, ComponentId, MeasurementPoint } from '@/lib/engine';
import { CapacitorDiagram } from './diagrams/CapacitorDiagram';
import { CompressorDiagram } from './diagrams/CompressorDiagram';
import { ContactorDiagram } from './diagrams/ContactorDiagram';
import { PowerSupplyDiagram } from './diagrams/PowerSupplyDiagram';
import { ThermostatDiagram } from './diagrams/ThermostatDiagram';
import { FanMotorDiagram } from './diagrams/FanMotorDiagram';

interface ComponentDetailProps {
  component: Component;
  selectedPoints: MeasurementPoint[];
  onTerminalSelect: (componentId: ComponentId, terminalId: string) => void;
  onBack: () => void;
}

export function ComponentDetail({
  component,
  selectedPoints,
  onTerminalSelect,
  onBack,
}: ComponentDetailProps) {
  const [hoveredTerminal, setHoveredTerminal] = useState<string | null>(null);

  const isTerminalSelected = (terminalId: string) => {
    return selectedPoints.some(
      (p) => p.componentId === component.id && p.terminalId === terminalId
    );
  };

  const getSelectionOrder = (terminalId: string) => {
    const index = selectedPoints.findIndex(
      (p) => p.componentId === component.id && p.terminalId === terminalId
    );
    return index >= 0 ? index + 1 : null;
  };

  const DiagramComponent = getDiagramComponent(component.id);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-slate-800/50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <span>←</span>
          <span>Back to Overview</span>
        </button>
        <div className="h-6 w-px bg-slate-700" />
        <div>
          <h2 className="text-lg font-semibold text-white">{component.name}</h2>
          <p className="text-xs text-slate-400">{component.description}</p>
        </div>

        {/* Status badges */}
        <div className="ml-auto flex items-center gap-2">
          {component.hasDangerousVoltage && (
            <span className="flex items-center gap-1.5 text-xs px-2 py-1 bg-rose-500/20 text-rose-400 rounded border border-rose-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              LIVE
            </span>
          )}
          {component.hasStoredCharge && (
            <span className="flex items-center gap-1.5 text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded border border-amber-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              CHARGED
            </span>
          )}
          <span className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded border ${
            component.isEnergized 
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${component.isEnergized ? 'bg-emerald-500' : 'bg-slate-500'}`} />
            {component.isEnergized ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Diagram panel */}
        <div className="flex-1 flex items-center justify-center p-8 bg-slate-950/50">
          <div className="relative w-full max-w-md aspect-square">
            <DiagramComponent
              hoveredTerminal={hoveredTerminal}
              selectedTerminals={selectedPoints
                .filter(p => p.componentId === component.id)
                .map(p => p.terminalId)}
              onTerminalClick={(terminalId) => onTerminalSelect(component.id, terminalId)}
              onTerminalHover={setHoveredTerminal}
            />
          </div>
        </div>

        {/* Terminal list panel */}
        <div className="w-72 border-l border-slate-800/50 bg-slate-900/30 p-4 overflow-y-auto">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4">
            Terminals
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Click terminals to select measurement points. Hover to highlight on diagram.
          </p>

          <div className="space-y-2">
            {component.terminals.map((terminal) => {
              const isSelected = isTerminalSelected(terminal.id);
              const order = getSelectionOrder(terminal.id);
              const isHovered = hoveredTerminal === terminal.id;

              return (
                <button
                  key={terminal.id}
                  onClick={() => onTerminalSelect(component.id, terminal.id)}
                  onMouseEnter={() => setHoveredTerminal(terminal.id)}
                  onMouseLeave={() => setHoveredTerminal(null)}
                  className={`
                    relative w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left
                    ${isSelected 
                      ? 'bg-cyan-500/20 border border-cyan-500/50' 
                      : isHovered
                        ? 'bg-slate-700/50 border border-slate-600'
                        : 'bg-slate-800/30 border border-slate-700/30 hover:bg-slate-700/30'
                    }
                  `}
                >
                  {/* Terminal badge */}
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm
                    ${isSelected 
                      ? 'bg-cyan-500 text-white' 
                      : 'bg-slate-700 text-slate-300'
                    }
                  `}>
                    {terminal.id}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">
                      {terminal.label}
                    </div>
                    <div className="text-xs text-slate-500 capitalize">
                      {terminal.type.replace('_', ' ')}
                    </div>
                  </div>

                  {/* Selection order */}
                  {order && (
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">
                      {order}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Help text */}
          <div className="mt-6 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
            <p className="text-xs text-slate-400">
              <span className="text-cyan-400 font-medium">Tip:</span> Select two terminals to measure between them, or one terminal for single-point readings (like current).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getDiagramComponent(componentId: ComponentId) {
  switch (componentId) {
    case 'capacitor':
      return CapacitorDiagram;
    case 'compressor':
      return CompressorDiagram;
    case 'contactor':
      return ContactorDiagram;
    case 'power_supply':
      return PowerSupplyDiagram;
    case 'thermostat':
      return ThermostatDiagram;
    case 'indoor_fan':
    case 'outdoor_fan':
      return FanMotorDiagram;
    default:
      return CapacitorDiagram;
  }
}
