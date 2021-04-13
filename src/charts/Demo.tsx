import React, { useState } from 'react';
import { Chart, Geom, Axis, Slider, Tooltip } from 'bizcharts';

const data1 = [
  {
    id: 'Product1',
    date: '2020-01-30',
    count: 35,
  },
  {
    id: 'Product1',
    date: '2020-02-01',
    count: 30,
  },
  {
    id: 'Product1',
    date: '2020-02-02',
    count: 20,
  },
  {
    id: 'Product1',
    date: '2020-02-03',
    count: 28,
  },
  {
    id: 'Product1',
    date: '2020-02-04',
    count: 30,
  },
  {
    id: 'Product1',
    date: '2020-02-05',
    count: 20,
  },
  {
    id: 'Product1',
    date: '2020-02-06',
    count: 23,
  },
  {
    id: 'Product1',
    date: '2020-02-07',
    count: 34,
  },
  {
    id: 'Product1',
    date: '2020-02-08',
    count: 26,
  },
  {
    id: 'Product1',
    date: '2020-02-09',
    count: 27,
    predicted: 27,
    interval: [27, 27],
  },
  {
    id: 'Product1',
    date: '2020-02-10',
    predicted: 24,
    interval: [23, 26],
  },
  {
    id: 'Product1',
    date: '2020-02-11',
    predicted: 22,
    interval: [18, 24],
  },
  {
    id: 'Product1',
    date: '2020-02-12',
    predicted: 32,
    interval: [25, 38],
  },
];

const data2 = [
  {
    id: 'Product2',
    date: '2020-01-30',
    count: 25,
  },
  {
    id: 'Product2',
    date: '2020-02-01',
    count: 20,
  },
  {
    id: 'Product2',
    date: '2020-02-02',
    count: 28,
  },
  {
    id: 'Product2',
    date: '2020-02-03',
    count: 23,
  },
  {
    id: 'Product2',
    date: '2020-02-04',
    count: 35,
  },
  {
    id: 'Product2',
    date: '2020-02-05',
    count: 21,
  },
  {
    id: 'Product2',
    date: '2020-02-06',
    count: 28,
  },
  {
    id: 'Product2',
    date: '2020-02-07',
    count: 24,
  },
  {
    id: 'Product2',
    date: '2020-02-08',
    count: 23,
  },
  {
    id: 'Product2',
    date: '2020-02-09',
    count: 31,
    predicted: 31,
    interval: [31, 31],
  },
  {
    id: 'Product2',
    date: '2020-02-10',
    predicted: 33,
    interval: [28, 38],
  },
  {
    id: 'Product2',
    date: '2020-02-11',
    predicted: 38,
    interval: [30, 40],
  },
  {
    id: 'Product2',
    date: '2020-02-12',
    predicted: 31,
    interval: [25, 37],
  },
];

export const Demo: React.FC = () => {
  const scale = {
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
  };

  const [chartData, setChartData] = useState<any>([]);

  const handleSelectionChanged = (e, data) => {
    const { checked } = e.target;
    if (checked) {
      setChartData([...chartData, ...data]);
    } else {
      setChartData(chartData.filter((item: any) => item.id !== data[0].id));
    }
  };

  return (
    <>
      {[data1, data2].map((data) => (
        <label key={data[0].id} htmlFor={data[0].id}>
          <input id={data[0].id} type='checkbox' onChange={(e) => handleSelectionChanged(e, data)} />
          {data[0].id}
        </label>
      ))}
      <Chart height={600} autoFit animate={false} data={chartData} scale={scale} interactions={['element-highlight']}>
        {chartData.length > 0 && (
          <>
            <Tooltip showCrosshairs />
            <Axis name='count' />
            <Geom
              type='line'
              position='date*count'
              // color={`l(90) 0:${colors[0]} ${divideRate}:${colors[0]} ${divideRate}:${colors[1]} 1:${colors[1]}`}
              color='id'
              style={{
                lineJoin: 'round',
              }}
            />
            <Geom
              type='line'
              style={{
                lineDash: [4, 4],
                lineWidth: 2,
                lineJoin: 'round',
              }}
              position='date*predicted'
              // color={`l(90) 0:${colors[0]} ${preDivideRate}:${colors[0]} ${preDivideRate}:${colors[1]} 1:${colors[1]}`}
              color='id'
            />

            <Geom type='area' position='date*interval' color='id' />
            <Geom
              type='point'
              position='date*count'
              size={4}
              shape='circle'
              color='id'
              style={{
                stroke: '#fff',
                lineWidth: 1,
              }}
            />
            <Slider end={1.0} />
          </>
        )}
      </Chart>
    </>
  );
};
