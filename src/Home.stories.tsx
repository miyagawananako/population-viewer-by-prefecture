import { Meta, StoryFn } from '@storybook/react';
import { Home } from './Home';
import { useState, useEffect } from 'react';
import { PopulationComposition } from './type';

const meta: Meta<typeof Home> = {
  component: Home,
};

export default meta;

const populationData1 = [
  { year: 1970, value: 1000000 },
  { year: 1980, value: 1010000 },
  { year: 1990, value: 1020000 },
  { year: 2000, value: 1030000 },
  { year: 2010, value: 1040000 },
  { year: 2020, value: 1050000 },
];

const populationData2 = populationData1.map((item) => ({
  ...item,
  value: item.value + 100000,
}));

const populationData3 = populationData1.map((item) => ({
  ...item,
  value: item.value + 200000,
}));

const populationData4 = populationData1.map((item) => ({
  ...item,
  value: item.value + 300000,
}));

const populationBaseData = [
  {
    prefCode: 1,
    data: {
      総人口: populationData1,
      年少人口: populationData1,
      生産年齢人口: populationData1,
      老年人口: populationData1,
    },
  },
  {
    prefCode: 2,
    data: {
      総人口: populationData2,
      年少人口: populationData2,
      生産年齢人口: populationData2,
      老年人口: populationData2,
    },
  },
  {
    prefCode: 3,
    data: {
      総人口: populationData3,
      年少人口: populationData3,
      生産年齢人口: populationData3,
      老年人口: populationData3,
    },
  },
  {
    prefCode: 4,
    data: {
      総人口: populationData4,
      年少人口: populationData4,
      生産年齢人口: populationData4,
      老年人口: populationData4,
    },
  },
];

const Template: StoryFn<typeof Home> = (args) => {
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);
  const [populationData, setPopulationData] = useState<PopulationComposition[]>([]);

  useEffect(() => {
    setPopulationData(populationBaseData.filter((item) => selectedPrefs.includes(item.prefCode)));
  }, [selectedPrefs]);

  return (
    <Home
      {...args}
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
      isPrefecturesLoading={false}
      isPopulationLoading={false}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Error = Template.bind({});
Error.args = {
  error: 'エラーが発生しました',
};
