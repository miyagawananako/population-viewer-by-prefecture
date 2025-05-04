export const BASE_URL = 'https://yumemi-frontend-engineer-codecheck-api.vercel.app';

export const POPULATION_TYPES = ['総人口', '年少人口', '生産年齢人口', '老年人口'] as const;
export type PopulationType = (typeof POPULATION_TYPES)[number];

export const STYLES = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    white: '#ffffff',
    background: '#f8f9fa',
    border: '#dee2e6',
    hover: '#e9ecef',
    tableBackground: '#f8f9fa',
    tableRowOdd: '#f8f9fa',
    tableRowHover: '#e9ecef',
    text: '#333',
    error: '#ff6b6b',
    buttonInactive: '#cccccc',
    buttonInactiveHover: '#b3b3b3',
  },
  size: {
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
