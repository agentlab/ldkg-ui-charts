import moment from 'moment';
import { when } from 'mobx';

import { SparqlClient, JsObject, Repository } from '@agentlab/sparql-jsld-client';

import { viewDescrCollConstr, viewKindCollConstr, viewKinds } from './data';

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
      axes: { yAxis: { primary: ['price'], secondary: ['totalSales'], ratio: 0.5 } },
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
          label: 'Цена Продукт 1', // TODO: in future should be a data-binding
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
          label: 'Объем продаж Продукт 1', // TODO: in future should be a data-binding
          color: '#4EEC1F',
          lineWidth: 2,
          // lineDash: '',
        },
      },
      /**
       * Product 2
       */
      /*{
        '@id': 'rm:line_21', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'line',
        resultsScope: 'sosa:Observations_21_CollConstr', // reference to data
        options: {
          label: 'Цена Продукт 2', // TODO: in future should be a data-binding
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
          label: 'Объем продаж Продукт 2', // TODO: in future should be a data-binding
          color: '#0B49F2',
          lineWidth: 2,
          // lineDash: '',
        },
      },*/
      /**
       * Product 3
       */
      /*{
        '@id': 'rm:line_31', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'line',
        resultsScope: 'sosa:Observations_31_CollConstr', // reference to data
        options: {
          label: 'Цена Продукт 3', // TODO: in future should be a data-binding
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
          label: 'Объем продаж Продукт 3', // TODO: in future should be a data-binding
          color: '#F20B93',
          lineWidth: 2,
          // lineDash: '',
        },
      },*/
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
              observedProperty: 'https://huntersales.ru/catalog/products/18247707/prop#price',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/18247707/detail.aspx',
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
              observedProperty: 'https://huntersales.ru/catalog/products/18247707/prop#totalSales',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/18247707/detail.aspx',
            },
          },
        ],
      },
      /**
       * Product 2
       */
      /*{
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
              observedProperty: 'https://huntersales.ru/catalog/products/18247707/prop#price',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/18247707/detail.aspx',
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
              observedProperty: 'https://huntersales.ru/catalog/products/18247707/prop#totalSales',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/18247707/detail.aspx',
            },
          },
        ],
      },*/
      /**
       * Product 3
       */
      /*{
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
              observedProperty: 'https://huntersales.ru/catalog/products/18247707/prop#price',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/18247707/detail.aspx',
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
              observedProperty: 'https://huntersales.ru/catalog/products/18247707/prop#totalSales',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/18247707/detail.aspx',
            },
          },
        ],
      },*/
    ],
  },
];

export const additionalColls: CollState[] = [
  // ViewKindDescr
  {
    constr: viewKindCollConstr,
    data: viewKinds,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
  },
  // ViewDescr
  {
    constr: viewDescrCollConstr,
    data: viewDescrs,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      //resolveCollConstrs: false,
    },
  },
];

export interface CollState {
  constr: any;
  data: JsObject[];
  opt?: JsObject;
}

export const createModelFromState = (
  repId: string,
  client: SparqlClient,
  initialState: any,
  additionalColls: CollState[] | undefined = undefined,
): any => {
  //@ts-ignore
  const model = Repository.create(initialState, { client });
  model.setId(repId);
  model.ns.reloadNs();
  //console.log(mstSchemas);
  if (additionalColls && additionalColls.length > 0) {
    // wait until namespaces loads then add additionalState
    when(
      () => Object.keys(model.ns.currentJs).length > 5,
      () => {
        additionalColls.forEach((collState) => {
          if (model.getColl(collState.constr['@id']) === undefined) {
            try {
              const coll = model.addColl(collState.constr, collState.opt, collState.data);
              if (!coll) {
                console.warn(`Warn: Coll insertion failed! Coll ${collState.constr['@id']} is undefined`);
              }
            } catch (err) {
              console.error(`Err: Coll insertion failed! Coll ${collState.constr['@id']} is undefined`);
              console.error(err);
            }
          }
        });
      },
    );
  }
  return model;
};
