/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { RankedTester, rankWith, uiTypeIs } from '@agentlab/ldkg-ui-react';
import { ChartCellRenderer } from './ChartCellRenderer';
import { ChartRenderer } from './ChartRenderer';

export const timeseriesChartRendererTester1: RankedTester = rankWith(2, uiTypeIs('aldkg:TimeSeriesChart'));
export const boxplotChartRendererTester2: RankedTester = rankWith(2, uiTypeIs('aldkg:BoxPlotChart'));

export { ChartCellRenderer } from './ChartCellRenderer';
export { ChartRenderer } from './ChartRenderer';

export const chartsRenderers = [
  { tester: timeseriesChartRendererTester1, renderer: ChartRenderer },
  { tester: boxplotChartRendererTester2, renderer: ChartRenderer },
];

export const cellRenderers = [
  { tester: timeseriesChartRendererTester1, cell: ChartCellRenderer },
  { tester: boxplotChartRendererTester2, cell: ChartCellRenderer },
];
