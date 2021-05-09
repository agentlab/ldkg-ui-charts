import { G2, MultiView } from '@ant-design/charts';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { configureAxesScales } from './utils';

const TimeSeriesWithAuxiliaryView = ({ views = {}, options = {}, title, description }: any) => {
  const [plot, setPlot] = useState<any>(null);
  const [chartConfig, setChartConfig] = useState<any>({});

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
      meta: configureAxesScales(view.meta, options.axes, view.data),
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
    <>
      <h1>{title}</h1>
      <h3>{description}</h3>
      <MultiView
        {...chartConfig}
        onReady={(plt: any) => {
          plt.chart.theme('custom-theme');
          setPlot(plt);
        }}
      />
    </>
  );
};

export default TimeSeriesWithAuxiliaryView;
