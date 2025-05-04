import { Meta, StoryFn } from '@storybook/react';
import { PopulationTypeSelector } from '.';
import { useState } from 'react';
import { PopulationType } from '../../../type';

const meta: Meta<typeof PopulationTypeSelector> = {
  component: PopulationTypeSelector,
};

export default meta;

const Template: StoryFn<typeof PopulationTypeSelector> = () => {
  const [selectedPopulationType, setSelectedPopulationType] = useState<PopulationType>('総人口');
  return (
    <PopulationTypeSelector
      selectedPopulationType={selectedPopulationType}
      onChange={setSelectedPopulationType}
    />
  );
};

export const Default = Template.bind({});
