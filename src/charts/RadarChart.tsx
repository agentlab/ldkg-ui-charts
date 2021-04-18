import React from 'react';
import { Radar } from '@ant-design/charts';
import { RadarConfig } from '@ant-design/charts/es/radar';

export const RadarChart: React.FC = () => {
  const data = [
    {
      item: 'С',
      score: 14,
    },
    {
      item: 'СВ',
      score: 10,
    },
    {
      item: 'В',
      score: 6,
    },
    {
      item: 'ЮВ',
      score: 3,
    },
    {
      item: 'Ю',
      score: 8,
    },
    {
      item: 'ЮЗ',
      score: 14,
    },
    {
      item: 'З',
      score: 15,
    },
    {
      item: 'СЗ',
      score: 12,
    },
  ];
  const config: RadarConfig = {
    /* title: {
      visible: true,
      text: 'Ветер',
    }, */
    data,
    xField: 'item',
    yField: 'score',
    yAxis: {
      grid: {
        // @ts-ignore
        alternateColor: ['rgba(0, 0, 0, 0.04)', null],
      },
    },
    // area: { visible: false },
    point: {
      /* visible: true */
    },
  };
  return <Radar {...config} />;
};
