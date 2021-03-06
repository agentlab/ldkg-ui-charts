/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { Meta } from '@storybook/react';
import React, { ReactNode } from 'react';
import { ChartDemo } from '../src/charts/ChartDemo';
import { DataSetDemo } from '../src/charts/DataSetDemo';
import { MultiViewDodgeDemo } from '../src/charts/MultiViewDodgeDemo';
import { PieTooltipDemo } from '../src/charts/PieTooltipDemo';

export default {
  title: '1 Control/ChartDemo',
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta;

export const Chart = (): ReactNode => <ChartDemo />;
export const PieTooltip = (): ReactNode => <PieTooltipDemo />;
export const Dodge = (): ReactNode => <MultiViewDodgeDemo />;
export const DataSet = (): ReactNode => <DataSetDemo />;
