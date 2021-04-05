import React from 'react';
import { Gauge } from '@ant-design/charts';

export const GaugeChart: React.FC = () => {
  const config = {
    title: {
      visible: true,
      text: 'Мощность нагревателя',
    },
    width: 350,
    height: 350,
    value: 40,
    percent: 0.3,
    min: 0,
    max: 100,
    range: [0, 25, 50, 75, 100],
    statistic: {
      visible: true,
      text: 'кВт',
      color: '#faad14',
    },
    color: ['#39B8FF', '#52619B', '#43E089', '#C0EDF3'],
  };
  return <Gauge {...config} />;
};
