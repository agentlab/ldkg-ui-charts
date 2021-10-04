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
import moment from 'moment';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import React from 'react';
import { Provider } from 'react-redux';
import { chartsRenderers } from '../src';
import { MstBoxPlotChartVKElement, MstTimeSeriesChartVKElement } from '../src/store/MstViewElements';
import { boxPlotBucketShape, observationShape } from '../src/store/shapes';

const buildCustomTooltip = (property: string) => (title: any, items: any) => {
  const data = items[0]?.data || {};
  return `<div><p><b>${title}</b></p><p>${property}: ${JSON.stringify(data[property])}</p><div>`;
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
    <div style={{ height: 'calc(100vh - 32px)' }}>
      <Provider store={store}>
        <MstContextProvider store={rootStore} renderers={renderers} cells={antdCells}>
          <Form viewDescrId={viewDescrId} viewDescrCollId={viewDescrCollId} />
        </MstContextProvider>
      </Provider>
    </div>
  );
};

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
          },
        ],
      },
      {
        '@id': 'mktp:ProductCards_in_Category_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:ProductCards_in_Category_Coll_Ent0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:ProductCardShape',
            conditions: {
              '@id': 'mktp:ProductCards_in_Category_Coll_Ent0_con',
              CardInCatLink: 'https://www.wildberries.ru/catalog/zdorove/ozdorovlenie?sort=popular&page=1&xsubject=594',
            },
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
                height: '50%',
              },
              height: 'all-empty-space',
              width: 'all-empty-space',
              defaultSize: {
                'mktp:MarketplacesTabs': '17%',
                'mktp:CategoryCardsTable': '83%',
              },
            },
            elements: [
              {
                '@id': 'mktp:MarketplacesTabs',
                '@type': 'aldkg:TabsLayout',
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
                      connections: [{ to: 'mktp:ProductCards_in_Category_Coll_Ent0_con', by: 'CardInCatLink' }],
                    },
                  },
                  {
                    '@id': 'mktp:_90Syd67',
                    '@type': 'aldkg:DataControl',
                    resultsScope: 'mktp:Categories_Coll_Amzn',
                    options: {
                      renderType: 'tree',
                      title: 'Amazon',
                      treeNodeTitleKey: 'name',
                      treeNodeParentKey: 'SubcatInCatLink',
                    },
                  },
                  {
                    '@id': 'mktp:_20dAy80',
                    '@type': 'aldkg:DataControl',
                    resultsScope: 'mktp:Categories_Coll_1688',
                    options: {
                      renderType: 'tree',
                      title: '1688',
                      treeNodeTitleKey: 'name',
                      treeNodeParentKey: 'SubcatInCatLink',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:CategoryCardsTable',
                '@type': 'aldkg:Array',
                resultsScope: 'mktp:ProductCards_in_Category_Coll',
                options: {
                  connections: [{ to: 'mktp:_u8Yg83', by: 'product' }],
                  draggable: true,
                  resizeableHeader: true,
                  height: 'all-empty-space',
                  style: { height: '100%' },
                  order: [
                    'imageUrl',
                    'name',
                    'price',
                    'saleValue',
                    'categoryPopularity',
                    'commentsCount',
                    'starsValue',
                    'questionsCount',
                    'lastMonthSalesAmount',
                    'lastMonthSalesValue',
                    'perMonthSalesAmount',
                    'perMonthSalesValue',
                    'prevMonthSalesAmount',
                    'prevMonthSalesValue',
                    'salesAmountDiff',
                    'totalSales',
                    'totalSalesDiff',
                    'stocks',
                    'stocksDiffOrders',
                    'stocksDiffReturns',
                    'country',
                    'brand',
                    'seller',
                    'identifier',
                    'rootId',
                    'photosCount',
                    'firstParsedAt',
                    'lastMonthParsedAt',
                    'parsedAt',
                    'prevParsedAt',
                  ],
                  imageUrl: {
                    width: 60,
                    formatter: 'image',
                    editable: false,
                  },
                  identifier: {
                    formatter: 'link',
                    //dataToFormatter: { link: 'identifier' },
                    sortable: true,
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
                  saleValue: {
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
                  perMonthSalesAmount: {
                    width: 150,
                    sortable: true,
                    editable: false,
                  },
                  perMonthSalesValue: {
                    width: 150,
                    sortable: true,
                    editable: false,
                  },
                  prevMonthSalesAmount: {
                    width: 150,
                    sortable: true,
                    editable: false,
                  },
                  prevMonthSalesValue: {
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
                  stocks: {
                    width: 100,
                    sortable: true,
                    editable: false,
                  },
                  stocksDiffOrders: {
                    width: 100,
                    sortable: true,
                    editable: false,
                  },
                  stocksDiffReturns: {
                    width: 100,
                    sortable: true,
                    editable: false,
                  },
                  rootId: {
                    editable: false,
                  },
                  photosCount: {
                    editable: false,
                  },
                  firstParsedAt: {
                    editable: false,
                  },
                  lastMonthParsedAt: {
                    editable: false,
                  },
                  parsedAt: {
                    editable: false,
                  },
                  prevParsedAt: {
                    editable: false,
                  },
                },
              },
            ],
          },
          {
            '@id': 'mktp:TreeTableChartVKElement',
            '@type': 'aldkg:TimeSeriesChart', // control type
            mappings: {
              'aldkg:TimeSeries': {
                '@id': 'mktp:Mapping_1',
                '@type': 'aldkg:TimeSeries',
                type: {
                  type: 'pointer',
                  value: '/type',
                },
                yField: {
                  type: 'pointer',
                  value: '/options/property',
                },
                xField: 'parsedAt',
                colorField: 'product',
                mapping: {
                  type: 'object',
                  properties: {
                    style: {
                      type: 'object',
                      properties: {
                        lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                        stroke: { type: 'pointer', value: '/options/stroke' },
                      },
                      wrapper: { type: 'pointer', value: '/product' },
                    },
                    color: {
                      type: 'pointer',
                      value: '/options/color',
                      wrapper: { type: 'pointer', value: '/product' },
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
      {
        '@id': 'mktp:_8uJ8t6', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'hs:HSObservationShape',
            conditions: {
              '@id': 'mktp:_u8Yg83', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              product: undefined,
            },
            service: 'http://192.168.1.33:8090/sparql',
          },
        ],
        orderBy: [{ expression: variable('parsedAt'), descending: false }],
      },
    ],
    elements: [
      {
        '@id': 'mktp:_g7H7gh_chart',
        '@type': 'aldkg:Chart',
        '@parent': 'mktp:TreeTableChartVKElement',
        resultsScope: 'mktp:_8uJ8t6',
        title: 'Показатели продукта',
        options: {
          timeUnit: 'day',
          dateFormat: 'DD.MM.YYYY',
          interactions: [{ type: 'sibling-tooltip' }],
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
                '@id': 'mktp:TimeSeries_Price',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('price'),
                  },
                  region: {
                    start: {
                      x: 0,
                      y: 0,
                    },
                    end: {
                      x: 0.24,
                      y: 0.48,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_price',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'price',
                      color: '#2E8DF9',
                      lineWidth: 2,
                      stroke: '#2E8DF9',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Sales',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('stocks'),
                  },
                  region: {
                    start: {
                      x: 0.26,
                      y: 0,
                    },
                    end: {
                      x: 0.49,
                      y: 0.48,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_stocks',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'stocks',
                      color: '#1FD0BE',
                      lineWidth: 2,
                      stroke: '#1FD0BE',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Price',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('saleValue'),
                  },
                  region: {
                    start: {
                      x: 0.51,
                      y: 0,
                    },
                    end: {
                      x: 0.74,
                      y: 0.48,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_saleValue',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'saleValue',
                      color: '#EB648C',
                      lineWidth: 2,
                      stroke: '#EB648C',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Sales',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('totalSales'),
                  },
                  region: {
                    start: {
                      x: 0.76,
                      y: 0,
                    },
                    end: {
                      x: 1,
                      y: 0.48,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_totalSales',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'totalSales',
                      color: '#EB648C',
                      lineWidth: 2,
                      stroke: '#EB648C',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Price',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('commentsCount'),
                  },
                  region: {
                    start: {
                      x: 0,
                      y: 0.52,
                    },
                    end: {
                      x: 0.24,
                      y: 1,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_commentsCount',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'commentsCount',
                      color: '#EC7E31',
                      lineWidth: 2,
                      stroke: '#EC7E31',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Sales',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('stocksDiffOrders'),
                  },
                  region: {
                    start: {
                      x: 0.26,
                      y: 0.52,
                    },
                    end: {
                      x: 0.49,
                      y: 1,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_stocksDiffOrders',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'stocksDiffOrders',
                      color: '#1FD0BE',
                      lineWidth: 2,
                      stroke: '#1FD0BE',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Price',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('salesAmountDiff'),
                  },
                  region: {
                    start: {
                      x: 0.51,
                      y: 0.52,
                    },
                    end: {
                      x: 0.74,
                      y: 1,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_salesAmountDiff',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'salesAmountDiff',
                      color: '#EB648C',
                      lineWidth: 2,
                      stroke: '#EB648C',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_Sales',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                    customContent: buildCustomTooltip('totalSalesDiff'),
                  },
                  region: {
                    start: {
                      x: 0.76,
                      y: 0.52,
                    },
                    end: {
                      x: 1,
                      y: 1,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_totalSalesDiff',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:_8uJ8t6',
                    options: {
                      property: 'totalSalesDiff',
                      color: '#EB648C',
                      lineWidth: 2,
                      stroke: '#EB648C',
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

export const MktpCards = Template.bind({});
MktpCards.args = {
  additionalColls: additionalCollsCats,
  viewDescrId: viewDescrsCats[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};

///////////////////////////////////////////////
//  Products Classifier and Cards
///////////////////////////////////////////////

const viewKindsProds = [
  {
    '@id': 'mktp:TreeTableChartProdsViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'TreeTableChart',
    description: 'TreeTableChart',
    collsConstrs: [
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
          },
        ],
      },
      {
        '@id': 'mktp:Products_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Products_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:ProductShape',
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
                height: '50%',
              },
              height: 'all-empty-space',
              width: 'all-empty-space',
              defaultSize: {
                'mktp:ProductTree': '17%',
                'mktp:ProductCardsTable': '83%',
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
                  connections: [{ to: 'mktp:ProductCards_in_Product_Coll_Ent0_Cond', by: 'CardInProdLink' }],
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
                  style: { height: '100%' },
                  order: [
                    'imageUrl',
                    'name',
                    'price',
                    'saleValue',
                    'categoryPopularity',
                    'commentsCount',
                    'starsValue',
                    'questionsCount',
                    'lastMonthSalesAmount',
                    'lastMonthSalesValue',
                    'perMonthSalesAmount',
                    'perMonthSalesValue',
                    'prevMonthSalesAmount',
                    'prevMonthSalesValue',
                    'salesAmountDiff',
                    'totalSales',
                    'totalSalesDiff',
                    'stocks',
                    'stocksDiffOrders',
                    'stocksDiffReturns',
                    'country',
                    'brand',
                    'seller',
                    'identifier',
                    'rootId',
                    'photosCount',
                    'firstParsedAt',
                    'lastMonthParsedAt',
                    'parsedAt',
                    'prevParsedAt',
                  ],
                  imageUrl: {
                    width: 60,
                    formatter: 'image',
                    editable: false,
                  },
                  identifier: {
                    formatter: 'link',
                    //dataToFormatter: { link: 'identifier' },
                    sortable: true,
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
                  saleValue: {
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
                  perMonthSalesAmount: {
                    width: 150,
                    sortable: true,
                    editable: false,
                  },
                  perMonthSalesValue: {
                    width: 150,
                    sortable: true,
                    editable: false,
                  },
                  prevMonthSalesAmount: {
                    width: 150,
                    sortable: true,
                    editable: false,
                  },
                  prevMonthSalesValue: {
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
                  stocks: {
                    width: 100,
                    sortable: true,
                    editable: false,
                  },
                  stocksDiffOrders: {
                    width: 100,
                    sortable: true,
                    editable: false,
                  },
                  stocksDiffReturns: {
                    width: 100,
                    sortable: true,
                    editable: false,
                  },
                  rootId: {
                    editable: false,
                  },
                  photosCount: {
                    editable: false,
                  },
                  firstParsedAt: {
                    editable: false,
                  },
                  lastMonthParsedAt: {
                    editable: false,
                  },
                  parsedAt: {
                    editable: false,
                  },
                  prevParsedAt: {
                    editable: false,
                  },
                },
              },
            ],
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
                colorField: 'source',
                outliersField: 'outliers',
                adjust: {
                  type: 'object',
                  properties: {
                    type: 'dodge',
                    marginRatio: 0,
                  },
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
];

const viewDescrsProds = [
  {
    '@id': 'mktp:_g7H7gh',
    '@type': 'aldkg:ViewDescr',
    title: 'Показатели продукта',
    viewKind: 'mktp:TreeTableChartProdsViewKind',
    // datasets constraints, specific to this view (UML aggregation)
    collsConstrs: [
      //
      // Product 1
      //
      {
        '@id': 'mktp:BoxPlotBucket_0_CollConstr', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:BoxPlotBucket_0_CollConstr_0', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:BoxPlotBucket_0_CollConstr_0_0', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'mktp_d:Massager',
              forProperty: 'hs:Price',
            },
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
    ],
    elements: [
      {
        '@id': 'mktp:as45d57gh_chart',
        //'@type': 'aldkg:BoxPlotChart', // control type
        '@type': 'aldkg:Chart', // control type
        '@parent': 'mktp:BoxPlotChartViewKind',
        title: 'Разброс цены продукта, по маркетплейсам',
        // child ui elements configs
        options: {
          timeUnit: 'day',
          dateFormat: 'DD.MM.YYYY',
          groupField: 'source',
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
            },
            elements: [
              //
              // Product 1
              //
              {
                '@id': 'mktp:box1', // machine-generated random UUID
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:BoxPlotBucket_0_CollConstr', // reference to data
                options: {
                  shape: 'box',
                  label: 'Massager of Neck Kneading', // TODO: in future should be a data-binding
                  //color: '#4EEC1F',
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

const groupedBoxPlot = [
  {
    '@id': 'mktp:d5005f9e-b7c0-4bab-bc7d-83f4457b0f486c5',
    '@type': 'mktp:BoxPlotBucket',
    hasFeatureOfInterest: 'mktp:Massager',
    forProperty: 'hs:Price',
    observedProperty: 'hs:Price',
    source: 'Amazon',
    min: 9.25e2,
    percentile_75: 9.89e2,
    median: 9.815e2,
    max: 9.89e2,
    percentile_25: 9.3725e2,
    iqr: 5.175e1,
    begin: '2020-11-03T23:35:47.41Z',
    end: '2020-11-10T23:35:47.41Z',
    count: 4,
  },
  {
    '@id': 'mktp:d5005f9e-b7c0-4bab-sssbc7d-8345744b0f486c5',
    '@type': 'mktp:BoxPlotBucket',
    hasFeatureOfInterest: 'mktp:Massager',
    forProperty: 'hs:Price',
    observedProperty: 'hs:Price',
    source: 'Wildberries',
    min: 9.15e2,
    percentile_75: 9.59e2,
    median: 9.615e2,
    max: 9.69e2,
    percentile_25: 9.2725e2,
    iqr: 5.175e1,
    begin: '2020-11-03T23:35:47.41Z',
    end: '2020-11-10T23:35:47.41Z',
    count: 4,
  },
  {
    '@id': 'mktp:4470b857-f2bb-49ab-86ca-19457cd494ea776',
    '@type': 'mktp:BoxPlotBucket',
    hasFeatureOfInterest: 'mktp:Massager',
    forProperty: 'hs:Price',
    observedProperty: 'hs:Price',
    source: 'Amazon',
    min: 0.099e3,
    percentile_75: 1.243e3,
    median: 1.2165e3,
    max: 1.299e3,
    percentile_25: 0.099e3,
    iqr: 2.44e2,
    begin: '2020-11-17T11:31:04.938Z',
    end: '2020-11-24T11:31:04.938Z',
    count: 6,
  },
  {
    '@id': 'mktp:4470b857-f2bb-49ab-86ca-19cd494474ea776',
    '@type': 'mktp:BoxPlotBucket',
    hasFeatureOfInterest: 'mktp:Massager',
    forProperty: 'hs:Price',
    observedProperty: 'hs:Price',
    source: 'Wildberries',
    min: 1.099e3,
    percentile_75: 1.343e3,
    median: 1.2165e3,
    max: 1.499e3,
    percentile_25: 1.099e3,
    iqr: 2.44e2,
    begin: '2020-11-17T11:31:04.938Z',
    end: '2020-11-24T11:31:04.938Z',
    count: 6,
  },
  {
    '@id': 'mktp:8ca89bd6-761b-46e5-8e43-9d4b48bd467cedf',
    '@type': 'mktp:BoxPlotBucket',
    hasFeatureOfInterest: 'mktp:Massager',
    forProperty: 'hs:Price',
    observedProperty: 'hs:Price',
    source: 'Amazon',
    min: 1.197e3,
    percentile_75: 1.299e3,
    median: 1.299e3,
    max: 1.299e3,
    percentile_25: 1.299e3,
    iqr: 0.0,
    begin: '2020-11-25T05:00:01.105Z',
    end: '2020-12-02T05:00:01.105Z',
    count: 8,
  },
  {
    '@id': 'mktp:8ca89bd6-761b-46e5-8e43-9d4b48b56765dcedf',
    '@type': 'mktp:BoxPlotBucket',
    hasFeatureOfInterest: 'mktp:Massager',
    forProperty: 'hs:Price',
    observedProperty: 'hs:Price',
    source: 'Wildberries',
    min: 1.197e3,
    percentile_75: 1.299e3,
    median: 1.299e3,
    max: 1.299e3,
    percentile_25: 1.299e3,
    iqr: 0.0,
    begin: '2020-11-25T05:00:01.105Z',
    end: '2020-12-02T05:00:01.105Z',
    count: 8,
  },
  {
    '@id': 'mktp:0abd6f48-6760-4e4b-ab01-535e1af5f95501c',
    '@type': 'mktp:BoxPlotBucket',
    hasFeatureOfInterest: 'mktp:Massager',
    forProperty: 'hs:Price',
    observedProperty: 'hs:Price',
    source: 'Amazon',
    min: 0.198e3,
    percentile_75: 1.599e3,
    median: 1.299e3,
    max: 1.799e3,
    percentile_25: 1.2485e3,
    iqr: 5.05e1,
    begin: '2020-12-04T00:19:19.249Z',
    end: '2020-12-11T00:19:19.249Z',
    count: 5,
  },
  {
    '@id': 'mktp:0abd6f48-6760-4e4b-ab01-535e1af5f078c',
    '@type': 'mktp:BoxPlotBucket',
    hasFeatureOfInterest: 'mktp:Massager',
    forProperty: 'hs:Price',
    observedProperty: 'hs:Price',
    source: 'Wildberries',
    min: 1.198e3,
    percentile_75: 1.299e3,
    median: 1.299e3,
    max: 1.299e3,
    percentile_25: 1.2485e3,
    iqr: 5.05e1,
    begin: '2020-12-04T00:19:19.249Z',
    end: '2020-12-11T00:19:19.249Z',
    count: 5,
  },
  {
    '@id': 'mktp:df234c49-beaf-4026-a1d9-1afd6fbb7a6784',
    '@type': 'mktp:BoxPlotBucket',
    hasFeatureOfInterest: 'mktp:Massager',
    forProperty: 'hs:Price',
    observedProperty: 'hs:Price',
    source: 'Amazon',
    min: 1.621e3,
    percentile_75: 2.559e3,
    median: 2.559e3,
    max: 2.559e3,
    percentile_25: 1.82275e3,
    iqr: 7.3625e2,
    begin: '2020-12-12T14:10:45.978Z',
    end: '2020-12-19T14:10:45.978Z',
    count: 6,
  },
  {
    '@id': 'mktp:df234c49-beaf-4026-a1d9-1afd6fbb7a687',
    '@type': 'mktp:BoxPlotBucket',
    hasFeatureOfInterest: 'mktp:Massager',
    forProperty: 'hs:Price',
    observedProperty: 'hs:Price',
    source: 'Wildberries',
    min: 1.621e3,
    percentile_75: 2.559e3,
    median: 2.559e3,
    max: 2.759e3,
    percentile_25: 1.95275e3,
    iqr: 7.3625e2,
    begin: '2020-12-12T14:10:45.978Z',
    end: '2020-12-19T14:10:45.978Z',
    count: 6,
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
  {
    constr: viewDescrsProds[0].collsConstrs?.[0]['@id'], // reference by @id
    data: groupedBoxPlot,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false,
    },
  },
];

export const MktpProducts = Template.bind({});
MktpProducts.args = {
  additionalColls: additionalCollsProds,
  viewDescrId: viewDescrsProds[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};
