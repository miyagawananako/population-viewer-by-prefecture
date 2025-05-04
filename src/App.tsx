import React, { useEffect, useState } from 'react';
import { Home } from './Home';
import { BASE_URL, STORAGE_KEYS } from './const';
import {
  Prefecture,
  PrefectureResponse,
  PopulationType,
  PopulationComposition,
  PopulationResponse,
} from './type';

// export interface Prefecture {
//   prefCode: number;
//   prefName: string;
// }

// interface PrefectureResponse {
//   message: string | null;
//   result: Prefecture[];
// }

// interface PopulationData {
//   year: number;
//   value: number;
// }

// export type PopulationType = '総人口' | '年少人口' | '生産年齢人口' | '老年人口';

// export interface PopulationComposition {
//   prefCode: number;
//   data: {
//     [key in PopulationType]: PopulationData[];
//   };
// }

// interface PopulationResponse {
//   message: string | null;
//   result: {
//     boundaryYear: number;
//     data: {
//       label: string;
//       data: PopulationData[];
//     }[];
//   };
// }

const fetchPrefectures = async (): Promise<PrefectureResponse> => {
  const apiKey = process.env.REACT_APP_API_KEY;

  if (!apiKey) {
    throw new Error('APIキーが設定されていません');
  }

  const response = await fetch(`${BASE_URL}/api/v1/prefectures`, {
    headers: {
      'X-API-KEY': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error('都道府県データの取得に失敗しました');
  }

  return response.json();
};

const fetchPopulationComposition = async (prefCode: number): Promise<PopulationResponse> => {
  const apiKey = process.env.REACT_APP_API_KEY;

  if (!apiKey) {
    throw new Error('APIキーが設定されていません');
  }

  const response = await fetch(
    `${BASE_URL}/api/v1/population/composition/perYear?prefCode=${prefCode}`,
    {
      headers: {
        'X-API-KEY': apiKey,
      },
    }
  );

  if (!response.ok) {
    throw new Error('人口構成データの取得に失敗しました');
  }

  return response.json();
};

const App: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>(() => {
    const savedPrefs = localStorage.getItem(STORAGE_KEYS.SELECTED_PREFS);
    return savedPrefs ? JSON.parse(savedPrefs) : [];
  });
  const [populationData, setPopulationData] = useState<PopulationComposition[]>([]);

  useEffect(() => {
    const loadPrefectures = async () => {
      try {
        const response = await fetchPrefectures();
        setPrefectures(response.result);
      } catch (err) {
        setError('都道府県データの取得に失敗しました');
      }
    };

    loadPrefectures();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_PREFS, JSON.stringify(selectedPrefs));

    const fetchPopulationData = async () => {
      try {
        const newPopulationData = await Promise.all(
          selectedPrefs.map(async (prefCode) => {
            const response = await fetchPopulationComposition(prefCode);
            const populationTypes: PopulationType[] = [
              '総人口',
              '年少人口',
              '生産年齢人口',
              '老年人口',
            ];
            const data: PopulationComposition['data'] = {} as PopulationComposition['data'];

            response.result.data.forEach((item, index) => {
              if (index < populationTypes.length) {
                data[populationTypes[index]] = item.data;
              }
            });

            return {
              prefCode,
              data,
            };
          })
        );
        setPopulationData(newPopulationData);
      } catch (err) {
        setError('人口構成データの取得に失敗しました');
      }
    };

    if (selectedPrefs.length > 0) {
      fetchPopulationData();
    } else {
      setPopulationData([]);
    }
  }, [selectedPrefs]);

  const handleCheckboxChange = (prefCode: number) => {
    setSelectedPrefs((prev) =>
      prev.includes(prefCode) ? prev.filter((code) => code !== prefCode) : [...prev, prefCode]
    );
  };

  return (
    <Home
      prefectures={prefectures}
      selectedPrefs={selectedPrefs}
      populationData={populationData}
      onCheckboxChange={handleCheckboxChange}
      error={error}
    />
  );
};

export default App;
