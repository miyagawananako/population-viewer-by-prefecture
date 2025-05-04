import { Meta, StoryFn } from '@storybook/react';
import { PrefectureList } from '.';
import { useState } from 'react';
import { mockPrefectures } from '../../mocks/prefectures';

const meta: Meta<typeof PrefectureList> = {
  component: PrefectureList,
};

export default meta;

const Template: StoryFn<typeof PrefectureList> = (args) => {
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);

  return (
    <PrefectureList
      {...args}
      selectedPrefs={selectedPrefs}
      onCheckboxChange={(prefCode: number) => {
        setSelectedPrefs((prev) =>
          prev.includes(prefCode) ? prev.filter((code) => code !== prefCode) : [...prev, prefCode]
        );
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  prefectures: mockPrefectures,
};

export const Loading = Template.bind({});
Loading.args = {
  prefectures: [],
  isLoading: true,
};
