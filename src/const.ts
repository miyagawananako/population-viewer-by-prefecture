export const BASE_URL = 'https://yumemi-frontend-engineer-codecheck-api.vercel.app';

export const POPULATION_TYPES = ['総人口', '年少人口', '生産年齢人口', '老年人口'] as const;
export type PopulationType = (typeof POPULATION_TYPES)[number];

export const STORAGE_KEYS = {
  SELECTED_PREFS: 'selectedPrefs',
} as const;
