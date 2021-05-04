import { G2, MultiView } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';

const TimeSeriesWithAuxiliaryView = ({ config }: any) => {
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
    const updatedConfig = {
      ...config,
      syncViewPadding: true,
      tooltip: {
        showMarkers: false,
        shared: true,
        showCrosshairs: false,
      },
    };

    setChartConfig(updatedConfig);
  }, [config]);

  return (
    <>
      <h1>{chartConfig.title}</h1>
      <h3>{chartConfig.description}</h3>
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
