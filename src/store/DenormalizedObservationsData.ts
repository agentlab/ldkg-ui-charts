import { CollState } from '@agentlab/sparql-jsld-client';
import { variable } from '@rdfjs/data-model';
import { viewDescrCollConstr, viewKindCollConstr } from './data';

const buildCustomTooltip = (property: string) => (title: any, items: any) => {
  const data = items[0]?.data || {};
  return `<div><p><b>${title}</b></p><p>${property}: ${JSON.stringify(data[property])}</p><div>`;
};

const denormalizedObservationsViewKinds = [
  {
    '@id': 'rm:TimeSeriesViewKind',
    '@type': 'rm:ViewKind',
    type: 'TimeSeriesChart', // control type
    options: {},
    mappings: {
      'rm:TimeSeries': {
        '@id': 'rm:Mapping_1',
        '@type': 'rm:TimeSeries',
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
];

const denormalizedObservationsViewDescrs = [
  {
    '@id': 'mktp:_g7H7gh',
    '@type': 'rm:View',
    title: 'Показатели продукта',
    viewKind: 'rm:TimeSeriesViewKind',
    type: 'Chart',
    options: {
      timeUnit: 'day',
      dateFormat: 'DD.MM.YYYY',
      interactions: [{ type: 'sibling-tooltip' }],
    },
    elements: [
      {
        '@id': 'rm:TimeSeries_1',
        '@type': 'rm:TimeSeriesPlot',
        type: 'timeSeries',
        options: {
          legend: false,
        },
        elements: [
          {
            '@id': 'rm:TimeSeries_Price',
            '@type': 'rm:TimeSeries',
            type: 'timeSeries',
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
                '@id': 'rm:line_price',
                '@type': 'rm:Element',
                type: 'line',
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
            '@id': 'rm:TimeSeries_Sales',
            '@type': 'rm:TimeSeries',
            type: 'timeSeries',
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
                '@id': 'rm:line_stocks',
                '@type': 'rm:Element',
                type: 'line',
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
            '@id': 'rm:TimeSeries_Price',
            '@type': 'rm:TimeSeries',
            type: 'timeSeries',
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
                '@id': 'rm:line_saleValue',
                '@type': 'rm:Element',
                type: 'line',
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
            '@id': 'rm:TimeSeries_Sales',
            '@type': 'rm:TimeSeries',
            type: 'timeSeries',
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
                '@id': 'rm:line_totalSales',
                '@type': 'rm:Element',
                type: 'line',
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
            '@id': 'rm:TimeSeries_Price',
            '@type': 'rm:TimeSeries',
            type: 'timeSeries',
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
                '@id': 'rm:line_commentsCount',
                '@type': 'rm:Element',
                type: 'line',
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
            '@id': 'rm:TimeSeries_Sales',
            '@type': 'rm:TimeSeries',
            type: 'timeSeries',
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
                '@id': 'rm:line_stocksDiffOrders',
                '@type': 'rm:Element',
                type: 'line',
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
            '@id': 'rm:TimeSeries_Price',
            '@type': 'rm:TimeSeries',
            type: 'timeSeries',
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
                '@id': 'rm:line_salesAmountDiff',
                '@type': 'rm:Element',
                type: 'line',
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
            '@id': 'rm:TimeSeries_Sales',
            '@type': 'rm:TimeSeries',
            type: 'timeSeries',
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
                '@id': 'rm:line_totalSalesDiff',
                '@type': 'rm:Element',
                type: 'line',
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
    // datasets constraints, specific to this view (UML aggregation)
    collsConstrs: [
      {
        '@id': 'mktp:_8uJ8t6', // machine-generated random UUID
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'hs:HSObservationShape',
            conditions: {
              '@id': 'mktp:_u8Yg83', // machine-generated random UUID
              '@type': 'rm:EntConstrCondition',
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
      resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
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
