/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { viewDescrCollConstr, viewKindCollConstr } from '@agentlab/ldkg-ui-react';
import { CollState } from '@agentlab/sparql-jsld-client';
import { variable } from '@rdfjs/data-model';
import moment from 'moment';

export const remoteBoxPlotViewKinds = [
  {
    '@id': 'mktp:BoxPlotViewKind',
    '@type': 'aldkg:ViewKind',
    elements: [
      {
        '@id': 'mktp:BoxPlotChartViewKind',
        '@type': 'aldkg:BoxPlotChart', // control type
        options: {
          // TODO: primary/secondary properties? links to collsConstrs? Pass the entire options to the to-be rendered component?
        },
        mappings: {
          'aldkg:BoxPlotTimeSeries': {
            type: {
              type: 'pointer',
              value: '/type',
            },
            xField: 'begin',
            yField: 'value',
            outliersField: 'outliers',
            colorField: 'hasFeatureOfInterest',
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
    ],
  },
];

export const remoteBoxPlotViewDescrs = [
  {
    '@id': 'mktp:_g7H7gh',
    '@type': 'aldkg:ViewDescr',
    title: 'Массажная подушка роликовая, разброс складских остатков',
    description: 'Marketplace Product Analysis Box-Plot Charts',
    viewKind: 'mktp:BoxPlotViewKind',
    elements: [
      {
        '@id': 'mktp:_dj457gh_chart',
        //''@type': 'aldkg:BoxPlotChart', // control type
        '@type': 'aldkg:Chart', // control type
        '@parent': 'mktp:BoxPlotChartViewKind',
        title: 'Массажная подушка роликовая, разброс складских остатков',
        // child ui elements configs
        options: {
          timeUnit: 'day',
          dateFormat: 'DD.MM.YYYY',
          showOutliers: true,
        },
        elements: [
          {
            '@id': 'mktp:BoxPlot_1',
            '@type': 'aldkg:BoxPlotTimeSeries',
            options: {
              dateFormat: 'DD.MM.YYYY',
              timeUnit: 'day',
              tooltip: {
                showMarkers: false,
                shared: false,
                showCrosshairs: false,
              },
              legend: false,
            },
            elements: [
              //
              // Product 1
              //
              {
                '@id': 'mktp:box1', // machine-generated random UUID
                //TODO: Very strange name for this element type! Not something BoxPlot-related, but 'schema'?
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:_8uJ8t6', // reference to data
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
      //
      // Product 1
      //
      {
        '@id': 'mktp:_8uJ8t6', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg83', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/10322023/detail.aspx',
              forProperty: 'hs:Stocks',
              //hasUpperOutlier: '?eIri1',
              //hasLowerOutlier: '?eIri2',
            },
          },
          /*{
            '@id': 'mktp:_dfd8SDfg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'sosa:ObservationShape',
          },
          {
            '@id': 'mktp:_Jhd8fg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'sosa:ObservationShape',
          },*/
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
    ],
  },
  /*{
    '@id': 'mktp:_g7H7gh___Price',
    '@type': 'aldkg:ViewDescr',
    title: 'Массажная подушка роликовая, разброс цен',
    description: 'Marketplace Product Analysis Box-Plot Charts',
    viewKind: 'mktp:BoxPlotViewKind',
    //type: 'BoxPlotChart', // control type
    type: 'Chart', // control type
    // child ui elements configs
    options: {
      timeUnit: 'day',
      dateFormat: 'DD.MM.YYYY',
      axes: { yAxis: { primary: ['median'], secondary: ['max'], ratio: 0.5 } },
    },
    elements: [
      //
      // Product 1
      //
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
      //
      // Product 1
      //
      {
        '@id': 'mktp:_8uJ8t6__ee', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg83', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Massager',
              forProperty: 'hs:Price',
              hasUpperOutlier: '?eIri1',
              hasLowerOutlier: '?eIri2',
            },
          },
          {
            '@id': 'mktp:_dfd8SDfg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'sosa:ObservationShape',
          },
          {
            '@id': 'mktp:_Jhd8fg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
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
    '@type': 'aldkg:ViewDescr',
    title: 'Массажная подушка роликовая, Изменение объема продаж',
    description: 'Marketplace Product Analysis Box-Plot Charts',
    viewKind: 'mktp:BoxPlotViewKind',
    //type: 'BoxPlotChart', // control type
    type: 'Chart', // control type
    // child ui elements configs
    options: {
      timeUnit: 'day',
      dateFormat: 'DD.MM.YYYY',
      axes: { yAxis: { primary: ['median'], secondary: ['max'], ratio: 0.5 } },
    },
    elements: [
      //
      // Product 1
      //
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
      //
      // Product 1
      //
      {
        '@id': 'mktp:_8uJ8t6__ee2', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg83', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Massager',
              forProperty: 'hs:SalesAmountDiff',
              hasUpperOutlier: '?eIri1',
              hasLowerOutlier: '?eIri2',
            },
          },
          {
            '@id': 'mktp:_dfd8SDfg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'sosa:ObservationShape',
          },
          {
            '@id': 'mktp:_Jhd8fg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
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
    '@type': 'aldkg:ViewDescr',
    title: 'Массажная подушка роликовая, разброс кол-ва коментариев',
    description: 'Marketplace Product Analysis Box-Plot Charts',
    viewKind: 'mktp:BoxPlotViewKind',
    //type: 'BoxPlotChart', // control type
    type: 'Chart', // control type
    // child ui elements configs
    options: {
      timeUnit: 'day',
      dateFormat: 'DD.MM.YYYY',
      axes: { yAxis: { primary: ['median'], secondary: ['max'], ratio: 0.5 } },
    },
    elements: [
      //
      // Product 1
      //
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
      //
      // Product 1
      //
      {
        '@id': 'mktp:_8uJ8t6__ee3', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg83', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Massager',
              forProperty: 'hs:CommentsCount',
              hasUpperOutlier: '?eIri1',
              hasLowerOutlier: '?eIri2',
            },
          },
          {
            '@id': 'mktp:_dfd8SDfg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'sosa:ObservationShape',
          },
          {
            '@id': 'mktp:_Jhd8fg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'sosa:ObservationShape',
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
    ],
  },*/
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
      //resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
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
