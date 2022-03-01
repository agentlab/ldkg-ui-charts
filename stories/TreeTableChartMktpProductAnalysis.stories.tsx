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

const buildCustomTooltip = (property: string) => (title: string, items: any[]) => {
  const tooltipItems = items
    .map((item) => {
      const { name, value, color } = item;
      return `<div><span style="height: 0.8em; width: 0.8em; border-radius: 50%; background-color: ${color}; display: inline-block;"></span></div><div><h4>${
        categoryNames[name] || name
      }</h4></div><div style="margin-left: 1em">${value}</div>`;
    })
    .join('');
  return `<div style="padding: 1.5em"><h3>${title}</h3><p>${property} : MIN-Q1-Q2-Q3-MAX</p><div style="display: grid; grid-template-columns: 1.5em 2fr 1fr;">${tooltipItems}</div><div>`;
};

const categoryNames: any = {
  'mktp_d:Toys': 'Игрушки - наш продукт',
  'mktp_d:AntistressToys': 'Игрушки антистресс - наш продукт',
  'mktp_d:SimpleDimple': 'Симпл-Димпл (Simple Dimple) - наш продукт',
  'mktp_d:PopIt': 'Поп ит! (Pop It!) - наш продукт',
  'mktp_d:Slime': 'Слайм (Slime) - наш продукт',
  'mktp_d:Squishy': 'Сквиш (Squishy) - наш продукт',
  'mktp_d:FidgetSpinner': 'Спиннер (Fidget Spinner) - наш продукт',
  'mktp_d:Blaster': 'Стреляющий зверь (Blaster) - наш продукт',
  'mktp_d:ScreamingPals': 'Крикуны (Screaming Pals) - наш продукт',
  'mktp_d:Magnets': 'Магниты (Magnets) - наш продукт',
  'mktp_d:Pinart': 'Пин-арт (Pinart) - наш продукт',
  'mktp_d:Stretcher': 'Стрейчер (Stretcher) - наш продукт',
  'mktp_d:FingerBoard': 'Фингенборд (Finger Board) - наш продукт',
  'mktp_d:FlourBall': 'Мучной шарик (flour ball) - наш продукт',
  'https://www.wildberries.ru/catalog/igrushki/antistress': 'Игрушки антистресс - WB категория',
};

export default {
  title: '3 Complex Controls/Tree-Table-Chart',
  component: Form,
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta;

const Template: Story = ({ additionalColls, viewDescrId, viewDescrCollId }: any) => {
  const renderers: RendererRegistryEntry[] = [
    ...antdControlRenderers,
    ...antdLayoutRenderers,
    ...antdDataControlRenderers,
    ...tableRenderers,
    ...chartsRenderers,
  ];

  const client = new SparqlClientImpl(
    'https://rdf4j.agentlab.ru/rdf4j-server',
    'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp-schema/namespaces',
  );
  const rootStore = createUiModelFromState('mktp-fed', client, rootModelInitialState, additionalColls);
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);
  return (
    <div style={{ height: 'calc(250vh - 32px)' }}>
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

const viewKindsProds = [
  {
    '@id': 'mktp:TreeTableChartProdsViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'TreeTableChart',
    description: 'TreeTableChart',
    collsConstrs: [
      {
        '@id': 'mktp:Products_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Products_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:ProductShape',
            service: mktpSchemaRepoIri,
          },
        ],
      },
      {
        '@id': 'mktp:Product_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Product_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:ProductShape',
            conditions: {
              '@id': 'mktp:Product_Cond',
              '@_id': 'mktp_d:Toys',
            },
            service: mktpSchemaRepoIri,
          },
        ],
      },
      {
        '@id': 'mktp:WB_Select_ProductCards_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:WB_Select_ProductCards_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:ProductCardShape',
            conditions: {
              '@id': 'mktp:WB_Select_ProductCards_Cond',
              CardInProdLink: 'mktp_d:Toys',
            },
            service: mktpSchemaRepoIri,
          },
        ],
      },
      // Amazon
      {
        '@id': 'mktp:Amzn_Select_ProductCards_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Amzn_Select_ProductCards_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'kp:ProductCardShape',
            conditions: {
              '@id': 'mktp:Amzn_Select_ProductCards_Cond',
              CardInProdLink: 'mktp_d:Toys',
            },
            service: mktpSchemaRepoIri,
          },
        ],
      },
      // Alibaba
      {
        '@id': 'mktp:Ali_Select_ProductCards_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Ali_Select_ProductCards_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'als:ProductCardShape',
            conditions: {
              '@id': 'mktp:Ali_Select_ProductCards_Cond',
              CardInProdLink: 'mktp_d:Toys',
            },
            service: mktpSchemaRepoIri,
          },
        ],
      },
    ],
    elements: [
      {
        '@id': 'mktp:_934Jfg7',
        '@type': 'aldkg:SplitPaneLayout',
        options: {
          style: {
            width: '100%',
            height: '100%',
          },
          initialSizes: [13, 87],
          collapseDirection: 'left',
        },
        elements: [
          {
            '@id': 'mktp:ProductTree',
            '@type': 'aldkg:DataControl',
            resultsScope: 'mktp:Products_Coll',
            options: {
              renderType: 'tree',
              title: 'Классификатор товаров',
              treeNodeTitleKey: 'title',
              treeNodeParentKey: 'SubProdInProdLink',
              connections: [
                { toObj: 'mktp:Product_Cond', toProp: '@_id' },
                // Wildberries charts
                { toObj: 'mktp:WB_Select_Boxplots_TotalSales_Cond', toProp: 'hasFeatureOfInterest' },
                { toObj: 'mktp:WB_Select_Boxplots_Price_Cond', toProp: 'hasFeatureOfInterest' },
                { toObj: 'mktp:WB_Select_SvdDaily_Cond', toProp: 'svdDailyHasProduct' },
                { toObj: 'mktp:WB_Select_SvdWeekly_Cond', toProp: 'svdWeeklyHasProduct' },
                { toObj: 'mktp:WB_Select_SvdMonthly_Cond', toProp: 'svdMonthlyHasProduct' },
                { toObj: 'mktp:WB_Select_Marginality_Cond', toProp: 'mrgnHasProduct' },
                { toObj: 'mktp:WB_Select_KiDaily_Cond', toProp: 'kiDailyHasProduct' },
                { toObj: 'mktp:WB_Select_KiWeekly_Cond', toProp: 'kiWeeklyHasProduct' },
                { toObj: 'mktp:WB_Select_KiMonthly_Cond', toProp: 'kiMonthlyHasProduct' },
                // Amazon charts
                { toObj: 'mktp:Amzn_Select_Boxplots_TotalSales_Cond', toProp: 'hasFeatureOfInterest' },
                { toObj: 'mktp:Amzn_Select_Boxplots_Price_Cond', toProp: 'hasFeatureOfInterest' },
                { toObj: 'mktp:Amzn_Select_SvdDaily_Cond', toProp: 'svdDailyHasProduct' },
                { toObj: 'mktp:Amzn_Select_SvdWeekly_Cond', toProp: 'svdWeeklyHasProduct' },
                { toObj: 'mktp:Amzn_Select_SvdMonthly_Cond', toProp: 'svdMonthlyHasProduct' },
                { toObj: 'mktp:Amzn_Select_Marginality_Cond', toProp: 'mrgnHasProduct' },
                { toObj: 'mktp:Amzn_Select_KiDaily_Cond', toProp: 'kiDailyHasProduct' },
                { toObj: 'mktp:Amzn_Select_KiWeekly_Cond', toProp: 'kiWeeklyHasProduct' },
                { toObj: 'mktp:Amzn_Select_KiMonthly_Cond', toProp: 'kiMonthlyHasProduct' },
                // 1688 charts
                { toObj: 'mktp:Ali_Select_Boxplots_Price_Cond', toProp: 'hasFeatureOfInterest' },
                // Cards in Product by Marketplace
                { toObj: 'mktp:WB_Select_ProductCards_Cond', toProp: 'CardInProdLink' },
                { toObj: 'mktp:Amzn_Select_ProductCards_Cond', toProp: 'CardInProdLink' },
                { toObj: 'mktp:Ali_Select_ProductCards_Cond', toProp: 'CardInProdLink' },
              ],
            },
          },
          {
            '@id': 'mktp:_64kFg23',
            '@type': 'aldkg:PanelLayout',
            options: {
              style: {
                width: '100%',
                height: '100%',
              },
            },
            elements: [
              {
                '@id': 'rm:_834hd7f',
                '@type': 'aldkg:FormLayout',
                options: {
                  style: {
                    width: '100%',
                  },
                  readOnly: true,
                },
                elements: [
                  {
                    '@id': 'mktp:_87Dfg78',
                    '@type': 'aldkg:PanelLayout',
                    options: {
                      flow: 'horizontal',
                      style: {
                        width: '100%',
                      },
                    },
                    elements: [
                      {
                        '@id': 'mktp:_8255hFd3',
                        '@type': 'aldkg:PanelLayout',
                        options: {
                          style: {
                            width: '200px',
                            padding: '5px',
                          },
                        },
                        elements: [
                          {
                            '@id': 'mktp:_63JdF67',
                            '@type': 'aldkg:Image',
                            resultsScope: 'mktp:Product_Coll/imageUrl',
                            options: {
                              fallback:
                                'data:image/png;base64,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',
                            },
                          },
                        ],
                      },
                      {
                        '@id': 'mktp:_88Dfg78',
                        '@type': 'aldkg:PanelLayout',
                        options: {
                          style: {
                            verticalAlign: 'top',
                            width: '80%',
                          },
                        },
                        elements: [
                          {
                            '@id': 'mktp:_63JdF67',
                            '@type': 'aldkg:Control',
                            resultsScope: 'mktp:Product_Coll/title',
                          },
                          {
                            '@id': 'mktp:_87Dfg78',
                            '@type': 'aldkg:PanelLayout',
                            options: {
                              flow: 'horizontal',
                              style: {
                                //flexGrow: '5',
                                width: '100%',
                              },
                            },
                            elements: [
                              {
                                '@id': 'mktp:_93JhdA78',
                                '@type': 'aldkg:VerticalLayout',
                                options: {
                                  style: {
                                    verticalAlign: 'top',
                                    padding: '5px',
                                  },
                                  width: 'all-empty-space',
                                },
                                elements: [
                                  {
                                    '@id': 'mktp:_Kjd7F7s8',
                                    '@type': 'aldkg:Control',
                                    resultsScope: 'mktp:Product_Coll/description',
                                  },
                                ],
                              },
                              {
                                '@id': 'mktp:_87Kdf3Ry7',
                                '@type': 'aldkg:VerticalLayout',
                                options: {
                                  style: {
                                    verticalAlign: 'top',
                                    padding: '5px',
                                  },
                                  width: 'all-empty-space',
                                },
                                elements: [
                                  {
                                    '@id': 'mktp:_93Kd8hH',
                                    '@type': 'aldkg:Control',
                                    resultsScope: 'mktp:Product_Coll/description',
                                  },
                                ],
                              },
                              {
                                '@id': 'mktp:_86hDyf9',
                                '@type': 'aldkg:VerticalLayout',
                                options: {
                                  style: {
                                    verticalAlign: 'top',
                                    padding: '5px',
                                  },
                                  width: 'all-empty-space',
                                },
                                elements: [
                                  {
                                    '@id': 'mktp:_Kd83457',
                                    '@type': 'aldkg:Control',
                                    resultsScope: 'mktp:Product_Coll/description',
                                  },
                                ],
                              },
                              {
                                '@id': 'mktp:_9348jDf7',
                                '@type': 'aldkg:VerticalLayout',
                                options: {
                                  style: {
                                    verticalAlign: 'top',
                                    padding: '5px',
                                  },
                                  width: 'all-empty-space',
                                },
                                elements: [
                                  {
                                    '@id': 'mktp:_912JdmF',
                                    '@type': 'aldkg:Control',
                                    resultsScope: 'mktp:Product_Coll/description',
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              //////////
              // Marginality
              //////////
              {
                '@id': 'mktp:TreeTableChartMarginalityVKElement',
                '@type': 'aldkg:TimeSeriesChart', // control type
                options: {
                  style: { display: 'flex', flexDirection: 'column' },
                },
                mappings: {
                  'aldkg:TimeSeriesMarginality': {
                    '@id': 'mktp:Mapping_Marginality',
                    '@type': 'aldkg:TimeSeries',
                    type: {
                      type: 'pointer',
                      value: '/type',
                    },
                    yField: 'marginality',
                    xField: 'begin',
                    colorField: 'forDataset',
                    mapping: {
                      type: 'object',
                      properties: {
                        style: {
                          type: 'object',
                          properties: {
                            lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                            stroke: { type: 'pointer', value: '/options/stroke' },
                          },
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        color: {
                          type: 'pointer',
                          value: '/options/color',
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        shape: {
                          type: 'pointer',
                          value: '/options/shape',
                        },
                      },
                    },
                    dataMappings: [],
                  },
                },
              },
              //////////
              // BoxPlots
              //////////
              {
                '@id': 'mktp:BoxPlotChartViewKind_TotalSales',
                '@type': 'aldkg:BoxPlotChart', // control type
                options: {
                  style: { display: 'flex', flexDirection: 'column' },
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
                    colorField: 'forDataset',
                    mapping: {
                      type: 'object',
                      properties: {
                        style: {
                          type: 'object',
                          properties: {
                            lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 1 },
                            fill: { type: 'pointer', value: '/options/fill' },
                            stroke: { type: 'pointer', value: '/options/stroke' },
                            fillOpacity: { type: 'pointer', value: '/options/fillOpacity', default: 0.5 },
                          },
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        shape: {
                          type: 'pointer',
                          value: '/options/shape',
                        },
                        color: {
                          type: 'pointer',
                          value: '/options/color',
                          wrapper: { type: 'pointer', value: '/forDataset' },
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
                '@id': 'mktp:BoxPlotChartViewKind',
                '@type': 'aldkg:BoxPlotChart', // control type
                options: {
                  style: { display: 'flex', flexDirection: 'column' },
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
                    colorField: 'forDataset',
                    mapping: {
                      type: 'object',
                      properties: {
                        style: {
                          type: 'object',
                          properties: {
                            lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 1 },
                            fill: { type: 'pointer', value: '/options/fill' },
                            stroke: { type: 'pointer', value: '/options/stroke' },
                            fillOpacity: { type: 'pointer', value: '/options/fillOpacity', default: 0.5 },
                          },
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        shape: {
                          type: 'pointer',
                          value: '/options/shape',
                        },
                        color: {
                          type: 'pointer',
                          value: '/options/color',
                          wrapper: { type: 'pointer', value: '/forDataset' },
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
                '@id': 'mktp:TreeTableChartVKElement',
                '@type': 'aldkg:TimeSeriesChart', // control type
                options: {
                  style: { display: 'flex', flexDirection: 'column' },
                },
                mappings: {
                  'aldkg:TimeSeriesDaily': {
                    '@id': 'mktp:Mapping_2',
                    '@type': 'aldkg:TimeSeries',
                    type: {
                      type: 'pointer',
                      value: '/type',
                    },
                    yField: 'value',
                    xField: 'bucketEnd',
                    colorField: 'forDataset',
                    mapping: {
                      type: 'object',
                      properties: {
                        style: {
                          type: 'object',
                          properties: {
                            lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                            stroke: { type: 'pointer', value: '/options/stroke' },
                          },
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        color: {
                          type: 'pointer',
                          value: '/options/color',
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        shape: {
                          type: 'pointer',
                          value: '/options/shape',
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
                    yField: 'value',
                    xField: 'bucketEnd',
                    colorField: 'forDataset',
                    mapping: {
                      type: 'object',
                      properties: {
                        style: {
                          type: 'object',
                          properties: {
                            lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                            stroke: { type: 'pointer', value: '/options/stroke' },
                          },
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        color: {
                          type: 'pointer',
                          value: '/options/color',
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        shape: {
                          type: 'pointer',
                          value: '/options/shape',
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
                    yField: 'value',
                    xField: 'bucketEnd',
                    colorField: 'forDataset',
                    mapping: {
                      type: 'object',
                      properties: {
                        style: {
                          type: 'object',
                          properties: {
                            lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                            stroke: { type: 'pointer', value: '/options/stroke' },
                          },
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        color: {
                          type: 'pointer',
                          value: '/options/color',
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        shape: {
                          type: 'pointer',
                          value: '/options/shape',
                        },
                      },
                    },
                    dataMappings: [],
                  },
                },
              },
              {
                '@id': 'mktp:TreeTableKiChartVKElement',
                '@type': 'aldkg:TimeSeriesChart', // control type
                options: {
                  style: { display: 'flex', flexDirection: 'column' },
                },
                mappings: {
                  'aldkg:TimeSeriesDaily': {
                    '@id': 'mktp:Mapping_2',
                    '@type': 'aldkg:TimeSeries',
                    type: {
                      type: 'pointer',
                      value: '/type',
                    },
                    yField: 'value',
                    xField: 'bucketEnd',
                    colorField: 'forDataset',
                    mapping: {
                      type: 'object',
                      properties: {
                        style: {
                          type: 'object',
                          properties: {
                            lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                            stroke: { type: 'pointer', value: '/options/stroke' },
                          },
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        color: {
                          type: 'pointer',
                          value: '/options/color',
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        shape: {
                          type: 'pointer',
                          value: '/options/shape',
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
                    yField: 'value',
                    xField: 'bucketEnd',
                    colorField: 'forDataset',
                    mapping: {
                      type: 'object',
                      properties: {
                        style: {
                          type: 'object',
                          properties: {
                            lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                            stroke: { type: 'pointer', value: '/options/stroke' },
                          },
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        color: {
                          type: 'pointer',
                          value: '/options/color',
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        shape: {
                          type: 'pointer',
                          value: '/options/shape',
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
                    yField: 'value',
                    xField: 'bucketEnd',
                    colorField: 'forDataset',
                    mapping: {
                      type: 'object',
                      properties: {
                        style: {
                          type: 'object',
                          properties: {
                            lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                            stroke: { type: 'pointer', value: '/options/stroke' },
                          },
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        color: {
                          type: 'pointer',
                          value: '/options/color',
                          wrapper: { type: 'pointer', value: '/forDataset' },
                        },
                        shape: {
                          type: 'pointer',
                          value: '/options/shape',
                        },
                      },
                    },
                    dataMappings: [],
                  },
                },
              },
              {
                '@id': 'mktp:_344Jfg7',
                '@type': 'aldkg:SplitPaneLayout',
                options: {
                  style: {
                    width: '100%',
                    height: '100%',
                  },
                  initialSizes: [34, 33, 33],
                },
                elements: [
                  {
                    '@id': 'mktp:WbProductCardsTable',
                    '@type': 'aldkg:Array',
                    resultsScope: 'mktp:WB_Select_ProductCards_Coll',
                    options: {
                      draggable: true,
                      resizeableHeader: true,
                      height: 'all-empty-space',
                      style: { height: '100%' },
                      order: [
                        'imageUrl',
                        'name',
                        'price',
                        'categoryPopularity',
                        'commentsCount',
                        'starsValue',
                        'questionsCount',
                        'lastMonthSalesAmount',
                        'lastMonthSalesValue',
                        'salesAmountDiff',
                        'totalSales',
                        'totalSalesDiff',
                        'country',
                        'brand',
                        'seller',
                      ],
                      imageUrl: {
                        width: 60,
                        formatter: 'image',
                        editable: false,
                      },
                      name: {
                        width: 340,
                        formatter: 'link',
                        dataToFormatter: { link: '@id' },
                        sortable: true,
                        editable: false,
                      },
                      country: {
                        width: 60,
                        sortable: true,
                        editable: false,
                      },
                      brand: {
                        formatter: 'link',
                        sortable: true,
                        editable: false,
                      },
                      price: {
                        width: 60,
                        sortable: true,
                        editable: false,
                      },
                      seller: {
                        formatter: 'link',
                        sortable: true,
                        editable: false,
                      },
                      categoryPopularity: {
                        width: 100,
                        editable: false,
                      },
                      commentsCount: {
                        width: 100,
                        sortable: true,
                        editable: false,
                      },
                      starsValue: {
                        width: 100,
                        sortable: true,
                        editable: false,
                      },
                      questionsCount: {
                        width: 100,
                        sortable: true,
                        editable: false,
                      },
                      lastMonthSalesAmount: {
                        width: 150,
                        sortable: true,
                        editable: false,
                      },
                      lastMonthSalesValue: {
                        width: 150,
                        sortable: true,
                        editable: false,
                      },
                      salesAmountDiff: {
                        width: 150,
                        sortable: true,
                        editable: false,
                      },
                      totalSales: {
                        width: 100,
                        sortable: true,
                        editable: false,
                      },
                      totalSalesDiff: {
                        width: 150,
                        sortable: true,
                        editable: false,
                      },
                    },
                  },
                  {
                    '@id': 'mktp:AmznProductCardsTable',
                    '@type': 'aldkg:Array',
                    resultsScope: 'mktp:Amzn_Select_ProductCards_Coll',
                    options: {
                      draggable: true,
                      resizeableHeader: true,
                      height: 'all-empty-space',
                      style: { height: '100%' },
                      order: ['imageUrl', 'name'],
                      imageUrl: {
                        width: 60,
                        formatter: 'image',
                        editable: false,
                      },
                      name: {
                        width: 340,
                        formatter: 'link',
                        dataToFormatter: { link: '@id' },
                        sortable: true,
                        editable: false,
                      },
                    },
                  },
                  {
                    '@id': 'mktp:AliProductCardsTable',
                    '@type': 'aldkg:Array',
                    resultsScope: 'mktp:Ali_Select_ProductCards_Coll',
                    options: {
                      draggable: true,
                      resizeableHeader: true,
                      height: 'all-empty-space',
                      style: { height: '100%' },
                      order: ['imageUrl', 'name'],
                      imageUrl: {
                        width: 60,
                        formatter: 'image',
                        editable: false,
                      },
                      name: {
                        width: 340,
                        formatter: 'link',
                        dataToFormatter: { link: '@id' },
                        sortable: true,
                        editable: false,
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const viewDescrsProds = [
  {
    '@id': 'mktp:_g7H7gh',
    '@type': 'aldkg:ViewDescr',
    title: 'Показатели продукта',
    viewKind: 'mktp:TreeTableChartProdsViewKind',
    // datasets constraints, specific to this view (UML aggregation)
    collsConstrs: [
      //////////
      // BoxPlots and SVDs
      //////////
      ///////////// WB
      {
        '@id': 'mktp:WB_Select_Boxplots_Price_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:WB_Select_Boxplots_Price_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:WB_Select_Boxplots_Price_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Toys',
              forProperty: 'hs:Price',
              forDataset: 'https://www.wildberries.ru',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      {
        '@id': 'mktp:WB_Select_Boxplots_TotalSales_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:WB_Select_Boxplots_TotalSales_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:WB_Select_Boxplots_TotalSales_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Toys',
              forProperty: 'hs:TotalSales',
              forDataset: 'https://www.wildberries.ru',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      {
        '@id': 'mktp:WB_Fixed_Boxplots_Price_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:WB_Fixed_Boxplots_Price_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:WB_Fixed_Boxplots_Price_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/igrushki/antistress',
              forProperty: 'hs:Price',
              forDataset: 'https://www.wildberries.ru',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      {
        '@id': 'mktp:WB_Fixed_Boxplots_TotalSales_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:WB_Fixed_Boxplots_TotalSales_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:WB_Fixed_Boxplots_TotalSales_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/igrushki/antistress',
              forProperty: 'hs:TotalSales',
              forDataset: 'https://www.wildberries.ru',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      {
        '@id': 'mktp:WB_Select_SvdDaily_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:WB_Select_SvdDaily_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:SvdDailyShape',
            conditions: {
              '@id': 'mktp:WB_Select_SvdDaily_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              svdDailyHasProduct: null,
              forDataset: 'https://www.wildberries.ru',
              // we need here chart for property: svdDaily, not properties svdWeekly, svdMonthly
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd'), descending: false }],
      },
      {
        '@id': 'mktp:WB_Select_SvdWeekly_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:WB_Select_SvdWeekly_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:SvdWeeklyShape',
            conditions: {
              '@id': 'mktp:WB_Select_SvdWeekly_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              svdWeeklyHasProduct: 'mktp_d:Toys',
              forDataset: 'https://www.wildberries.ru',
              // we need here chart for property: svdWeekly
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd'), descending: false }],
      },
      {
        '@id': 'mktp:WB_Select_SvdMonthly_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:WB_Select_SvdMonthly_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:SvdMonthlyShape',
            conditions: {
              '@id': 'mktp:WB_Select_SvdMonthly_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              svdMonthlyHasProduct: 'mktp_d:Toys',
              forDataset: 'https://www.wildberries.ru',
              // we need here chart for property: svdMonthly
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd'), descending: false }],
      },
      ///////////// Amazon
      {
        '@id': 'mktp:Amzn_Select_Boxplots_TotalSales_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Amzn_Select_Boxplots_TotalSales_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:Amzn_Select_Boxplots_TotalSales_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Toys',
              forProperty: 'kp:TotalSalesEstimate',
              forDataset: 'https://www.amazon.com',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      {
        '@id': 'mktp:Amzn_Select_Boxplots_Price_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Amzn_Select_Boxplots_Price_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:Amzn_Select_Boxplots_Price_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Toys',
              forProperty: 'hs:Price',
              forDataset: 'https://www.amazon.com',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      {
        '@id': 'mktp:Amzn_Select_SvdDaily_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Amzn_Select_SvdDaily_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:SvdDailyShape',
            conditions: {
              '@id': 'mktp:Amzn_Select_SvdDaily_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              svdDailyHasProduct: 'mktp_d:Toys',
              forDataset: 'https://www.amazon.com',
              // we need here chart for property: svdDaily, not properties svdWeekly, svdMonthly
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd'), descending: false }],
      },
      {
        '@id': 'mktp:Amzn_Select_SvdWeekly_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Amzn_Select_SvdWeekly_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:SvdWeeklyShape',
            conditions: {
              '@id': 'mktp:Amzn_Select_SvdWeekly_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              svdWeeklyHasProduct: 'mktp_d:Toys',
              forDataset: 'https://www.amazon.com',
              // we need here chart for property: svdWeekly
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd'), descending: false }],
      },
      {
        '@id': 'mktp:Amzn_Select_SvdMonthly_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Amzn_Select_SvdMonthly_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:SvdMonthlyShape',
            conditions: {
              '@id': 'mktp:Amzn_Select_SvdMonthly_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              svdMonthlyHasProduct: 'mktp_d:Toys',
              forDataset: 'https://www.amazon.com',
              // we need here chart for property: svdMonthly
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd'), descending: false }],
      },
      ///////////// Alibaba
      {
        '@id': 'mktp:Ali_Select_Boxplots_Price_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Ali_Select_Boxplots_Price_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:Ali_Select_Boxplots_Price_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Toys',
              forProperty: 'hs:Price',
              forDataset: 'https://www.1688.com',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      //// Marginality
      {
        '@id': 'mktp:WB_Select_Marginality_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:WB_Select_Marginality_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:MarginalityShape',
            conditions: {
              '@id': 'mktp:WB_Select_Marginality_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              mrgnHasProduct: 'mktp_d:Toys',
              forDataset: 'https://www.wildberries.ru',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      {
        '@id': 'mktp:Amzn_Select_Marginality_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Amzn_Select_Marginality_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:MarginalityShape',
            conditions: {
              '@id': 'mktp:Amzn_Select_Marginality_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              mrgnHasProduct: 'mktp_d:Toys',
              forDataset: 'https://www.amazon.com',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      //// Ki /////
      // Ki WB
      {
        '@id': 'mktp:WB_Select_KiDaily_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:WB_Select_KiDaily_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:KiDailyShape',
            conditions: {
              '@id': 'mktp:WB_Select_KiDaily_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              kiDailyHasProduct: 'mktp_d:Toys',
              forDataset: 'https://www.wildberries.ru',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd'), descending: false }],
      },
      {
        '@id': 'mktp:WB_Select_KiWeekly_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:WB_Select_KiWeekly_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:KiWeeklyShape',
            conditions: {
              '@id': 'mktp:WB_Select_KiWeekly_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              kiWeeklyHasProduct: 'mktp_d:Toys',
              forDataset: 'https://www.wildberries.ru',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd'), descending: false }],
      },
      {
        '@id': 'mktp:WB_Select_KiMonthly_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:WB_Select_KiMonthly_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:KiMonthlyShape',
            conditions: {
              '@id': 'mktp:WB_Select_KiMonthly_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              kiMonthlyHasProduct: 'mktp_d:Toys',
              forDataset: 'https://www.wildberries.ru',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd'), descending: false }],
      },
      // Ki Amzn
      {
        '@id': 'mktp:Amzn_Select_KiDaily_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Amzn_Select_KiDaily_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:KiDailyShape',
            conditions: {
              '@id': 'mktp:Amzn_Select_KiDaily_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              kiDailyHasProduct: 'mktp_d:Toys',
              forDataset: 'https://www.amazon.com',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd'), descending: false }],
      },
      {
        '@id': 'mktp:Amzn_Select_KiWeekly_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Amzn_Select_KiWeekly_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:KiWeeklyShape',
            conditions: {
              '@id': 'mktp:Amzn_Select_KiWeekly_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              kiWeeklyHasProduct: 'mktp_d:Toys',
              forDataset: 'https://www.amazon.com',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd'), descending: false }],
      },
      {
        '@id': 'mktp:Amzn_Select_KiMonthly_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Amzn_Select_KiMonthly_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:KiMonthlyShape',
            conditions: {
              '@id': 'mktp:Amzn_Select_KiMonthly_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              kiMonthlyHasProduct: 'mktp_d:Toys',
              forDataset: 'https://www.amazon.com',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd'), descending: false }],
      },
    ],
    elements: [
      ///////
      // Marginality
      ///////
      {
        '@id': 'mktp:_dj457gh_chart_marginality',
        '@type': 'aldkg:Chart', // control type
        '@parent': 'mktp:TreeTableChartMarginalityVKElement',
        // child ui elements configs
        options: {
          height: 250,
          timeUnit: 'day',
          dateFormat: 'DD.MM.YYYY',
          axes: {
            yAxis: {
              aliases: {
                value: 'Маржинальность',
              },
            },
          },
        },
        elements: [
          {
            '@id': 'mktp:TimeSeries_Marginality',
            '@type': 'aldkg:TimeSeriesMarginality',
            options: {
              legend: false,
              tooltip: {
                showCrosshairs: true,
                shared: true,
                showMarkers: true,
              },
            },
            elements: [
              {
                '@id': 'mktp:line_marginality',
                '@type': 'aldkg:ChartLine',
                resultsScope: 'mktp:WB_Select_Marginality_Coll',
                options: {
                  color: '#7D256F',
                  lineWidth: 2,
                  stroke: '#7D256F',
                  shape: 'hv',
                },
              },
              {
                '@id': 'mktp:line_amzn_marginality',
                '@type': 'aldkg:ChartLine',
                resultsScope: 'mktp:Amzn_Select_Marginality_Coll',
                options: {
                  color: '#FF9900',
                  lineWidth: 2,
                  stroke: '#FF9900',
                  shape: 'hv',
                },
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
        '@type': 'aldkg:Chart', // control type
        '@parent': 'mktp:BoxPlotChartViewKind',
        title: 'Массажная подушка роликовая, разброс складских остатков',
        // child ui elements configs
        options: {
          height: 250,
          timeUnit: 'day',
          dateFormat: 'DD.MM.YYYY',
          showOutliers: true,
          interactions: [{ type: 'active-region' }],
          axes: {
            yAxis: {
              aliases: {
                value: 'Цена, руб.',
              },
            },
          },
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
                shared: true,
                showCrosshairs: false,
                customContent: buildCustomTooltip('Цена'),
              },
              legend: false,
              adjust: {
                type: 'dodge',
                marginRatio: 0.3,
              },
            },
            elements: [
              //
              // Category WB
              //
              {
                '@id': 'mktp:box2_price', // machine-generated random UUID
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:WB_Fixed_Boxplots_Price_Coll', // reference to data
                options: {
                  shape: 'box',
                  fill: '#7D256F',
                  stroke: '#7D256F',
                  color: '#7D256F',
                },
              },
              //
              // Category Amazon
              //
              {
                '@id': 'mktp:box1_price', // machine-generated random UUID
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:Amzn_Select_Boxplots_Price_Coll', // reference to data
                options: {
                  shape: 'box',
                  fill: '#FF9900',
                  stroke: '#FF9900',
                  color: '#FF9900',
                },
              },
              //
              // Category AliExpress
              //
              {
                '@id': 'mktp:box1_price', // machine-generated random UUID
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:Ali_Select_Boxplots_Price_Coll', // reference to data
                options: {
                  shape: 'box',
                  fill: '#E52F20',
                  stroke: '#E52F20',
                  color: '#E52F20',
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
          height: 250,
          timeUnit: 'day',
          dateFormat: 'DD.MM.YYYY',
          showOutliers: true,
          interactions: [{ type: 'active-region' }],
          axes: {
            yAxis: {
              aliases: {
                value: 'Объём продаж, шт.',
              },
            },
          },
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
                shared: true,
                showCrosshairs: false,
                customContent: buildCustomTooltip('Объем продаж'),
              },
              legend: false,
              adjust: {
                type: 'dodge',
                marginRatio: 0.3,
              },
            },
            elements: [
              //
              // Category 1
              //
              {
                '@id': 'mktp:box1_TotalSales', // machine-generated random UUID
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:WB_Select_Boxplots_TotalSales_Coll', // reference to data
                options: {
                  shape: 'box',
                  fill: '#7D256F',
                  stroke: '#7D256F',
                  color: '#7D256F',
                },
              },
              //
              // Category Amazon
              //
              {
                '@id': 'mktp:box2_TotalSales', // machine-generated random UUID
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:Amzn_Select_Boxplots_TotalSales_Coll', // reference to data
                options: {
                  shape: 'box',
                  fill: '#FF9900',
                  stroke: '#FF9900',
                  color: '#FF9900',
                },
              },
            ],
          },
        ],
      },
      {
        '@id': 'mktp:_g7H7gh_chart',
        '@type': 'aldkg:Chart',
        '@parent': 'mktp:TreeTableChartVKElement',
        resultsScope: 'mktp:_8uJ8t6',
        title: 'Показатели продукта',
        options: {
          timeUnit: 'day',
          showDatePicker: false,
          dateFormat: 'DD.MM.YYYY',
          height: 250,
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
                      x: 0.33,
                      y: 1,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_price_daily',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:WB_Select_SvdDaily_Coll',
                    options: {
                      color: '#7D256F',
                      lineWidth: 2,
                      stroke: '#7D256F',
                      shape: 'vh',
                    },
                  },
                  {
                    '@id': 'mktp:line_amzn_price_daily',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:Amzn_Select_SvdDaily_Coll',
                    options: {
                      color: '#FF9900',
                      lineWidth: 2,
                      stroke: '#FF9900',
                      shape: 'vh',
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
                  {
                    '@id': 'mktp:line_price_weekly',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:WB_Select_SvdWeekly_Coll',
                    options: {
                      color: '#7D256F',
                      lineWidth: 2,
                      stroke: '#7D256F',
                      shape: 'vh',
                    },
                  },
                  {
                    '@id': 'mktp:line_amzn_price_weekly',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:Amzn_Select_SvdWeekly_Coll',
                    options: {
                      color: '#FF9900',
                      lineWidth: 2,
                      stroke: '#FF9900',
                      shape: 'vh',
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
                      x: 0.66,
                      y: 0,
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
                    resultsScope: 'mktp:WB_Select_SvdMonthly_Coll',
                    options: {
                      color: '#7D256F',
                      lineWidth: 2,
                      stroke: '#7D256F',
                      shape: 'vh',
                    },
                  },
                  {
                    '@id': 'mktp:line_amzn_price_monthly',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:Amzn_Select_SvdMonthly_Coll',
                    options: {
                      color: '#FF9900',
                      lineWidth: 2,
                      stroke: '#FF9900',
                      shape: 'vh',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        '@id': 'mktp:_g7H7gz_chart',
        '@type': 'aldkg:Chart',
        '@parent': 'mktp:TreeTableKiChartVKElement',
        title: 'Показатели продукта',
        options: {
          timeUnit: 'day',
          showDatePicker: false,
          dateFormat: 'DD.MM.YYYY',
          height: 250,
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
                      x: 0.33,
                      y: 1,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_price_daily',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:WB_Select_KiDaily_Coll',
                    options: {
                      color: '#7D256F',
                      lineWidth: 2,
                      stroke: '#7D256F',
                      shape: 'vh',
                    },
                  },
                  {
                    '@id': 'mktp:line_amzn_price_daily',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:Amzn_Select_KiDaily_Coll',
                    options: {
                      color: '#FF9900',
                      lineWidth: 2,
                      stroke: '#FF9900',
                      shape: 'vh',
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
                  {
                    '@id': 'mktp:line_price_weekly',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:WB_Select_KiWeekly_Coll',
                    options: {
                      color: '#7D256F',
                      lineWidth: 2,
                      stroke: '#7D256F',
                      shape: 'hv',
                    },
                  },
                  {
                    '@id': 'mktp:line_amzn_price_weekly',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:Amzn_Select_KiWeekly_Coll',
                    options: {
                      color: '#FF9900',
                      lineWidth: 2,
                      stroke: '#FF9900',
                      shape: 'hv',
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
                      x: 0.66,
                      y: 0,
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
                    resultsScope: 'mktp:WB_Select_KiMonthly_Coll',
                    options: {
                      color: '#7D256F',
                      lineWidth: 2,
                      stroke: '#7D256F',
                      shape: 'vh',
                    },
                  },
                  {
                    '@id': 'mktp:line_amzn_price_monthly',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:Amzn_Select_KiMonthly_Coll',
                    options: {
                      color: '#FF9900',
                      lineWidth: 2,
                      stroke: '#FF9900',
                      shape: 'vh',
                    },
                  },
                ],
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
const additionalCollsProds: CollState[] = [
  // ViewKinds Collection
  {
    constr: viewKindCollConstr,
    data: viewKindsProds,
    opt: {
      updPeriod: undefined,
      lastSynced: Date.now(),
      //resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
    },
  },
  // ViewDescrs Collection
  {
    constr: viewDescrCollConstr,
    data: viewDescrsProds,
    opt: {
      updPeriod: undefined,
      lastSynced: Date.now(),
      //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
      // for viewDescrs.collConstrs (it loads lazily -- after the first access)
    },
  },
];

export const MktpProductAnalysis = Template.bind({});
MktpProductAnalysis.args = {
  additionalColls: additionalCollsProds,
  viewDescrId: viewDescrsProds[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};
