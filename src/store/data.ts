/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { rootModelInitialState } from '@agentlab/sparql-jsld-client';
import { variable } from '@rdfjs/data-model';
import moment from 'moment';
import { groupedBoxPlot } from './LocalBoxPlot';
import { boxPlotBucketShape, observationShape } from './shapes';

export const viewKindCollConstr = {
  '@id': 'rm:ViewKinds_Coll_charts',
  entConstrs: [
    {
      '@id': 'rm:ViewKinds_EntConstr0',
      schema: 'rm:ViewKindShape',
    },
  ],
};

export const viewDescrCollConstr = {
  '@id': 'rm:Views_Coll_charts',
  entConstrs: [
    {
      '@id': 'rm:Views_EntConstr0',
      schema: 'rm:ViewShape',
    },
  ],
};

export const timeSeriesViewKinds = [
  {
    '@id': 'rm:TimeSeriesViewKind',
    '@type': 'rm:ViewKind',
    type: 'TimeSeriesChart', // control type
    options: {
      // TODO: primary/secondary properties? links to collsConstrs? Pass the entire options to the to-be rendered component?
    },
    mappings: {
      'rm:BoxPlotTimeSeries': {
        type: {
          type: 'pointer',
          value: '/type',
        },
        xField: 'begin',
        yField: 'value',
        colorField: 'source',
        outliersField: 'outliers',
        adjust: {
          type: 'object',
          properties: {
            type: 'dodge',
            marginRatio: 0.5,
          },
        },
        mapping: {
          type: 'object',
          properties: {
            style: {
              type: 'object',
              properties: {
                lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
              },
              wrapper: { type: 'pointer', value: '/hasFeatureOfInterest' },
            },
            color: {
              type: 'pointer',
              value: '/options/color',
              wrapper: { type: 'pointer', value: '/hasFeatureOfInterest' },
            },
            shape: {
              type: 'pointer',
              value: '/options/shape',
            },
          },
        },
        dataMappings: [
          {
            propertyName: {
              type: 'pointer',
              value: '/yField',
            },
            value: ['min', 'percentile_25', 'median', 'percentile_75', 'max'],
            scope: 'data',
          },
        ],
      },
      'rm:TimeSeries': {
        '@id': 'rm:Mapping_1',
        '@type': 'rm:TimeSeries',
        type: {
          type: 'pointer',
          value: '/type',
        },
        xField: 'resultTime',
        yField: {
          type: 'expr',
          value: '(v) => v.replace(/^[A-Za-z0-9-]*:/, "")',
          applyTo: '$.observedProperty',
        },
        colorField: 'observedFeatureProperty',
        propName: {
          type: 'expr',
          value: '(v) => v.replace(/^[A-Za-z0-9-]*:/, "")',
          applyTo: '$.observedProperty',
          scope: 'meta',
        },
        propKey: {
          type: 'expr',
          value:
            '(observedProperty,hasFeatureOfInterest) => hasFeatureOfInterest + "#" + observedProperty.replace(/^[A-Za-z0-9-]*:/, "").toLowerCase()',
          applyTo: '$.[observedProperty,hasFeatureOfInterest]',
          scope: 'meta',
        },
        legend: {
          type: 'object',
          properties: {
            field: 'hasFeatureOfInterest',
            decorators: ['data', 'tooltip'],
            items: {
              type: 'object',
              properties: {
                name: { type: 'pointer', value: '/options/label' },
                uri: { type: 'pointer', value: '/hasFeatureOfInterest' },
                color: { type: 'pointer', value: '/options/color' },
                statistics: {
                  type: 'pointer',
                  value: '/options/statistics',
                  wrapper: { type: 'pointer', value: '/propName' },
                },
              },
              wrapper: { type: 'pointer', value: '/hasFeatureOfInterest' },
            },
          },
          wrapper: { type: 'none', options: true },
        },
        mapping: {
          type: 'object',
          properties: {
            style: {
              type: 'object',
              properties: {
                lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                stroke: { type: 'pointer', value: '/options/stroke' },
              },
              wrapper: { type: 'pointer', value: '/propKey' },
            },
            shape: {
              type: 'pointer',
              value: '/options/shape',
            },
            color: {
              type: 'pointer',
              value: '/options/color',
              wrapper: { type: 'pointer', value: '/propKey' },
            },
          },
        },
        dataMappings: [
          {
            propertyName: {
              type: 'pointer',
              value: '/yField',
            },
            value: 'hasSimpleResult',
            scope: 'data',
          },
          {
            propertyName: 'observedFeatureProperty',
            value: {
              type: 'pointer',
              value: '/propKey',
            },
          },
        ],
      },
    },
  },
  {
    '@id': 'rm:GroupedBoxPlotViewKind',
    '@type': 'rm:ViewKind',
    type: 'BoxPlotChart', // control type
    options: {
      // TODO: primary/secondary properties? links to collsConstrs? Pass the entire options to the to-be rendered component?
    },
    mappings: {
      'rm:BoxPlotTimeSeries': {
        type: {
          type: 'pointer',
          value: '/type',
        },
        xField: 'begin',
        yField: 'value',
        colorField: 'source',
        outliersField: 'outliers',
        adjust: {
          type: 'object',
          properties: {
            type: 'dodge',
            marginRatio: 0,
          },
        },
        mapping: {
          type: 'object',
          properties: {
            style: {
              type: 'object',
              properties: {
                lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
              },
              wrapper: { type: 'pointer', value: '/hasFeatureOfInterest' },
            },
            color: {
              type: 'pointer',
              value: '/options/color',
              wrapper: { type: 'pointer', value: '/hasFeatureOfInterest' },
            },
            shape: {
              type: 'pointer',
              value: '/options/shape',
            },
          },
        },
        dataMappings: [
          {
            propertyName: {
              type: 'pointer',
              value: '/yField',
            },
            value: ['min', 'percentile_25', 'median', 'percentile_75', 'max'],
            scope: 'data',
          },
        ],
      },
    },
  },
];

export const localChartsViewDescrs = [
  {
    '@id': 'mh:ChartView',
    '@type': 'rm:View',
    title: 'ProductAnalysis',
    description: 'Marketplace Product Analysis Time-series Charts',
    viewKind: 'rm:TimeSeriesViewKind',
    type: 'Chart', // control type
    // child ui elements configs
    options: {
      dateFormat: 'DD.MM.YYYY',
      timeUnit: 'day',
      axes: { yAxis: { primary: ['Price'], secondary: ['TotalSales'], ratio: 0.5 } },
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
              },
              region: {
                start: {
                  x: 0,
                  y: 0,
                },
                end: {
                  x: 0.33,
                  y: 1,
                },
              },
            },
            elements: [
              /**
               * Product 1
               */
              {
                '@id': 'rm:line_11', // machine-generated random UUID
                '@type': 'rm:Element',
                type: 'line', // TODO: +'Bar'/'Pie' (auxillary bars, auxillary lines)
                resultsScope: 'sosa:Observations_11_CollConstr', // reference to data
                options: {
                  label: 'Продукт 1', // TODO: in future should be a data-binding
                  color: '#4EEC1F',
                  lineWidth: 2,
                  shape: 'hvh',
                  // lineDash: '',
                },
              },
              /**
               * Product 2
               */
              {
                '@id': 'rm:line_21', // machine-generated random UUID
                '@type': 'rm:Element',
                type: 'line',
                resultsScope: 'sosa:Observations_21_CollConstr', // reference to data
                options: {
                  label: 'Продукт 2', // TODO: in future should be a data-binding
                  color: '#0B49F2',
                  lineWidth: 2,
                  shape: 'hvh',
                  // lineDash: '',
                },
              },
              /**
               * Product 3
               */
              {
                '@id': 'rm:line_31', // machine-generated random UUID
                '@type': 'rm:Element',
                type: 'line',
                resultsScope: 'sosa:Observations_31_CollConstr', // reference to data
                options: {
                  label: 'Продукт 3', // TODO: in future should be a data-binding
                  color: '#F20B93',
                  lineWidth: 2,
                  shape: 'hvh',
                  // lineDash: '',
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
              },
              region: {
                start: {
                  x: 0.33,
                  y: 0,
                },
                end: {
                  x: 0.66,
                  y: 1,
                },
              },
            },
            elements: [
              /**
               * Product 1
               */
              {
                '@id': 'rm:line_12', // machine-generated random UUID
                '@type': 'rm:Element',
                type: 'line', // TODO: +'Bar' (auxillary bars, auxillary lines)
                resultsScope: 'sosa:Observations_12_CollConstr', // reference to data
                options: {
                  label: 'Продукт 1', // TODO: in future should be a data-binding
                  color: '#4EEC1F',
                  lineWidth: 2,
                  // lineDash: '',
                },
              },
              /**
               * Product 2
               */
              {
                '@id': 'rm:line_22', // machine-generated random UUID
                '@type': 'rm:Element',
                type: 'line',
                resultsScope: 'sosa:Observations_22_CollConstr', // reference to data
                options: {
                  label: 'Продукт 2', // TODO: in future should be a data-binding
                  color: '#0B49F2',
                  lineWidth: 2,
                  // lineDash: '',
                },
              },
              /**
               * Product 3
               */
              {
                '@id': 'rm:line_32', // machine-generated random UUID
                '@type': 'rm:Element',
                type: 'line',
                resultsScope: 'sosa:Observations_32_CollConstr', // reference to data
                options: {
                  label: 'Продукт 3', // TODO: in future should be a data-binding
                  color: '#F20B93',
                  lineWidth: 2,
                  // lineDash: '',
                },
              },
            ],
          },
          {
            '@id': 'rm:BoxPlot_1',
            '@type': 'rm:BoxPlotTimeSeries',
            type: 'boxPlotTimeSeries',
            options: {
              region: {
                start: {
                  x: 0.66,
                  y: 0,
                },
                end: {
                  x: 1,
                  y: 1,
                },
              },
              dateFormat: 'DD.MM.YYYY',
              timeUnit: 'day',
              tooltip: {
                showMarkers: false,
                shared: false,
                showCrosshairs: false,
              },
            },
            elements: [
              /**
               * Product 1
               */
              {
                '@id': 'rm:box1', // machine-generated random UUID
                '@type': 'rm:BoxPlot',
                type: 'schema',
                resultsScope: 'mktp:BoxPlotBucket_0_CollConstr_1', // reference to data
                options: {
                  shape: 'box',
                  label: 'Massager of Neck Kneading', // TODO: in future should be a data-binding
                },
              },
            ],
          },
        ],
      },
    ],
    // datasets constraints, specific to this view (UML aggregation)
    collsConstrs: [
      /**
       * Product 1
       */
      {
        '@id': 'sosa:Observations_11_CollConstr', // machine-generated random UUID
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'sosa:Observations_11_EntConstr_0', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'sosa:Observations_11_EntConstr_0_Condition', // machine-generated random UUID
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'hs:Price',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
            },
          },
        ],
      },
      {
        '@id': 'sosa:Observations_12_CollConstr',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'sosa:Observations_12_EntConstr_0',
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'sosa:Observations_12_EntConstr_0_Condition',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'hs:TotalSales',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
            },
          },
        ],
      },
      /**
       * Product 2
       */
      {
        '@id': 'sosa:Observations_21_CollConstr',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'sosa:Observations_21_EntConstr_0',
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'sosa:Observations_21_EntConstr_0_Condition',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'hs:Price',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
            },
          },
        ],
      },
      {
        '@id': 'sosa:Observations_22_CollConstr',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'sosa:Observations_22_EntConstr_0',
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'sosa:Observations_22_EntConstr_0_Condition',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'hs:TotalSales',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
            },
          },
        ],
      },
      /**
       * Product 3
       */
      {
        '@id': 'sosa:Observations_31_CollConstr',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'sosa:Observations_31_EntConstr_0',
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'sosa:Observations_31_EntConstr_0_Condition',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'hs:Price',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
            },
          },
        ],
      },
      {
        '@id': 'sosa:Observations_32_CollConstr',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'sosa:Observations_32_EntConstr_0',
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'sosa:Observations_32_EntConstr_0_Condition',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'hs:TotalSales',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
            },
          },
        ],
      },
      /**
       * Product 1
       */
      {
        '@id': 'mktp:BoxPlotBucket_0_CollConstr_1', // machine-generated random UUID
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:BoxPlotBucket_0_CollConstr_0', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:BoxPlotBucket_0_CollConstr_0_0', // machine-generated random UUID
              '@type': 'rm:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Massager',
              forProperty: 'hs:Price',
            },
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
    ],
  },
  {
    '@id': 'mh:BoxPlot',
    '@type': 'rm:View',
    title: 'Разброс цены продукта, по маркетплейсам',
    description: 'Marketplace Product Analysis Box-Plot Charts',
    viewKind: 'rm:GroupedBoxPlotViewKind',
    //type: 'BoxPlotChart', // control type
    type: 'Chart', // control type
    // child ui elements configs
    options: {
      timeUnit: 'day',
      dateFormat: 'DD.MM.YYYY',
      groupField: 'source',
      showOutliers: true,
    },
    elements: [
      {
        '@id': 'rm:BoxPlot_1',
        '@type': 'rm:BoxPlotTimeSeries',
        type: 'boxPlotTimeSeries',
        options: {
          dateFormat: 'DD.MM.YYYY',
          timeUnit: 'day',
          tooltip: {
            showMarkers: false,
            shared: false,
            showCrosshairs: false,
          },
        },
        elements: [
          /**
           * Product 1
           */
          {
            '@id': 'rm:box1', // machine-generated random UUID
            '@type': 'rm:BoxPlot',
            type: 'schema',
            resultsScope: 'mktp:BoxPlotBucket_0_CollConstr', // reference to data
            options: {
              shape: 'box',
              label: 'Massager of Neck Kneading', // TODO: in future should be a data-binding
              //color: '#4EEC1F',
            },
          },
        ],
      },
    ],
    // datasets constraints, specific to this view (UML aggregation)
    collsConstrs: [
      /**
       * Product 1
       */
      {
        '@id': 'mktp:BoxPlotBucket_0_CollConstr', // machine-generated random UUID
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:BoxPlotBucket_0_CollConstr_0', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:BoxPlotBucket_0_CollConstr_0_0', // machine-generated random UUID
              '@type': 'rm:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Massager',
              forProperty: 'hs:Price',
            },
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
    ],
  },
];

/**
 * Product 1 https://www.wildberries.ru/catalog/15570386/detail.aspx?targetUrl=ST
 */
const viewDataObservations11 = [
  {
    '@id': 'Observation/10011',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
    observedProperty: 'hs:Price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 3599,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/10012',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
    observedProperty: 'hs:Price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1295,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/10013',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
    observedProperty: 'hs:Price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1245,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/10014',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
    observedProperty: 'hs:Price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1395,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/10015',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
    observedProperty: 'hs:Price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1495,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

const viewDataObservations12 = [
  {
    '@id': 'Observation/10021',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
    observedProperty: 'hs:TotalSales',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 10000,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/10022',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
    observedProperty: 'hs:TotalSales',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 16000,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/10023',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
    observedProperty: 'hs:TotalSales',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 18000,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/10024',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
    observedProperty: 'hs:TotalSales',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 14000,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/10025',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
    observedProperty: 'hs:TotalSales',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 12800,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

/**
 * Product 2 https://www.wildberries.ru/catalog/16170086/detail.aspx?targetUrl=SG
 */
const viewDataObservations21 = [
  {
    '@id': 'Observation/20011',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
    observedProperty: 'hs:Price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 4499,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/20012',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
    observedProperty: 'hs:Price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1259,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/20013',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
    observedProperty: 'hs:Price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1478,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/20014',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
    observedProperty: 'hs:Price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1478,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/20015',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
    observedProperty: 'hs:Price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1350,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

const viewDataObservations22 = [
  {
    '@id': 'Observation/20021',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
    observedProperty: 'hs:TotalSales',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 3000,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/20022',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
    observedProperty: 'hs:TotalSales',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 5900,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/20023',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
    observedProperty: 'hs:TotalSales',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 4800,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/20024',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
    observedProperty: 'hs:TotalSales',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 4700,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/20025',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
    observedProperty: 'hs:TotalSales',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 2700,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

/**
 * Product 3 https://www.wildberries.ru/catalog/15622789/detail.aspx?targetUrl=ST
 */
const viewDataObservations31 = [
  {
    '@id': 'Observation/30011',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
    observedProperty: 'hs:Price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1465,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/30012',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
    observedProperty: 'hs:Price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1195,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/30013',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
    observedProperty: 'hs:Price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 2020,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/30014',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
    observedProperty: 'hs:Price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 2300,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/30015',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
    observedProperty: 'hs:Price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 2350,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

const viewDataObservations32 = [
  {
    '@id': 'Observation/30021',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
    observedProperty: 'hs:TotalSales',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 4400,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/30022',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
    observedProperty: 'hs:TotalSales',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 6600,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/30023',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
    observedProperty: 'hs:TotalSales',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 7000,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/30024',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
    observedProperty: 'hs:TotalSales',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 6500,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/30025',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
    observedProperty: 'hs:TotalSales',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 6100,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

export const chartLocalRootModelState = {
  ...rootModelInitialState,
  schemas: {
    json: {
      [observationShape['@id']]: observationShape,
      [boxPlotBucketShape['@id']]: boxPlotBucketShape,
    },
  },
  colls: {
    // ViewDescr
    [viewDescrCollConstr['@id']]: {
      '@id': viewDescrCollConstr['@id'],
      collConstr: viewDescrCollConstr,
      dataIntrnl: localChartsViewDescrs,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    // ViewKindDescr
    [viewKindCollConstr['@id']]: {
      '@id': viewKindCollConstr['@id'],
      collConstr: viewKindCollConstr,
      dataIntrnl: timeSeriesViewKinds,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },

    // Data
    /**
     * Product 1
     */
    [localChartsViewDescrs[0].collsConstrs?.[0]['@id'] || '']: {
      '@id': localChartsViewDescrs[0].collsConstrs?.[0]['@id'],
      collConstr: localChartsViewDescrs[0].collsConstrs?.[0]['@id'], // reference by @id
      dataIntrnl: viewDataObservations11,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    [localChartsViewDescrs[0].collsConstrs?.[1]['@id'] || '']: {
      '@id': localChartsViewDescrs[0].collsConstrs?.[1]['@id'],
      collConstr: localChartsViewDescrs[0].collsConstrs?.[1]['@id'], // reference by @id
      dataIntrnl: viewDataObservations12,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    /**
     * Product 2
     */
    [localChartsViewDescrs[0].collsConstrs?.[2]['@id'] || '']: {
      '@id': localChartsViewDescrs[0].collsConstrs?.[2]['@id'],
      collConstr: localChartsViewDescrs[0].collsConstrs?.[2]['@id'], // reference by @id
      dataIntrnl: viewDataObservations21,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },

    [localChartsViewDescrs[0].collsConstrs?.[3]['@id'] || '']: {
      '@id': localChartsViewDescrs[0].collsConstrs?.[3]['@id'],
      collConstr: localChartsViewDescrs[0].collsConstrs?.[3]['@id'], // reference by @id
      dataIntrnl: viewDataObservations22,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    /**
     * Product 3
     */
    [localChartsViewDescrs[0].collsConstrs?.[4]['@id'] || '']: {
      '@id': localChartsViewDescrs[0].collsConstrs?.[4]['@id'],
      collConstr: localChartsViewDescrs[0].collsConstrs?.[4]['@id'], // reference by @id
      dataIntrnl: viewDataObservations31,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    [localChartsViewDescrs[0].collsConstrs?.[5]['@id'] || '']: {
      '@id': localChartsViewDescrs[0].collsConstrs?.[5]['@id'],
      collConstr: localChartsViewDescrs[0].collsConstrs?.[5]['@id'], // reference by @id
      dataIntrnl: viewDataObservations32,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    [localChartsViewDescrs[0].collsConstrs?.[6]['@id'] || '']: {
      '@id': localChartsViewDescrs[0].collsConstrs?.[6]['@id'],
      collConstr: localChartsViewDescrs[0].collsConstrs?.[6]['@id'], // reference by @id
      dataIntrnl: groupedBoxPlot,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    [localChartsViewDescrs[1].collsConstrs?.[0]['@id'] || '']: {
      '@id': localChartsViewDescrs[1].collsConstrs?.[0]['@id'],
      collConstr: localChartsViewDescrs[1].collsConstrs?.[0]['@id'], // reference by @id
      dataIntrnl: groupedBoxPlot,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
  },
};
