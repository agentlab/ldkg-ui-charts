import React from 'react';
import { Story, Meta } from '@storybook/react';

import {Demo} from './Demo';

export default {
  title: 'Chart',
  component: Demo,
} as Meta;

const Template: Story = (args) => <Demo {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
