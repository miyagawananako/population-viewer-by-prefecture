import { mockPrefectures } from './prefectures';
import { PopulationComposition } from '../type';

const createPopulationData = (prefCode: number): PopulationComposition => {
  const baseValue = 1000000 + prefCode * 10000;
  return {
    prefCode,
    data: {
      総人口: [
        { year: 1970, value: baseValue },
        { year: 1980, value: baseValue + 10000 },
        { year: 1990, value: baseValue + 20000 },
        { year: 2000, value: baseValue + 30000 },
        { year: 2010, value: baseValue + 40000 },
        { year: 2020, value: baseValue + 50000 },
      ],
      年少人口: [
        { year: 1970, value: baseValue * 0.2 },
        { year: 1980, value: baseValue * 0.18 },
        { year: 1990, value: baseValue * 0.16 },
        { year: 2000, value: baseValue * 0.14 },
        { year: 2010, value: baseValue * 0.12 },
        { year: 2020, value: baseValue * 0.1 },
      ],
      生産年齢人口: [
        { year: 1970, value: baseValue * 0.7 },
        { year: 1980, value: baseValue * 0.75 },
        { year: 1990, value: baseValue * 0.8 },
        { year: 2000, value: baseValue * 0.85 },
        { year: 2010, value: baseValue * 0.9 },
        { year: 2020, value: baseValue * 0.95 },
      ],
      老年人口: [
        { year: 1970, value: baseValue * 0.1 },
        { year: 1980, value: baseValue * 0.12 },
        { year: 1990, value: baseValue * 0.14 },
        { year: 2000, value: baseValue * 0.16 },
        { year: 2010, value: baseValue * 0.18 },
        { year: 2020, value: baseValue * 0.2 },
      ],
    },
  };
};

export const mockPopulationData = createPopulationData(1);

export const mockPopulationDataByPrefCode: Record<number, PopulationComposition> =
  Object.fromEntries(
    mockPrefectures.map((pref) => [pref.prefCode, createPopulationData(pref.prefCode)])
  ) as Record<number, PopulationComposition>;
