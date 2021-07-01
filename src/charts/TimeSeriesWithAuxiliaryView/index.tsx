/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { G2, MultiView } from '@ant-design/charts';
import { Datum } from '@antv/g2plot/lib/types';
import 'antd/dist/antd.css';
import moment, { Moment } from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import DateRangePickerMenu from '../../DateRangePickerMenu';
import styles from './TimeSeriesWithAuxiliaryView.module.scss';
import { configureAxesScales, configureYAxes, getXYScales, scaleDataToTimeUnit } from './utils';

const TimeSeriesWithAuxiliaryView = ({ views = {}, options = {}, title, description }: any) => {
  const [plot, setPlot] = useState<any>(null);
  const [chartConfig, setChartConfig] = useState<any>({});
  const legendItems = useRef<any[]>([]);

  const handleDatesChanged = (dates: [Moment, Moment]) => {
    const { views: chartViews = [] } = plot?.chart;
    const { timeUnit = null } = options;
    chartViews.forEach((view: any) => {
      view.filter('*', (value: any, data: Datum) => {
        const resultDate = moment(data.resultTime);
        return resultDate.isSameOrAfter(dates[0], timeUnit) && resultDate.isSameOrBefore(dates[1], timeUnit);
      });
      view.render();
    });
  };

  const handleLegendClick = (element: any, legend: any) => {
    const { views: chartViews = [] } = plot?.chart;
    chartViews.forEach((view: any) => {
      view.filter(
        legend.link,
        legend.enabled
          ? (value: any, data: Datum) => {
              return data[legend.dataField] !== legend.link;
            }
          : null,
      );
      view.render();
    });
    const legendIdx = legendItems.current.findIndex((legendItem: any) => legendItem.link === legend.link);
    legendItems.current[legendIdx].enabled = !legend.enabled;
    element.className = legend.enabled ? styles.legendItemActive : styles.legendItem;
    element.style.borderColor = legend.enabled ? legend.color : '#DADCE0';
  };

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
    if (plot) {
      plot.on('legend-item:click', (...args: any) => {
        console.log('CLICKED!', ...args);
      });
    }
  }, [plot]);

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <h4 className={styles.subtitle}>{description}</h4>
      </div>
      <DateRangePickerMenu onChange={handleDatesChanged} />
      <MultiView
        {...chartConfig}
        onReady={(plt: any) => {
          plt.chart.theme('custom-theme');
          setPlot(plt);
        }}
      />
      <div className={styles.legend}>
        {legendItems.current.map((legend: any) => (
          <div
            key={legend.link}
            className={styles.legendItemActive}
            style={{ borderColor: legend.color }}
            onClick={(e) => {
              handleLegendClick(e.target, legend);
            }}>
            <a href={legend.link} onClick={(e) => e.stopPropagation()}>
              {legend.text}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSeriesWithAuxiliaryView;
