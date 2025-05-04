import { Meta, StoryFn } from '@storybook/react';
import { Home } from './Home';
import { useState, useEffect } from 'react';
import { PopulationComposition } from './App';

const meta: Meta<typeof Home> = {
  component: Home,
};

export default meta;

const data = [
  { year: 1970, value: 1000000 },
  { year: 1980, value: 1010000 },
  { year: 1990, value: 1020000 },
  { year: 2000, value: 1030000 },
  { year: 2010, value: 1040000 },
  { year: 2020, value: 1050000 },
];

const data2 = data.map((item) => ({
  ...item,
  value: item.value + 100000,
}));

const data3 = data.map((item) => ({
  ...item,
  value: item.value + 200000,
}));

const data4 = data.map((item) => ({
  ...item,
  value: item.value + 300000,
}));

const populationBaseData = [
  {
    prefCode: 1,
    data: {
      総人口: data,
      年少人口: data,
      生産年齢人口: data,
      老年人口: data,
    },
  },
  {
    prefCode: 2,
    data: {
      総人口: data2,
      年少人口: data2,
      生産年齢人口: data2,
      老年人口: data2,
    },
  },
  {
    prefCode: 3,
    data: {
      総人口: data3,
      年少人口: data3,
      生産年齢人口: data3,
      老年人口: data3,
    },
  },
  {
    prefCode: 4,
    data: {
      総人口: data4,
      年少人口: data4,
      生産年齢人口: data4,
      老年人口: data4,
    },
  },
];

const Template: StoryFn<typeof Home> = () => {
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);
  const [populationData, setPopulationData] = useState<PopulationComposition[]>([]);

  useEffect(() => {
    setPopulationData(populationBaseData.filter((item) => selectedPrefs.includes(item.prefCode)));
  }, [selectedPrefs]);

  return (
    <Home
      prefectures={[
        {
          prefCode: 1,
          prefName: '北海道',
        },
        {
          prefCode: 2,
          prefName: '青森県',
        },
        {
          prefCode: 3,
          prefName: '岩手県',
        },
        {
          prefCode: 4,
          prefName: '宮城県',
        },
      ]}
      selectedPrefs={selectedPrefs}
      populationData={populationData}
      onCheckboxChange={(prefCode: number) => {
        setSelectedPrefs((prev) =>
          prev.includes(prefCode) ? prev.filter((code) => code !== prefCode) : [...prev, prefCode]
        );
      }}
      error={null}
    />
  );
};

export const Default = Template.bind({});

Default.args = {};
