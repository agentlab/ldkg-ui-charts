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
//  Markeplaces Categories and Cards
///////////////////////////////////////////////

const viewKindsCats = [
  {
    '@id': 'mktp:TreeTableChartViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'TreeTableChart',
    description: 'TreeTableChart',
    collsConstrs: [
      /// Marketplaces
      {
        '@id': 'mktp:Marketplaces_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Marketplaces_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:MarketplaceShape',
            service: mktpSchemaRepoIri,
          },
        ],
        orderBy: [{ expression: variable('rank0'), descending: false }],
      },
      /// Marketplace categories & cards
      {
        '@id': 'mktp:Categories_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Categories_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'als:CategoryShape', //'hs:CategoryShape',
            service: mktpSchemaRepoIri,
          },
        ],
      },
      {
        '@id': 'mktp:ProductCards_in_Category_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:ProductCards_in_Category_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'als:ProductCardShape',
            conditions: {
              '@id': 'mktp:ProductCards_in_Category_Coll_Ent_Cond',
              CardInCatLink: 'https://muying.1688.com/wanju',
            },
            service: mktpSchemaRepoIri,
          },
        ],
      },
      //// Mktp Products & ProductCards
      {
        '@id': 'mktp:Products_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Products_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:ProductShape',
            service: mktpSchemaRepoIri,
          },
        ],
      },
      {
        '@id': 'mktp:ProductCards_in_Product_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:ProductCards_in_Product_Coll_Ent',
            '@type': 'aldkg:EntConstr',
            schema: 'als:ProductCardShape',
            conditions: {
              '@id': 'mktp:ProductCards_in_Product_Coll_Ent_Cond',
              CardInProdLink: null, //'mktp_d:Massager',
            },
            service: mktpSchemaRepoIri,
          },
        ],
      },
    ],
    elements: [
      {
        '@id': 'mktp:_345JfD7',
        '@type': 'aldkg:SplitPaneLayout',
        options: {
          style: {
            width: '100%',
            height: '120%',
          },
          initialSizes: [90, 10],
          collapseDirection: 'right',
        },
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
                '@id': 'mktp:_df7eds',
                '@type': 'aldkg:TabControl',
                // by this resultsScope TabControl could have read access to the results, selected by Query with @id='rm:ProjectViewClass_ArtifactFormats_Query'
                resultsScope: 'mktp:Marketplaces_Coll', // bind to results data by query @id
                options: {
                  title: 'Маркетплейсы',
                  style: {
                    margin: '0 0 0 24px',
                  },
                  contentSize: true,
                  // by this connection TabControl could have read/write access to the property 'artifactFormat' in condition object with @id='rm:ProjectViewClass_Artifacts_Query_Shape0_Condition'
                  connections: [
                    { toObj: 'mktp:Categories_Coll_Ent', toProp: 'schema', fromProp: 'categoryShape' },
                    { toObj: 'mktp:ProductCards_in_Category_Coll_Ent', toProp: 'schema', fromProp: 'productCardShape' },
                    // Product cards
                    { toObj: 'mktp:ProductCards_in_Product_Coll_Ent', toProp: 'schema', fromProp: 'productCardShape' },
                    //Observations
                    { toObj: 'mktp:Observations_Coll_Ent', toProp: 'schema', fromProp: 'observationShape' },
                    //SVD
                    { toObj: 'mktp:SvdDaily_Coll_Ent_Cond', toProp: 'forDataset' },
                    { toObj: 'mktp:SvdWeekly_Coll_Ent_Cond', toProp: 'forDataset' },
                    { toObj: 'mktp:SvdMonthly_Coll_Ent_Cond', toProp: 'forDataset' },
                    //SRD
                    { toObj: 'mktp:SrdDaily_Coll_Ent_Cond', toProp: 'forDataset' },
                    { toObj: 'mktp:SrdWeekly_Coll_Ent_Cond', toProp: 'forDataset' },
                    { toObj: 'mktp:SrdMonthly_Coll_Ent_Cond', toProp: 'forDataset' },
                  ],
                },
              },
              {
                '@id': 'mktp:_934Jfg7',
                '@type': 'aldkg:SplitPaneLayout',
                options: {
                  style: {
                    width: '100%',
                    height: '100%',
                  },
                  initialSizes: [20, 80],
                  split: 'horizontal',
                  collapseDirection: 'up',
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
                      initialSizes: [20, 80],
                      collapseDirection: 'left',
                    },
                    elements: [
                      {
                        '@id': 'mktp:_23sLhd67',
                        '@type': 'aldkg:DataControl',
                        resultsScope: 'mktp:Categories_Coll',
                        options: {
                          renderType: 'tree',
                          title: 'Категории маркетплейса',
                          treeNodeTitleKey: 'name',
                          treeNodeParentKey: 'SubcatInCatLink',
                          connections: [
                            { toObj: 'mktp:ProductCards_in_Category_Coll_Ent_Cond', toProp: 'CardInCatLink' },
                          ],
                        },
                      },
                      {
                        '@id': 'mktp:CategoryCardsTable',
                        '@type': 'aldkg:Array',
                        resultsScope: 'mktp:ProductCards_in_Category_Coll',
                        options: {
                          connections: [
                            //Observations
                            { toObj: 'mktp:Observations_Coll_Ent_Cond', toProp: 'product' },
                            //SVD
                            { toObj: 'mktp:SvdDaily_Coll_Ent_Cond', toProp: 'svdDailyHasProduct' },
                            { toObj: 'mktp:SvdWeekly_Coll_Ent_Cond', toProp: 'svdWeeklyHasProduct' },
                            { toObj: 'mktp:SvdMonthly_Coll_Ent_Cond', toProp: 'svdMonthlyHasProduct' },
                            //SRD
                            { toObj: 'mktp:SrdDaily_Coll_Ent_Cond', toProp: 'srdDailyHasProduct' },
                            { toObj: 'mktp:SrdWeekly_Coll_Ent_Cond', toProp: 'srdWeeklyHasProduct' },
                            { toObj: 'mktp:SrdMonthly_Coll_Ent_Cond', toProp: 'srdMonthlyHasProduct' },
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
                                shape: {
                                  type: 'pointer',
                                  value: '/options/shape',
                                },
                              },
                            },
                            dataMappings: [],
                          },
                          'aldkg:TimeSeriesSRDDaily': {
                            '@id': 'mktp:Mapping_2',
                            '@type': 'aldkg:TimeSeries',
                            type: {
                              type: 'pointer',
                              value: '/type',
                            },
                            yField: 'srdDaily',
                            xField: 'bucketEnd',
                            colorField: '@type',
                            mapping: {
                              type: 'object',
                              properties: {
                                style: {
                                  type: 'object',
                                  properties: {
                                    lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                                    stroke: { type: 'pointer', value: '/options/stroke' },
                                  },
                                  wrapper: { type: 'pointer', value: '/srdDailyHasProduct' },
                                },
                                color: {
                                  type: 'pointer',
                                  value: '/options/color',
                                  wrapper: { type: 'pointer', value: '/srdDailyHasProduct' },
                                },
                                shape: {
                                  type: 'pointer',
                                  value: '/options/shape',
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
                            yField: 'value',
                            xField: 'bucketEnd',
                            colorField: '@type',
                            mapping: {
                              type: 'object',
                              properties: {
                                // style: {
                                //   type: 'object',
                                //   properties: {
                                //     lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 2 },
                                //     stroke: { type: 'pointer', value: '/options/stroke' },
                                //   },
                                //   wrapper: { type: 'pointer', value: '/@type' },
                                // },
                                // color: {
                                //   type: 'pointer',
                                //   value: '/options/color',
                                //   wrapper: { type: 'pointer', value: '/@type' },
                                // },
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
                    ],
                  },
                ],
              },
            ],
          },
          {
            '@id': 'mktp:_34Sd7',
            '@type': 'aldkg:SplitPaneLayout',
            options: {
              style: {
                width: '100%',
                height: '100%',
              },
              initialSizes: [25, 75],
              split: 'horizontal',
              collapseDirection: 'up',
            },
            elements: [
              {
                '@id': 'mktp:ProductTree',
                '@type': 'aldkg:DataControl',
                resultsScope: 'mktp:Products_Coll',
                options: {
                  renderType: 'tree',
                  title: 'Продукты',
                  treeNodeTitleKey: 'title',
                  treeNodeParentKey: 'SubProdInProdLink',
                  connections: [{ toObj: 'mktp:ProductCards_in_Product_Coll_Ent_Cond', toProp: 'CardInProdLink' }],
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
];

const viewDescrsCats = [
  {
    '@id': 'mktp:_g7H7gh',
    '@type': 'aldkg:ViewDescr',
    title: 'Показатели продукта',
    viewKind: 'mktp:TreeTableChartViewKind',
    // datasets constraints, specific to this view (UML aggregation)
    collsConstrs: [
      //Observations
      {
        '@id': 'mktp:Observations_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Observations_Coll_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'als:ALSObservationShape',
            conditions: {
              '@id': 'mktp:Observations_Coll_Ent_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              product: null,
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('parsedAt0'), descending: false }],
      },
      //SVD
      {
        '@id': 'mktp:SvdDaily_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:SvdDaily_Coll_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:SvdDailyShape',
            conditions: {
              '@id': 'mktp:SvdDaily_Coll_Ent_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              svdDailyHasProduct: null,
              forDataset: 'https://www.1688.com',
              // we need here chart for property: svdDaily, not properties svdWeekly, svdMonthly
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd0'), descending: false }],
      },
      {
        '@id': 'mktp:SvdWeekly_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:SvdWeekly_Coll_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:SvdWeeklyShape',
            conditions: {
              '@id': 'mktp:SvdWeekly_Coll_Ent_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              svdWeeklyHasProduct: null,
              forDataset: 'https://www.1688.com',
              // we need here chart for property: svdWeekly
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd0'), descending: false }],
      },
      {
        '@id': 'mktp:SvdMonthly_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:SvdMonthly_Coll_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:SvdMonthlyShape',
            conditions: {
              '@id': 'mktp:SvdMonthly_Coll_Ent_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              forDataset: 'https://www.1688.com',
              svdMonthlyHasProduct: null,
              // we need here chart for property: svdMonthly
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd0'), descending: false }],
      },
      //SRD
      {
        '@id': 'mktp:SrdDaily_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:SrdDaily_Coll_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:SrdDailyShape',
            conditions: {
              '@id': 'mktp:SrdDaily_Coll_Ent_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              srdDailyHasProduct: null,
              forDataset: 'https://www.1688.com',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd0'), descending: false }],
      },
      {
        '@id': 'mktp:SrdWeekly_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:SrdWeekly_Coll_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:SrdWeeklyShape',
            conditions: {
              '@id': 'mktp:SrdWeekly_Coll_Ent_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              srdWeeklyHasProduct: null,
              forDataset: 'https://www.1688.com',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd0'), descending: false }],
      },
      {
        '@id': 'mktp:SrdMonthly_Coll', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:SrdMonthly_Coll_Ent', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:SrdMonthlyShape',
            conditions: {
              '@id': 'mktp:SrdMonthly_Coll_Ent_Cond', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              forDataset: 'https://www.1688.com',
              srdMonthlyHasProduct: null,
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('bucketEnd0'), descending: false }],
      },
    ],
    elements: [
      {
        '@id': 'mktp:_g7H7gh_chart',
        '@type': 'aldkg:Chart',
        '@parent': 'mktp:TreeTableChartVKElement',
        resultsScope: 'mktp:Observations_Coll',
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
                '@id': 'mktp:TimeSeries_Price_Daily',
                '@type': 'aldkg:TimeSeriesDaily',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                  },
                  axes: {
                    yAxis: {
                      aliases: {
                        value: 'Объем продаж, шт.',
                      },
                    },
                  },
                  region: {
                    start: {
                      x: 0,
                      y: 0,
                    },
                    end: {
                      x: 0.48,
                      y: 0.24,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_price_daily',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:SvdDaily_Coll',
                    options: {
                      color: '#FFE0C7',
                      lineWidth: 2,
                      stroke: '#FFE0C7',
                      shape: 'vh',
                    },
                  },
                  {
                    '@id': 'mktp:line_price_weekly',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:SvdWeekly_Coll',
                    options: {
                      color: '#FF99C3',
                      lineWidth: 2,
                      stroke: '#FF99C3',
                      shape: 'vh',
                    },
                  },
                  {
                    '@id': 'mktp:line_price_monthly',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:SvdMonthly_Coll',
                    options: {
                      color: '#BBDEDE',
                      lineWidth: 2,
                      stroke: '#BBDEDE',
                      shape: 'vh',
                    },
                  },
                ],
              },
              {
                '@id': 'mktp:TimeSeries_SVR',
                '@type': 'aldkg:TimeSeriesDaily',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                  },
                  axes: {
                    yAxis: {
                      aliases: {
                        value: 'Выручка, руб.',
                      },
                    },
                  },
                  region: {
                    start: {
                      x: 0.52,
                      y: 0,
                    },
                    end: {
                      x: 1,
                      y: 0.24,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_price_daily',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:SrdDaily_Coll',
                    options: {
                      color: '#FFE0C7',
                      lineWidth: 2,
                      stroke: '#FFE0C7',
                      shape: 'vh',
                    },
                  },
                  {
                    '@id': 'mktp:line_price_weekly',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:SrdWeekly_Coll',
                    options: {
                      color: '#FF99C3',
                      lineWidth: 2,
                      stroke: '#FF99C3',
                      shape: 'vh',
                    },
                  },
                  {
                    '@id': 'mktp:line_price_monthly',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:SrdMonthly_Coll',
                    options: {
                      color: '#BBDEDE',
                      lineWidth: 2,
                      stroke: '#BBDEDE',
                      shape: 'vh',
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
                    //customContent: buildCustomTooltip('price'),
                  },
                  region: {
                    start: {
                      x: 0,
                      y: 0.26,
                    },
                    end: {
                      x: 0.48,
                      y: 0.49,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_price',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:Observations_Coll',
                    options: {
                      property: 'price',
                      color: '#2E8DF9',
                      lineWidth: 2,
                      stroke: '#2E8DF9',
                      shape: 'hv',
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
                    //customContent: buildCustomTooltip('commentsCount'),
                  },
                  region: {
                    start: {
                      x: 0.52,
                      y: 0.26,
                    },
                    end: {
                      x: 1,
                      y: 0.48,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_commentsCount',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:Observations_Coll',
                    options: {
                      property: 'commentsCount',
                      color: '#EC7E31',
                      lineWidth: 2,
                      stroke: '#EC7E31',
                      shape: 'hv',
                    },
                  },
                ],
              },
              /*
              {
                '@id': 'mktp:TimeSeries_Sales',
                '@type': 'aldkg:TimeSeries',
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
                      y: 0.51,
                    },
                    end: {
                      x: 0.49,
                      y: 0.74,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_stocks',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:Observations_Coll',
                    options: {
                      property: 'stocks',
                      color: '#1FD0BE',
                      lineWidth: 2,
                      stroke: '#1FD0BE',
                      shape: 'hv',
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
                  },
                  region: {
                    start: {
                      x: 0.51,
                      y: 0.51,
                    },
                    end: {
                      x: 1,
                      y: 0.74,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_stocksDiffOrders',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:Observations_Coll',
                    options: {
                      property: 'stocksDiffOrders',
                      color: '#1FD0BE',
                      lineWidth: 2,
                      stroke: '#1FD0BE',
                      shape: 'hv',
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
                  },
                  region: {
                    start: {
                      x: 0,
                      y: 0.76,
                    },
                    end: {
                      x: 0.49,
                      y: 1,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_saleValue',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:Observations_Coll',
                    options: {
                      property: 'saleValue',
                      color: '#EB648C',
                      lineWidth: 2,
                      stroke: '#EB648C',
                      shape: 'hv',
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
                  },
                  region: {
                    start: {
                      x: 0.51,
                      y: 0.76,
                    },
                    end: {
                      x: 1,
                      y: 1,
                    },
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line_totalSales',
                    '@type': 'aldkg:ChartLine',
                    resultsScope: 'mktp:Observations_Coll',
                    options: {
                      property: 'totalSales',
                      color: '#EB648C',
                      lineWidth: 2,
                      stroke: '#EB648C',
                      shape: 'hv',
                    },
                  },
                ],
              },
              */
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
