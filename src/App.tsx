import React, { useEffect, useState } from 'react';
import { Home } from './Home';
import { STORAGE_KEYS } from './const';
import { Prefecture, PopulationType, PopulationComposition } from './type';
import { fetchPrefectures, fetchPopulationComposition } from './api/prefectureApi';

const App: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPrefecturesLoading, setIsPrefecturesLoading] = useState<boolean>(false);
  const [isPopulationLoading, setIsPopulationLoading] = useState<boolean>(false);
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>(() => {
    const savedPrefs = localStorage.getItem(STORAGE_KEYS.SELECTED_PREFS);
    return savedPrefs ? JSON.parse(savedPrefs) : [];
  });
  const [populationData, setPopulationData] = useState<PopulationComposition[]>([]);

  useEffect(() => {
    const loadPrefectures = async () => {
      try {
        setIsPrefecturesLoading(true);
        const response = await fetchPrefectures();
        setPrefectures(response.result);
      } catch (err) {
        setError('都道府県データの取得に失敗しました');
      } finally {
        setIsPrefecturesLoading(false);
      }
    };

    loadPrefectures();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_PREFS, JSON.stringify(selectedPrefs));

    const fetchPopulationData = async () => {
      if (selectedPrefs.length === 0) {
        setPopulationData([]);
        return;
      }

      try {
        setIsPopulationLoading(true);
        const newPopulationData = await Promise.all(
          selectedPrefs.map(async (prefCode) => {
            const response = await fetchPopulationComposition(prefCode);
            const populationTypes: PopulationType[] = [
              '総人口',
              '年少人口',
              '生産年齢人口',
              '老年人口',
            ];
            const data: PopulationComposition['data'] = {
              総人口: [],
              年少人口: [],
              生産年齢人口: [],
              老年人口: [],
            };

            response.result.data.forEach(
              (item: { label: string; data: { year: number; value: number }[] }, index: number) => {
                if (index < populationTypes.length) {
                  data[populationTypes[index]] = item.data;
                }
              }
            );

            return {
              prefCode,
              data,
            };
          })
        );
        setPopulationData(newPopulationData);
      } catch (err) {
        setError('人口構成データの取得に失敗しました');
      } finally {
        setIsPopulationLoading(false);
      }
    };

    fetchPopulationData();
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
      isPrefecturesLoading={isPrefecturesLoading}
      isPopulationLoading={isPopulationLoading}
    />
  );
};

export default App;
