/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import {
  antdCells,
  antdControlRenderers,
  antdDataControlRenderers,
  antdLayoutRenderers,
  createUiModelFromState,
  Form,
  MstContextProvider,
  registerMstViewKindSchema,
  RendererRegistryEntry,
  tableRenderers,
  viewDescrCollConstr,
  viewKindCollConstr,
} from '@agentlab/ldkg-ui-react';
import '@agentlab/ldkg-ui-react/es/index.css';
import { CollState, rootModelInitialState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';
import { variable } from '@rdfjs/data-model';
import { Meta, Story } from '@storybook/react';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import React from 'react';
import { Provider } from 'react-redux';
import { chartsRenderers } from '../src';
import { MstBoxPlotChartVKElement, MstTimeSeriesChartVKElement } from '../src/store/MstViewElements';

const buildCustomTooltip = (property: string) => (title: any, items: any) => {
  const data = items[0]?.data || {};
  return `<div><p><b>${title}</b></p><p>${property}: ${JSON.stringify(data[property])}</p><div>`;
};

export default {
  title: '2 Complex Controls/Tree-Chart',
  component: Form,
} as Meta;

const Template: Story = ({ additionalColls, viewDescrId, viewDescrCollId }: any) => {
  const renderers: RendererRegistryEntry[] = [
    ...antdControlRenderers,
    ...antdLayoutRenderers,
    ...antdDataControlRenderers,
    ...tableRenderers,
    ...chartsRenderers,
  ];
  registerMstViewKindSchema(MstTimeSeriesChartVKElement);
  registerMstViewKindSchema(MstBoxPlotChartVKElement);

  const client = new SparqlClientImpl(
    'https://rdf4j.agentlab.ru/rdf4j-server',
    'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp-schema/namespaces',
  );
  const rootStore = createUiModelFromState('mktp-fed', client, rootModelInitialState, additionalColls);
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);
  return (
    <div style={{ height: 'calc(100vh - 32px)' }}>
      <Provider store={store}>
        <MstContextProvider store={rootStore} renderers={renderers} cells={antdCells}>
          <Form viewDescrId={viewDescrId} viewDescrCollId={viewDescrCollId} />
        </MstContextProvider>
      </Provider>
    </div>
  );
};

const mktpSchemaRepoIri = 'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp-schema';
const mktpOntopRepoIri = 'http://192.168.1.33:8090/sparql';

///////////////////////////////////////////////
//  Markeplaces Categories and Cards
///////////////////////////////////////////////

const viewKindsCats = [
  {
    '@id': 'mktp:TreeTableChartViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'TreeTableChart',
    description: 'TreeTableChart',
    collsConstrs: [
      {
        '@id': 'mktp:Categories_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Categories_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:CategoryShape',
            service: mktpSchemaRepoIri,
          },
        ],
      },
    ],
    elements: [
      {
        '@id': 'mktp:_29kFg89',
        '@type': 'aldkg:VerticalLayout',
        elements: [
          {
            '@id': 'mktp:_934Jfg7',
            '@type': 'aldkg:SplitPaneLayout',
            options: {
              style: {
                width: '100%',
                //height: '20%',
              },
              height: 'all-empty-space',
              width: 'all-empty-space',
              defaultSize: {
                'mktp:_23sLhd67': '17%',
                'mktp:_94hfT67': '83%',
              },
            },
            elements: [
              {
                '@id': 'mktp:_23sLhd67',
                '@type': 'aldkg:DataControl',
                resultsScope: 'mktp:Categories_Coll',
                options: {
                  renderType: 'tree',
                  title: 'WildBerries',
                  treeNodeTitleKey: 'name',
                  treeNodeParentKey: 'SubcatInCatLink',
                  connections: [
                    { to: 'mktp:_u8Yg83_price', by: 'hasFeatureOfInterest' },
                    { to: 'mktp:_u8Yg83_TotalSales', by: 'hasFeatureOfInterest' },
                    { to: 'mktp:_sD7fg', by: 'svdDailyHasProduct' },
                    { to: 'mktp:_qw89Ds', by: 'svdWeeklyHasProduct' },
                    { to: 'mktp:_df8D78', by: 'svdMonthlyHasProduct' },
                  ],
                },
              },
              {
                '@id': 'mktp:_94hfT67',
                '@type': 'aldkg:VerticalLayout',
                options: {
                  style: {
                    width: '100%',
                  },
                  width: 'all-empty-space',
                },
                elements: [
                  //////////
                  // BoxPlots
                  //////////
                  {
                    '@id': 'mktp:BoxPlotChartViewKind_price',
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
                  {
                    '@id': 'mktp:BoxPlotChartViewKind_TotalSales',
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
            ],
          },
          {
            '@id': 'mktp:TreeTableChartVKElement',
            '@type': 'aldkg:TimeSeriesChart', // control type
            mappings: {
              'aldkg:TimeSeriesDaily': {
                '@id': 'mktp:Mapping_2',
                '@type': 'aldkg:TimeSeries',
                type: {
                  type: 'pointer',
                  value: '/type',
                },
                yField: 'svdDaily',
                xField: 'bucketEnd',
                colorField: 'svdDailyHasProduct',
                mapping: {
                  type: 'object',
                  properties: {
                    style: {
                      type: 'object',
                      properties: {
                        lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                        stroke: { type: 'pointer', value: '/options/stroke' },
                      },
                      wrapper: { type: 'pointer', value: '/svdDailyHasProduct' },
                    },
                    color: {
                      type: 'pointer',
                      value: '/options/color',
                      wrapper: { type: 'pointer', value: '/svdDailyHasProduct' },
                    },
                  },
                },
                dataMappings: [],
              },
              'aldkg:TimeSeriesWeekly': {
                '@id': 'mktp:Mapping_3',
                '@type': 'aldkg:TimeSeries',
                type: {
                  type: 'pointer',
                  value: '/type',
                },
                yField: 'svdWeekly',
                xField: 'bucketEnd',
                colorField: 'svdWeeklyHasProduct',
                mapping: {
                  type: 'object',
                  properties: {
                    style: {
                      type: 'object',
                      properties: {
                        lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                        stroke: { type: 'pointer', value: '/options/stroke' },
                      },
                      wrapper: { type: 'pointer', value: '/svdWeeklyHasProduct' },
                    },
                    color: {
                      type: 'pointer',
                      value: '/options/color',
                      wrapper: { type: 'pointer', value: '/svdWeeklyHasProduct' },
                    },
                  },
                },
                dataMappings: [],
              },
              'aldkg:TimeSeriesMonthly': {
                '@id': 'mktp:Mapping_4',
                '@type': 'aldkg:TimeSeries',
                type: {
                  type: 'pointer',
                  value: '/type',
                },
                yField: 'svdMonthly',
                xField: 'bucketEnd',
                colorField: 'svdMonthlyHasProduct',
                mapping: {
                  type: 'object',
                  properties: {
                    style: {
                      type: 'object',
                      properties: {
                        lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                        stroke: { type: 'pointer', value: '/options/stroke' },
                      },
                      wrapper: { type: 'pointer', value: '/svdMonthlyHasProduct' },
                    },
                    color: {
                      type: 'pointer',
                      value: '/options/color',
                      wrapper: { type: 'pointer', value: '/svdMonthlyHasProduct' },
                    },
                  },
                },
                dataMappings: [],
              },
            },
          },
        ],
      },
    ],
  },
];

const viewDescrsCats = [
  {
    '@id': 'mktp:_g7H7gh',
    '@type': 'aldkg:ViewDescr',
    title: 'Показатели продукта',
    viewKind: 'mktp:TreeTableChartViewKind',
    // datasets constraints, specific to this view (UML aggregation)
    collsConstrs: [
      //////////
      // BoxPlots
      //////////
      {
        '@id': 'mktp:_8uJ8t6_price', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg_price', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg83_price', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: undefined,
              forProperty: 'hs:Price',
              //hasUpperOutlier: '?eIri1',
              //hasLowerOutlier: '?eIri2',
            },
            service: mktpOntopRepoIri,
          },
          /*{
            '@id': 'mktp:_dfd8SDfg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'sosa:ObservationShape',
            service: mktpObservationIri,
          },
          {
            '@id': 'mktp:_Jhd8fg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'sosa:ObservationShape',
            service: mktpObservationIri,
          },*/
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      {
        '@id': 'mktp:_8uJ8t6_TotalSales', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg_TotalSales', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg83_TotalSales', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: undefined,
              forProperty: 'hs:TotalSales',
              //hasUpperOutlier: '?eIri1',
              //hasLowerOutlier: '?eIri2',
            },
            service: mktpOntopRepoIri,
          },
          /*{
            '@id': 'mktp:_dfd8SDfg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'sosa:ObservationShape',
            service: mktpObservationIri,
          },
          {
            '@id': 'mktp:_Jhd8fg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'sosa:ObservationShape',
            service: mktpObservationIri,
          },*/
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      ///////////
      // SVD
      //////////
      {
        '@id': 'mktp:_95fFg7', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_95fFg7', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:SvdDailyShape',
            conditions: {
              '@id': 'mktp:_sD7fg', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              svdDailyHasProduct: undefined,
              // we need here chart for property: svdDaily, not properties svdWeekly, svdMonthly
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd'), descending: false }],
      },
      {
        '@id': 'mktp:_aw34F3', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_Dfg87', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:SvdWeeklyShape',
            conditions: {
              '@id': 'mktp:_qw89Ds', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              svdWeeklyHasProduct: undefined,
              // we need here chart for property: svdWeekly
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd'), descending: false }],
      },
      {
        '@id': 'mktp:_34eF90', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf364r', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:SvdMonthlyShape',
            conditions: {
              '@id': 'mktp:_df8D78', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              svdMonthlyHasProduct: undefined,
              // we need here chart for property: svdMonthly
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd'), descending: false }],
      },
    ],
    elements: [
      {
        '@id': 'mktp:_g7H7gh_chart',
        '@type': 'aldkg:Chart',
        '@parent': 'mktp:TreeTableChartVKElement',
        resultsScope: 'mktp:_95fFg7',
        title: 'Показатели продукта',
        options: {
          timeUnit: 'day',
          height: 800,
          dateFormat: 'DD.MM.YYYY',
          //interactions: [{ type: 'sibling-tooltip' }],
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
                '@id': 'mktp:TimeSeries_Price_Daily',
                '@type': 'aldkg:TimeSeriesDaily',
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
                      x: 1,
                      y: 0.32,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_price_daily',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_95fFg7',
                    options: {
                      color: '#FFE0C7',
                      lineWidth: 2,
                      stroke: '#FFE0C7',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Price_Weekly',
                '@type': 'aldkg:TimeSeriesWeekly',
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
                      y: 0.34,
                    },
                    end: {
                      x: 1,
                      y: 0.65,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_price_weekly',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_aw34F3',
                    options: {
                      color: '#FF99C3',
                      lineWidth: 2,
                      stroke: '#FF99C3',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Price_Monthly',
                '@type': 'aldkg:TimeSeriesMonthly',
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
                      y: 0.67,
                    },
                    end: {
                      x: 1,
                      y: 1,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_price_monthly',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_34eF90',
                    options: {
                      color: '#BBDEDE',
                      lineWidth: 2,
                      stroke: '#BBDEDE',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      ///////
      // BoxPlots
      ////////
      {
        '@id': 'mktp:_dj457gh_chart_price',
        //''@type': 'aldkg:BoxPlotChart', // control type
        '@type': 'aldkg:Chart', // control type
        '@parent': 'mktp:BoxPlotChartViewKind_price',
        title: 'Массажная подушка роликовая, разброс складских остатков',
        // child ui elements configs
        options: {
          timeUnit: 'day',
          dateFormat: 'DD.MM.YYYY',
          showOutliers: true,
        },
        elements: [
          {
            '@id': 'mktp:BoxPlot_1_price',
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
                '@id': 'mktp:box1_price', // machine-generated random UUID
                //TODO: Very strange name for this element type! Not something BoxPlot-related, but 'schema'?
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:_8uJ8t6_price', // reference to data
                options: {
                  shape: 'box',
                  label: 'Massager of Neck Kneading', // TODO: in future should be a data-binding
                },
              },
            ],
          },
        ],
      },
      {
        '@id': 'mktp:_dj457gh_chart_TotalSales',
        //''@type': 'aldkg:BoxPlotChart', // control type
        '@type': 'aldkg:Chart', // control type
        '@parent': 'mktp:BoxPlotChartViewKind_TotalSales',
        title: 'Массажная подушка роликовая, разброс складских остатков',
        // child ui elements configs
        options: {
          timeUnit: 'day',
          dateFormat: 'DD.MM.YYYY',
          showOutliers: true,
        },
        elements: [
          {
            '@id': 'mktp:BoxPlot_1_TotalSales',
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
                '@id': 'mktp:box1_TotalSales', // machine-generated random UUID
                //TODO: Very strange name for this element type! Not something BoxPlot-related, but 'schema'?
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:_8uJ8t6_TotalSales', // reference to data
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
  },
];

/**
 * Collections Configs Data
 */
const additionalCollsCats: CollState[] = [
  // ViewKinds Collection
  {
    constr: viewKindCollConstr,
    data: viewKindsCats,
    opt: {
      updPeriod: undefined,
      lastSynced: Date.now(),
      //resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
    },
  },
  // ViewDescrs Collection
  {
    constr: viewDescrCollConstr,
    data: viewDescrsCats,
    opt: {
      updPeriod: undefined,
      lastSynced: Date.now(),
      //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
      // for viewDescrs.collConstrs (it loads lazily -- after the first access)
    },
  },
];

export const MktpCategories = Template.bind({});
MktpCategories.args = {
  additionalColls: additionalCollsCats,
  viewDescrId: viewDescrsCats[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};
