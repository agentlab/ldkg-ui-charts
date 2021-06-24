import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Box } from '@ant-design/charts';

const TimeSeriesWithAuxiliaryView = ({ views = {}, options = {}, title, description }: any) => {
  const view = Array.isArray(views) ? views[0] : views;
  const [config, setConfig] = useState<any>({
    xField: 'undefined',
    yField: 'undefined',
    data: [],
  });

  useEffect(() => {
    const data = view.data.map((e: any, idx: number) => {
      const medianDate = moment((Number(moment(e.end).format('x')) + Number(moment(e.begin).format('x'))) / 2);
      return {
        x: options.groupField ? medianDate.format(options.dateFormat) : medianDate,
        low: e.min,
        q1: e.percentile_25,
        median: e.median,
        q3: e.percentile_75,
        high: e.max,
        ...e,
      };
    });
    const newConfig = {
      width: 400,
      height: 500,
      data: data,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
      groupField: options.groupField,
      boxStyle: options.groupField
        ? {}
        : {
            stroke: '#545454',
            fill: '#1890FF',
            fillOpacity: 0.3,
          },
      meta: {
        x: options.groupField
          ? {}
          : {
              formatter: (val: any) => {
                return moment(val).format(options.dateFormat);
              },
            },
      },
      animation: false,
    };
    setConfig(newConfig);
  }, [view.data, options, views, title]);
  return (
    <React.Fragment>
      <span style={{ fontSize: '2em' }}>{title}</span>
      <Box {...config} />
    </React.Fragment>
  );
};

export default TimeSeriesWithAuxiliaryView;
