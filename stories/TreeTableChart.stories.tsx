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
    'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp-schema/namespaces',
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
            '@id': 'mktp:Categories_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:CategoryShape',
            service: mktpSchemaRepoIri,
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
                  connections: [
                    { to: 'mktp:_u8Yg83', by: 'product' },
                    { to: 'mktp:_sD7fg', by: 'svdDailyHasProduct' },
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
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('parsedAt'), descending: false }],
      },
      {
        '@id': 'mktp:_95fFg7', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_w89Df', // machine-generated random UUID
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
        resultsScope: 'mktp:_8uJ8t6',
        title: 'Показатели продукта',
        options: {
          timeUnit: 'day',
          dateFormat: 'DD.MM.YYYY',
          //interactions: [{ type: 'sibling-tooltip' }],
          height: 1200,
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
                      y: 0.2,
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
                      y: 0.2,
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
                      y: 0.2,
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
                      y: 0.2,
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
                      y: 0.21,
                    },
                    end: {
                      x: 0.24,
                      y: 0.4,
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
                      y: 0.21,
                    },
                    end: {
                      x: 0.49,
                      y: 0.4,
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
                      y: 0.21,
                    },
                    end: {
                      x: 0.74,
                      y: 0.4,
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
                      y: 0.21,
                    },
                    end: {
                      x: 1,
                      y: 0.4,
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
                      y: 0.42,
                    },
                    end: {
                      x: 1,
                      y: 0.6,
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
                      y: 0.6,
                    },
                    end: {
                      x: 1,
                      y: 0.8,
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
                      y: 0.8,
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
      // {
      //   '@id': 'mktp:_g7H7gh_chart_2',
      //   '@type': 'aldkg:Chart',
      //   '@parent': 'mktp:TreeTableChartVKElement',
      //   resultsScope: 'mktp:_95fFg7',
      //   title: 'Показатели продукта daily',
      //   options: {
      //     timeUnit: 'day',
      //     dateFormat: 'DD.MM.YYYY',
      //   },
      //   elements: [
      //     {
      //       '@id': 'mktp:TimeSeries_2',
      //       '@type': 'aldkg:TimeSeriesPlot',
      //       options: {
      //         legend: false,
      //       },
      //       elements: [
      //         {
      //           '@id': 'mktp:TimeSeries_Price_Daily',
      //           '@type': 'aldkg:TimeSeriesDaily',
      //           options: {
      //             legend: false,
      //             tooltip: {
      //               showCrosshairs: true,
      //               shared: true,
      //               showMarkers: true,
      //             },
      //           },
      //           elements: [
      //             {
      //               '@id': 'mktp:line_price_daily',
      //               '@type': 'aldkg:ChartLine',
      //               resultsScope: 'mktp:_95fFg7',
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
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
