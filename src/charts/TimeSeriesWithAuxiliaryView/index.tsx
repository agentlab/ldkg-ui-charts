/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { G2, Mix } from '@ant-design/charts';
import React from 'react';
import { configureAxesScales, configureYAxes, getXYScales, scaleDataToTimeUnit } from './utils';

const TimeSeriesWithAuxiliaryView = ({ config = {}, options = {}, onChartReady }: any) => {
  const theme = {
    // colors10: ['#FACDAA', '#F4A49E', '#EE7B91', '#E85285', '#BE408C', '#BE408C'],
    // colors20: ['#FACDAA', '#F4A49E', '#EE7B91', '#E85285', '#BE408C', '#BE408C', '#942D93'],
    maxColumnWidth: 15,
    minColumnWidth: 4,
    columnWidthRatio: 0.4,
  };

  const { registerTheme } = G2;
  registerTheme('custom-theme', theme);

  const chartOptions = {};
  const updateViews = config
    ? config.views.map((view: any) => {
        const { timeUnit = null } = options;
        const xyScales = getXYScales(view.meta);
        const { xScales, yScales } = xyScales;
        const timeScalesName = Object.keys(xScales)[0];
        const viewData = timeUnit !== null ? scaleDataToTimeUnit(timeScalesName, timeUnit, view.data) : view.data;
        const { options: viewOptions = {} } = view;

        return {
          ...view,
          ...viewOptions,
          geometries: view.geometries.map((geometry: any) => ({
            ...geometry,
            ...(viewOptions.adjust &&
              xScales[geometry.xField]?.type !== undefined &&
              xScales[geometry.xField]?.type !== 'linear' && { adjust: viewOptions.adjust }),
          })),
          ...(options.yAxes !== false && {
            axes: configureYAxes(yScales, viewOptions.axes?.yAxis?.aliases || options.axes?.yAxis?.aliases),
          }),
          data: viewData,
          ...(options.interactions && { interactions: options.interactions }),
          // TODO: check tooltip options propagation
          ...(viewOptions.tooltip && { tooltip: viewOptions.tooltip }),
          //...(viewOptions.legend && { legend: viewOptions.legend }), // TODO: copy to the chart's legend option
          meta: configureAxesScales(
            xyScales,
            { ...options.axes, xAxis: { adjust: viewOptions.adjust, dateFormat: options.dateFormat || 'DD.MM.YYYY' } },
            viewData,
          ),
        };
      })
    : [];

  const chartConfig: any = {
    options: chartOptions,
    appendPadding: 10,
    ...(options.height && { height: options.height }),
    ...(options.weight && { weight: options.weight }),
    views: updateViews,
    syncViewPadding: true,
    tooltip: false,
  };

  return (
    <Mix
      {...chartConfig}
      onReady={(plt: any) => {
        plt.chart.theme('custom-theme');
        onChartReady(plt);
      }}
    />
  );
};

export default TimeSeriesWithAuxiliaryView;
