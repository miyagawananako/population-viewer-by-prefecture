import { Meta, StoryFn } from '@storybook/react';
import { PopulationChart } from '.';
import { mockPopulationDataByPrefCode } from '../../../mocks/populationData';
import { mockPrefectures } from '../../../mocks/prefectures';

const meta: Meta<typeof PopulationChart> = {
  component: PopulationChart,
};

export default meta;

const Template: StoryFn<typeof PopulationChart> = (args) => {
  return (
    <PopulationChart {...args} prefectures={mockPrefectures} selectedPopulationType={'総人口'} />
  );
};

export const Default = Template.bind({});
Default.args = {
  populationData: [mockPopulationDataByPrefCode[1]],
};

export const MultiplePrefectures = Template.bind({});
MultiplePrefectures.args = {
  populationData: [mockPopulationDataByPrefCode[1], mockPopulationDataByPrefCode[13]],
};
