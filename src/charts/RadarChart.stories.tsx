import React from 'react';
import { Story, Meta } from '@storybook/react';

import { RadarChart } from './RadarChart';

export default {
  title: 'RadarChart',
  component: RadarChart,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = (args) => <RadarChart {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
