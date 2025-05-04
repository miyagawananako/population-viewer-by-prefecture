import { Meta, StoryFn } from '@storybook/react';
import { PopulationTable } from '.';
import { mockPopulationDataByPrefCode } from '../../../mocks/populationData';
import { mockPrefectures } from '../../../mocks/prefectures';

const meta: Meta<typeof PopulationTable> = {
  component: PopulationTable,
};

export default meta;

const Template: StoryFn<typeof PopulationTable> = (args) => {
  return (
    <PopulationTable {...args} prefectures={mockPrefectures} selectedPopulationType={'総人口'} />
  );
};

export const Default = Template.bind({});
Default.args = {
  populationData: [mockPopulationDataByPrefCode[1]],
};

export const MultiplePrefectures = Template.bind({});
MultiplePrefectures.args = {
  populationData: [
    mockPopulationDataByPrefCode[1],
    mockPopulationDataByPrefCode[13],
    mockPopulationDataByPrefCode[27],
  ],
};
