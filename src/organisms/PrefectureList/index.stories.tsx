import { Meta, StoryFn } from '@storybook/react';
import { PrefectureList } from '.';
import { useState } from 'react';

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
  prefectures: [
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
    {
      prefCode: 5,
      prefName: '秋田県',
    },
    {
      prefCode: 6,
      prefName: '山形県',
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  prefectures: [],
  isLoading: true,
};
