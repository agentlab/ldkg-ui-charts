/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import {
  CellRendererRegistryEntry,
  RankedTester,
  rankWith,
  RendererRegistryEntry,
  uiTypeIs,
} from '@agentlab/ldkg-ui-react';
import { MstBoxPlotChartVKElement, MstTimeSeriesChartVKElement } from '../store/MstViewElements';
import { ChartCellRenderer } from './ChartCellRenderer';
import { ChartRenderer } from './ChartRenderer';

export const timeseriesChartRendererTester1: RankedTester = rankWith(2, uiTypeIs('aldkg:TimeSeriesChart'));
export const boxplotChartRendererTester2: RankedTester = rankWith(2, uiTypeIs('aldkg:BoxPlotChart'));

export { ChartCellRenderer } from './ChartCellRenderer';
export { ChartRenderer } from './ChartRenderer';

export const chartsRenderers: RendererRegistryEntry[] = [
  { tester: timeseriesChartRendererTester1, renderer: ChartRenderer, mstVkeType: MstTimeSeriesChartVKElement },
  { tester: boxplotChartRendererTester2, renderer: ChartRenderer, mstVkeType: MstBoxPlotChartVKElement },
];

export const cellRenderers: CellRendererRegistryEntry[] = [
  { tester: timeseriesChartRendererTester1, cell: ChartCellRenderer, mstVkeType: MstTimeSeriesChartVKElement },
  { tester: boxplotChartRendererTester2, cell: ChartCellRenderer, mstVkeType: MstBoxPlotChartVKElement },
];
