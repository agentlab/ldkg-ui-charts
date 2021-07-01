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

import { viewDescrCollConstr, viewKindCollConstr } from './data';

const remoteBoxPlotViewKinds = [
  {
    '@id': 'rm:BoxPlotViewKind',
    '@type': 'rm:ViewKind',
    //type: 'BoxPlotChart', // control type
    type: 'BoxPlotChart', // control type
    options: {
      // TODO: primary/secondary properties? links to collsConstrs? Pass the entire options to the to-be rendered component?
    },
    mappings: {
      type: {
        type: 'pointer',
        value: '/type',
      },
      xField: 'begin',
      yField: ['min', 'percentile_25', 'median', 'percentile_75', 'max'],
      colorField: 'forProperty',
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
            },
            wrapper: { type: 'pointer', value: '/hasFeatureOfInterest' },
          },
          color: {
            type: 'pointer',
            value: '/options/color',
            wrapper: { type: 'pointer', value: '/hasFeatureOfInterest' },
          },
        },
      },
    },
  },
];

const remoteBoxPlotViewDescrs = [
  {
    '@id': 'mktp:_g7H7gh',
    '@type': 'rm:View',
    title: 'Массажная подушка роликовая, разброс складских остатков',
    description: 'Marketplace Product Analysis Box-Plot Charts',
    viewKind: 'rm:BoxPlotViewKind',
    //type: 'BoxPlotChart', // control type
    type: 'Chart', // control type
    // child ui elements configs
    options: {
      timeUnit: 'day',
      dateFormat: 'DD.MM.YYYY',
      showOutliers: true,
    },
    elements: [
      /**
       * Product 1
       */
      {
        '@id': 'rm:box1', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'line', // TODO: +'Bar'/'Pie' (auxillary bars, auxillary lines)
        resultsScope: 'mktp:_8uJ8t6', // reference to data
        options: {
          label: 'Massager of Neck Kneading', // TODO: in future should be a data-binding
          color: '#4EEC1F',
          lineWidth: 2,
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
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg83', // machine-generated random UUID
              '@type': 'rm:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Massager',
              forProperty: 'hs:Stocks',
              hasUpperOutlier: '?eIri1',
              hasLowerOutlier: '?eIri2',
            },
          },
          {
            '@id': 'mktp:_dfd8SDfg', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
          },
          {
            '@id': 'mktp:_Jhd8fg', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
    ],
  },
  {
    '@id': 'mktp:_g7H7gh___Price',
    '@type': 'rm:View',
    title: 'Массажная подушка роликовая, разброс цен',
    description: 'Marketplace Product Analysis Box-Plot Charts',
    viewKind: 'rm:BoxPlotViewKind',
    //type: 'BoxPlotChart', // control type
    type: 'Chart', // control type
    // child ui elements configs
    options: {
      timeUnit: 'day',
      dateFormat: 'DD.MM.YYYY',
      axes: { yAxis: { primary: ['median'], secondary: ['max'], ratio: 0.5 } },
    },
    elements: [
      /**
       * Product 1
       */
      {
        '@id': 'rm:line_11', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'line', // TODO: +'Bar'/'Pie' (auxillary bars, auxillary lines)
        resultsScope: 'mktp:_8uJ8t6__ee', // reference to data
        options: {
          label: 'Massager of Neck Kneading', // TODO: in future should be a data-binding
          color: '#4EEC1F',
          lineWidth: 2,
          shape: 'hvh',
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
        '@id': 'mktp:_8uJ8t6__ee', // machine-generated random UUID
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg83', // machine-generated random UUID
              '@type': 'rm:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Massager',
              forProperty: 'hs:Price',
              hasUpperOutlier: '?eIri1',
              hasLowerOutlier: '?eIri2',
            },
          },
          {
            '@id': 'mktp:_dfd8SDfg', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
          },
          {
            '@id': 'mktp:_Jhd8fg', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
    ],
  },
  ///////////////////
  {
    '@id': 'mktp:_g7H7gh___salesAmountDiff',
    '@type': 'rm:View',
    title: 'Массажная подушка роликовая, Изменение объема продаж',
    description: 'Marketplace Product Analysis Box-Plot Charts',
    viewKind: 'rm:BoxPlotViewKind',
    //type: 'BoxPlotChart', // control type
    type: 'Chart', // control type
    // child ui elements configs
    options: {
      timeUnit: 'day',
      dateFormat: 'DD.MM.YYYY',
      axes: { yAxis: { primary: ['median'], secondary: ['max'], ratio: 0.5 } },
    },
    elements: [
      /**
       * Product 1
       */
      {
        '@id': 'rm:line_11', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'line', // TODO: +'Bar'/'Pie' (auxillary bars, auxillary lines)
        resultsScope: 'mktp:_8uJ8t6__ee2', // reference to data
        options: {
          label: 'Massager of Neck Kneading', // TODO: in future should be a data-binding
          color: '#4EEC1F',
          lineWidth: 2,
          shape: 'hvh',
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
        '@id': 'mktp:_8uJ8t6__ee2', // machine-generated random UUID
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg83', // machine-generated random UUID
              '@type': 'rm:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Massager',
              forProperty: 'hs:SalesAmountDiff',
              hasUpperOutlier: '?eIri1',
              hasLowerOutlier: '?eIri2',
            },
          },
          {
            '@id': 'mktp:_dfd8SDfg', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
          },
          {
            '@id': 'mktp:_Jhd8fg', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
    ],
  },
  //////////
  {
    '@id': 'mktp:_g7H7gh___CommentsCount',
    '@type': 'rm:View',
    title: 'Массажная подушка роликовая, разброс кол-ва коментариев',
    description: 'Marketplace Product Analysis Box-Plot Charts',
    viewKind: 'rm:BoxPlotViewKind',
    //type: 'BoxPlotChart', // control type
    type: 'Chart', // control type
    // child ui elements configs
    options: {
      timeUnit: 'day',
      dateFormat: 'DD.MM.YYYY',
      axes: { yAxis: { primary: ['median'], secondary: ['max'], ratio: 0.5 } },
    },
    elements: [
      /**
       * Product 1
       */
      {
        '@id': 'rm:line_11', // machine-generated random UUID
        '@type': 'rm:Element',
        type: 'line', // TODO: +'Bar'/'Pie' (auxillary bars, auxillary lines)
        resultsScope: 'mktp:_8uJ8t6__ee3', // reference to data
        options: {
          label: 'Massager of Neck Kneading', // TODO: in future should be a data-binding
          color: '#4EEC1F',
          lineWidth: 2,
          shape: 'hvh',
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
        '@id': 'mktp:_8uJ8t6__ee3', // machine-generated random UUID
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg83', // machine-generated random UUID
              '@type': 'rm:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Massager',
              forProperty: 'hs:CommentsCount',
              hasUpperOutlier: '?eIri1',
              hasLowerOutlier: '?eIri2',
            },
          },
          {
            '@id': 'mktp:_dfd8SDfg', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
          },
          {
            '@id': 'mktp:_Jhd8fg', // machine-generated random UUID
            '@type': 'rm:EntConstr',
            schema: 'sosa:ObservationShape',
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
    ],
  },
];

/**
 * Collections Configs Data
 */
export const additionalBoxplotColls: CollState[] = [
  // ViewKinds Collection
  {
    constr: viewKindCollConstr,
    data: remoteBoxPlotViewKinds,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
    },
  },
  // ViewDescrs Collection
  {
    constr: viewDescrCollConstr,
    data: remoteBoxPlotViewDescrs,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
      // for viewDescrs.collConstrs (it loads lazily -- after the first access)
    },
  },
];
