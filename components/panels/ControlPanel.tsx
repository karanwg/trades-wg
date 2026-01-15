'use client';

interface ControlPanelProps {
  isPowerOn: boolean;
  isThermostatCalling: boolean;
  capacitorDischarged: boolean;
  onTogglePower: () => void;
  onToggleThermostat: (calling: boolean) => void;
  onDischargeCapacitor: () => void;
  compact?: boolean;
}

export function ControlPanel({
  isPowerOn,
  isThermostatCalling,
  capacitorDischarged,
  onTogglePower,
  onToggleThermostat,
  onDischargeCapacitor,
  compact,
}: ControlPanelProps) {
  if (compact) {
    return (
      <div className="p-3 border-b border-slate-800/50 shrink-0">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Power Toggle - Compact */}
          <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-2 py-1.5">
            <span className="text-xs text-slate-400">Power</span>
            <button
              onClick={onTogglePower}
              className={`
                relative w-10 h-5 rounded-full transition-colors
                ${isPowerOn ? 'bg-emerald-500' : 'bg-slate-600'}
              `}
            >
              <span
                className={`
                  absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-all
                  ${isPowerOn ? 'left-5' : 'left-0.5'}
                `}
              />
            </button>
          </div>

          {/* Thermostat Toggle - Compact */}
          <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-2 py-1.5">
            <span className="text-xs text-slate-400">T-stat</span>
            <button
              onClick={() => onToggleThermostat(!isThermostatCalling)}
              className={`
                relative w-10 h-5 rounded-full transition-colors
                ${isThermostatCalling ? 'bg-cyan-500' : 'bg-slate-600'}
              `}
            >
              <span
                className={`
                  absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-all
                  ${isThermostatCalling ? 'left-5' : 'left-0.5'}
                `}
              />
            </button>
          </div>

          {/* Capacitor Discharge - Compact */}
          <button
            onClick={onDischargeCapacitor}
            disabled={capacitorDischarged}
            className={`
              flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs transition-all
              ${
                capacitorDischarged
                  ? 'bg-slate-800/50 text-slate-500'
                  : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
              }
            `}
          >
            {capacitorDischarged ? '✓' : '⚡'}
            <span>{capacitorDischarged ? 'Discharged' : 'Discharge Cap'}</span>
          </button>

          {/* Status indicators */}
          <div className="ml-auto flex gap-1.5">
            {isPowerOn && (
              <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-rose-500/20 text-rose-400 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                LIVE
              </span>
            )}
            {!capacitorDischarged && (
              <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                CHARGED
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-slate-800/50 p-4 shrink-0">
      <h2 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="text-emerald-400">⚙️</span>
        System Controls
      </h2>

      <div className="flex items-center gap-4">
        {/* Power Toggle */}
        <div className="flex items-center gap-3 bg-slate-800/50 rounded-xl px-4 py-3 border border-slate-700/30">
          <span className="text-sm text-slate-400">Main Power</span>
          <button
            onClick={onTogglePower}
            className={`
              relative w-14 h-7 rounded-full transition-colors
              ${isPowerOn ? 'bg-emerald-500' : 'bg-slate-600'}
            `}
          >
            <span
              className={`
                absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all
                ${isPowerOn ? 'left-8' : 'left-1'}
              `}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              isPowerOn ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            {isPowerOn ? 'ON' : 'OFF'}
          </span>
        </div>

        {/* Thermostat Toggle */}
        <div className="flex items-center gap-3 bg-slate-800/50 rounded-xl px-4 py-3 border border-slate-700/30">
          <span className="text-sm text-slate-400">Thermostat</span>
          <button
            onClick={() => onToggleThermostat(!isThermostatCalling)}
            className={`
              relative w-14 h-7 rounded-full transition-colors
              ${isThermostatCalling ? 'bg-cyan-500' : 'bg-slate-600'}
            `}
          >
            <span
              className={`
                absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all
                ${isThermostatCalling ? 'left-8' : 'left-1'}
              `}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              isThermostatCalling ? 'text-cyan-400' : 'text-slate-500'
            }`}
          >
            {isThermostatCalling ? 'CALLING' : 'OFF'}
          </span>
        </div>

        {/* Capacitor Discharge */}
        <button
          onClick={onDischargeCapacitor}
          disabled={capacitorDischarged}
          className={`
            flex items-center gap-2 px-4 py-3 rounded-xl transition-all
            ${
              capacitorDischarged
                ? 'bg-slate-800/50 border-slate-700/30 text-slate-500'
                : 'bg-amber-500/20 border-amber-500/30 text-amber-300 hover:bg-amber-500/30'
            }
            border
          `}
        >
          {capacitorDischarged ? (
            <>
              <span className="text-emerald-400">✓</span>
              <span>Capacitor Discharged</span>
            </>
          ) : (
            <>
              <span>⚡</span>
              <span>Discharge Capacitor</span>
            </>
          )}
        </button>

        {/* Safety Status */}
        <div className="ml-auto flex items-center gap-2">
          {isPowerOn && (
            <span className="flex items-center gap-2 text-xs px-3 py-1.5 bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/30">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              LIVE VOLTAGE
            </span>
          )}
          {!capacitorDischarged && (
            <span className="flex items-center gap-2 text-xs px-3 py-1.5 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              CAPACITOR CHARGED
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
