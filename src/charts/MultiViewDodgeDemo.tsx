import { G2, MultiView } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';

const data1 = [
  {
    id: 'Product1',
    date: '2020-01-30',
    qty: 100,
    count: 35,
  },
  {
    id: 'Product1',
    date: '2020-02-01',
    qty: 115,
    count: 30,
  },
  {
    id: 'Product1',
    date: '2020-02-02',
    qty: 120,
    count: 20,
  },
  {
    id: 'Product1',
    date: '2020-02-03',
    qty: 118,
    count: 28,
  },
  {
    id: 'Product1',
    date: '2020-02-04',
    qty: 184,
    count: 30,
  },
  {
    id: 'Product1',
    date: '2020-02-05',
    qty: 122,
    count: 20,
  },
  {
    id: 'Product1',
    date: '2020-02-06',
    qty: 138,
    count: 23,
  },
  {
    id: 'Product1',
    date: '2020-02-07',
    qty: 122,
    count: 34,
  },
  {
    id: 'Product1',
    date: '2020-02-08',
    qty: 110,
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
    qty: 85,
    count: 25,
  },
  {
    id: 'Product2',
    date: '2020-02-01',
    qty: 90,
    count: 20,
  },
  {
    id: 'Product2',
    date: '2020-02-02',
    qty: 91,
    count: 28,
  },
  {
    id: 'Product2',
    date: '2020-02-03',
    qty: 95,
    count: 23,
  },
  {
    id: 'Product2',
    date: '2020-02-04',
    qty: 99,
    count: 35,
  },
  {
    id: 'Product2',
    date: '2020-02-05',
    qty: 97,
    count: 21,
  },
  {
    id: 'Product2',
    date: '2020-02-06',
    qty: 90,
    count: 28,
  },
  {
    id: 'Product2',
    date: '2020-02-07',
    qty: 78,
    count: 24,
  },
  {
    id: 'Product2',
    date: '2020-02-08',
    qty: 89,
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

export const MultiViewDodgeDemo: React.FC = () => {
  const [chartData, setChartData] = useState<any>([]);
  const [plot, setPlot] = useState<any>(null);

  const handleSelectionChanged = (e: React.ChangeEvent<HTMLInputElement>, data: { id: any }[]) => {
    const { checked } = e.target;
    if (checked) {
      setChartData([...chartData, ...data]);
    } else {
      setChartData(chartData.filter((item: any) => item.id !== data[0].id));
    }
  };

  const minMax = (data: any[], property: PropertyKey) =>
    data
      .filter((d) => ({}.hasOwnProperty.call(d, property)))
      .map((d) => d[property])
      .reduce(
        (accumulator, currentValue) => [Math.min(currentValue, accumulator[0]), Math.max(currentValue, accumulator[1])],
        [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
      );

  const defineAxisRange = (data: any[], property: PropertyKey, ratio = 0.7) => {
    const [min, max] = minMax(data, property);
    const pow = (max - min).toString().length - 1;
    const digit = 10 ** pow;
    const lower = ((min - (min % digit)) / digit - 1) * digit;
    const upper = ((max - (max % digit)) / digit + 1) * digit;
    const initial = lower - Math.ceil(((max - min) * (1 - ratio)) / ratio / digit) * digit;

    return {
      min: initial,
      max: upper,
      ticks: Array.from({ length: (upper - lower) / digit + 1 }, (a, i) => (i + 1) * digit),
    };
  };

  const defineSecondaryAxisRange = (data: any[], property: PropertyKey, ratio = 0.25) => {
    const [min, max] = minMax(data, property);
    const pow = max.toString().length - 1;
    const digit = 10 ** pow;
    const upper = ((max - (max % digit)) / digit + 1) * digit;
    const highest = upper / ratio;

    return {
      min: 0,
      max: highest,
      ticks: Array.from({ length: upper / digit + 1 }, (a, i) => i * digit),
    };
  };

  const config: any = {
    syncViewPadding: true,

    tooltip: {
      showMarkers: false,
      shared: true,
      showCrosshairs: false,
      customContent(title: string, items: { name: string; data: any }[]) {
        const seen: {
          [key: string]: any;
        } = {};
        const displayedItems = items.filter((item) => {
          const { id } = item.data;

          if ({}.hasOwnProperty.call(seen, id)) {
            return false;
          }

          seen[id] = true;
          return true;
        });
        return (
          <>
            <h5 style={{ marginTop: 16 }}>{`Date: ${title}`}</h5>
            <ul style={{ paddingLeft: 0 }}>
              {displayedItems?.map((item, index) => {
                const { name, data } = item;
                return (
                  <li
                    key={name}
                    className='g2-tooltip-list-item'
                    data-index={index}
                    style={{
                      marginBottom: 4,
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <span
                      className='g2-tooltip-marker'
                      style={{ backgroundColor: data.id === 'Product1' ? 'red' : 'blue' }}
                    />
                    <span
                      style={{
                        display: 'inline-flex',
                        flex: 1,
                        justifyContent: 'space-between',
                      }}>
                      <span>{name}:</span>
                      {data.id
                        ? data.qty &&
                          data.count && (
                            <span className='g2-tooltip-list-item-value'>{`sold ${data.qty} for ${data.count}$`}</span>
                          )
                        : data.count && <span className='g2-tooltip-list-item-value'>{`${data.count}$`}</span>}
                      {data.id && data.interval && data.predicted && (
                        <span className='g2-tooltip-list-item-value'>{`Predicted value: ${data.predicted} [${data.interval[0]}-${data.interval[1]}]$`}</span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        );
      },
    },
    views: [
      {
        data: chartData,
        padding: 'auto',
        axes: {
          qty: { position: 'left' },
          count: { position: 'right' },
          predicted: false,
          interval: false,
        },
        meta: {
          date: {
            alias: 'Date',
            type: 'timeCat',
            mask: 'DD-MM-YYYY',
            sync: true,
          },
          count: {
            alias: 'Qty',
            ...defineAxisRange(chartData, 'count'),
          },
          predicted: {
            alias: 'Predicted Value',
            min: 0,
            max: 40,
          },
          interval: {
            alias: 'Interval',
            min: 0,
            max: 40,
          },
          qty: {
            alias: 'quantity',
            ...defineSecondaryAxisRange(chartData, 'qty'),
          },
        },
        interactions: [{ type: 'active-region' }],
        geometries: [
          {
            type: 'area',
            xField: 'date',
            yField: 'interval',
            // seriesField: 'id',
            colorField: 'id',
            mapping: {
              // style: {
              // 	fill: 'black'
              // }
              style: function style(ref22: any) {
                switch (ref22.id) {
                  case 'Product1':
                    return {
                      fill: 'red',
                    };
                  default:
                    return {
                      fill: 'blue',
                    };
                }
              },
            },
          },
          {
            type: 'line',
            xField: 'date', // resultTime
            yField: 'count', // hasSimpleResult
            colorField: 'id', // observedProperty
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
          {
            type: 'interval',
            xField: 'date',
            yField: 'qty',
            colorField: 'id',
            adjust: {
              type: 'dodge',
              marginRatio: 0,
            },
            axes: {
              date: { title: { text: 'Date' } },
              qty: false,
            },
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
                return {
                  fillOpacity: 0.9,
                  cursor: 'pointer',
                };
              },
            },
          },
          {
            type: 'line',
            xField: 'date',
            yField: 'predicted',
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
                      lineWidth: 1,
                      lineDash: [4, 4],
                      stroke: 'red',
                    };
                  default:
                    return {
                      lineWidth: 1,
                      lineDash: [4, 4],
                      stroke: 'blue',
                    };
                }
              },
            },
            // style: {
            // 	lineDash: [4, 4],
            // 	lineWidth: 2,
            // 	lineJoin: 'round'
            // },
          },
        ],
      },
      /*
      {
        data: chartData,
        padding: 'auto',
        region: {
          start: {
            x: 0,
            y: 0.72,
          },
          end: {
            x: 1,
            y: 1,
          },
        },
        meta: {
          date: {
            alias: 'Date',
            type: 'timeCat',
            mask: 'DD-MM-YYYY',
          },
          qty: {
            alias: 'qty',
            nice: true,
          },
        },
        geometries: [
          {
            type: 'interval',
            xField: 'date',
            yField: 'qty',
            colorField: 'id',
            adjust: {
              type: 'dodge',
              marginRatio: 0,
            },
            mapping: {
              color: function color(ref11) {
                switch (ref11.id) {
                  case 'Product1':
                    return 'red';
                  case 'Product2':
                    return 'blue';
                  default:
                    return 'black';
                }
              },
            },
          },
        ],
        interactions: [{ type: 'other-filter' }],
      }, */
    ],
  };

  const theme = {
    colors10: ['#FACDAA', '#F4A49E', '#EE7B91', '#E85285', '#BE408C', '#BE408C'],
    colors20: ['#FACDAA', '#F4A49E', '#EE7B91', '#E85285', '#BE408C', '#BE408C', '#942D93'],
    maxColumnWidth: 5,
    minColumnWidth: 5,
    columnWidthRatio: 0.2,
  };
  const { registerTheme } = G2;
  registerTheme('custom-theme', theme);

  useEffect(() => {
    if (plot) {
      plot.chart.theme('custom-theme');
    }
  }, [chartData, plot]);

  /*		const config = {
			syncViewPadding: true,
    	tooltip: { shared: true, showMarkers: false, showCrosshairs: true, offsetY: -50, 
				customContent: (title, items) => {
					const config = {
						appendPadding: 10,
						data: items.map((item: any) => item.data),
						angleField: 'count',
						colorField: 'id',
						radius: 0.9,
						animation: false,
						color: items.map((item: any) => item.color)
					};
					console.log("Tooltip config", items);

					const container = document.createElement('div');
					container.style.position = 'absolute';
          const pieContainer = document.createElement('div');
          const piePlot = new Pie(pieContainer, config);
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
					region: {
						start: {
							x: 0,
							y: 0,
						},
						end: {
							x: 1,
							y: 0.7,
						},
					},
					meta: {
						date: {
							alias: "Date",
							type: "time",
							mask: "DD-MM-YYYY",
						},
						count: {
							alias: "Qty",
							min: 10,
							max: 40,
						},
						predicted: {
							alias: "Predicted Value",
							min: 10,
							max: 40,
						},
						interval: {
							alias: "Interval",
							min: 10,
							max: 40,
						}
					},
					geometries: [
						{
							type: 'area',
							xField: 'date',
							yField: 'interval',
							seriesField: 'id',
							mapping: {
								style: {
									fill: 'black'
								}
							},
						},
						{
							type: 'line',
							xField: 'date',
							yField: 'count',
							
							mapping: {
								color: 'red', // importaint for the color in a tooltip! for lines should be equal to stroke
								style: function style(_ref) {
									console.log("REF", _ref);
									return {
										lineDash: [4, 4],
										lineWidth: 5,
										lineJoin: 'round',
										stroke: 'red',
									 };
								}
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
								lineJoin: 'round'
							},
						}
					],
				}, 
				{
					data: data2,
					padding: 'auto',
					axes: {},
					region: {
						start: {
							x: 0,
							y: 0,
						},
						end: {
							x: 1,
							y: 0.7,
						},
					},
					meta: {
						date: {
							alias: "Date",
							type: "time",
							mask: "DD-MM-YYYY",
						},
						count: {
							alias: "Qty",
							min: 10,
							max: 40,
						},
						predicted: {
							alias: "Predicted Value",
							min: 10,
							max: 40,
						},
						interval: {
							alias: "Interval",
							min: 10,
							max: 40,
						}
					},
					geometries: [
						{
							type: 'area',
							xField: 'date',
							yField: 'interval',
							seriesField: 'id',
							mapping: {},
							customInfo: {name: "Predicted variation area"},
							color: 'red',
						},
						{
							type: 'line',
							xField: 'date',
							yField: 'count',
							seriesField: 'id',
							mapping: {},
						},
						{
							type: 'line',
							xField: 'date',
							yField: 'predicted',
							mapping: {},
							style: {
								lineDash: [4, 4],
								lineWidth: 2,
								lineJoin: 'round'
							},
						}
					],
				},
				{
					data: [...data1, ...data2],
					meta: {
						date: {
							alias: "Date",
							type: "time",
							mask: "DD-MM-YYYY",
						},
						count: {
							alias: "Qty",
							min: 10,
							max: 40,
						},
						predicted: {
							alias: "Predicted Value",
							min: 10,
							max: 40,
						},
						interval: {
							alias: "Interval",
							min: 10,
							max: 40,
						}
					},
					region: {
						start: {
							x: 0,
							y: 0.75,
						},
						end: {
							x: 1,
							y: 0.75,
						},
					},
					geometries: [{
						type: 'interval',
						xField: 'date',
						yField: 'count',
						mapping: {},
						isGroup: true,
						colorField: 'id',
						adjust: "stack",
					}],
					tooltip: { shared: true, showMarkers: true}
				}
			],
		};
*/

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
