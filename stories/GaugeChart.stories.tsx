import React from 'react';
import { Story, Meta } from '@storybook/react';

import { GaugeChart } from '../src/charts/GaugeChart';

export default {
  title: 'GaugeChart',
  component: GaugeChart,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = (args) => <GaugeChart {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
