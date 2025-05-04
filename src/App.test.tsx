import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { BASE_URL, POPULATION_TYPES } from './const';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

const mockPrefectures = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' },
];

const mockPopulationData = {
  result: {
    boundaryYear: 2020,
    data: POPULATION_TYPES.map((label) => ({
      label,
      data: [
        { year: 2020, value: 1000000 },
        { year: 2021, value: 1010000 },
      ],
    })),
  },
};

const mockFetch = jest.fn();
global.fetch = mockFetch;

process.env.REACT_APP_API_KEY = 'test-api-key';

beforeEach(() => {
  localStorage.clear();
  mockFetch.mockClear();
  mockFetch.mockImplementation((url) => {
    if (url.includes('/prefectures')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ result: mockPrefectures }),
      });
    }
    if (url.includes('/population')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPopulationData),
      });
    }
    return Promise.reject(new Error('Unknown URL'));
  });
});

test('都道府県一覧のタイトルが表示される', async () => {
  render(<App />);
  const titleElement = screen.getByText(/都道府県一覧/i);
  expect(titleElement).toBeInTheDocument();
});

test('都道府県のチェックボックスが表示される', async () => {
  render(<App />);

  await waitFor(() => {
    mockPrefectures.forEach((pref) => {
      const checkbox = screen.getByLabelText(pref.prefName);
      expect(checkbox).toBeInTheDocument();
    });
  });

  mockPrefectures.forEach((pref) => {
    const checkbox = screen.getByLabelText(pref.prefName);
    expect(checkbox).not.toBeChecked();
  });
});

test('都道府県のチェックボックスをクリックすると選択状態が切り替わる', async () => {
  render(<App />);

  await waitFor(() => {
    const checkbox = screen.getByLabelText(mockPrefectures[0].prefName);
    expect(checkbox).toBeInTheDocument();
  });

  const checkbox = screen.getByLabelText(mockPrefectures[0].prefName);
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

test('選択した都道府県がローカルストレージに保存される', async () => {
  render(<App />);

  await waitFor(() => {
    const checkbox = screen.getByLabelText(mockPrefectures[0].prefName);
    expect(checkbox).toBeInTheDocument();
  });

  const checkbox = screen.getByLabelText(mockPrefectures[0].prefName);
  fireEvent.click(checkbox);

  const savedPrefs = JSON.parse(localStorage.getItem('selectedPrefs') || '[]');
  expect(savedPrefs).toContain(1);
});

test('ローカルストレージから都道府県の選択状態が復元される', async () => {
  localStorage.setItem('selectedPrefs', JSON.stringify([mockPrefectures[0].prefCode]));

  render(<App />);

  await waitFor(() => {
    const checkbox = screen.getByLabelText(mockPrefectures[0].prefName);
    expect(checkbox).toBeChecked();
  });
});

test('APIエラー時にエラーメッセージが表示される', async () => {
  mockFetch.mockImplementationOnce(() => Promise.reject(new Error('API Error')));

  render(<App />);

  await waitFor(() => {
    const errorMessage = screen.getByText(/都道府県データの取得に失敗しました/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

test('都道府県を選択すると人口構成データが取得される', async () => {
  render(<App />);

  await waitFor(() => {
    const checkbox = screen.getByLabelText(mockPrefectures[0].prefName);
    expect(checkbox).toBeInTheDocument();
  });

  const checkbox = screen.getByLabelText(mockPrefectures[0].prefName);
  fireEvent.click(checkbox);

  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_URL}/api/v1/population/composition/perYear?prefCode=${mockPrefectures[0].prefCode}`,
      expect.any(Object)
    );
  });
});

test('人口構成データの取得に失敗した場合、エラーメッセージが表示される', async () => {
  mockFetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ result: mockPrefectures }),
    })
  );

  mockFetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
      status: 500,
    })
  );

  render(<App />);

  await waitFor(() => {
    const checkbox = screen.getByLabelText(mockPrefectures[0].prefName);
    expect(checkbox).toBeInTheDocument();
  });

  const checkbox = screen.getByLabelText(mockPrefectures[0].prefName);
  fireEvent.click(checkbox);

  await waitFor(() => {
    const errorMessage = screen.getByText(/人口構成データの取得に失敗しました/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

test('人口データの種類を切り替えることができる', async () => {
  render(<App />);

  await waitFor(() => {
    const checkbox = screen.getByLabelText(mockPrefectures[0].prefName);
    expect(checkbox).toBeInTheDocument();
  });

  const checkbox = screen.getByLabelText(mockPrefectures[0].prefName);
  fireEvent.click(checkbox);

  await waitFor(() => {
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  const select = screen.getByRole('combobox');

  POPULATION_TYPES.forEach(async (type) => {
    fireEvent.change(select, { target: { value: type } });
    expect(select).toHaveValue(type);
  });
});
