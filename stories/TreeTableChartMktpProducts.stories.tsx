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

const buildCustomTooltip = (property: string) => (title: any, items: any) => {
  const data = items[0]?.data || {};
  return `<div><p><b>${title}</b></p><p>${property}: ${JSON.stringify(data[property])}</p><div>`;
};

export default {
  title: '2 Complex Controls/Tree-Table-Chart',
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
//  Products Classifier and Cards
///////////////////////////////////////////////

const buildCustomTooltip2 = (property: string) => (title: string, items: any[]) => {
  const tooltipItems = items
    .map((item) => {
      const { name, value, color } = item;
      return `<div><span style="height: 0.8em; width: 0.8em; border-radius: 50%; background-color: ${color}; display: inline-block;"></span></div><div><h4>${
        categoryNames[name] || name
      }</h4></div><div>${value}</div>`;
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
              '@_id': null,
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
        '@type': 'aldkg:PanelLayout',
        options: {
          style: {
            width: '100%',
            height: '100%',
          },
        },
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
                    { toObj: 'mktp:Product_Coll_Ent0_Cond', toProp: '@_id' },
                    { toObj: 'mktp:WB_Select_Boxplots_Price_Coll_Ent_Cond', toProp: 'hasFeatureOfInterest' },
                    { toObj: 'mktp:WB_Select_Boxplots_TotalSales_Coll_Ent_Cond', toProp: 'hasFeatureOfInterest' },
                    { toObj: 'mktp:ProductCards_in_Product_Coll_Ent0_Cond', toProp: 'CardInProdLink' },
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
                    '@id': 'mktp:_934Jfg7',
                    '@type': 'aldkg:SplitPaneLayout',
                    options: {
                      style: {
                        width: '100%',
                        height: '5%',
                      },
                      initialSizes: [20, 80],
                      collapseDirection: 'left',
                    },
                    elements: [
                      {
                        '@id': 'rm:_83hd7f',
                        '@type': 'aldkg:PanelLayout',
                        options: {
                          style: {
                            width: '100%',
                            height: '100%',
                          },
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
                        '@type': 'aldkg:PanelLayout',
                        options: {
                          style: {
                            width: '100%',
                            height: '100%',
                          },
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
                    '@id': 'mktp:ProductCardsTable',
                    '@type': 'aldkg:Array',
                    resultsScope: 'mktp:ProductCards_in_Product_Coll',
                    options: {
                      draggable: true,
                      resizeableHeader: true,
                      height: 'all-empty-space',
                      style: { height: '50%' },
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
        '@id': 'mktp:WB_Select_Boxplots_Price_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:WB_Select_Boxplots_Price_Coll_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:WB_Select_Boxplots_Price_Coll_Ent_Cond', // machine-generated random UUID
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
            '@id': 'mktp:WB_Select_Boxplots_TotalSales_Coll_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:WB_Select_Boxplots_TotalSales_Coll_Ent_Cond', // machine-generated random UUID
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
        '@id': 'mktp:WB_Antistress_Boxplots_Price_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:WB_Antistress_Boxplots_Price_Coll_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:WB_Antistress_Boxplots_Price_Coll_Ent_Cond', // machine-generated random UUID
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
        '@id': 'mktp:WB_Antistress_Boxplots_TotalSales_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:WB_Antistress_Boxplots_TotalSales_Coll_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:WB_Antistress_Boxplots_TotalSales_Coll_Ent_Cond', // machine-generated random UUID
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
    ],
    elements: [
      ///////
      // BoxPlots
      ////////
      {
        '@id': 'mktp:_dj457gh_chart_price',
        //''@type': 'aldkg:BoxPlotChart', // control type
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
                customContent: buildCustomTooltip2('Цена'),
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
                '@id': 'mktp:box1_price', // machine-generated random UUID
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:WB_Select_Boxplots_Price_Coll', // reference to data
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
                resultsScope: 'mktp:WB_Antistress_Boxplots_Price_Coll', // reference to data
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
                customContent: buildCustomTooltip2('Объем продаж'),
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
                resultsScope: 'mktp:WB_Antistress_Boxplots_TotalSales_Coll', // reference to data
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

export const MktpProducts = Template.bind({});
MktpProducts.args = {
  additionalColls: additionalCollsProds,
  viewDescrId: viewDescrsProds[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};
