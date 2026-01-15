'use client';

import { Tool, ToolId, MeasurementMode } from '@/lib/engine';

interface ToolPanelProps {
  tools: Tool[];
  currentTool: Tool | null;
  currentMode: MeasurementMode | null;
  onSelectTool: (toolId: ToolId) => void;
  onSelectMode: (mode: MeasurementMode) => void;
  compact?: boolean;
}

const modeLabels: Record<MeasurementMode, string> = {
  voltage_ac: 'V AC',
  voltage_dc: 'V DC',
  resistance: 'Ω',
  continuity: '🔊',
  capacitance: 'µF',
  current_ac: 'A AC',
  current_dc: 'A DC',
};

const modeDescriptions: Record<MeasurementMode, string> = {
  voltage_ac: 'AC Voltage',
  voltage_dc: 'DC Voltage',
  resistance: 'Resistance',
  continuity: 'Continuity',
  capacitance: 'Capacitance',
  current_ac: 'AC Current',
  current_dc: 'DC Current',
};

export function ToolPanel({
  tools,
  currentTool,
  currentMode,
  onSelectTool,
  onSelectMode,
  compact,
}: ToolPanelProps) {
  if (compact) {
    return (
      <div className="p-3 border-b border-slate-800/50 shrink-0">
        {/* Tool Selection - Compact */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-slate-500 uppercase tracking-wider">Tool</span>
          <div className="flex gap-1">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className={`
                  flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all
                  ${
                    currentTool?.id === tool.id
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 border'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                  }
                `}
              >
                <span>{tool.icon}</span>
                <span className="font-medium">{tool.id === 'multimeter' ? 'DMM' : 'Clamp'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selection - Compact */}
        {currentTool && (
          <div className="flex flex-wrap gap-1">
            {currentTool.modes.map((mode) => (
              <button
                key={mode}
                onClick={() => onSelectMode(mode)}
                className={`
                  px-2 py-1 rounded text-xs transition-all
                  ${
                    currentMode === mode
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                  }
                `}
                title={modeDescriptions[mode]}
              >
                {modeLabels[mode]}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="border-b border-slate-800/50 p-4 shrink-0">
      <div className="flex items-start gap-6">
        {/* Tool Selection */}
        <div>
          <h2 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="text-purple-400">🔧</span>
            Select Tool
          </h2>
          <div className="flex gap-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all
                  ${
                    currentTool?.id === tool.id
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                      : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50'
                  }
                  border
                `}
              >
                <span className="text-lg">{tool.icon}</span>
                <span className="font-medium">{tool.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selection */}
        {currentTool && (
          <div className="flex-1">
            <h2 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="text-cyan-400">📊</span>
              Measurement Mode
            </h2>
            <div className="flex flex-wrap gap-2">
              {currentTool.modes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => onSelectMode(mode)}
                  className={`
                    px-3 py-2 rounded-lg transition-all text-sm
                    ${
                      currentMode === mode
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50'
                    }
                    border flex items-center gap-2
                  `}
                  title={modeDescriptions[mode]}
                >
                  <span className="font-mono font-bold">{modeLabels[mode]}</span>
                  <span className="text-xs text-slate-500">{modeDescriptions[mode]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
