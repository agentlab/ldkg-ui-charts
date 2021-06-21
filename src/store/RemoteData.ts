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
import { variable } from '@rdfjs/data-model';

import { CollState } from '@agentlab/sparql-jsld-client';

import { viewDescrCollConstr, viewKindCollConstr, viewKinds } from './data';

const viewDescrs = [
  {
    '@id': 'mktp:_g7H7gh',
    '@type': 'rm:View',
    title: 'ProductAnalysis',
    description: 'Marketplace Product Analysis Time-series Charts',
    viewKind: 'rm:TimeSeriesViewKind',
    type: 'Chart', // control type
    // child ui elements configs
    options: {
      timeUnit: 'day',
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
        resultsScope: 'mktp:_8uJ8t6', // reference to data
        options: {
          label: 'Massager of Neck Kneading', // TODO: in future should be a data-binding
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
        resultsScope: 'mktp:_Kj8d6g5', // reference to data
        options: {
          label: 'Massager of Neck Kneading', // TODO: in future should be a data-binding
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
        resultsScope: 'mktp:_d6Ghkj', // reference to data
        options: {
          label: 'Подушка Relax Massage', // TODO: in future should be a data-binding
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
        resultsScope: 'mktp:_sD678hf', // reference to data
        options: {
          label: 'Подушка Relax Massage', // TODO: in future should be a data-binding
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
        resultsScope: 'mktp:_Kh56Df67', // reference to data
        options: {
          label: 'Подушка HappyGoods', // TODO: in future should be a data-binding
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
        resultsScope: 'mktp:_sd56Fg78', // reference to data
        options: {
          label: 'Подушка HappyGoods', // TODO: in future should be a data-binding
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
        '@id': 'mktp:_8uJ8t6', // machine-generated random UUID
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'mktp:_u8Yg83', // machine-generated random UUID
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://huntersales.ru/catalog/products/18247707/prop#price',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/18247707/detail.aspx',
            },
          },
        ],
        orderBy: [{ expression: variable('resultTime0'), descending: false }],
      },
      {
        '@id': 'mktp:_Kj8d6g5',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_sD529gk',
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'mktp:_kj89Df7',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://huntersales.ru/catalog/products/18247707/prop#totalSales',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/18247707/detail.aspx',
            },
          },
        ],
        orderBy: [{ expression: variable('resultTime0'), descending: false }],
      },
      /**
       * Product 2
       */
      {
        '@id': 'mktp:_d6Ghkj',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_df67Gf8',
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'mktp:_ld35Fcs',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://huntersales.ru/catalog/products/15570386/prop#price',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
            },
          },
        ],
        orderBy: [{ expression: variable('resultTime0'), descending: false }],
      },
      {
        '@id': 'mktp:_sD678hf',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_98Kg8Gf',
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'mktp:_kj89dF5',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://huntersales.ru/catalog/products/15570386/prop#totalSales',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15570386/detail.aspx',
            },
          },
        ],
        orderBy: [{ expression: variable('resultTime0'), descending: false }],
      },
      /**
       * Product 3
       */
      {
        '@id': 'mktp:_Kh56Df67',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_jd8Hd7w',
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'mktp:_dj7Dsg9',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://huntersales.ru/catalog/products/15622789/prop#price',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
            },
          },
        ],
        orderBy: [{ expression: variable('resultTime0'), descending: false }],
      },
      {
        '@id': 'mktp:_sd56Fg78',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_kf8Sdf',
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
            conditions: {
              '@id': 'mktp:_sd9D8hc',
              '@type': 'rm:EntConstrCondition',
              observedProperty: 'https://huntersales.ru/catalog/products/15622789/prop#totalSales',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
            },
          },
        ],
        orderBy: [{ expression: variable('resultTime0'), descending: false }],
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
    data: viewKinds,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
    },
  },
  // ViewDescrs Collection
  {
    constr: viewDescrCollConstr,
    data: viewDescrs,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
      // for viewDescrs.collConstrs (it loads lazily -- after the first access)
    },
  },
];
