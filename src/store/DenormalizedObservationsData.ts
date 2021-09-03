import { viewDescrCollConstr, viewKindCollConstr } from '@agentlab/ldkg-ui-react';
import { CollState } from '@agentlab/sparql-jsld-client';
import { variable } from '@rdfjs/data-model';

const buildCustomTooltip = (property: string) => (title: any, items: any) => {
  const data = items[0]?.data || {};
  return `<div><p><b>${title}</b></p><p>${property}: ${JSON.stringify(data[property])}</p><div>`;
};

export const denormalizedObservationsViewKinds = [
  {
    '@id': 'mktp:TimeSeriesViewKind',
    '@type': 'aldkg:ViewKind',
    options: {},
    elements: [
      {
        '@id': 'mktp:TimeSeriesChartViewKind',
        '@type': 'aldkg:TimeSeriesChart', // control type
        mappings: {
          'aldkg:TimeSeries': {
            '@id': 'mktp:Mapping_1',
            '@type': 'aldkg:TimeSeries',
            type: {
              type: 'pointer',
              value: '/type',
            },
            yField: {
              type: 'pointer',
              value: '/options/property',
            },
            xField: 'parsedAt',
            colorField: 'product',
            mapping: {
              type: 'object',
              properties: {
                style: {
                  type: 'object',
                  properties: {
                    lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                    stroke: { type: 'pointer', value: '/options/stroke' },
                  },
                  wrapper: { type: 'pointer', value: '/product' },
                },
                color: {
                  type: 'pointer',
                  value: '/options/color',
                  wrapper: { type: 'pointer', value: '/product' },
                },
              },
            },
            dataMappings: [],
          },
        },
      },
    ],
  },
];

export const denormalizedObservationsViewDescrs = [
  {
    '@id': 'mktp:_g7H7gh',
    '@type': 'aldkg:ViewDescr',
    title: 'Показатели продукта',
    viewKind: 'mktp:TimeSeriesViewKind',
    elements: [
      {
        '@id': 'mktp:_g7H7gh_chart',
        '@type': 'aldkg:Chart',
        '@parent': 'mktp:TimeSeriesChartViewKind',
        title: 'Показатели продукта',
        options: {
          timeUnit: 'day',
          dateFormat: 'DD.MM.YYYY',
          interactions: [{ type: 'sibling-tooltip' }],
        },
        elements: [
          {
            '@id': 'mktp:TimeSeries_1',
            '@type': 'aldkg:TimeSeriesPlot',
            options: {
              legend: false,
            },
            elements: [
              {
                '@id': 'mktp:TimeSeries_Price',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('price'),
                  },
                  region: {
                    start: {
                      x: 0,
                      y: 0,
                    },
                    end: {
                      x: 0.24,
                      y: 0.48,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_price',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'price',
                      color: '#2E8DF9',
                      lineWidth: 2,
                      stroke: '#2E8DF9',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Sales',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('stocks'),
                  },
                  region: {
                    start: {
                      x: 0.26,
                      y: 0,
                    },
                    end: {
                      x: 0.49,
                      y: 0.48,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_stocks',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'stocks',
                      color: '#1FD0BE',
                      lineWidth: 2,
                      stroke: '#1FD0BE',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Price',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('saleValue'),
                  },
                  region: {
                    start: {
                      x: 0.51,
                      y: 0,
                    },
                    end: {
                      x: 0.74,
                      y: 0.48,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_saleValue',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'saleValue',
                      color: '#EB648C',
                      lineWidth: 2,
                      stroke: '#EB648C',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Sales',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('totalSales'),
                  },
                  region: {
                    start: {
                      x: 0.76,
                      y: 0,
                    },
                    end: {
                      x: 1,
                      y: 0.48,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_totalSales',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'totalSales',
                      color: '#EB648C',
                      lineWidth: 2,
                      stroke: '#EB648C',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Price',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('commentsCount'),
                  },
                  region: {
                    start: {
                      x: 0,
                      y: 0.52,
                    },
                    end: {
                      x: 0.24,
                      y: 1,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_commentsCount',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'commentsCount',
                      color: '#EC7E31',
                      lineWidth: 2,
                      stroke: '#EC7E31',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Sales',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('stocksDiffOrders'),
                  },
                  region: {
                    start: {
                      x: 0.26,
                      y: 0.52,
                    },
                    end: {
                      x: 0.49,
                      y: 1,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_stocksDiffOrders',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'stocksDiffOrders',
                      color: '#1FD0BE',
                      lineWidth: 2,
                      stroke: '#1FD0BE',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Price',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('salesAmountDiff'),
                  },
                  region: {
                    start: {
                      x: 0.51,
                      y: 0.52,
                    },
                    end: {
                      x: 0.74,
                      y: 1,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_salesAmountDiff',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'salesAmountDiff',
                      color: '#EB648C',
                      lineWidth: 2,
                      stroke: '#EB648C',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Sales',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('totalSalesDiff'),
                  },
                  region: {
                    start: {
                      x: 0.76,
                      y: 0.52,
                    },
                    end: {
                      x: 1,
                      y: 1,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_totalSalesDiff',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'totalSalesDiff',
                      color: '#EB648C',
                      lineWidth: 2,
                      stroke: '#EB648C',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    // datasets constraints, specific to this view (UML aggregation)
    collsConstrs: [
      {
        '@id': 'mktp:_8uJ8t6', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'hs:HSObservationShape',
            conditions: {
              '@id': 'mktp:_u8Yg83', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              product: 'https://www.wildberries.ru/catalog/9485114/detail.aspx',
            },
          },
        ],
        orderBy: [{ expression: variable('parsedAt'), descending: false }],
      },
    ],
  },
];

/**
 * Collections Configs Data
 */
export const additionalColls: CollState[] = [
  // ViewKinds Collection
  {
    constr: viewKindCollConstr,
    data: denormalizedObservationsViewKinds,
    opt: {
      updPeriod: undefined,
      lastSynced: Date.now(),
      //resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
    },
  },
  // ViewDescrs Collection
  {
    constr: viewDescrCollConstr,
    data: denormalizedObservationsViewDescrs,
    opt: {
      updPeriod: undefined,
      lastSynced: Date.now(),
      //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
      // for viewDescrs.collConstrs (it loads lazily -- after the first access)
    },
  },
];
