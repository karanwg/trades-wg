import { SequencingQuestion } from './types';

export const QUESTIONS: Record<string, SequencingQuestion> = {
  // Cooking Theme - Make Ramen
  cooking: {
    id: 'make-ramen',
    theme: 'cooking',
    title: 'Make Perfect Ramen',
    description: 'Arrange the steps to cook instant ramen in the correct order.',
    correctSequence: [
      { id: 'boil-water', label: 'Boil water', icon: '💧' },
      { id: 'add-noodles', label: 'Add noodles', icon: '🍜' },
      { id: 'simmer', label: 'Simmer 3 minutes', icon: '⏱️' },
      { id: 'add-seasoning', label: 'Add seasoning packet', icon: '🧂' },
      { id: 'serve', label: 'Serve in bowl', icon: '🥢' },
    ],
    distractors: [
      { id: 'fry-noodles', label: 'Fry the noodles', icon: '🍳' },
      { id: 'add-ice', label: 'Add ice cubes', icon: '🧊' },
      { id: 'microwave', label: 'Microwave dry', icon: '📻' },
    ],
  },

  // HVAC Theme - Replace Capacitor
  hvac: {
    id: 'replace-capacitor',
    theme: 'hvac',
    title: 'Replace Run Capacitor',
    description: 'Complete the steps to safely replace a faulty run capacitor.',
    correctSequence: [
      { id: 'power-off', label: 'Turn off power', icon: '🔴', category: 'safety' },
      { id: 'discharge', label: 'Discharge capacitor', icon: '⚡', category: 'safety' },
      { id: 'measure', label: 'Measure capacitance', icon: '📊', category: 'diagnose' },
      { id: 'remove-old', label: 'Remove old capacitor', icon: '🔧', category: 'repair' },
      { id: 'install-new', label: 'Install new capacitor', icon: '✅', category: 'repair' },
      { id: 'power-on', label: 'Restore power', icon: '🟢', category: 'test' },
    ],
    distractors: [
      { id: 'power-first', label: 'Turn on power first', icon: '⚠️' },
      { id: 'skip-discharge', label: 'Skip discharge step', icon: '💀' },
      { id: 'add-oil', label: 'Add compressor oil', icon: '🛢️' },
    ],
    feedbackConfig: {
      type: 'multimeter',
      initialReading: {
        display: '---',
        value: 0,
        unit: 'µF',
        status: 'normal',
        description: 'Connect probes to measure',
      },
      readings: {
        0: {
          display: '240',
          value: 240,
          unit: 'V AC',
          status: 'danger',
          description: 'Live voltage detected!',
        },
        1: {
          display: '0.0',
          value: 0,
          unit: 'V DC',
          status: 'normal',
          description: 'Capacitor safely discharged',
        },
        2: {
          display: '12.3',
          value: 12.3,
          unit: 'µF',
          status: 'warning',
          description: 'Low capacitance - faulty!',
        },
        3: {
          display: '---',
          value: 0,
          unit: '',
          status: 'normal',
          description: 'Capacitor removed',
        },
        4: {
          display: '45.2',
          value: 45.2,
          unit: 'µF',
          status: 'normal',
          description: 'New capacitor installed',
        },
        5: {
          display: '4.8',
          value: 4.8,
          unit: 'A',
          status: 'normal',
          description: 'Normal operating current',
        },
      },
    },
  },

  // Piano Theme - Tune Middle C
  piano: {
    id: 'tune-middle-c',
    theme: 'piano',
    title: 'Tune Middle C',
    description: 'Follow the correct sequence to tune the middle C (C4) string.',
    correctSequence: [
      { id: 'strike-key', label: 'Strike the key', icon: '🎹', category: 'diagnose' },
      { id: 'listen-pitch', label: 'Listen to pitch', icon: '👂', category: 'diagnose' },
      { id: 'insert-lever', label: 'Insert tuning lever', icon: '🔧', category: 'prepare' },
      { id: 'adjust-pin', label: 'Turn tuning pin', icon: '🔄', category: 'adjust' },
      { id: 'check-tuner', label: 'Check with tuner', icon: '📊', category: 'verify' },
      { id: 'fine-adjust', label: 'Fine adjustment', icon: '✨', category: 'adjust' },
    ],
    distractors: [
      { id: 'replace-string', label: 'Replace the string', icon: '🎸' },
      { id: 'tighten-all', label: 'Tighten all pins', icon: '⚠️' },
      { id: 'use-hammer', label: 'Hit with hammer', icon: '🔨' },
    ],
    feedbackConfig: {
      type: 'tuner',
      initialReading: {
        display: '---',
        value: 0,
        unit: 'Hz',
        status: 'normal',
        description: 'Strike a key to begin',
      },
      readings: {
        0: {
          display: '254',
          value: 254,
          unit: 'Hz',
          status: 'warning',
          description: 'C4 is flat (-8 cents)',
        },
        1: {
          display: '254',
          value: 254,
          unit: 'Hz',
          status: 'warning',
          description: 'Pitch is 8 cents flat',
        },
        2: {
          display: '---',
          value: 0,
          unit: 'Hz',
          status: 'normal',
          description: 'Lever positioned',
        },
        3: {
          display: '259',
          value: 259,
          unit: 'Hz',
          status: 'warning',
          description: 'Getting closer (-3 cents)',
        },
        4: {
          display: '261',
          value: 261,
          unit: 'Hz',
          status: 'warning',
          description: 'Almost there (-1 cent)',
        },
        5: {
          display: '261.63',
          value: 261.63,
          unit: 'Hz',
          status: 'normal',
          description: 'Perfect! C4 = 261.63 Hz',
        },
      },
    },
  },
};

export const getQuestion = (themeId: string): SequencingQuestion => {
  return QUESTIONS[themeId] || QUESTIONS.cooking;
};

export const getAllQuestions = (): SequencingQuestion[] => {
  return Object.values(QUESTIONS);
};
