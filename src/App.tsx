import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface PrefectureResponse {
  message: string | null;
  result: Prefecture[];
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

const App: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>(() => {
    const savedPrefs = localStorage.getItem('selectedPrefs');
    return savedPrefs ? JSON.parse(savedPrefs) : [];
  });

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
      <AppHeader>
        <Title>都道府県一覧</Title>
        <PrefectureList>
          {prefectures.map((pref) => (
            <PrefectureItem key={pref.prefCode}>
              <Checkbox
                type="checkbox"
                id={`pref-${pref.prefCode}`}
                checked={selectedPrefs.includes(pref.prefCode)}
                onChange={() => handleCheckboxChange(pref.prefCode)}
              />
              <Label htmlFor={`pref-${pref.prefCode}`}>{pref.prefName}</Label>
            </PrefectureItem>
          ))}
        </PrefectureList>
      </AppHeader>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const PrefectureList = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  width: 90%;
  max-width: 1200px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PrefectureItem = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

const Label = styled.label`
  cursor: pointer;
  flex: 1;
  text-align: left;
  font-size: 1rem;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 1rem;
`;
