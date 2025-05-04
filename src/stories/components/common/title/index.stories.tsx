import { Meta, StoryFn } from '@storybook/react';
import { Title } from '.';

const meta: Meta<typeof Title> = {
  component: Title,
};

export default meta;

const Template: StoryFn<typeof Title> = (args) => {
  return <Title {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  children: 'タイトル',
};
