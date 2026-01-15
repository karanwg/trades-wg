/**
 * AC Repair Simulator - Type Definitions
 * Framework-agnostic types for the simulation engine
 */

// ============================================================================
// Component Types
// ============================================================================

export type ComponentId =
  | 'power_supply'
  | 'thermostat'
  | 'contactor'
  | 'capacitor'
  | 'compressor'
  | 'indoor_fan'
  | 'outdoor_fan';

export type ComponentStatus = 'operational' | 'faulty' | 'unknown';

export interface ComponentTerminal {
  id: string;
  label: string;
  type: 'line' | 'load' | 'common' | 'run' | 'start' | 'signal' | 'ground';
}

export interface Component {
  id: ComponentId;
  name: string;
  description: string;
  terminals: ComponentTerminal[];
  status: ComponentStatus;
  isEnergized: boolean;
  hasDangerousVoltage: boolean;
  hasStoredCharge: boolean; // For capacitors
}

// ============================================================================
// Tool Types
// ============================================================================

export type ToolId = 'multimeter' | 'clamp_meter';

export type MultimeterMode = 
  | 'voltage_ac' 
  | 'voltage_dc' 
  | 'resistance' 
  | 'continuity' 
  | 'capacitance';

export type ClampMeterMode = 'current_ac' | 'current_dc';

export type MeasurementMode = MultimeterMode | ClampMeterMode;

export interface Tool {
  id: ToolId;
  name: string;
  description: string;
  modes: MeasurementMode[];
  icon: string;
}

// ============================================================================
// Measurement Types
// ============================================================================

export interface MeasurementPoint {
  componentId: ComponentId;
  terminalId: string;
}

export interface Measurement {
  id: string;
  timestamp: number;
  tool: ToolId;
  mode: MeasurementMode;
  points: MeasurementPoint[];
  value: number | null;
  unit: string;
  isValid: boolean;
  errorMessage?: string;
}

// ============================================================================
// Action Types
// ============================================================================

export type ActionType =
  | 'select_tool'
  | 'set_tool_mode'
  | 'take_measurement'
  | 'discharge_capacitor'
  | 'toggle_power'
  | 'toggle_thermostat'
  | 'diagnose_fault';

export interface BaseAction {
  type: ActionType;
  timestamp: number;
}

export interface SelectToolAction extends BaseAction {
  type: 'select_tool';
  toolId: ToolId;
}

export interface SetToolModeAction extends BaseAction {
  type: 'set_tool_mode';
  mode: MeasurementMode;
}

export interface TakeMeasurementAction extends BaseAction {
  type: 'take_measurement';
  points: MeasurementPoint[];
}

export interface DischargeCapacitorAction extends BaseAction {
  type: 'discharge_capacitor';
  componentId: ComponentId;
}

export interface TogglePowerAction extends BaseAction {
  type: 'toggle_power';
}

export interface ToggleThermostatAction extends BaseAction {
  type: 'toggle_thermostat';
  calling: boolean; // true = calling for cooling
}

export interface DiagnoseFaultAction extends BaseAction {
  type: 'diagnose_fault';
  componentId: ComponentId;
  faultType: string;
}

export type SimulatorAction =
  | SelectToolAction
  | SetToolModeAction
  | TakeMeasurementAction
  | DischargeCapacitorAction
  | TogglePowerAction
  | ToggleThermostatAction
  | DiagnoseFaultAction;

// ============================================================================
// Log Types
// ============================================================================

export type LogLevel = 'info' | 'warning' | 'danger' | 'success';

export interface LogEntry {
  id: string;
  timestamp: number;
  level: LogLevel;
  message: string;
  details?: string;
}

// ============================================================================
// Scenario Types
// ============================================================================

export type FaultType =
  | 'open_circuit'
  | 'short_circuit'
  | 'high_resistance'
  | 'failed_capacitor'
  | 'stuck_contactor'
  | 'bad_thermostat'
  | 'grounded_winding'
  | 'no_fault';

export interface Fault {
  componentId: ComponentId;
  type: FaultType;
  description: string;
}

export interface ExpectedReading {
  componentId: ComponentId;
  terminalFrom: string;
  terminalTo: string;
  mode: MeasurementMode;
  value: number;
  tolerance: number; // percentage
}

export interface DiagnosticStep {
  order: number;
  description: string;
  action: string;
  expectedResult: string;
  hint?: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  symptoms: string[];
  faults: Fault[];
  expectedReadings: ExpectedReading[];
  normalReadings: ExpectedReading[];
  diagnosticSteps: DiagnosticStep[];
  learningObjectives: string[];
}

// ============================================================================
// Simulation State
// ============================================================================

export interface SafetyState {
  capacitorDischarged: boolean;
  powerIsolated: boolean;
  warningsAcknowledged: string[];
}

export interface SimulationState {
  scenario: Scenario | null;
  components: Map<ComponentId, Component>;
  currentTool: ToolId | null;
  currentMode: MeasurementMode | null;
  measurements: Measurement[];
  logs: LogEntry[];
  safety: SafetyState;
  isPowerOn: boolean;
  isThermostatCalling: boolean;
  isComplete: boolean;
  correctDiagnosis: boolean;
  startTime: number | null;
  endTime: number | null;
}

// ============================================================================
// Engine Result Types
// ============================================================================

export interface ActionResult {
  success: boolean;
  message: string;
  logEntry?: LogEntry;
  measurement?: Measurement;
  safetyWarning?: string;
  consequence?: string;
}
