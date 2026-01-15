/**
 * AC Repair Simulator - Component Definitions
 * Defines all AC system components and their properties
 */

import { Component, ComponentId, Tool, ToolId } from './types';

// ============================================================================
// Component Templates
// ============================================================================

export const COMPONENT_TEMPLATES: Record<ComponentId, Omit<Component, 'status' | 'isEnergized' | 'hasDangerousVoltage' | 'hasStoredCharge'>> = {
  power_supply: {
    id: 'power_supply',
    name: 'Power Supply',
    description: 'Main 240V AC power supply with circuit breaker',
    terminals: [
      { id: 'L1', label: 'Line 1 (Hot)', type: 'line' },
      { id: 'L2', label: 'Line 2 (Hot)', type: 'line' },
      { id: 'N', label: 'Neutral', type: 'common' },
      { id: 'G', label: 'Ground', type: 'ground' },
    ],
  },
  thermostat: {
    id: 'thermostat',
    name: 'Thermostat',
    description: 'Temperature controller that signals the AC to turn on/off',
    terminals: [
      { id: 'R', label: 'R (24V Hot)', type: 'line' },
      { id: 'Y', label: 'Y (Cooling Call)', type: 'signal' },
      { id: 'G', label: 'G (Fan)', type: 'signal' },
      { id: 'C', label: 'C (Common)', type: 'common' },
    ],
  },
  contactor: {
    id: 'contactor',
    name: 'Contactor',
    description: 'Electromagnetic relay that connects power to compressor and outdoor fan',
    terminals: [
      { id: 'L1_IN', label: 'L1 Input', type: 'line' },
      { id: 'L2_IN', label: 'L2 Input', type: 'line' },
      { id: 'L1_OUT', label: 'L1 Output', type: 'load' },
      { id: 'L2_OUT', label: 'L2 Output', type: 'load' },
      { id: 'COIL_1', label: 'Coil Terminal 1', type: 'signal' },
      { id: 'COIL_2', label: 'Coil Terminal 2', type: 'common' },
    ],
  },
  capacitor: {
    id: 'capacitor',
    name: 'Run Capacitor',
    description: 'Dual run capacitor for compressor and fan motor start/run assistance',
    terminals: [
      { id: 'C', label: 'Common', type: 'common' },
      { id: 'HERM', label: 'Hermetic (Compressor)', type: 'run' },
      { id: 'FAN', label: 'Fan', type: 'run' },
    ],
  },
  compressor: {
    id: 'compressor',
    name: 'Compressor',
    description: 'Hermetic compressor that circulates refrigerant',
    terminals: [
      { id: 'C', label: 'Common', type: 'common' },
      { id: 'R', label: 'Run', type: 'run' },
      { id: 'S', label: 'Start', type: 'start' },
    ],
  },
  indoor_fan: {
    id: 'indoor_fan',
    name: 'Indoor Blower Motor',
    description: 'Fan motor that circulates air over evaporator coil',
    terminals: [
      { id: 'L', label: 'Line', type: 'line' },
      { id: 'N', label: 'Neutral', type: 'common' },
      { id: 'CAP', label: 'Capacitor', type: 'run' },
      { id: 'HI', label: 'High Speed', type: 'signal' },
      { id: 'MED', label: 'Medium Speed', type: 'signal' },
      { id: 'LO', label: 'Low Speed', type: 'signal' },
    ],
  },
  outdoor_fan: {
    id: 'outdoor_fan',
    name: 'Condenser Fan Motor',
    description: 'Fan motor that cools the condenser coil',
    terminals: [
      { id: 'L', label: 'Line', type: 'line' },
      { id: 'N', label: 'Neutral/Common', type: 'common' },
      { id: 'CAP', label: 'Capacitor', type: 'run' },
    ],
  },
};

// ============================================================================
// Tool Definitions
// ============================================================================

export const TOOLS: Record<ToolId, Tool> = {
  multimeter: {
    id: 'multimeter',
    name: 'Digital Multimeter',
    description: 'Measures voltage, resistance, continuity, and capacitance',
    modes: ['voltage_ac', 'voltage_dc', 'resistance', 'continuity', 'capacitance'],
    icon: '⚡',
  },
  clamp_meter: {
    id: 'clamp_meter',
    name: 'Clamp Meter',
    description: 'Measures current without breaking the circuit',
    modes: ['current_ac', 'current_dc'],
    icon: '🔌',
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

export function createComponent(id: ComponentId): Component {
  const template = COMPONENT_TEMPLATES[id];
  return {
    ...template,
    status: 'unknown',
    isEnergized: false,
    hasDangerousVoltage: false,
    hasStoredCharge: id === 'capacitor',
  };
}

export function createAllComponents(): Map<ComponentId, Component> {
  const components = new Map<ComponentId, Component>();
  for (const id of Object.keys(COMPONENT_TEMPLATES) as ComponentId[]) {
    components.set(id, createComponent(id));
  }
  return components;
}

export function getComponentById(
  components: Map<ComponentId, Component>,
  id: ComponentId
): Component | undefined {
  return components.get(id);
}

export function getModeUnit(mode: string): string {
  switch (mode) {
    case 'voltage_ac':
    case 'voltage_dc':
      return 'V';
    case 'resistance':
      return 'Ω';
    case 'continuity':
      return '';
    case 'capacitance':
      return 'µF';
    case 'current_ac':
    case 'current_dc':
      return 'A';
    default:
      return '';
  }
}
