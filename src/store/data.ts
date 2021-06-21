/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import moment from 'moment';
import { rootModelInitialState } from '@agentlab/sparql-jsld-client';

export const viewKindCollConstr = {
  '@id': 'rm:ViewKinds_Coll',
  entConstrs: [
    {
      '@id': 'rm:ViewKinds_EntConstr0',
      schema: 'rm:ViewKindShape',
    },
  ],
};

export const viewDescrCollConstr = {
  '@id': 'rm:Views_Coll',
  entConstrs: [
    {
      '@id': 'rm:Views_EntConstr0',
      schema: 'rm:ViewShape',
    },
  ],
};

export const viewKinds = [
  {
    '@id': 'rm:TimeSeriesViewKind',
    '@type': 'rm:ViewKind',
    type: 'TimeSeriesChart', // control type
    options: {
      // TODO: primary/secondary properties? links to collsConstrs? Pass the entire options to the to-be rendered component?
    },
    mappings: {
      type: {
        type: 'pointer',
        value: '/type',
      },
      xField: 'resultTime',
      yField: {
        type: 'expr',
        value: '(v) => v.replace(/^[^#]*#/, "")',
        applyTo: '$.observedProperty',
        dataProperty: 'hasSimpleResult',
      },
      colorField: 'observedProperty',
      adjust: {
        type: 'object',
        properties: {
          type: 'dodge',
          marginRatio: 0,
        },
      },
      legend: {
        type: 'object',
        properties: {
          link: { type: 'pointer', value: '/hasFeatureOfInterest' },
          dataField: 'hasFeatureOfInterest',
          color: { type: 'pointer', value: '/options/color' },
          text: { type: 'pointer', value: '/options/label' },
        },
        wrapper: { type: 'pointer', value: '/hasFeatureOfInterest', options: true },
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
            wrapper: { type: 'pointer', value: '/observedProperty' },
          },
          shape: {
            type: 'pointer',
            value: '/options/shape',
          },
          color: {
            type: 'pointer',
            value: '/options/color',
            wrapper: { type: 'pointer', value: '/observedProperty' },
          },
        },
      },
    },
  },
];

const viewDescrs = [
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
      axes: { yAxis: { primary: ['price'], secondary: ['volume'], ratio: 0.5 } },
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
      {
        '@id': 'rm:line_12', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'interval', // TODO: +'Bar' (auxillary bars, auxillary lines)
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
      {
        '@id': 'rm:line_22', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'interval',
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
      {
        '@id': 'rm:line_32', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'interval',
        resultsScope: 'sosa:Observations_32_CollConstr', // reference to data
        options: {
          label: 'Продукт 3', // TODO: in future should be a data-binding
          color: '#F20B93',
          lineWidth: 2,
          // lineDash: '',
        },
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
              observedProperty: 'https://www.wildberries.ru/catalog/15570386#price',
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
              observedProperty: 'https://www.wildberries.ru/catalog/15570386#volume',
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
              observedProperty: 'https://www.wildberries.ru/catalog/16170086#price',
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
              observedProperty: 'https://www.wildberries.ru/catalog/16170086#volume',
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
              observedProperty: 'https://www.wildberries.ru/catalog/15622789#price',
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
              observedProperty: 'https://www.wildberries.ru/catalog/15622789#volume',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
            },
          },
        ],
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
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 3599,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/10012',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1295,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/10013',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1245,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/10014',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1395,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/10015',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1495,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

const viewDataObservations12 = [
  {
    '@id': 'Observation/10021',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 10000,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/10022',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 16000,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/10023',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 18000,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/10024',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 14000,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/10025',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#volume',
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
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 4499,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/20012',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1259,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/20013',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1478,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/20014',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1478,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/20015',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1350,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

const viewDataObservations22 = [
  {
    '@id': 'Observation/20021',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 3000,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/20022',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 5900,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/20023',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 4800,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/20024',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 4700,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/20025',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/16170086',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#volume',
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
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1465,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/30012',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1195,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/30013',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 2020,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/30014',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 2300,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/30015',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 2350,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

const viewDataObservations32 = [
  {
    '@id': 'Observation/30021',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 4400,
    resultTime: '2020-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/30022',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 6600,
    resultTime: '2020-06-07T12:36:12Z',
  },
  {
    '@id': 'Observation/30023',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 7000,
    resultTime: '2020-06-08T12:36:12Z',
  },
  {
    '@id': 'Observation/30024',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 6500,
    resultTime: '2020-06-09T12:36:12Z',
  },
  {
    '@id': 'Observation/30025',
    '@type': 'sosa:Observation',
    hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 6100,
    resultTime: '2020-06-10T12:36:12Z',
  },
];

export const rootModelState = {
  ...rootModelInitialState,
  colls: {
    // ViewDescr
    [viewDescrCollConstr['@id']]: {
      '@id': viewDescrCollConstr['@id'],
      collConstr: viewDescrCollConstr,
      dataIntrnl: viewDescrs,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    // ViewKindDescr
    [viewKindCollConstr['@id']]: {
      '@id': viewKindCollConstr['@id'],
      collConstr: viewKindCollConstr,
      dataIntrnl: viewKinds,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },

    // Data
    /**
     * Product 1
     */
    [viewDescrs[0].collsConstrs?.[0]['@id'] || '']: {
      '@id': viewDescrs[0].collsConstrs?.[0]['@id'],
      collConstr: viewDescrs[0].collsConstrs?.[0]['@id'], // reference by @id
      dataIntrnl: viewDataObservations11,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    [viewDescrs[0].collsConstrs?.[1]['@id'] || '']: {
      '@id': viewDescrs[0].collsConstrs?.[1]['@id'],
      collConstr: viewDescrs[0].collsConstrs?.[1]['@id'], // reference by @id
      dataIntrnl: viewDataObservations12,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    /**
     * Product 2
     */
    [viewDescrs[0].collsConstrs?.[2]['@id'] || '']: {
      '@id': viewDescrs[0].collsConstrs?.[2]['@id'],
      collConstr: viewDescrs[0].collsConstrs?.[2]['@id'], // reference by @id
      dataIntrnl: viewDataObservations21,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },

    [viewDescrs[0].collsConstrs?.[3]['@id'] || '']: {
      '@id': viewDescrs[0].collsConstrs?.[3]['@id'],
      collConstr: viewDescrs[0].collsConstrs?.[3]['@id'], // reference by @id
      dataIntrnl: viewDataObservations22,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    /**
     * Product 3
     */
    [viewDescrs[0].collsConstrs?.[4]['@id'] || '']: {
      '@id': viewDescrs[0].collsConstrs?.[4]['@id'],
      collConstr: viewDescrs[0].collsConstrs?.[4]['@id'], // reference by @id
      dataIntrnl: viewDataObservations31,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
    [viewDescrs[0].collsConstrs?.[5]['@id'] || '']: {
      '@id': viewDescrs[0].collsConstrs?.[5]['@id'],
      collConstr: viewDescrs[0].collsConstrs?.[5]['@id'], // reference by @id
      dataIntrnl: viewDataObservations32,
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
  },
};
