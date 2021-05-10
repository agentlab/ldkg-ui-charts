import { G2, MultiView } from '@ant-design/charts';
import { Datum } from '@antv/g2plot/lib/types';
import 'antd/dist/antd.css';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import DateRangePickerMenu from '../../DateRangePickerMenu';
import styles from './TimeSeriesWithAuxiliaryView.module.scss';
import { configureAxesScales } from './utils';

const TimeSeriesWithAuxiliaryView = ({ views = {}, options = {}, title, description }: any) => {
  const [plot, setPlot] = useState<any>(null);
  const [chartConfig, setChartConfig] = useState<any>({});

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

  const theme = {
    colors10: ['#FACDAA', '#F4A49E', '#EE7B91', '#E85285', '#BE408C', '#BE408C'],
    colors20: ['#FACDAA', '#F4A49E', '#EE7B91', '#E85285', '#BE408C', '#BE408C', '#942D93'],
    maxColumnWidth: 10,
    minColumnWidth: 5,
    columnWidthRatio: 0.1,
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
    const updateViews = views.map((view: any) => ({
      ...view,
      interactions: [{ type: 'active-region' }],
      meta: configureAxesScales(
        view.meta,
        { ...options.axes, xAxis: { dateFormat: options.dateFormat || 'DD.MM.YYYY' } },
        view.data,
      ),
    }));

    const updatedConfig = {
      views: updateViews,
      syncViewPadding: true,
      tooltip: {
        showMarkers: false,
        shared: true,
        showCrosshairs: false,
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
    </div>
  );
};

export default TimeSeriesWithAuxiliaryView;
