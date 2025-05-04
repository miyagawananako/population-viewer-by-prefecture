import { BASE_URL } from '../const';
import { Prefecture, PopulationData } from '../type';

type PrefectureResponse = {
  message: string | null;
  result: Prefecture[];
};

type PopulationResponse = {
  message: string | null;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: PopulationData[];
    }[];
  };
};

export const fetchPrefectures = async (): Promise<PrefectureResponse> => {
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

export const fetchPopulationComposition = async (prefCode: number): Promise<PopulationResponse> => {
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
