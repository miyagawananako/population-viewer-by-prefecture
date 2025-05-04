import { Meta, StoryFn } from '@storybook/react';
import { Home } from './Home';
import { useState, useEffect } from 'react';
import { PopulationComposition } from './type';
import { mockPrefectures } from './mocks/prefectures';
import { mockPopulationDataByPrefCode } from './mocks/populationData';

const meta: Meta<typeof Home> = {
  component: Home,
};

export default meta;

const Template: StoryFn<typeof Home> = (args) => {
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);
  const [populationData, setPopulationData] = useState<PopulationComposition[]>([]);

  useEffect(() => {
    setPopulationData(selectedPrefs.map((prefCode) => mockPopulationDataByPrefCode[prefCode]));
  }, [selectedPrefs]);

  return (
    <Home
      {...args}
      prefectures={mockPrefectures}
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
