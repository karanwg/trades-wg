/**
 * AC Repair Simulator - Scenario Loader
 * Loads and validates scenario JSON files
 */

import { Scenario } from './types';

// Import all scenarios statically (for client-side usage)
import failedCapacitor from '@/data/scenarios/failed-capacitor.json';
import stuckContactor from '@/data/scenarios/stuck-contactor.json';
import compressorOpenWinding from '@/data/scenarios/compressor-open-winding.json';
import outdoorFanFailure from '@/data/scenarios/outdoor-fan-failure.json';
import thermostatFailure from '@/data/scenarios/thermostat-failure.json';

// All available scenarios
export const SCENARIOS: Scenario[] = [
  failedCapacitor as Scenario,
  stuckContactor as Scenario,
  compressorOpenWinding as Scenario,
  outdoorFanFailure as Scenario,
  thermostatFailure as Scenario,
];

/**
 * Get all available scenarios
 */
export function getAllScenarios(): Scenario[] {
  return SCENARIOS;
}

/**
 * Get a scenario by ID
 */
export function getScenarioById(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}

/**
 * Get scenarios filtered by difficulty
 */
export function getScenariosByDifficulty(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): Scenario[] {
  return SCENARIOS.filter((s) => s.difficulty === difficulty);
}

/**
 * Validate a scenario object
 */
export function validateScenario(scenario: unknown): scenario is Scenario {
  if (!scenario || typeof scenario !== 'object') return false;

  const s = scenario as Record<string, unknown>;

  return (
    typeof s.id === 'string' &&
    typeof s.title === 'string' &&
    typeof s.description === 'string' &&
    ['beginner', 'intermediate', 'advanced'].includes(s.difficulty as string) &&
    Array.isArray(s.symptoms) &&
    Array.isArray(s.faults) &&
    Array.isArray(s.expectedReadings) &&
    Array.isArray(s.diagnosticSteps) &&
    Array.isArray(s.learningObjectives)
  );
}
