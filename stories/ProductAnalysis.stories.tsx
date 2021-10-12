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
import { boxPlotBucketShape, observationShape } from '../src/store/shapes';

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
  title: '2 Complex Controls/Tree-Table-Chart',
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

  const rootModelState = {
    ...rootModelInitialState,
    schemas: {
      json: {
        [observationShape['@id']]: observationShape,
        [boxPlotBucketShape['@id']]: boxPlotBucketShape,
      },
    },
  };
  const client = new SparqlClientImpl(
    'https://rdf4j.agentlab.ru/rdf4j-server',
    'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp/namespaces',
  );
  const rootStore = createUiModelFromState('mktp-fed', client, rootModelState, additionalColls);
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
            '@id': 'mktp:Products_Coll_Shape0',
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
            '@id': 'mktp:Product_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:ProductShape',
            conditions: {
              '@id': 'mktp:Product_Coll_Ent0_Cond',
              '@_id': undefined,
            },
            service: mktpSchemaRepoIri,
          },
        ],
      },
      {
        '@id': 'mktp:ProductCards_in_Product_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:ProductCards_in_Product_Coll_Ent0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:ProductCardShape',
            conditions: {
              '@id': 'mktp:ProductCards_in_Product_Coll_Ent0_Cond',
              CardInProdLink: 'mktp_d:Massager',
            },
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
                height: '100%',
              },
              height: 'all-empty-space',
              width: 'all-empty-space',
              defaultSize: {
                'mktp:ProductTree': '13%',
                'mktp:_64kFg23': '87%',
              },
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
                    { to: 'mktp:Product_Coll_Ent0_Cond', by: '@_id' },
                    { to: 'mktp:_u8Yg84_price', by: 'hasFeatureOfInterest' },
                    { to: 'mktp:_u8Yg84_TotalSales', by: 'hasFeatureOfInterest' },
                    { to: 'mktp:ProductCards_in_Product_Coll_Ent0_Cond', by: 'CardInProdLink' },
                  ],
                },
              },
              {
                '@id': 'mktp:_64kFg23',
                '@type': 'aldkg:VerticalLayout',
                options: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:_934Jfg7',
                    '@type': 'aldkg:SplitPaneLayout',
                    options: {
                      style: {
                        width: '100%',
                        height: '5%',
                      },
                      height: 'all-empty-space',
                      width: 'all-empty-space',
                      defaultSize: {
                        'mktp:_83hd7f': '20%',
                        'mktp:_83hd7f_2': '80%',
                      },
                    },
                    elements: [
                      {
                        '@id': 'rm:_83hd7f',
                        '@type': 'aldkg:VerticalLayout',
                        options: {
                          readOnly: false,
                        },
                        elements: [
                          {
                            '@id': 'rm:_297Hgf56',
                            '@type': 'aldkg:Control',
                            formatter: 'image',
                            resultsScope: 'mktp:Product_Coll/imageUrl',
                          },
                        ],
                      },
                      {
                        '@id': 'rm:_83hd7f_2',
                        '@type': 'aldkg:VerticalLayout',
                        options: {
                          readOnly: false,
                        },
                        elements: [
                          {
                            '@id': 'rm:_17Gj78_2',
                            '@type': 'aldkg:Control',
                            resultsScope: 'mktp:Product_Coll/title',
                          },
                          {
                            '@id': 'rm:_297Hgf56_2',
                            '@type': 'aldkg:Control',
                            resultsScope: 'mktp:Product_Coll/description',
                          },
                        ],
                      },
                    ],
                  },
                  //////////
                  // BoxPlots
                  //////////
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
                        adjust: {
                          type: 'object',
                          properties: {
                            type: 'dodge',
                            marginRatio: 0.3,
                          },
                        },
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
                        adjust: {
                          type: 'object',
                          properties: {
                            type: 'dodge',
                            marginRatio: 0.3,
                          },
                        },
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
                        colorField: 'scvdDailyHasProduct',
                        mapping: {
                          type: 'object',
                          properties: {
                            style: {
                              type: 'object',
                              properties: {
                                lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                                stroke: { type: 'pointer', value: '/options/stroke' },
                              },
                              wrapper: { type: 'pointer', value: '/scvdDailyHasProduct' },
                            },
                            color: {
                              type: 'pointer',
                              value: '/options/color',
                              wrapper: { type: 'pointer', value: '/scvdDailyHasProduct' },
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
                  {
                    '@id': 'mktp:ProductCardsTable',
                    '@type': 'aldkg:Array',
                    resultsScope: 'mktp:ProductCards_in_Product_Coll',
                    options: {
                      connections: [
                        { to: 'mktp:_sD7fg', by: 'scvdDailyHasProduct' },
                        { to: 'mktp:_qw89Ds', by: 'svdWeeklyHasProduct' },
                        { to: 'mktp:_df8D78', by: 'svdMonthlyHasProduct' },
                      ],
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
      // BoxPlots
      //////////
      {
        '@id': 'mktp:_8uJ8t6_price', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78DfG_price', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg84_price', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Toys',
              forProperty: 'hs:Price',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      {
        '@id': 'mktp:_8uJ8t6_TotalSales', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78DfG_TotalSales', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg84_TotalSales', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Toys',
              forProperty: 'hs:TotalSales',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      {
        '@id': 'mktp:_8uJ8t7_price', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg_price', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg83_price', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/igrushki/antistress',
              forProperty: 'hs:Price',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      {
        '@id': 'mktp:_8uJ8t7_TotalSales', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg_TotalSales', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg83_TotalSales', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/igrushki/antistress',
              forProperty: 'hs:TotalSales',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      {
        '@id': 'mktp:_95fFg7', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_w89Df', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'hs:HSSvdDailyShape',
            conditions: {
              '@id': 'mktp:_sD7fg', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              scvdDailyHasProduct: undefined,
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
            schema: 'hs:HSSvdWeeklyShape',
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
            schema: 'hs:HSSvdMonthlyShape',
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
            },
            elements: [
              //
              // Category 1
              //
              {
                '@id': 'mktp:box1_price', // machine-generated random UUID
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:_8uJ8t6_price', // reference to data
                options: {
                  shape: 'box',
                  fill: '#2E8DF9',
                  stroke: '#2E8DF9',
                  color: '#2E8DF9',
                },
              },
              //
              // Category 2
              //
              {
                '@id': 'mktp:box2_price', // machine-generated random UUID
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:_8uJ8t7_price', // reference to data
                options: {
                  shape: 'box',
                  fill: '#1FD0BE',
                  stroke: '#1FD0BE',
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
            },
            elements: [
              //
              // Category 1
              //
              {
                '@id': 'mktp:box1_TotalSales', // machine-generated random UUID
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:_8uJ8t6_TotalSales', // reference to data
                options: {
                  shape: 'box',
                  fill: '#2E8DF9',
                  stroke: '#2E8DF9',
                  color: '#2E8DF9',
                },
              },
              //
              // Category 2
              //
              {
                '@id': 'mktp:box2_TotalSales', // machine-generated random UUID
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:_8uJ8t7_TotalSales', // reference to data
                options: {
                  shape: 'box',
                  fill: '#1FD0BE',
                  stroke: '#1FD0BE',
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
          dateFormat: 'DD.MM.YYYY',
          height: 700,
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
                      y: 0.33,
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
                      y: 0.33,
                    },
                    end: {
                      x: 1,
                      y: 0.66,
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
                      y: 0.66,
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

export const ProductAnalysis = Template.bind({});
ProductAnalysis.args = {
  additionalColls: additionalCollsProds,
  viewDescrId: viewDescrsProds[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};
