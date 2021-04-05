import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Chart } from './Chart';

export default {
  title: 'Chart',
  component: Chart,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = (args) => <Chart {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
