/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
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
  MstVerticalLayout,
  registerMstViewKindSchema,
  RendererRegistryEntry,
  viewDescrCollConstr,
  viewKindCollConstr,
} from '@agentlab/ldkg-ui-react';
import { CollState, JSONSchema6forRdf, rootModelInitialState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';
import { variable } from '@rdfjs/data-model';
import { Meta, Story } from '@storybook/react';
import moment from 'moment';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import React from 'react';
import { Provider } from 'react-redux';

export default {
  title: '2 Complex Controls/CardCharts List',
  component: Form,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

export const Full: Story<{}> = () => {
  const antdRenderers: RendererRegistryEntry[] = [
    ...antdControlRenderers,
    ...antdLayoutRenderers,
    ...antdDataControlRenderers,
  ];
  registerMstViewKindSchema(MstVerticalLayout);

  const client = new SparqlClientImpl(
    'https://rdf4j.agentlab.ru/rdf4j-server',
    'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp/namespaces',
  );
  const rootStore = createUiModelFromState('mktp-fed20', client, rootModelInitialState, additionalColls);
  console.log('rootStore', rootStore);
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);
  return (
    <Provider store={store}>
      <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
        <div
          style={{
            //height: '1000px',
            width: '100%',
            backgroundColor: 'rgba(230, 235, 242, 0.5)',
            margin: '0 auto',
            padding: '5px',
          }}>
          <Form viewDescrId={viewDescrs[0]['@id']} viewDescrCollId={viewDescrCollConstr['@id']} />
        </div>
      </MstContextProvider>
    </Provider>
  );
};

const ProductCardShapeSchemaForCardsList: JSONSchema6forRdf = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  '@id': 'hs:ProductCardShapeForCardsList',
  '@type': 'sh:NodeShape',
  title: 'Карточка товара',
  description: '',
  targetClass: 'hs:ProductCard',
  type: 'object',
  '@context': {
    '@type': 'rdf:type',
    hasObservations: {
      '@reverse': 'hs:product',
    },
    identifier: {
      '@id': 'hs:identifier',
      '@type': '@id',
    },
    name: {
      '@id': 'hs:name',
      '@type': 'xsd:string',
    },
    brand: {
      '@id': 'hs:brand',
      '@type': '@id',
    },
    country: {
      '@id': 'hs:country',
      '@type': 'xsd:string',
    },
    price: {
      '@id': 'hs:price',
      '@type': 'xsd:int',
    },
    saleValue: {
      '@id': 'hs:saleValue',
      '@type': 'xsd:int',
    },
    seller: {
      '@id': 'hs:seller',
      '@type': '',
    },
    //imageUrl: {
    //  '@id': 'hs:imageUrl',
    //  '@type': '',
    //},
    //
    categoryPopularity: {
      '@id': 'hs:categoryPopularity',
      '@type': 'xsd:double',
    },
    questionsCount: {
      '@id': 'hs:questionsCount',
      '@type': 'xsd:int',
    },
    commentsCount: {
      '@id': 'hs:commentsCount',
      '@type': 'xsd:int',
    },
    photosCount: {
      '@id': 'hs:photosCount',
      '@type': 'xsd:int',
    },
    starsValue: {
      '@id': 'hs:starsValue',
      '@type': 'xsd:int',
    },
    //
    lastMonthSalesAmount: {
      '@id': 'hs:lastMonthSalesAmount',
      '@type': 'xsd:int',
    },
    lastMonthSalesValue: {
      '@id': 'hs:lastMonthSalesValue',
      '@type': 'xsd:int',
    },
    perMonthSalesAmount: {
      '@id': 'hs:perMonthSalesAmount',
      '@type': 'xsd:int',
    },
    perMonthSalesValue: {
      '@id': 'hs:perMonthSalesValue',
      '@type': 'xsd:int',
    },
    prevMonthSalesAmount: {
      '@id': 'hs:prevMonthSalesAmount',
      '@type': 'xsd:int',
    },
    prevMonthSalesValue: {
      '@id': 'hs:prevMonthSalesValue',
      '@type': 'xsd:int',
    },
    //
    salesAmountDiff: {
      '@id': 'hs:salesAmountDiff',
      '@type': 'xsd:int',
    },
    totalSales: {
      '@id': 'hs:totalSales',
      '@type': 'xsd:int',
    },
    totalSalesDiff: {
      '@id': 'hs:totalSalesDiff',
      '@type': 'xsd:int',
    },
    //
    stocks: {
      '@id': 'hs:stocks',
      '@type': 'xsd:int',
    },
    stocksDiffOrders: {
      '@id': 'hs:stocksDiffOrders',
      '@type': 'xsd:int',
    },
    stocksDiffReturns: {
      '@id': 'hs:stocksDiffReturns',
      '@type': 'xsd:int',
    },
  },
  properties: {
    '@id': {
      title: 'URI',
      type: 'string',
      format: 'iri',
    },
    '@type': {
      title: 'Тип',
      type: 'string',
      format: 'iri',
    },
    hasObservations: {
      type: 'array',
      items: {
        type: 'object',
      },
    },
    identifier: {
      title: 'ИД HunterSales',
      type: 'string',
      format: 'iri',
    },
    name: {
      title: 'Название',
      type: 'string',
    },
    brand: {
      title: 'Бренд',
      type: 'string',
      format: 'iri',
    },
    country: {
      title: 'Страна',
      type: 'string',
    },
    price: {
      title: 'Цена',
      type: 'integer',
    },
    saleValue: {
      title: 'Размер скидки',
      type: 'integer',
    },
    seller: {
      title: 'Продавец',
      type: 'string',
      format: 'iri',
    },
    //imageUrl: {
    //  title: 'Изображение товара',
    //  type: 'array',
    //  items: {
    //    type: 'string',
    //    format: 'iri',
    //  },
    //},
    //
    categoryPopularity: {
      title: 'Популярность категории',
      type: 'number',
    },
    questionsCount: {
      title: 'Кол-во вопросов',
      type: 'integer',
    },
    commentsCount: {
      title: 'Кол-во комментариев',
      type: 'integer',
    },
    photosCount: {
      title: 'Кол-во фото',
      type: 'integer',
    },
    starsValue: {
      title: 'Кол-во звезд',
      type: 'integer',
    },
    //
    lastMonthSalesAmount: {
      title: 'Продажи за последний месяц',
      type: 'integer',
    },
    lastMonthSalesValue: {
      title: 'Выручка за последний месяц',
      type: 'integer',
    },
    perMonthSalesAmount: {
      title: 'Средние продажи за месяц',
      type: 'integer',
    },
    perMonthSalesValue: {
      title: 'Средняя выручка за месяц',
      type: 'integer',
    },
    prevMonthSalesAmount: {
      title: 'Средние продажи за прошлый месяц',
      type: 'integer',
    },
    prevMonthSalesValue: {
      title: 'Средняя выручка за прошлый месяц',
      type: 'integer',
    },
    //
    salesAmountDiff: {
      title: 'Изменение объема продаж',
      type: 'integer',
    },
    totalSales: {
      title: 'Купили более * раз',
      type: 'integer',
    },
    totalSalesDiff: {
      title: 'Купили более * раз (изменение)',
      type: 'integer',
    },
    //
    stocks: {
      title: 'Остатки в шт',
      type: 'integer',
    },
    stocksDiffOrders: {
      title: 'Поступления-Возвраты в шт (изменение)',
      type: 'integer',
    },
    stocksDiffReturns: {
      title: 'Заказы в шт (изменение)',
      type: 'integer',
    },
  },
  required: ['@id', '@type', 'name', 'lastMonthSalesValue', 'hasObservations'],
};

const HSObservationShapeSchemaForCardsList: JSONSchema6forRdf = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  '@id': 'hs:HSObservationShapeForCardsList',
  '@type': 'sh:NodeShape',
  title: '',
  description: '',
  targetClass: 'hs:HSObservation',
  type: 'object',
  '@context': {
    '@type': 'rdf:type',
    parsedAt: {
      '@id': 'hs:parsedAt',
      '@type': 'xsd:dateTime',
    },
    price: {
      '@id': 'hs:price',
      '@type': 'xsd:int',
    },
  },
  properties: {
    '@id': {
      title: 'URI',
      type: 'string',
      format: 'iri',
    },
    '@type': {
      title: 'Тип',
      type: 'string',
      format: 'iri',
    },
    parsedAt: {
      type: 'string',
      format: 'date-time',
    },
    price: {
      type: 'integer',
    },
  },
  required: ['@id', '@type', 'parsedAt', 'price'],
};

const viewKinds = [
  {
    '@id': 'mktp:CardCellGridViewKind',
    '@type': 'aldkg:ViewKind',
    collsConstrs: [
      {
        '@id': 'mktp:ViewKind_Cards_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:ViewKind_Cards_Coll_Ent0',
            '@type': 'aldkg:EntConstr',
            //TODO: schema: 'hs:ProductCardCardsListShape',
            schema: ProductCardShapeSchemaForCardsList,
            conditions: {
              hasObservations: '?eIri1',
            },
            orderBy: [{ expression: variable('lastMonthSalesValue0'), descending: true }],
            limit: 15,
          },
          {
            '@id': 'mktp:ViewKind_Cards_Coll_Ent1',
            '@type': 'aldkg:EntConstr',
            //TODO: schema: 'hs:HSObservationCardsListShape',
            schema: HSObservationShapeSchemaForCardsList,
            conditions: {
              parsedAt: {
                relation: 'after',
                value: ['2021-07-01T00:00:00'],
              },
            },
            orderBy: [{ expression: variable('parsedAt1'), descending: false }],
          },
        ],
        orderBy: [
          { expression: variable('lastMonthSalesValue0'), descending: true },
          { expression: variable('parsedAt1'), descending: false },
        ],
      },
    ],
    // child ui elements configs
    elements: [
      {
        '@id': 'mktp:_29kFg89',
        '@type': 'aldkg:VerticalLayout',
        elements: [
          {
            '@id': 'mktp:_24Hdr78',
            '@type': 'aldkg:DataControl',
            resultsScope: 'mktp:ViewKind_Cards_Coll',
            options: {
              renderType: 'grid',
              grid: {
                gutter: 16,
                xs: 2,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 4,
                xxl: 7,
              },
              elementTemplate: [
                {
                  '@id': 'mktp:_94hfT67',
                  '@type': 'aldkg:CardLayout',
                  elements: [
                    {
                      '@id': 'mktp:_kje733js',
                      '@type': 'aldkg:ImageCell',
                      scope: 'imageUrl',
                    },
                    {
                      '@id': 'mktp:_jw563df',
                      '@type': 'aldkg:Control',
                      scope: 'name',
                      options: {
                        editable: false,
                        style: {
                          height: '3.5em',
                          textAlign: 'left',
                          fontFamily: 'Lato,Tahoma,sans-serif',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          margin: 0,
                        },
                      },
                    },
                    {
                      '@id': 'mktp:_84gdY576',
                      '@type': 'aldkg:Rate',
                      scope: 'starsValue',
                      options: {
                        editable: false,
                      },
                    },
                    {
                      '@id': 'mktp:_934Hfg78',
                      '@type': 'aldkg:CellHorizontalLayout',
                      options: {
                        justify: 'space-between',
                      },
                      elements: [
                        {
                          '@id': 'mktp:_kfg67we',
                          '@type': 'aldkg:Control',
                          scope: 'price',
                          options: {
                            formatter: 'labeledValue',
                            editable: false,
                            label: 'Цена',
                            specialChar: '₽',
                            style: {
                              textAlign: 'left',
                              fontFamily: 'Lato,Tahoma,sans-serif',
                              color: 'gray',
                            },
                          },
                        },
                        {
                          '@id': 'mktp:_jdf782fK',
                          '@type': 'aldkg:Control',
                          scope: 'totalSales',
                          options: {
                            formatter: 'labeledValue',
                            editable: false,
                            label: 'Всего продано',
                            style: {
                              textAlign: 'right',
                              fontFamily: 'Lato,Tahoma,sans-serif',
                              color: 'gray',
                            },
                          },
                        },
                      ],
                    },
                    {
                      '@id': 'mktp:_Udf783d',
                      '@type': 'aldkg:Control',
                      scope: 'lastMonthSalesAmount',
                      options: {
                        editable: false,
                        formatter: 'сomparison',
                        dataToFormatter: {
                          prevValue: 'prevMonthSalesAmount',
                        },
                        label: 'Продажи за месяц',
                        style: {
                          textAlign: 'left',
                          fontFamily: 'Lato,Tahoma,sans-serif',
                          color: 'gray',
                        },
                      },
                    },
                    {
                      '@id': 'mktp:_iw789dd',
                      '@type': 'aldkg:Control',
                      scope: 'lastMonthSalesValue',
                      options: {
                        formatter: 'сomparison',
                        editable: false,
                        dataToFormatter: {
                          prevValue: 'prevMonthSalesValue',
                        },
                        label: 'Объем продаж',
                        style: {
                          textAlign: 'left',
                          fontFamily: 'Lato,Tahoma,sans-serif',
                          color: 'gray',
                        },
                      },
                    },
                    {
                      '@id': 'mktp:_385hgf67',
                      '@type': 'aldkg:G2',
                    },
                    {
                      '@id': 'mktp:_jfg789df',
                      '@type': 'aldkg:CellHorizontalLayout',
                      options: {
                        justify: 'space-around',
                      },
                      elements: [
                        {
                          '@id': 'mktp:_45jdfg78',
                          '@type': 'aldkg:Control',
                          scope: '@id',
                          options: {
                            style: {
                              border: '1.5px solid black',
                              borderRadius: '2px',
                              height: '2em',
                              textAlign: 'center',
                              fontWeight: 500,
                              width: '90px',
                              color: 'black',
                            },
                            specialImage: 'https://www.meme-arsenal.com/memes/f8e9bfb9fdf368272b21a5dac8f01ec1.jpg',
                            editable: false,
                            formatter: 'link',
                            dataToFormatter: {
                              link: '@id',
                            },
                            label: 'Wildberries',
                          },
                        },
                        {
                          '@id': 'mktp:_dfg897',
                          '@type': 'aldkg:Button',
                          options: {
                            label: 'Добавить',
                            style: {
                              border: '1.5px solid black',
                              borderRadius: '2px',
                              width: '90px',
                              fontWeight: 500,
                              color: 'black',
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
  },
];

const viewDescrs = [
  {
    '@id': 'mktp:CardCellViewDescr',
    '@type': 'aldkg:ViewDescr',
    viewKind: 'mktp:CardCellGridViewKind',
    title: 'CardCellGrid',
    description: 'CardCellGrid',
    collsConstrs: [
      /*{
        '@id': 'mktp:ViewDescr_Cards_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:ViewDescr_Cards_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:ProductCardShape',
          },
        ],
      },*/
    ],
    options: {},
    // child ui elements configs
    elements: [],
  },
];

const additionalColls: CollState[] = [
  // ViewKinds Collection
  {
    constr: viewKindCollConstr,
    data: viewKinds,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      //resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
    },
  },
  // ViewDescrs Collection
  {
    constr: viewDescrCollConstr,
    data: viewDescrs,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
      // for viewDescrs.collConstrs (it loads lazily -- after the first access)
    },
  },
];
