import { Theme } from './types';

export const THEMES: Record<string, Theme> = {
  cooking: {
    id: 'cooking',
    name: 'Cooking',
    icon: '🍜',
    bgGradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6b35 50%, #e84118 100%)',
    bgEmoji: '🍜',
    hasFeedbackPanel: false,
  },
  hvac: {
    id: 'hvac',
    name: 'HVAC Maintenance',
    icon: '❄️',
    bgGradient: 'linear-gradient(135deg, #00d4aa 0%, #00b894 50%, #0984e3 100%)',
    bgEmoji: '❄️',
    hasFeedbackPanel: true,
    feedbackType: 'multimeter',
  },
  piano: {
    id: 'piano',
    name: 'Piano Repair',
    icon: '🎹',
    bgGradient: 'linear-gradient(135deg, #c9a857 0%, #8b6914 50%, #5d4e37 100%)',
    bgEmoji: '🎹',
    hasFeedbackPanel: true,
    feedbackType: 'tuner',
  },
};

export const getTheme = (id: string): Theme => {
  return THEMES[id] || THEMES.cooking;
};

export const getAllThemes = (): Theme[] => {
  return Object.values(THEMES);
};
