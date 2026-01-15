'use client';

/**
 * AC Repair Simulator - React Hook
 * Provides React integration for the simulation engine
 */

import { useState, useCallback, useMemo } from 'react';
import {
  ACSimulatorEngine,
  createEngine,
  SimulationState,
  Scenario,
  ToolId,
  MeasurementMode,
  MeasurementPoint,
  ComponentId,
  ActionResult,
  Component,
  Tool,
  FaultType,
} from '@/lib/engine';

export interface UseSimulatorReturn {
  // State
  state: SimulationState;
  components: Component[];
  currentTool: Tool | null;
  isReady: boolean;

  // Scenario management
  loadScenario: (scenario: Scenario) => ActionResult;
  resetScenario: () => ActionResult;

  // Tool operations
  selectTool: (toolId: ToolId) => ActionResult;
  setToolMode: (mode: MeasurementMode) => ActionResult;

  // Measurements
  takeMeasurement: (points: MeasurementPoint[]) => ActionResult;

  // Safety
  dischargeCapacitor: () => ActionResult;
  togglePower: () => ActionResult;
  toggleThermostat: (calling: boolean) => ActionResult;

  // Diagnosis
  diagnoseFault: (componentId: ComponentId, faultType: FaultType) => ActionResult;

  // Getters
  getAvailableTools: () => Tool[];
  getFaultTypes: () => FaultType[];
}

export function useSimulator(): UseSimulatorReturn {
  // Create engine instance (stable reference)
  const engine = useMemo(() => createEngine(), []);

  // State that triggers re-renders
  const [state, setState] = useState<SimulationState>(engine.getState());

  // Helper to sync state after engine operations
  const syncState = useCallback(() => {
    setState(engine.getState());
  }, [engine]);

  // Scenario management
  const loadScenario = useCallback(
    (scenario: Scenario): ActionResult => {
      const result = engine.loadScenario(scenario);
      syncState();
      return result;
    },
    [engine, syncState]
  );

  const resetScenario = useCallback((): ActionResult => {
    const result = engine.resetScenario();
    syncState();
    return result;
  }, [engine, syncState]);

  // Tool operations
  const selectTool = useCallback(
    (toolId: ToolId): ActionResult => {
      const result = engine.dispatch({
        type: 'select_tool',
        toolId,
        timestamp: Date.now(),
      });
      syncState();
      return result;
    },
    [engine, syncState]
  );

  const setToolMode = useCallback(
    (mode: MeasurementMode): ActionResult => {
      const result = engine.dispatch({
        type: 'set_tool_mode',
        mode,
        timestamp: Date.now(),
      });
      syncState();
      return result;
    },
    [engine, syncState]
  );

  // Measurements
  const takeMeasurement = useCallback(
    (points: MeasurementPoint[]): ActionResult => {
      const result = engine.dispatch({
        type: 'take_measurement',
        points,
        timestamp: Date.now(),
      });
      syncState();
      return result;
    },
    [engine, syncState]
  );

  // Safety operations
  const dischargeCapacitor = useCallback((): ActionResult => {
    const result = engine.dispatch({
      type: 'discharge_capacitor',
      componentId: 'capacitor',
      timestamp: Date.now(),
    });
    syncState();
    return result;
  }, [engine, syncState]);

  const togglePower = useCallback((): ActionResult => {
    const result = engine.dispatch({
      type: 'toggle_power',
      timestamp: Date.now(),
    });
    syncState();
    return result;
  }, [engine, syncState]);

  const toggleThermostat = useCallback(
    (calling: boolean): ActionResult => {
      const result = engine.dispatch({
        type: 'toggle_thermostat',
        calling,
        timestamp: Date.now(),
      });
      syncState();
      return result;
    },
    [engine, syncState]
  );

  // Diagnosis
  const diagnoseFault = useCallback(
    (componentId: ComponentId, faultType: FaultType): ActionResult => {
      const result = engine.dispatch({
        type: 'diagnose_fault',
        componentId,
        faultType,
        timestamp: Date.now(),
      });
      syncState();
      return result;
    },
    [engine, syncState]
  );

  // Getters
  const getAvailableTools = useCallback(() => engine.getAvailableTools(), [engine]);
  const getFaultTypes = useCallback(() => engine.getFaultTypes(), [engine]);

  return {
    state,
    components: engine.getComponentsArray(),
    currentTool: engine.getCurrentTool(),
    isReady: state.scenario !== null,

    loadScenario,
    resetScenario,

    selectTool,
    setToolMode,

    takeMeasurement,

    dischargeCapacitor,
    togglePower,
    toggleThermostat,

    diagnoseFault,

    getAvailableTools,
    getFaultTypes,
  };
}
