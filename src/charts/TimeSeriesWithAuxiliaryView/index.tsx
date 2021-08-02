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
import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from 'react';
import { configureAxesScales, configureYAxes, getXYScales, scaleDataToTimeUnit } from './utils';

const TimeSeriesWithAuxiliaryView = ({ views = {}, options = {} }: any) => {
  const [chartConfig, setChartConfig] = useState<any>({});
  const legendItems = useRef<any[]>([]);

  const theme = {
    colors10: ['#FACDAA', '#F4A49E', '#EE7B91', '#E85285', '#BE408C', '#BE408C'],
    colors20: ['#FACDAA', '#F4A49E', '#EE7B91', '#E85285', '#BE408C', '#BE408C', '#942D93'],
    maxColumnWidth: 20,
    minColumnWidth: 4,
    columnWidthRatio: 0.4,
  };

  const { registerTheme } = G2;
  registerTheme('custom-theme', theme);

  useEffect(() => {
    const chartOptions = {};
    const updateViews = views.map((view: any) => {
      const { timeUnit = null } = options;
      const xyScales = getXYScales(view.meta);
      const { xScales, yScales } = xyScales;
      const timeScalesName = Object.keys(xScales)[0];
      const viewData = timeUnit !== null ? scaleDataToTimeUnit(timeScalesName, timeUnit, view.data) : view.data;
      const { options: viewOptions = {} } = view;

      if (viewOptions.legend) {
        const viewLegendItems = Object.keys(viewOptions.legend).map((key: PropertyKey) => ({
          ...viewOptions.legend[key],
          enabled: true,
        }));
        legendItems.current = viewLegendItems;
      }

      return {
        ...view,
        axes: configureYAxes(yScales),
        data: viewData,
        interactions: [{ type: 'active-region' }],
        meta: configureAxesScales(
          xyScales,
          { ...options.axes, xAxis: { dateFormat: options.dateFormat || 'DD.MM.YYYY' } },
          viewData,
        ),
      };
    });

    const updatedConfig = {
      options: chartOptions,
      views: updateViews,
      syncViewPadding: true,
      tooltip: {
        showMarkers: true,
        shared: true,
        showCrosshairs: true,
      },
    };

    setChartConfig(updatedConfig);
  }, [views, options]);

  return (
    <Mix
      {...chartConfig}
      onReady={(plt: any) => {
        plt.chart.theme('custom-theme');
      }}
    />
  );
};

export default TimeSeriesWithAuxiliaryView;
