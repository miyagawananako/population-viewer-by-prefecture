import { Meta, StoryFn } from '@storybook/react';
import { PopulationDataContainer } from '.';

const meta: Meta<typeof PopulationDataContainer> = {
  component: PopulationDataContainer,
};

export default meta;

const Template: StoryFn<typeof PopulationDataContainer> = (args) => {
  return <PopulationDataContainer {...args} />;
};

const data = [
  { year: 1970, value: 1000000 },
  { year: 1980, value: 1010000 },
  { year: 1990, value: 1020000 },
  { year: 2000, value: 1030000 },
  { year: 2010, value: 1040000 },
  { year: 2020, value: 1050000 },
];

export const Default = Template.bind({});
Default.args = {
  populationData: [
    {
      prefCode: 1,
      data: {
        総人口: data,
        年少人口: data,
        生産年齢人口: data,
        老年人口: data,
      },
    },
  ],
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
  ],
};
