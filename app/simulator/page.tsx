'use client';

import { useState } from 'react';
import { Scenario } from '@/lib/engine';
import { ScenarioSelection } from '@/components/ScenarioSelection';
import { SimulatorWorkspace } from '@/components/SimulatorWorkspace';

export default function SimulatorPage() {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);

  if (activeScenario) {
    return (
      <SimulatorWorkspace
        scenario={activeScenario}
        onExit={() => setActiveScenario(null)}
      />
    );
  }

  return <ScenarioSelection onSelectScenario={setActiveScenario} />;
}
