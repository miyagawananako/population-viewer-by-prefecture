import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PrefectureListComponent from './components/PrefectureList';
import PopulationDataContainer from './components/PopulationDataContainer';

interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface PrefectureResponse {
  message: string | null;
  result: Prefecture[];
}

interface PopulationData {
  year: number;
  value: number;
}

interface PopulationComposition {
  prefCode: number;
  data: PopulationData[];
}

interface PopulationResponse {
  message: string | null;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: PopulationData[];
    }[];
  };
}

const BASE_URL = 'https://yumemi-frontend-engineer-codecheck-api.vercel.app';

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
    const savedPrefs = localStorage.getItem('selectedPrefs');
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
    localStorage.setItem('selectedPrefs', JSON.stringify(selectedPrefs));

    const fetchPopulationData = async () => {
      try {
        const newPopulationData = await Promise.all(
          selectedPrefs.map(async (prefCode) => {
            const response = await fetchPopulationComposition(prefCode);
            return {
              prefCode,
              data: response.result.data[0].data,
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

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <AppContainer>
      <PrefectureListComponent
        prefectures={prefectures}
        selectedPrefs={selectedPrefs}
        onCheckboxChange={handleCheckboxChange}
      />
      {populationData.length > 0 && (
        <PopulationDataContainer populationData={populationData} prefectures={prefectures} />
      )}
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 1rem;
`;
