import { Meta, StoryFn } from '@storybook/react';
import { PopulationDataView } from '.';
import { mockPrefectures } from '../../mocks/prefectures';
import { mockPopulationDataByPrefCode } from '../../mocks/populationData';

const meta: Meta<typeof PopulationDataView> = {
  component: PopulationDataView,
};

export default meta;

const Template: StoryFn<typeof PopulationDataView> = (args) => {
  return <PopulationDataView {...args} prefectures={mockPrefectures} />;
};

export const Default = Template.bind({});
Default.args = {
  populationData: [mockPopulationDataByPrefCode[1]],
};

export const Loading = Template.bind({});
Loading.args = {
  populationData: [mockPopulationDataByPrefCode[1]],
  isLoading: true,
};

export const MultiplePrefectures = Template.bind({});
MultiplePrefectures.args = {
  populationData: [
    mockPopulationDataByPrefCode[1],
    mockPopulationDataByPrefCode[13],
    mockPopulationDataByPrefCode[27],
  ],
};
