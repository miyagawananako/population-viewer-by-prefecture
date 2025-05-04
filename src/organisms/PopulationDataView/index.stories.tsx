import { Meta, StoryFn } from '@storybook/react';
import { PopulationDataView } from '.';

const meta: Meta<typeof PopulationDataView> = {
  component: PopulationDataView,
};

export default meta;

const totalPopulationData = [
  { year: 1970, value: 1000000 },
  { year: 1980, value: 1010000 },
  { year: 1990, value: 1020000 },
  { year: 2000, value: 1030000 },
  { year: 2010, value: 1040000 },
  { year: 2020, value: 1050000 },
];

const youngPopulationData = [
  { year: 1970, value: 200000 },
  { year: 1980, value: 180000 },
  { year: 1990, value: 160000 },
  { year: 2000, value: 140000 },
  { year: 2010, value: 120000 },
  { year: 2020, value: 100000 },
];

const workingAgePopulationData = [
  { year: 1970, value: 700000 },
  { year: 1980, value: 750000 },
  { year: 1990, value: 800000 },
  { year: 2000, value: 850000 },
  { year: 2010, value: 900000 },
  { year: 2020, value: 950000 },
];

const elderlyPopulationData = [
  { year: 1970, value: 100000 },
  { year: 1980, value: 120000 },
  { year: 1990, value: 140000 },
  { year: 2000, value: 160000 },
  { year: 2010, value: 180000 },
  { year: 2020, value: 200000 },
];

const populationData = [
  {
    prefCode: 1,
    data: {
      総人口: totalPopulationData,
      年少人口: youngPopulationData,
      生産年齢人口: workingAgePopulationData,
      老年人口: elderlyPopulationData,
    },
  },
];

const prefectures = [
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
];

const Template: StoryFn<typeof PopulationDataView> = (args) => {
  return <PopulationDataView {...args} populationData={populationData} prefectures={prefectures} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
