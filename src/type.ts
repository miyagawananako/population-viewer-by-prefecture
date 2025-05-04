export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PopulationData = {
  year: number;
  value: number;
};

export type PopulationType = '総人口' | '年少人口' | '生産年齢人口' | '老年人口';

export type PopulationComposition = {
  prefCode: number;
  data: {
    [key in PopulationType]: PopulationData[];
  };
};
