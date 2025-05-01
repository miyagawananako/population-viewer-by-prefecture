export const BASE_URL = 'https://yumemi-frontend-engineer-codecheck-api.vercel.app';

export const POPULATION_TYPES = ['総人口', '年少人口', '生産年齢人口', '老年人口'] as const;
export type PopulationType = (typeof POPULATION_TYPES)[number];

export const STYLES = {
  colors: {
    primary: '#4CAF50',
    primaryHover: '#45a049',
    background: '#f5f5f5',
    text: '#333',
    border: '#ddd',
    hover: '#f0f0f0',
    error: '#ff6b6b',
    buttonInactive: '#cccccc',
    buttonInactiveHover: '#b3b3b3',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
  },
  fontSize: {
    small: '12px',
    medium: '16px',
    large: '24px',
  },
  breakpoints: {
    xl: '1200px',
    lg: '900px',
    md: '700px',
    sm: '500px',
  },
} as const;

export const STORAGE_KEYS = {
  SELECTED_PREFS: 'selectedPrefs',
} as const;
