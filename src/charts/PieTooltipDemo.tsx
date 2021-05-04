import { MultiView } from '@ant-design/charts';
import { Pie, PieOptions } from '@antv/g2plot';
import React from 'react';

const data1 = [
  {
    id: 'Product1',
    date: '2020-01-30',
    qty: 10,
    count: 35,
  },
  {
    id: 'Product1',
    date: '2020-02-01',
    qty: 15,
    count: 30,
  },
  {
    id: 'Product1',
    date: '2020-02-02',
    qty: 20,
    count: 20,
  },
  {
    id: 'Product1',
    date: '2020-02-03',
    qty: 18,
    count: 28,
  },
  {
    id: 'Product1',
    date: '2020-02-04',
    qty: 20,
    count: 30,
  },
  {
    id: 'Product1',
    date: '2020-02-05',
    qty: 22,
    count: 20,
  },
  {
    id: 'Product1',
    date: '2020-02-06',
    qty: 23,
    count: 23,
  },
  {
    id: 'Product1',
    date: '2020-02-07',
    qty: 32,
    count: 34,
  },
  {
    id: 'Product1',
    date: '2020-02-08',
    qty: 10,
    count: 26,
  },
];

const data2 = [
  {
    id: 'Product2',
    date: '2020-01-30',
    qty: 15,
    count: 25,
  },
  {
    id: 'Product2',
    date: '2020-02-01',
    qty: 20,
    count: 20,
  },
  {
    id: 'Product2',
    date: '2020-02-02',
    qty: 21,
    count: 28,
  },
  {
    id: 'Product2',
    date: '2020-02-03',
    qty: 5,
    count: 23,
  },
  {
    id: 'Product2',
    date: '2020-02-04',
    qty: 12,
    count: 35,
  },
  {
    id: 'Product2',
    date: '2020-02-05',
    qty: 10,
    count: 21,
  },
  {
    id: 'Product2',
    date: '2020-02-06',
    qty: 10,
    count: 28,
  },
  {
    id: 'Product2',
    date: '2020-02-07',
    qty: 18,
    count: 24,
  },
  {
    id: 'Product2',
    date: '2020-02-08',
    qty: 19,
    count: 23,
  },
];

export const PieTooltipDemo: React.FC = () => {
  const config: any = {
    syncViewPadding: true,
    tooltip: {
      shared: true,
      showMarkers: false,
      showCrosshairs: true,
      offsetY: -50,
      customContent: (title: string, items: []) => {
        const pieConfig: PieOptions = {
          appendPadding: 10,
          data: items.map((item: any) => item.data),
          angleField: 'qty',
          colorField: 'id',
          radius: 0.9,
          animation: false,
          color: items.map((item: any) => item.color),
        };

        const container = document.createElement('div');
        container.style.position = 'absolute';
        const pieContainer = document.createElement('div');
        const piePlot = new Pie(pieContainer, pieConfig);
        piePlot.render();
        container.appendChild(pieContainer);
        return container;
      },
    },
    views: [
      {
        data: data1,
        padding: 'auto',
        axes: {},
        meta: {
          date: {
            alias: 'Date',
            type: 'time',
            mask: 'DD-MM-YYYY',
          },
          count: {
            alias: 'Qty',
            min: 10,
            max: 40,
          },
          predicted: {
            alias: 'Predicted Value',
            min: 10,
            max: 40,
          },
          interval: {
            alias: 'Interval',
            min: 10,
            max: 40,
          },
        },
        geometries: [
          {
            type: 'area',
            xField: 'date',
            yField: 'interval',
            seriesField: 'id',
            mapping: {
              style: {
                fill: 'black',
              },
            },
          },
          {
            type: 'line',
            xField: 'date',
            yField: 'count',

            mapping: {
              color: 'red', // importaint for the color in a tooltip! for lines should be equal to stroke
              style: function style(ref: any) {
                return {
                  lineDash: [4, 4],
                  lineWidth: 5,
                  lineJoin: 'round',
                  stroke: 'red',
                };
              },
            },
          },
          {
            type: 'line',
            xField: 'date',
            yField: 'predicted',
            mapping: {},
            style: {
              lineDash: [4, 4],
              lineWidth: 2,
              lineJoin: 'round',
            },
          },
        ],
      },
      {
        data: data2,
        padding: 'auto',
        axes: {},
        meta: {
          date: {
            alias: 'Date',
            type: 'time',
            mask: 'DD-MM-YYYY',
          },
          count: {
            alias: 'Qty',
            min: 10,
            max: 40,
          },
        },
        geometries: [
          {
            type: 'line',
            xField: 'date',
            yField: 'count',
            seriesField: 'id',
            mapping: {},
          },
        ],
      },
    ],
  };

  return <MultiView {...config} />;
};
