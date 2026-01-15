'use client';

import { Measurement, MeasurementPoint, MeasurementMode } from '@/lib/engine';
import { COMPONENT_TEMPLATES } from '@/lib/engine/components';

interface ReadoutPanelProps {
  measurements: Measurement[];
  selectedPoints: MeasurementPoint[];
  currentMode: MeasurementMode | null;
  lastResult: string | null;
  onMeasure: () => void;
  onClearSelection: () => void;
  compact?: boolean;
}

export function ReadoutPanel({
  measurements,
  selectedPoints,
  currentMode,
  lastResult,
  onMeasure,
  onClearSelection,
  compact,
}: ReadoutPanelProps) {
  const lastMeasurement = measurements[measurements.length - 1];

  const formatPointLabel = (point: MeasurementPoint) => {
    const component = COMPONENT_TEMPLATES[point.componentId];
    return `${component.name} → ${point.terminalId}`;
  };

  const formatPointShort = (point: MeasurementPoint) => {
    const component = COMPONENT_TEMPLATES[point.componentId];
    const shortName = component.name.split(' ')[0];
    return `${shortName}:${point.terminalId}`;
  };

  if (compact) {
    return (
      <div className="p-3 border-b border-slate-800/50 shrink-0">
        {/* Digital Display - Compact */}
        <div className="bg-slate-950 border border-slate-700/50 rounded-xl p-3 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              {lastMeasurement ? (
                <>
                  <span className="font-mono text-3xl font-bold text-cyan-400">
                    {lastMeasurement.value !== null
                      ? formatValue(lastMeasurement.value, lastMeasurement.mode)
                      : 'OL'}
                  </span>
                  <span className="text-lg text-slate-400">{lastMeasurement.unit}</span>
                </>
              ) : (
                <span className="text-slate-600 font-mono text-2xl">---</span>
              )}
            </div>
            <span className="text-xs px-2 py-0.5 bg-slate-800 rounded text-slate-400">
              {currentMode ? formatMode(currentMode) : 'No mode'}
            </span>
          </div>
        </div>

        {/* Selected Points - Compact */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-slate-500">Points:</span>
          {selectedPoints.length === 0 ? (
            <span className="text-xs text-slate-600">None selected</span>
          ) : (
            <div className="flex gap-1">
              {selectedPoints.map((point, i) => (
                <span
                  key={`${point.componentId}-${point.terminalId}`}
                  className={`text-xs px-2 py-0.5 rounded ${
                    i === 0 ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {formatPointShort(point)}
                </span>
              ))}
            </div>
          )}
          {selectedPoints.length > 0 && (
            <button onClick={onClearSelection} className="text-xs text-slate-500 hover:text-white">
              ✕
            </button>
          )}
        </div>

        {/* Measure Button - Compact */}
        <button
          onClick={onMeasure}
          disabled={selectedPoints.length === 0 || !currentMode}
          className={`
            w-full py-2 rounded-lg font-medium text-sm transition-all
            ${
              selectedPoints.length > 0 && currentMode
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }
          `}
        >
          📏 Measure
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 flex flex-col">
      {/* Digital Display */}
      <div className="bg-slate-950 border border-slate-700/50 rounded-2xl p-6 mb-4 shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-slate-500 uppercase tracking-wider">
            Digital Readout
          </span>
          <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-400">
            {currentMode ? formatMode(currentMode) : 'No mode selected'}
          </span>
        </div>

        {/* Main Display */}
        <div className="text-center py-8">
          {lastMeasurement ? (
            <div>
              <div className="font-mono text-6xl font-bold text-cyan-400 tracking-tighter">
                {lastMeasurement.value !== null
                  ? formatValue(lastMeasurement.value, lastMeasurement.mode)
                  : 'OL'}
              </div>
              <div className="text-2xl text-slate-400 mt-2">
                {lastMeasurement.unit}
              </div>
              {lastMeasurement.errorMessage && (
                <div className="text-sm text-amber-400 mt-3 bg-amber-500/10 px-4 py-2 rounded-lg inline-block">
                  {lastMeasurement.errorMessage}
                </div>
              )}
            </div>
          ) : (
            <div className="text-slate-600 font-mono text-4xl">---</div>
          )}
        </div>

        {/* Last Result Message */}
        {lastResult && (
          <div className="text-center text-sm text-slate-400 mt-2 border-t border-slate-800 pt-4">
            {lastResult}
          </div>
        )}
      </div>

      {/* Selected Points */}
      <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-300">
            Measurement Points
          </span>
          {selectedPoints.length > 0 && (
            <button
              onClick={onClearSelection}
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        <div className="space-y-2 min-h-[60px]">
          {selectedPoints.length === 0 ? (
            <p className="text-slate-500 text-sm">
              Click on component terminals to select measurement points
            </p>
          ) : (
            selectedPoints.map((point, i) => (
              <div
                key={`${point.componentId}-${point.terminalId}`}
                className="flex items-center gap-3 text-sm"
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    i === 0
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {i === 0 ? '+' : '−'}
                </span>
                <span className="text-slate-300">{formatPointLabel(point)}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <button
        onClick={onMeasure}
        disabled={selectedPoints.length === 0 || !currentMode}
        className={`
          w-full py-4 rounded-xl font-semibold text-lg transition-all
          ${
            selectedPoints.length > 0 && currentMode
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }
        `}
      >
        📏 Take Measurement
      </button>

      {/* Recent Measurements */}
      {measurements.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-2">
            Recent Measurements
          </h3>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {measurements
              .slice(-5)
              .reverse()
              .map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between text-xs bg-slate-800/30 px-3 py-2 rounded-lg"
                >
                  <span className="text-slate-400">
                    {formatMode(m.mode)}
                  </span>
                  <span className="font-mono text-cyan-400">
                    {m.value !== null ? `${m.value.toFixed(2)} ${m.unit}` : 'OL'}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function formatMode(mode: MeasurementMode): string {
  const labels: Record<MeasurementMode, string> = {
    voltage_ac: 'AC Voltage',
    voltage_dc: 'DC Voltage',
    resistance: 'Resistance',
    continuity: 'Continuity',
    capacitance: 'Capacitance',
    current_ac: 'AC Current',
    current_dc: 'DC Current',
  };
  return labels[mode] || mode;
}

function formatValue(value: number, mode: MeasurementMode): string {
  if (value === -1) return 'OL'; // Open line
  if (mode === 'resistance' && value > 1000000) return 'OL';
  if (value >= 1000) return `${(value / 1000).toFixed(2)}k`;
  return value.toFixed(2);
}
