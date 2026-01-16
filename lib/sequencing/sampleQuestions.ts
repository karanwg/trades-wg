import { SequencingQuestion } from './types';

export const SAMPLE_QUESTIONS: SequencingQuestion[] = [
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

  // 2. Jump-Starting a Car
  {
    id: 'sample-jumpstart',
    title: 'Jump-Starting a Car',
    description: 'Your car battery is dead. Connect jumper cables correctly to avoid sparks or damage.',
    startingPoint: 'Your car won\'t start - the battery is completely dead. A helpful neighbor has pulled up with jumper cables.',
    endingPoint: 'Your car is running and you can drive to get the battery checked or replaced.',
    maxSteps: 7,
    isBuiltIn: true,
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

  // 5. HVAC Capacitor Replacement
  {
    id: 'sample-hvac',
    title: 'Replace Run Capacitor',
    description: 'The AC unit is not cooling and the capacitor needs replacement. Follow electrical safety procedures.',
    startingPoint: 'The outdoor AC unit hums but neither the compressor nor condenser fan starts. Diagnosis: faulty run capacitor.',
    endingPoint: 'New capacitor installed. AC unit cooling normally with proper current draw.',
    maxSteps: 6,
    isBuiltIn: true,
    actions: [
      { id: 'hvac-1', label: 'Turn off power at breaker', icon: '🔴', feedback: 'Power disconnected at main breaker. Verify with meter.', isCorrect: true, correctOrder: 0 },
      { id: 'hvac-2', label: 'Discharge the capacitor', icon: '⚡', feedback: 'Capacitor discharged safely. No stored energy.', isCorrect: true, correctOrder: 1 },
      { id: 'hvac-3', label: 'Measure capacitance', icon: '📊', feedback: 'Reading: 12.3 µF. Rated: 45 µF. Confirmed faulty!', isCorrect: true, correctOrder: 2 },
      { id: 'hvac-4', label: 'Remove old capacitor', icon: '🔧', feedback: 'Old capacitor removed. Note wire positions.', isCorrect: true, correctOrder: 3 },
      { id: 'hvac-5', label: 'Install new capacitor', icon: '✅', feedback: 'New capacitor installed. Wires connected correctly.', isCorrect: true, correctOrder: 4 },
      { id: 'hvac-6', label: 'Restore power and test', icon: '🟢', feedback: 'System running! Current draw: 4.8A - normal.', isCorrect: true, correctOrder: 5 },
      // Distractors
      { id: 'hvac-d1', label: 'Work with power on', icon: '💀', feedback: undefined, isCorrect: false },
      { id: 'hvac-d2', label: 'Skip discharge step', icon: '⚠️', feedback: undefined, isCorrect: false },
      { id: 'hvac-d3', label: 'Use wrong capacitance value', icon: '❌', feedback: undefined, isCorrect: false },
    ],
  },

  // 6. Cooking - Make Ramen
  {
    id: 'sample-cooking',
    title: 'Make Perfect Ramen',
    description: 'Prepare a delicious bowl of instant ramen. Order matters for the best texture and flavor!',
    startingPoint: 'You\'re hungry and have a packet of instant ramen. Time to make the perfect bowl.',
    endingPoint: 'A steaming bowl of perfectly cooked ramen is ready to enjoy!',
    maxSteps: 5,
    isBuiltIn: true,
    actions: [
      { id: 'cook-1', label: 'Boil water', icon: '💧', feedback: 'Water is boiling. Ready for noodles!', isCorrect: true, correctOrder: 0 },
      { id: 'cook-2', label: 'Add noodles to pot', icon: '🍜', feedback: 'Noodles added. They\'re softening up.', isCorrect: true, correctOrder: 1 },
      { id: 'cook-3', label: 'Cook for 3 minutes', icon: '⏱️', feedback: 'Timer done! Noodles are perfectly al dente.', isCorrect: true, correctOrder: 2 },
      { id: 'cook-4', label: 'Add seasoning packet', icon: '🧂', feedback: 'Seasoning dissolved. Smells amazing!', isCorrect: true, correctOrder: 3 },
      { id: 'cook-5', label: 'Serve in bowl', icon: '🥢', feedback: 'Ramen served! Enjoy your meal.', isCorrect: true, correctOrder: 4 },
      // Distractors
      { id: 'cook-d1', label: 'Add noodles to cold water', icon: '🥶', feedback: undefined, isCorrect: false },
      { id: 'cook-d2', label: 'Microwave the packet', icon: '📻', feedback: undefined, isCorrect: false },
      { id: 'cook-d3', label: 'Add seasoning before cooking', icon: '❓', feedback: undefined, isCorrect: false },
    ],
  },
];
