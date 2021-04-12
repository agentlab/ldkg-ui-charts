import moment from 'moment';

const viewDescrCollConstr = {
  '@id': 'rm:Views_Coll',
  entConstrs: [
    {
      '@id': 'rm:Views_EntConstr0',
      schema: 'rm:ViewShape',
    },
  ],
};

const viewDescrs = [
  {
    '@id': 'mh:ChartView',
    '@type': 'rm:View',
    title: 'ProductAnalysis',
    description: 'Marketplace Product Analysis Time-series Charts',
    //viewKind: viewKinds[0]['@id'],
    type: 'TimeSeriesChart', // control type
    options: {},
    // child ui elements configs
    elements: [
      /**
       * Product 1
       */
      {
        '@id': 'rm:Line_11', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'Line',
        resultsScope: 'rm:Observations_11_CollConstr', // reference to data
        options: {
          label: 'Цена Продукт 1', // TODO: in future should be a data-binding
          color: '#e5e5e5',
          lineWidth: 1,
          //lineDash: '',
        },
      },
      {
        '@id': 'rm:Line_12', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'Line',
        resultsScope: 'rm:Observations_12_CollConstr', // reference to data
        options: {
          label: 'Объем продаж Продукт 1', // TODO: in future should be a data-binding
          color: '#e5e5e5',
          lineWidth: 1,
          //lineDash: '',
        },
      },
      /**
       * Product 2
       */
      {
        '@id': 'rm:Line_21', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'Line',
        resultsScope: 'rm:Observations_21_CollConstr', // reference to data
        options: {
          label: 'Цена Продукт 2', // TODO: in future should be a data-binding
          color: '#e5e5e5',
          lineWidth: 1,
          //lineDash: '',
        },
      },
      {
        '@id': 'rm:Line_22', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'Line',
        resultsScope: 'rm:Observations_22_CollConstr', // reference to data
        options: {
          label: 'Объем продаж Продукт 2', // TODO: in future should be a data-binding
          color: '#e5e5e5',
          lineWidth: 1,
          //lineDash: '',
        },
      },
      /**
       * Product 3
       */
      {
        '@id': 'rm:Line_31', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'Line',
        resultsScope: 'rm:Observations_31_CollConstr', // reference to data
        options: {
          label: 'Цена Продукт 3', // TODO: in future should be a data-binding
          color: '#e5e5e5',
          lineWidth: 1,
          //lineDash: '',
        },
      },
      {
        '@id': 'rm:Line_32', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'Line',
        resultsScope: 'rm:Observations_32_CollConstr', // reference to data
        options: {
          label: 'Объем продаж Продукт 3', // TODO: in future should be a data-binding
          color: '#e5e5e5',
          lineWidth: 1,
          //lineDash: '',
        },
      },
    ],
    // datasets constraints, specific to this view (UML aggregation)
    collsConstrs: [
      /**
       * Product 1
       */
      {
        '@id': 'es:Observations_11_CollConstr', // machine-generated random UUID
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'es:Observations_11_EntConstr_0', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'es:ObservationShape',
            conditions: {
              '@id': 'es:Observations_11_EntConstr_0_Condition', // machine-generated random UUID
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://www.wildberries.ru/catalog/15570386#price',
            },
          },
        ],
      },
      {
        '@id': 'es:Observations_12_CollConstr',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'es:Observations_12_EntConstr_0',
            '@type': 'rm:EntConstr',
            schema: 'es:ObservationShape',
            conditions: {
              '@id': 'es:Observations_12_EntConstr_0_Condition',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://www.wildberries.ru/catalog/15570386#volume',
            },
          },
        ],
      },
      /**
       * Product 2
       */
      {
        '@id': 'es:Observations_21_CollConstr',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'es:Observations_21_EntConstr_0',
            '@type': 'rm:EntConstr',
            schema: 'es:ObservationShape',
            conditions: {
              '@id': 'es:Observations_21_EntConstr_0_Condition',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://www.wildberries.ru/catalog/16170086#price',
            },
          },
        ],
      },
      {
        '@id': 'es:Observations_22_CollConstr',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'es:Observations_22_EntConstr_0',
            '@type': 'rm:EntConstr',
            schema: 'es:ObservationShape',
            conditions: {
              '@id': 'es:Observations_22_EntConstr_0_Condition',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://www.wildberries.ru/catalog/16170086#volume',
            },
          },
        ],
      },
      /**
       * Product 3
       */
      {
        '@id': 'es:Observations_31_CollConstr',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'es:Observations_31_EntConstr_0',
            '@type': 'rm:EntConstr',
            schema: 'es:ObservationShape',
            conditions: {
              '@id': 'es:Observations_31_EntConstr_0_Condition',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://www.wildberries.ru/catalog/15622789#price',
            },
          },
        ],
      },
      {
        '@id': 'es:Observations_32_CollConstr',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'es:Observations_32_EntConstr_0',
            '@type': 'rm:EntConstr',
            schema: 'es:ObservationShape',
            conditions: {
              '@id': 'es:Observations_32_EntConstr_0_Condition',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://www.wildberries.ru/catalog/15622789#volume',
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
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 3599,
    resultTime: '2019-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/10012',
    '@type': 'sosa:Observation',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1295,
    resultTime: '2020-04-12T12:36:12Z',
  },
];

const viewDataObservations12 = [
  {
    '@id': 'Observation/10021',
    '@type': 'sosa:Observation',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 13000,
    resultTime: '2019-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/10022',
    '@type': 'sosa:Observation',
    observedProperty: 'https://www.wildberries.ru/catalog/15570386#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 16000,
    resultTime: '2020-04-12T12:36:12Z',
  },
];

/**
 * Product 2 https://www.wildberries.ru/catalog/16170086/detail.aspx?targetUrl=SG
 */
const viewDataObservations21 = [
  {
    '@id': 'Observation/20011',
    '@type': 'sosa:Observation',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 4499,
    resultTime: '2019-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/20012',
    '@type': 'sosa:Observation',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1259,
    resultTime: '2020-04-12T12:36:12Z',
  },
];

const viewDataObservations22 = [
  {
    '@id': 'Observation/20021',
    '@type': 'sosa:Observation',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 3000,
    resultTime: '2019-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/20022',
    '@type': 'sosa:Observation',
    observedProperty: 'https://www.wildberries.ru/catalog/16170086#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 5900,
    resultTime: '2020-04-12T12:36:12Z',
  },
];

/**
 * Product 3 https://www.wildberries.ru/catalog/15622789/detail.aspx?targetUrl=ST
 */
const viewDataObservations31 = [
  {
    '@id': 'Observation/30011',
    '@type': 'sosa:Observation',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1465,
    resultTime: '2019-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/30012',
    '@type': 'sosa:Observation',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#price',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 1195,
    resultTime: '2020-04-12T12:36:12Z',
  },
];

const viewDataObservations32 = [
  {
    '@id': 'Observation/30021',
    '@type': 'sosa:Observation',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 4400,
    resultTime: '2019-06-06T12:36:12Z',
  },
  {
    '@id': 'Observation/30022',
    '@type': 'sosa:Observation',
    observedProperty: 'https://www.wildberries.ru/catalog/15622789#volume',
    madeBySensor: 'scrapers/35',
    hasSimpleResult: 6600,
    resultTime: '2020-04-12T12:36:12Z',
  },
];

export const rootModelState = {
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
    //[viewKindCollConstr['@id']]: {
    //	'@id': viewKindCollConstr['@id'],
    //	collConstr: viewKindCollConstr,
    //	dataIntrnl: viewKinds,
    //	updPeriod: undefined,
    //	lastSynced: moment.now(),
    //	resolveCollConstrs: false,
    //},

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
