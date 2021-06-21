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
import { MultiViewConfig } from '@ant-design/charts/es/multiView';
import DataSet from '@antv/data-set';
import { Options } from '@antv/g2plot';
import React, { useEffect, useState } from 'react';

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

const ds = new DataSet();
const dv = ds.createView().source([...data1, ...data2]);
dv.transform({
  type: 'filter',
  callback: (item) => !!item.count,
});
dv.transform({
  type: 'aggregate',
  fields: ['count'], // statistical field set
  groupBy: ['date'],
  operations: ['mean'], // statistical operation set
  as: ['avgCount'],
});
dv.transform({
  type: 'map',
  callback: (item) => ({ date: item.date, count: item.avgCount }),
});
const groupData = dv.rows;

export const DataSetDemo: React.FC = () => {
  const [chartData, setChartData] = useState<any>([]);
  const [plot, setPlot] = useState<any>(null);

  const handleSelectionChanged = (e: React.ChangeEvent<HTMLInputElement>, data: any) => {
    if (data.length === 0) {
      return;
    }
    const { checked } = e.target;
    if (checked) {
      setChartData([...chartData, ...data]);
    } else {
      setChartData(chartData.filter((item: any) => item.id !== data[0].id));
    }
  };

  const config: MultiViewConfig = {
    syncViewPadding: true,

    tooltip: { showMarkers: false, shared: true, showCrosshairs: true },
    views: [
      {
        data: chartData,
        // padding: 'auto',
        region: {
          start: {
            x: 0,
            y: 0,
          },
          end: {
            x: 1,
            y: 0.68,
          },
        },
        axes: {},
        meta: {
          date: {
            alias: 'Date',
            type: 'timeCat',
            mask: 'DD-MM-YYYY',
            sync: true,
          },
          count: {
            alias: 'Qty',
            min: 10,
            max: 40,
          },
        },
        interactions: [{ type: 'element-single-selected' }],
        annotations: [
          {
            type: 'text',
            position: ['min', 'median'],
            content: 'Product\ngroup\nmean',
            offsetY: 0,
            style: { textBaseline: 'bottom' },
          },
        ],
        geometries: [
          {
            type: 'line',
            xField: 'date',
            yField: 'count',
            colorField: 'id',
            mapping: {
              color: function color(ref11: any) {
                switch (ref11.id) {
                  case 'Product1':
                    return 'red';
                  case 'Product2':
                    return 'blue';
                  default:
                    return 'black';
                }
              },
              style: function style(ref22: any) {
                switch (ref22.id) {
                  case 'Product1':
                    return {
                      lineWidth: 2,
                      lineJoin: 'round',
                      stroke: 'red',
                    };
                  default:
                    return {
                      lineWidth: 2,
                    };
                }
              },
            },
          },
        ],
      },
      {
        data: groupData,
        region: {
          start: {
            x: 0,
            y: 0,
          },
          end: {
            x: 1,
            y: 0.68,
          },
        },

        geometries: [
          {
            type: 'line',
            xField: 'date',
            yField: 'count',
            mapping: {
              style: {
                lineWidth: 1,
                lineDash: [4, 4],
              },
            },
          },
        ],
        meta: {
          date: {
            alias: 'Date',
            type: 'timeCat',
            mask: 'DD-MM-YYYY',
            sync: true,
          },
          count: {
            alias: 'AvgCount',
            min: 10,
            max: 40,
          },
        },
      },
    ],
  };

  const theme = {
    colors10: ['#FACDAA', '#F4A49E', '#EE7B91', '#E85285', '#BE408C', '#BE408C'],
    colors20: ['#FACDAA', '#F4A49E', '#EE7B91', '#E85285', '#BE408C', '#BE408C', '#942D93'],
  };
  const { registerTheme } = G2;
  registerTheme('custom-theme', theme);

  useEffect(() => {
    if (plot) {
      plot.chart.theme('custom-theme');
    }
  }, [chartData, plot]);

  return (
    <>
      {[data1, data2].map((data) => (
        <label key={data[0].id} htmlFor={data[0].id}>
          <input id={data[0].id} type='checkbox' onChange={(e) => handleSelectionChanged(e, data)} />
          {data[0].id}
        </label>
      ))}
      {chartData.length > 0 && (
        <MultiView
          {...config}
          onReady={(plt: any) => {
            plt.chart.theme('custom-theme');
            setPlot(plt);
          }}
        />
      )}
    </>
  );
};
