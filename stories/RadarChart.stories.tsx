/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React from 'react';
import { Story, Meta } from '@storybook/react';

import { RadarChart } from '../src/charts/RadarChart';

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
