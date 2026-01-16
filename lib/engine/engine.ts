/**
 * AC Repair Simulator - Core Simulation Engine
 * Framework-agnostic engine for simulating AC electrical diagnostics
 */

import {
  SimulationState,
  Scenario,
  ComponentId,
  Component,
  ToolId,
  Tool,
  MeasurementMode,
  MeasurementPoint,
  Measurement,
  LogEntry,
  LogLevel,
  ActionResult,
  SimulatorAction,
  FaultType,
} from './types';
import { createAllComponents, getModeUnit, TOOLS } from './components';

// ============================================================================
// Utility Functions
// ============================================================================

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function createLogEntry(level: LogLevel, message: string, details?: string): LogEntry {
  return {
    id: generateId(),
    timestamp: Date.now(),
    level,
    message,
    details,
  };
}

// ============================================================================
// Engine Class
// ============================================================================

export class ACSimulatorEngine {
  private state: SimulationState;

  constructor() {
    this.state = this.createInitialState();
  }

  // --------------------------------------------------------------------------
  // State Management
  // --------------------------------------------------------------------------

  private createInitialState(): SimulationState {
    return {
      scenario: null,
      components: createAllComponents(),
      currentTool: null,
      currentMode: null,
      measurements: [],
      logs: [],
      safety: {
        capacitorDischarged: false,
        powerIsolated: false,
        warningsAcknowledged: [],
      },
      isPowerOn: true,
      isThermostatCalling: true,
      isComplete: false,
      correctDiagnosis: false,
      startTime: null,
      endTime: null,
    };
  }

  public getState(): SimulationState {
    return { ...this.state };
  }

  public getComponentsArray(): Component[] {
    return Array.from(this.state.components.values());
  }

  // --------------------------------------------------------------------------
  // Scenario Management
  // --------------------------------------------------------------------------

  public loadScenario(scenario: Scenario): ActionResult {
    this.state = this.createInitialState();
    this.state.scenario = scenario;
    this.state.startTime = Date.now();

    // Apply faults to components
    for (const fault of scenario.faults) {
      const component = this.state.components.get(fault.componentId);
      if (component) {
        component.status = 'faulty';
      }
    }

    // Set initial component states based on power and thermostat
    this.updateComponentStates();

    const logEntry = createLogEntry(
      'info',
      `Scenario loaded: ${scenario.title}`,
      scenario.description
    );
    this.state.logs.push(logEntry);

    return {
      success: true,
      message: `Scenario "${scenario.title}" loaded successfully`,
      logEntry,
    };
  }

  public resetScenario(): ActionResult {
    if (this.state.scenario) {
      return this.loadScenario(this.state.scenario);
    }
    return {
      success: false,
      message: 'No scenario loaded to reset',
    };
  }

  // --------------------------------------------------------------------------
  // Action Dispatch
  // --------------------------------------------------------------------------

  public dispatch(action: SimulatorAction): ActionResult {
    switch (action.type) {
      case 'select_tool':
        return this.selectTool(action.toolId);
      case 'set_tool_mode':
        return this.setToolMode(action.mode);
      case 'take_measurement':
        return this.takeMeasurement(action.points);
      case 'discharge_capacitor':
        return this.dischargeCapacitor(action.componentId);
      case 'toggle_power':
        return this.togglePower();
      case 'toggle_thermostat':
        return this.toggleThermostat(action.calling);
      case 'diagnose_fault':
        return this.diagnoseFault(action.componentId, action.faultType);
      default:
        return {
          success: false,
          message: 'Unknown action type',
        };
    }
  }

  // --------------------------------------------------------------------------
  // Tool Operations
  // --------------------------------------------------------------------------

  private selectTool(toolId: ToolId): ActionResult {
    const tool = TOOLS[toolId];
    if (!tool) {
      return {
        success: false,
        message: `Unknown tool: ${toolId}`,
      };
    }

    this.state.currentTool = toolId;
    this.state.currentMode = tool.modes[0];

    const logEntry = createLogEntry('info', `Selected ${tool.name}`);
    this.state.logs.push(logEntry);

    return {
      success: true,
      message: `${tool.name} selected`,
      logEntry,
    };
  }

  private setToolMode(mode: MeasurementMode): ActionResult {
    if (!this.state.currentTool) {
      return {
        success: false,
        message: 'No tool selected',
      };
    }

    const tool = TOOLS[this.state.currentTool];
    if (!tool.modes.includes(mode)) {
      return {
        success: false,
        message: `Mode ${mode} not available on ${tool.name}`,
      };
    }

    this.state.currentMode = mode;

    const logEntry = createLogEntry('info', `Set mode to ${this.formatMode(mode)}`);
    this.state.logs.push(logEntry);

    return {
      success: true,
      message: `Mode set to ${this.formatMode(mode)}`,
      logEntry,
    };
  }

  private formatMode(mode: MeasurementMode): string {
    const modeNames: Record<MeasurementMode, string> = {
      voltage_ac: 'AC Voltage',
      voltage_dc: 'DC Voltage',
      resistance: 'Resistance',
      continuity: 'Continuity',
      capacitance: 'Capacitance',
      current_ac: 'AC Current',
      current_dc: 'DC Current',
    };
    return modeNames[mode] || mode;
  }

  // --------------------------------------------------------------------------
  // Measurement Operations
  // --------------------------------------------------------------------------

  private takeMeasurement(points: MeasurementPoint[]): ActionResult {
    if (!this.state.currentTool || !this.state.currentMode) {
      return {
        success: false,
        message: 'Select a tool and mode first',
      };
    }

    // Safety checks
    const safetyResult = this.checkMeasurementSafety(points);
    if (safetyResult) {
      const logEntry = createLogEntry(
        safetyResult.level as LogLevel,
        safetyResult.message,
        safetyResult.details
      );
      this.state.logs.push(logEntry);

      if (safetyResult.level === 'danger') {
        return {
          success: false,
          message: safetyResult.message,
          logEntry,
          safetyWarning: safetyResult.message,
          consequence: safetyResult.consequence,
        };
      }
    }

    // Calculate measurement value
    const { value, isValid, errorMessage } = this.calculateMeasurement(
      points,
      this.state.currentMode
    );

    const measurement: Measurement = {
      id: generateId(),
      timestamp: Date.now(),
      tool: this.state.currentTool,
      mode: this.state.currentMode,
      points,
      value,
      unit: getModeUnit(this.state.currentMode),
      isValid,
      errorMessage,
    };

    this.state.measurements.push(measurement);

    const component1 = this.state.components.get(points[0].componentId);
    const component2 = points[1] ? this.state.components.get(points[1].componentId) : null;

    const locationDesc = component2
      ? `${component1?.name}:${points[0].terminalId} to ${component2.name}:${points[1].terminalId}`
      : `${component1?.name}:${points[0].terminalId}`;

    const valueStr = value !== null ? `${value.toFixed(2)} ${measurement.unit}` : 'OL';

    const logEntry = createLogEntry(
      'info',
      `Measured ${this.formatMode(this.state.currentMode)}: ${valueStr}`,
      locationDesc
    );
    this.state.logs.push(logEntry);

    return {
      success: true,
      message: `Measurement: ${valueStr}`,
      logEntry,
      measurement,
    };
  }

  private checkMeasurementSafety(
    points: MeasurementPoint[]
  ): { level: string; message: string; details?: string; consequence?: string } | null {
    // Check for capacitor safety
    for (const point of points) {
      if (point.componentId === 'capacitor') {
        const capacitor = this.state.components.get('capacitor');
        if (capacitor?.hasStoredCharge && !this.state.safety.capacitorDischarged) {
          return {
            level: 'danger',
            message: '⚠️ DANGER: Capacitor not discharged!',
            details: 'The capacitor may hold a lethal charge. Always discharge before testing.',
            consequence: 'In a real scenario, this could cause serious injury or death.',
          };
        }
      }
    }

    // Check for live voltage warning
    if (this.state.isPowerOn) {
      for (const point of points) {
        const component = this.state.components.get(point.componentId);
        if (component?.hasDangerousVoltage) {
          return {
            level: 'warning',
            message: '⚠️ Warning: Live voltage present',
            details: 'Use caution when probing energized circuits.',
          };
        }
      }
    }

    return null;
  }

  private calculateMeasurement(
    points: MeasurementPoint[],
    mode: MeasurementMode
  ): { value: number | null; isValid: boolean; errorMessage?: string } {
    if (!this.state.scenario) {
      return { value: null, isValid: false, errorMessage: 'No scenario loaded' };
    }

    const scenario = this.state.scenario;

    // Find matching expected reading from scenario
    const reading = this.findMatchingReading(points, mode);
    
    if (reading) {
      return { value: reading.value, isValid: true };
    }

    // Check normal readings
    const normalReading = scenario.normalReadings.find(
      (r) =>
        r.mode === mode &&
        this.pointsMatch(points, r.componentId, r.terminalFrom, r.terminalTo)
    );

    if (normalReading) {
      return { value: normalReading.value, isValid: true };
    }

    // Generate synthetic readings based on component state and mode
    return this.generateSyntheticReading(points, mode);
  }

  private findMatchingReading(
    points: MeasurementPoint[],
    mode: MeasurementMode
  ): { value: number } | null {
    if (!this.state.scenario) return null;

    for (const reading of this.state.scenario.expectedReadings) {
      if (
        reading.mode === mode &&
        this.pointsMatch(points, reading.componentId, reading.terminalFrom, reading.terminalTo)
      ) {
        return { value: reading.value };
      }
    }

    return null;
  }

  private pointsMatch(
    points: MeasurementPoint[],
    componentId: ComponentId,
    terminalFrom: string,
    terminalTo: string
  ): boolean {
    if (points.length === 2) {
      // Two-point measurement (between terminals)
      const match1 =
        points[0].componentId === componentId &&
        points[0].terminalId === terminalFrom &&
        points[1].componentId === componentId &&
        points[1].terminalId === terminalTo;

      const match2 =
        points[0].componentId === componentId &&
        points[0].terminalId === terminalTo &&
        points[1].componentId === componentId &&
        points[1].terminalId === terminalFrom;

      return match1 || match2;
    } else if (points.length === 1) {
      // Single point (usually for current clamp)
      return points[0].componentId === componentId && points[0].terminalId === terminalFrom;
    }

    return false;
  }

  private generateSyntheticReading(
    points: MeasurementPoint[],
    mode: MeasurementMode
  ): { value: number | null; isValid: boolean; errorMessage?: string } {
    const component = this.state.components.get(points[0].componentId);
    
    if (!component) {
      return { value: null, isValid: false, errorMessage: 'Component not found' };
    }

    switch (mode) {
      case 'voltage_ac':
        if (!this.state.isPowerOn) {
          return { value: 0, isValid: true };
        }
        if (component.isEnergized && component.hasDangerousVoltage) {
          return { value: 240, isValid: true };
        }
        return { value: 0, isValid: true };

      case 'voltage_dc':
        return { value: 0, isValid: true };

      case 'resistance':
        if (this.state.isPowerOn) {
          return { 
            value: null, 
            isValid: false, 
            errorMessage: 'Turn off power for resistance measurement' 
          };
        }
        return { value: null, isValid: true }; // OL (open)

      case 'continuity':
        if (this.state.isPowerOn) {
          return { 
            value: null, 
            isValid: false, 
            errorMessage: 'Turn off power for continuity test' 
          };
        }
        return { value: null, isValid: true };

      case 'capacitance':
        if (points[0].componentId === 'capacitor') {
          if (!this.state.safety.capacitorDischarged) {
            return { 
              value: null, 
              isValid: false, 
              errorMessage: 'Discharge capacitor first' 
            };
          }
          return { value: 45, isValid: true }; // Normal capacitance
        }
        return { value: 0, isValid: true };

      case 'current_ac':
      case 'current_dc':
        if (!this.state.isPowerOn || !this.state.isThermostatCalling) {
          return { value: 0, isValid: true };
        }
        return { value: 0, isValid: true };

      default:
        return { value: null, isValid: false, errorMessage: 'Unknown mode' };
    }
  }

  // --------------------------------------------------------------------------
  // Safety Operations
  // --------------------------------------------------------------------------

  private dischargeCapacitor(componentId: ComponentId): ActionResult {
    if (componentId !== 'capacitor') {
      return {
        success: false,
        message: 'Can only discharge capacitor component',
      };
    }

    const capacitor = this.state.components.get('capacitor');
    if (!capacitor) {
      return {
        success: false,
        message: 'Capacitor not found',
      };
    }

    if (this.state.isPowerOn) {
      const logEntry = createLogEntry(
        'warning',
        '⚠️ Cannot safely discharge capacitor with power on',
        'Turn off power before discharging the capacitor'
      );
      this.state.logs.push(logEntry);
      return {
        success: false,
        message: 'Turn off power before discharging',
        logEntry,
        safetyWarning: 'Power must be off to safely discharge capacitor',
      };
    }

    capacitor.hasStoredCharge = false;
    this.state.safety.capacitorDischarged = true;

    const logEntry = createLogEntry(
      'success',
      '✓ Capacitor safely discharged',
      'Used resistor to discharge capacitor through HERM and C terminals'
    );
    this.state.logs.push(logEntry);

    return {
      success: true,
      message: 'Capacitor discharged safely',
      logEntry,
    };
  }

  private togglePower(): ActionResult {
    this.state.isPowerOn = !this.state.isPowerOn;
    this.state.safety.powerIsolated = !this.state.isPowerOn;

    // Reset capacitor charge when power is turned on
    if (this.state.isPowerOn) {
      const capacitor = this.state.components.get('capacitor');
      if (capacitor) {
        capacitor.hasStoredCharge = true;
        this.state.safety.capacitorDischarged = false;
      }
    }

    this.updateComponentStates();

    const status = this.state.isPowerOn ? 'ON' : 'OFF';
    const level: LogLevel = this.state.isPowerOn ? 'warning' : 'success';
    const logEntry = createLogEntry(
      level,
      `Power ${status}`,
      this.state.isPowerOn 
        ? 'System is now energized - use caution' 
        : 'System is de-energized - safe to work on'
    );
    this.state.logs.push(logEntry);

    return {
      success: true,
      message: `Power turned ${status}`,
      logEntry,
    };
  }

  private toggleThermostat(calling: boolean): ActionResult {
    this.state.isThermostatCalling = calling;
    this.updateComponentStates();

    const status = calling ? 'calling for cooling' : 'satisfied (not calling)';
    const logEntry = createLogEntry('info', `Thermostat ${status}`);
    this.state.logs.push(logEntry);

    return {
      success: true,
      message: `Thermostat set to ${status}`,
      logEntry,
    };
  }

  // --------------------------------------------------------------------------
  // Component State Updates
  // --------------------------------------------------------------------------

  private updateComponentStates(): void {
    const isPowerOn = this.state.isPowerOn;
    const isCalling = this.state.isThermostatCalling;

    // Power supply
    const powerSupply = this.state.components.get('power_supply');
    if (powerSupply) {
      powerSupply.isEnergized = isPowerOn;
      powerSupply.hasDangerousVoltage = isPowerOn;
    }

    // Thermostat
    const thermostat = this.state.components.get('thermostat');
    if (thermostat) {
      thermostat.isEnergized = isPowerOn;
      thermostat.hasDangerousVoltage = false; // 24V control voltage
    }

    // Contactor
    const contactor = this.state.components.get('contactor');
    if (contactor) {
      contactor.isEnergized = isPowerOn && isCalling;
      contactor.hasDangerousVoltage = isPowerOn;
    }

    // Capacitor
    const capacitor = this.state.components.get('capacitor');
    if (capacitor) {
      capacitor.isEnergized = isPowerOn && isCalling;
      capacitor.hasDangerousVoltage = isPowerOn || capacitor.hasStoredCharge;
    }

    // Compressor
    const compressor = this.state.components.get('compressor');
    if (compressor) {
      const isFaulty = this.isComponentFaulty('compressor');
      compressor.isEnergized = isPowerOn && isCalling && !isFaulty;
      compressor.hasDangerousVoltage = isPowerOn && isCalling;
    }

    // Indoor fan
    const indoorFan = this.state.components.get('indoor_fan');
    if (indoorFan) {
      indoorFan.isEnergized = isPowerOn && isCalling;
      indoorFan.hasDangerousVoltage = isPowerOn;
    }

    // Outdoor fan
    const outdoorFan = this.state.components.get('outdoor_fan');
    if (outdoorFan) {
      const isFaulty = this.isComponentFaulty('outdoor_fan');
      outdoorFan.isEnergized = isPowerOn && isCalling && !isFaulty;
      outdoorFan.hasDangerousVoltage = isPowerOn && isCalling;
    }
  }

  private isComponentFaulty(componentId: ComponentId): boolean {
    if (!this.state.scenario) return false;
    return this.state.scenario.faults.some((f) => f.componentId === componentId);
  }

  // --------------------------------------------------------------------------
  // Diagnosis
  // --------------------------------------------------------------------------

  private diagnoseFault(componentId: ComponentId, faultType: string): ActionResult {
    if (!this.state.scenario) {
      return {
        success: false,
        message: 'No scenario loaded',
      };
    }

    const scenario = this.state.scenario;
    const actualFault = scenario.faults.find((f) => f.componentId === componentId);

    if (actualFault && actualFault.type === faultType) {
      this.state.isComplete = true;
      this.state.correctDiagnosis = true;
      this.state.endTime = Date.now();

      const duration = this.state.startTime
        ? Math.round((this.state.endTime - this.state.startTime) / 1000)
        : 0;

      const logEntry = createLogEntry(
        'success',
        `✓ Correct diagnosis! ${actualFault.description}`,
        `Completed in ${Math.floor(duration / 60)}m ${duration % 60}s with ${this.state.measurements.length} measurements`
      );
      this.state.logs.push(logEntry);

      return {
        success: true,
        message: 'Correct diagnosis!',
        logEntry,
      };
    } else {
      const component = this.state.components.get(componentId);
      const logEntry = createLogEntry(
        'warning',
        `✗ Incorrect diagnosis: ${component?.name} - ${faultType}`,
        'Review your measurements and try again'
      );
      this.state.logs.push(logEntry);

      return {
        success: false,
        message: 'Incorrect diagnosis. Keep investigating.',
        logEntry,
      };
    }
  }

  // --------------------------------------------------------------------------
  // Getters for UI
  // --------------------------------------------------------------------------

  public getAvailableTools(): Tool[] {
    return Object.values(TOOLS);
  }

  public getCurrentTool(): Tool | null {
    return this.state.currentTool ? TOOLS[this.state.currentTool] : null;
  }

  public getScenarioSymptoms(): string[] {
    return this.state.scenario?.symptoms || [];
  }

  public getDiagnosticSteps(): { order: number; description: string }[] {
    return this.state.scenario?.diagnosticSteps.map((s) => ({
      order: s.order,
      description: s.description,
    })) || [];
  }

  public getFaultTypes(): FaultType[] {
    return [
      'open_circuit',
      'short_circuit',
      'high_resistance',
      'failed_capacitor',
      'stuck_contactor',
      'bad_thermostat',
      'grounded_winding',
    ];
  }
}

// Export singleton factory
export function createEngine(): ACSimulatorEngine {
  return new ACSimulatorEngine();
}
