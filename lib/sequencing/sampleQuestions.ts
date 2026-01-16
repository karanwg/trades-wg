import { SequencingQuestion } from './types';

export const SAMPLE_QUESTIONS: SequencingQuestion[] = [

  // // 5. HVAC Capacitor Replacement (HIDDEN)
  // {
  //   id: 'sample-hvac',
  //   title: 'Replace Run Capacitor',
  //   description: 'The AC unit is not cooling and the capacitor needs replacement. Follow electrical safety procedures.',
  //   startingPoint: 'The outdoor AC unit hums but neither the compressor nor condenser fan starts. Diagnosis: faulty run capacitor.',
  //   endingPoint: 'New capacitor installed. AC unit cooling normally with proper current draw.',
  //   maxSteps: 6,
  //   isBuiltIn: true,
  //   hidden: true,
  //   actions: [
  //     { id: 'hvac-1', label: 'Turn off power at breaker', icon: '🔴', feedback: 'Power disconnected at main breaker. Verify with meter.', isCorrect: true, correctOrder: 0 },
  //     { id: 'hvac-2', label: 'Discharge the capacitor', icon: '⚡', feedback: 'Capacitor discharged safely. No stored energy.', isCorrect: true, correctOrder: 1 },
  //     { id: 'hvac-3', label: 'Measure capacitance', icon: '📊', feedback: 'Reading: 12.3 µF. Rated: 45 µF. Confirmed faulty!', isCorrect: true, correctOrder: 2 },
  //     { id: 'hvac-4', label: 'Remove old capacitor', icon: '🔧', feedback: 'Old capacitor removed. Note wire positions.', isCorrect: true, correctOrder: 3 },
  //     { id: 'hvac-5', label: 'Install new capacitor', icon: '✅', feedback: 'New capacitor installed. Wires connected correctly.', isCorrect: true, correctOrder: 4 },
  //     { id: 'hvac-6', label: 'Restore power and test', icon: '🟢', feedback: 'System running! Current draw: 4.8A - normal.', isCorrect: true, correctOrder: 5 },
  //     // Distractors
  //     { id: 'hvac-d1', label: 'Work with power on', icon: '💀', feedback: undefined, isCorrect: false },
  //     { id: 'hvac-d2', label: 'Skip discharge step', icon: '⚠️', feedback: undefined, isCorrect: false },
  //     { id: 'hvac-d3', label: 'Use wrong capacitance value', icon: '❌', feedback: undefined, isCorrect: false },
  //   ],
  // },

  // 6. Cooking - Make Ramen
  // {
  //   id: 'sample-cooking',
  //   title: 'Make Perfect Ramen',
  //   description: 'Prepare a delicious bowl of instant ramen. Order matters for the best texture and flavor!',
  //   startingPoint: 'You\'re hungry and have a packet of instant ramen. Time to make the perfect bowl.',
  //   endingPoint: 'A steaming bowl of perfectly cooked ramen is ready to enjoy!',
  //   maxSteps: 5,
  //   isBuiltIn: true,
  //   actions: [
  //     { id: 'cook-1', label: 'Boil water', icon: '💧', feedback: 'Water is boiling. Ready for noodles!', isCorrect: true, correctOrder: 0 },
  //     { id: 'cook-2', label: 'Add noodles to pot', icon: '🍜', feedback: 'Noodles added. They\'re softening up.', isCorrect: true, correctOrder: 1 },
  //     { id: 'cook-3', label: 'Cook for 3 minutes', icon: '⏱️', feedback: 'Timer done! Noodles are perfectly al dente.', isCorrect: true, correctOrder: 2 },
  //     { id: 'cook-4', label: 'Add seasoning packet', icon: '🧂', feedback: 'Seasoning dissolved. Smells amazing!', isCorrect: true, correctOrder: 3 },
  //     { id: 'cook-5', label: 'Serve in bowl', icon: '🥢', feedback: 'Ramen served! Enjoy your meal.', isCorrect: true, correctOrder: 4 },
  //     // Distractors
  //     { id: 'cook-d1', label: 'Add noodles to cold water', icon: '🥶', feedback: undefined, isCorrect: false },
  //     { id: 'cook-d2', label: 'Microwave the packet', icon: '📻', feedback: undefined, isCorrect: false },
  //     { id: 'cook-d3', label: 'Add seasoning before cooking', icon: '❓', feedback: undefined, isCorrect: false },
  //   ],
  // },

  // 7. Wind Turbine Technician - Blade Inspection
  {
    id: 'sample-wind-turbine',
    title: 'Wind Turbine Blade Inspection',
    description: 'Perform a scheduled inspection of wind turbine blades. Safety at height is critical!',
    startingPoint: 'You\'ve arrived at the wind farm for a routine blade inspection. The turbine has been de-energized and locked out.',
    endingPoint: 'Inspection complete. Blade condition documented and any issues reported to maintenance.',
    maxSteps: 7,
    isBuiltIn: true,
    actions: [
      { id: 'wind-1', label: 'Verify LOTO is in place', icon: '🔒', feedback: 'Lockout/Tagout verified. Turbine is safe to climb.', isCorrect: true, correctOrder: 0 },
      { id: 'wind-2', label: 'Don fall protection harness', icon: '🦺', feedback: 'Harness secured. All clips inspected and rated.', isCorrect: true, correctOrder: 1 },
      { id: 'wind-3', label: 'Ascend to nacelle', icon: '🧗', feedback: 'Reached nacelle. Secured to anchor point.', isCorrect: true, correctOrder: 2 },
      { id: 'wind-4', label: 'Position blade for access', icon: '🔄', feedback: 'Blade positioned at 6 o\'clock for inspection.', isCorrect: true, correctOrder: 3 },
      { id: 'wind-5', label: 'Inspect blade surface', icon: '🔍', feedback: 'Visual inspection complete. Minor erosion noted on leading edge.', isCorrect: true, correctOrder: 4 },
      { id: 'wind-6', label: 'Document findings with photos', icon: '📸', feedback: 'All damage areas photographed and GPS-tagged.', isCorrect: true, correctOrder: 5 },
      { id: 'wind-7', label: 'Descend and complete report', icon: '📋', feedback: 'Report submitted. Turbine ready for return to service.', isCorrect: true, correctOrder: 6 },
      // Distractors
      { id: 'wind-d1', label: 'Climb without fall protection', icon: '💀', feedback: undefined, isCorrect: false },
      { id: 'wind-d2', label: 'Skip LOTO verification', icon: '⚠️', feedback: undefined, isCorrect: false },
      { id: 'wind-d3', label: 'Work during high winds', icon: '🌪️', feedback: undefined, isCorrect: false },
    ],
  },

  // 8. Solar Panel Technician - Installation
  {
    id: 'sample-solar-install',
    title: 'Rooftop Solar Panel Installation',
    description: 'Install a residential solar panel array. Proper sequence ensures safety and optimal performance.',
    startingPoint: 'Mounting rails are installed on the roof. Solar panels and inverter are on-site ready for installation.',
    endingPoint: 'Solar array is installed, connected, and producing power. System is monitored and operational.',
    maxSteps: 7,
    isBuiltIn: true,
    actions: [
      { id: 'solar-1', label: 'De-energize main breaker', icon: '🔴', feedback: 'Main breaker off. Safe to work on electrical.', isCorrect: true, correctOrder: 0 },
      { id: 'solar-2', label: 'Mount panels to rails', icon: '🔧', feedback: 'Panels secured with mid and end clamps. Aligned perfectly.', isCorrect: true, correctOrder: 1 },
      { id: 'solar-3', label: 'Connect panel strings', icon: '🔌', feedback: 'MC4 connectors clicked. String wiring complete.', isCorrect: true, correctOrder: 2 },
      { id: 'solar-4', label: 'Run conduit to inverter', icon: '🏠', feedback: 'Conduit routed and secured. Wires pulled through.', isCorrect: true, correctOrder: 3 },
      { id: 'solar-5', label: 'Wire inverter and breaker', icon: '⚡', feedback: 'Inverter connected. Dedicated breaker installed.', isCorrect: true, correctOrder: 4 },
      { id: 'solar-6', label: 'Commission the system', icon: '✅', feedback: 'System powered on. Producing 5.2kW as expected!', isCorrect: true, correctOrder: 5 },
      { id: 'solar-7', label: 'Configure monitoring app', icon: '📱', feedback: 'App connected. Customer can track production.', isCorrect: true, correctOrder: 6 },
      // Distractors
      { id: 'solar-d1', label: 'Connect panels before mounting', icon: '❌', feedback: undefined, isCorrect: false },
      { id: 'solar-d2', label: 'Work with panels energized', icon: '💀', feedback: undefined, isCorrect: false },
      { id: 'solar-d3', label: 'Skip grounding conductors', icon: '⚠️', feedback: undefined, isCorrect: false },
    ],
  },

  // 9. Data Centre Technician - Server Replacement
  {
    id: 'sample-datacentre',
    title: 'Data Centre Server Replacement',
    description: 'Replace a failed server in a live data centre. Minimize downtime while following change management.',
    startingPoint: 'A server has failed and needs hot-swap replacement. You have the replacement unit and approved change ticket.',
    endingPoint: 'New server is racked, cabled, and provisioned. Services restored and verified.',
    maxSteps: 7,
    isBuiltIn: true,
    actions: [
      { id: 'dc-1', label: 'Verify change ticket approval', icon: '📋', feedback: 'Change #4521 approved. Maintenance window active.', isCorrect: true, correctOrder: 0 },
      { id: 'dc-2', label: 'Identify failed server location', icon: '🔍', feedback: 'Server located: Rack A15, Unit 22-24. LED indicates fault.', isCorrect: true, correctOrder: 1 },
      { id: 'dc-3', label: 'Migrate VMs to other hosts', icon: '🔄', feedback: 'Live migration complete. All VMs running on healthy hosts.', isCorrect: true, correctOrder: 2 },
      { id: 'dc-4', label: 'Disconnect and remove server', icon: '🔌', feedback: 'Power, network, and management cables disconnected. Server removed.', isCorrect: true, correctOrder: 3 },
      { id: 'dc-5', label: 'Rack and cable new server', icon: '🖥️', feedback: 'New server mounted. All cables connected and dressed.', isCorrect: true, correctOrder: 4 },
      { id: 'dc-6', label: 'Configure and provision', icon: '⚙️', feedback: 'BIOS configured. OS deployed via PXE. Joined to cluster.', isCorrect: true, correctOrder: 5 },
      { id: 'dc-7', label: 'Verify and close ticket', icon: '✅', feedback: 'All checks passed. Ticket closed. Incident resolved.', isCorrect: true, correctOrder: 6 },
      // Distractors
      { id: 'dc-d1', label: 'Remove server before VM migration', icon: '💥', feedback: undefined, isCorrect: false },
      { id: 'dc-d2', label: 'Skip change approval process', icon: '🚫', feedback: undefined, isCorrect: false },
      { id: 'dc-d3', label: 'Force shutdown running VMs', icon: '⛔', feedback: undefined, isCorrect: false },
    ],
  },

  // 10. Elevator Installer - Door System Setup
  {
    id: 'sample-elevator',
    title: 'Elevator Door System Installation',
    description: 'Install and adjust the door operator system on a new elevator. Precision and safety are essential.',
    startingPoint: 'The elevator car and hoistway are complete. Door operator components are ready for installation on the landing.',
    endingPoint: 'Door system installed, adjusted, and passing all safety tests. Ready for inspection.',
    maxSteps: 7,
    isBuiltIn: true,
    actions: [
      { id: 'elev-1', label: 'Lock out elevator controls', icon: '🔒', feedback: 'Elevator locked in safe mode. Controls disabled.', isCorrect: true, correctOrder: 0 },
      { id: 'elev-2', label: 'Mount door operator header', icon: '🔧', feedback: 'Header bracket secured. Level and plumb verified.', isCorrect: true, correctOrder: 1 },
      { id: 'elev-3', label: 'Install door panels', icon: '🚪', feedback: 'Door panels hung and sliding freely on track.', isCorrect: true, correctOrder: 2 },
      { id: 'elev-4', label: 'Connect drive motor', icon: '⚡', feedback: 'Motor mounted and belt tensioned to spec.', isCorrect: true, correctOrder: 3 },
      { id: 'elev-5', label: 'Wire safety sensors', icon: '👁️', feedback: 'Light curtain and door edge sensors wired and tested.', isCorrect: true, correctOrder: 4 },
      { id: 'elev-6', label: 'Adjust door timing', icon: '⏱️', feedback: 'Open/close speed calibrated. Dwell time set to code.', isCorrect: true, correctOrder: 5 },
      { id: 'elev-7', label: 'Test with safety checks', icon: '✅', feedback: 'All safety tests pass. Door reverses on obstruction.', isCorrect: true, correctOrder: 6 },
      // Distractors
      { id: 'elev-d1', label: 'Test without lockout', icon: '💀', feedback: undefined, isCorrect: false },
      { id: 'elev-d2', label: 'Skip sensor installation', icon: '⚠️', feedback: undefined, isCorrect: false },
      { id: 'elev-d3', label: 'Bypass safety interlocks', icon: '🚫', feedback: undefined, isCorrect: false },
    ],
  },

  // 11. Campfire - Starting a Fire Safely
  {
    id: 'sample-campfire',
    title: 'Starting a Campfire',
    description: 'Build and light a safe campfire for cooking and warmth. Proper technique prevents wildfires and ensures efficient burning.',
    startingPoint: 'You\'re at an established campsite with a fire ring. You need to start a fire for cooking dinner.',
    endingPoint: 'A strong, safe fire is burning steadily. Ready for cooking and will be properly extinguished later.',
    maxSteps: 7,
    isBuiltIn: true,
    actions: [
      { id: 'fire-1', label: 'Clear area around fire ring', icon: '🧹', feedback: 'Debris cleared 10 feet around. No dry leaves or branches nearby.', isCorrect: true, correctOrder: 0 },
      { id: 'fire-2', label: 'Gather tinder, kindling, firewood', icon: '🪵', feedback: 'Materials collected: small twigs, sticks, and logs. All dry.', isCorrect: true, correctOrder: 1 },
      { id: 'fire-3', label: 'Build tinder bundle in center', icon: '🌾', feedback: 'Dry grass and small twigs bundled loosely. Good airflow.', isCorrect: true, correctOrder: 2 },
      { id: 'fire-4', label: 'Arrange kindling in teepee', icon: '⛺', feedback: 'Small sticks arranged around tinder. Structure stable.', isCorrect: true, correctOrder: 3 },
      { id: 'fire-5', label: 'Light tinder from upwind side', icon: '🔥', feedback: 'Tinder ignited. Flames catching on kindling!', isCorrect: true, correctOrder: 4 },
      { id: 'fire-6', label: 'Add small logs gradually', icon: '📚', feedback: 'Logs added as kindling catches. Fire building nicely.', isCorrect: true, correctOrder: 5 },
      { id: 'fire-7', label: 'Let coals form for cooking', icon: '♨️', feedback: 'Strong fire burning. Hot coals forming. Perfect for cooking!', isCorrect: true, correctOrder: 6 },
      // Distractors
      { id: 'fire-d1', label: 'Add large logs first', icon: '❌', feedback: undefined, isCorrect: false },
      { id: 'fire-d2', label: 'Use gasoline as accelerant', icon: '💀', feedback: undefined, isCorrect: false },
      { id: 'fire-d3', label: 'Build fire outside fire ring', icon: '⚠️', feedback: undefined, isCorrect: false },
      { id: 'fire-d4', label: 'Leave fire unattended', icon: '🚫', feedback: undefined, isCorrect: false },
    ],
  },
    // 1. CPR Emergency Response
    {
      id: 'sample-cpr',
      title: 'CPR Emergency Response',
      description: 'Someone has collapsed and is unresponsive. Perform the correct sequence of actions to save their life.',
      startingPoint: 'A person has collapsed on the ground. They are not moving and you are the first responder on the scene.',
      endingPoint: 'Emergency services have arrived and the victim is receiving professional medical care.',
      maxSteps: 6,
      isBuiltIn: true,
      actions: [
        { id: 'cpr-1', label: 'Check scene safety', icon: '👀', feedback: 'Scene is safe to approach.', isCorrect: true, correctOrder: 0 },
        { id: 'cpr-2', label: 'Call 911', icon: '📞', feedback: 'Emergency services dispatched. Help is on the way!', isCorrect: true, correctOrder: 1 },
        { id: 'cpr-3', label: 'Check for breathing', icon: '👂', feedback: 'No breathing detected. Begin CPR immediately.', isCorrect: true, correctOrder: 2 },
        { id: 'cpr-4', label: 'Start chest compressions', icon: '🫀', feedback: '30 compressions at 100-120 per minute. Push hard and fast!', isCorrect: true, correctOrder: 3 },
        { id: 'cpr-5', label: 'Give rescue breaths', icon: '💨', feedback: '2 breaths given. Continue cycles of 30:2.', isCorrect: true, correctOrder: 4 },
        { id: 'cpr-6', label: 'Continue until help arrives', icon: '🔄', feedback: 'Keep going! You\'re doing great.', isCorrect: true, correctOrder: 5 },
        // Distractors
        { id: 'cpr-d1', label: 'Move the victim first', icon: '🚶', feedback: undefined, isCorrect: false },
        { id: 'cpr-d2', label: 'Give water to drink', icon: '💧', feedback: undefined, isCorrect: false },
        { id: 'cpr-d3', label: 'Slap the face to wake up', icon: '👋', feedback: undefined, isCorrect: false },
      ],
    },
  
    // 2. Jump-Starting a Car (HIDDEN)
    {
      id: 'sample-jumpstart',
      title: 'Jump-Starting a Car',
      description: 'Your car battery is dead. Connect jumper cables correctly to avoid sparks or damage.',
      startingPoint: 'Your car won\'t start - the battery is completely dead. A helpful neighbor has pulled up with jumper cables.',
      endingPoint: 'Your car is running and you can drive to get the battery checked or replaced.',
      maxSteps: 7,
      isBuiltIn: true,
      hidden: true,
      actions: [
        { id: 'jump-1', label: 'Position cars close (not touching)', icon: '🚗', feedback: 'Cars positioned correctly. Hoods accessible.', isCorrect: true, correctOrder: 0 },
        { id: 'jump-2', label: 'Turn off both cars', icon: '🔑', feedback: 'Both ignitions off. Safe to proceed.', isCorrect: true, correctOrder: 1 },
        { id: 'jump-3', label: 'Connect RED to dead battery (+)', icon: '🔴', feedback: 'Red clamp attached to dead battery positive terminal.', isCorrect: true, correctOrder: 2 },
        { id: 'jump-4', label: 'Connect RED to good battery (+)', icon: '❤️', feedback: 'Red clamp attached to good battery positive terminal.', isCorrect: true, correctOrder: 3 },
        { id: 'jump-5', label: 'Connect BLACK to good battery (-)', icon: '⚫', feedback: 'Black clamp attached to good battery negative terminal.', isCorrect: true, correctOrder: 4 },
        { id: 'jump-6', label: 'Connect BLACK to engine ground', icon: '⬛', feedback: 'Black clamp attached to unpainted metal. NOT the dead battery!', isCorrect: true, correctOrder: 5 },
        { id: 'jump-7', label: 'Start the good car, then dead car', icon: '🚙', feedback: 'Success! The dead car is running.', isCorrect: true, correctOrder: 6 },
        // Distractors
        { id: 'jump-d1', label: 'Connect BLACK to dead battery (-)', icon: '💀', feedback: undefined, isCorrect: false },
        { id: 'jump-d2', label: 'Rev engine immediately', icon: '🏎️', feedback: undefined, isCorrect: false },
        { id: 'jump-d3', label: 'Connect cables while car running', icon: '⚠️', feedback: undefined, isCorrect: false },
      ],
    },
      // 3. Git Deployment Workflow
  {
    id: 'sample-git',
    title: 'Git Deployment Workflow',
    description: 'Deploy a new feature to production following proper Git workflow. Skipping steps could cause conflicts or downtime.',
    startingPoint: 'You\'ve finished coding a new feature on your local machine. It\'s time to get it into production.',
    endingPoint: 'Your feature is live in production, reviewed, tested, and properly merged.',
    maxSteps: 7,
    isBuiltIn: true,
    actions: [
      { id: 'git-1', label: 'Pull latest from main', icon: '⬇️', feedback: 'Local repo updated. No conflicts with remote.', isCorrect: true, correctOrder: 0 },
      { id: 'git-2', label: 'Create feature branch', icon: '🌿', feedback: 'Branch "feature/new-feature" created.', isCorrect: true, correctOrder: 1 },
      { id: 'git-3', label: 'Commit your changes', icon: '💾', feedback: 'Changes committed with descriptive message.', isCorrect: true, correctOrder: 2 },
      { id: 'git-4', label: 'Push to remote', icon: '⬆️', feedback: 'Branch pushed to origin successfully.', isCorrect: true, correctOrder: 3 },
      { id: 'git-5', label: 'Open pull request', icon: '📝', feedback: 'PR opened. Waiting for review.', isCorrect: true, correctOrder: 4 },
      { id: 'git-6', label: 'Get code review approval', icon: '✅', feedback: 'Code review passed! Ready to merge.', isCorrect: true, correctOrder: 5 },
      { id: 'git-7', label: 'Merge to main', icon: '🔀', feedback: 'Merged! CI/CD deploying to production.', isCorrect: true, correctOrder: 6 },
      // Distractors
      { id: 'git-d1', label: 'Push directly to main', icon: '🚫', feedback: undefined, isCorrect: false },
      { id: 'git-d2', label: 'Force push to override', icon: '💥', feedback: undefined, isCorrect: false },
      { id: 'git-d3', label: 'Skip code review', icon: '🙈', feedback: undefined, isCorrect: false },
    ],
  },

  // 4. Lab Chemical Spill Cleanup
  {
    id: 'sample-labspill',
    title: 'Lab Chemical Spill Cleanup',
    description: 'A beaker of acid has spilled in the laboratory. Follow proper safety protocol to clean it up.',
    startingPoint: 'A beaker containing dilute hydrochloric acid has tipped over, spilling onto the lab bench.',
    endingPoint: 'The spill has been safely neutralized, cleaned up, and properly disposed of.',
    maxSteps: 6,
    isBuiltIn: true,
    actions: [
      { id: 'lab-1', label: 'Alert others in the area', icon: '🗣️', feedback: 'Everyone nearby has been warned. Area being cleared.', isCorrect: true, correctOrder: 0 },
      { id: 'lab-2', label: 'Put on PPE (gloves, goggles)', icon: '🥽', feedback: 'Personal protective equipment on. You are protected.', isCorrect: true, correctOrder: 1 },
      { id: 'lab-3', label: 'Contain the spill', icon: '🛑', feedback: 'Absorbent barriers placed. Spill contained.', isCorrect: true, correctOrder: 2 },
      { id: 'lab-4', label: 'Neutralize with baking soda', icon: '⚗️', feedback: 'Acid neutralized. No more bubbling reaction.', isCorrect: true, correctOrder: 3 },
      { id: 'lab-5', label: 'Absorb with paper towels', icon: '🧻', feedback: 'Liquid absorbed. Surface wiped clean.', isCorrect: true, correctOrder: 4 },
      { id: 'lab-6', label: 'Dispose in hazardous waste', icon: '☣️', feedback: 'Waste properly disposed. Document the incident.', isCorrect: true, correctOrder: 5 },
      // Distractors
      { id: 'lab-d1', label: 'Wipe with bare hands', icon: '🤚', feedback: undefined, isCorrect: false },
      { id: 'lab-d2', label: 'Rinse down the drain', icon: '🚿', feedback: undefined, isCorrect: false },
      { id: 'lab-d3', label: 'Leave it to evaporate', icon: '💨', feedback: undefined, isCorrect: false },
    ],
  },
];
