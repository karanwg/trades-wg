'use client';

import { useState, useEffect } from 'react';
import {
  Scenario,
  ComponentId,
  MeasurementPoint,
  FaultType,
} from '@/lib/engine';
import { useSimulator } from '@/hooks/useSimulator';
import { ComponentPanel } from './panels/ComponentPanel';
import { ToolPanel } from './panels/ToolPanel';
import { ReadoutPanel } from './panels/ReadoutPanel';
import { LogPanel } from './panels/LogPanel';
import { ControlPanel } from './panels/ControlPanel';
import { DiagnosisPanel } from './panels/DiagnosisPanel';
import { SymptomsPanel } from './panels/SymptomsPanel';
import { CompletionModal } from './CompletionModal';

interface SimulatorWorkspaceProps {
  scenario: Scenario;
  onExit: () => void;
}

export function SimulatorWorkspace({ scenario, onExit }: SimulatorWorkspaceProps) {
  const simulator = useSimulator();
  const [selectedPoints, setSelectedPoints] = useState<MeasurementPoint[]>([]);
  const [lastResult, setLastResult] = useState<string | null>(null);

  // Load scenario on mount
  useEffect(() => {
    simulator.loadScenario(scenario);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle terminal selection for measurements
  const handleTerminalSelect = (componentId: ComponentId, terminalId: string) => {
    const point: MeasurementPoint = { componentId, terminalId };

    // Check if already selected
    const existingIndex = selectedPoints.findIndex(
      (p) => p.componentId === componentId && p.terminalId === terminalId
    );

    if (existingIndex >= 0) {
      // Deselect
      setSelectedPoints(selectedPoints.filter((_, i) => i !== existingIndex));
    } else if (selectedPoints.length < 2) {
      // Add point
      setSelectedPoints([...selectedPoints, point]);
    } else {
      // Replace second point
      setSelectedPoints([selectedPoints[0], point]);
    }
  };

  // Take measurement with selected points
  const handleMeasure = () => {
    if (selectedPoints.length === 0) {
      setLastResult('Select at least one measurement point');
      return;
    }

    const result = simulator.takeMeasurement(selectedPoints);
    setLastResult(result.message);

    if (result.success) {
      setSelectedPoints([]);
    }
  };

  // Handle diagnosis submission
  const handleDiagnose = (componentId: ComponentId, faultType: FaultType) => {
    const result = simulator.diagnoseFault(componentId, faultType);
    setLastResult(result.message);
  };

  // Handle reset
  const handleReset = () => {
    simulator.resetScenario();
    setSelectedPoints([]);
    setLastResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-sm shrink-0">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onExit}
              className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              ← Back
            </button>
            <div className="h-6 w-px bg-slate-700" />
            <div>
              <h1 className="text-lg font-semibold text-white">{scenario.title}</h1>
              <p className="text-xs text-slate-400">{scenario.difficulty} difficulty</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Components & Symptoms */}
        <aside className="w-80 border-r border-slate-800/50 bg-slate-900/20 flex flex-col overflow-hidden shrink-0">
          <SymptomsPanel symptoms={scenario.symptoms} />
          <ComponentPanel
            components={simulator.components}
            selectedPoints={selectedPoints}
            onTerminalSelect={handleTerminalSelect}
          />
        </aside>

        {/* Center - Tools & Readout */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tool Selection */}
          <ToolPanel
            tools={simulator.getAvailableTools()}
            currentTool={simulator.currentTool}
            currentMode={simulator.state.currentMode}
            onSelectTool={simulator.selectTool}
            onSelectMode={simulator.setToolMode}
          />

          {/* Readout & Measurement */}
          <ReadoutPanel
            measurements={simulator.state.measurements}
            selectedPoints={selectedPoints}
            currentMode={simulator.state.currentMode}
            lastResult={lastResult}
            onMeasure={handleMeasure}
            onClearSelection={() => setSelectedPoints([])}
          />

          {/* Control Panel */}
          <ControlPanel
            isPowerOn={simulator.state.isPowerOn}
            isThermostatCalling={simulator.state.isThermostatCalling}
            capacitorDischarged={simulator.state.safety.capacitorDischarged}
            onTogglePower={simulator.togglePower}
            onToggleThermostat={simulator.toggleThermostat}
            onDischargeCapacitor={simulator.dischargeCapacitor}
          />

          {/* Diagnosis Panel */}
          <DiagnosisPanel
            components={simulator.components}
            faultTypes={simulator.getFaultTypes()}
            onDiagnose={handleDiagnose}
            isComplete={simulator.state.isComplete}
          />
        </div>

        {/* Right Sidebar - Action Log */}
        <aside className="w-96 border-l border-slate-800/50 bg-slate-900/20 overflow-hidden shrink-0">
          <LogPanel logs={simulator.state.logs} />
        </aside>
      </main>

      {/* Completion Modal */}
      {simulator.state.isComplete && (
        <CompletionModal
          scenario={scenario}
          state={simulator.state}
          onExit={onExit}
          onRestart={handleReset}
        />
      )}
    </div>
  );
}
