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

const viewKinds = [
  {
    '@id': 'mktp:TreeTableChartViewKind',
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
              defaultSize: {
                'mktp:ProductTree': '17%',
                'mktp:ProductCardsTable': '83%',
              },
              //height: 500,
              //width: 'all-empty-space',
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

const viewDescrs = [
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
              product: 'https://www.wildberries.ru/catalog/9485114/detail.aspx',
            },
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
const additionalColls: CollState[] = [
  // ViewKinds Collection
  {
    constr: viewKindCollConstr,
    data: viewKinds,
    opt: {
      updPeriod: undefined,
      lastSynced: Date.now(),
      //resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
    },
  },
  // ViewDescrs Collection
  {
    constr: viewDescrCollConstr,
    data: viewDescrs,
    opt: {
      updPeriod: undefined,
      lastSynced: Date.now(),
      //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
      // for viewDescrs.collConstrs (it loads lazily -- after the first access)
    },
  },
];

export default {
  title: 'TreeTableChart',
  component: Form,
} as Meta;

const Template: Story = (args: any) => {
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
    'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp/namespaces',
  );
  const rootStore = createUiModelFromState('mktp-fed', client, rootModelInitialState, additionalColls);
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);
  return (
    <Provider store={store}>
      <MstContextProvider store={rootStore} renderers={renderers} cells={antdCells}>
        <Form viewDescrId={viewDescrs[0]['@id']} viewDescrCollId={viewDescrCollConstr['@id']} />
      </MstContextProvider>
    </Provider>
  );
};
export const TreeTableChart = Template.bind({});

TreeTableChart.args = {};
