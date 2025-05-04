import { Meta, StoryFn } from '@storybook/react';
import { Loading } from '.';

const meta: Meta<typeof Loading> = {
  component: Loading,
};

export default meta;

const Template: StoryFn<typeof Loading> = (args) => {
  return <Loading {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
